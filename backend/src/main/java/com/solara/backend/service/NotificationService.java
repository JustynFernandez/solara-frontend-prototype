package com.solara.backend.service;

import com.solara.backend.dto.notification.NotificationDtos;
import com.solara.backend.entity.HelpRequest;
import com.solara.backend.entity.Notification;
import com.solara.backend.entity.NotificationPreference;
import com.solara.backend.entity.Project;
import com.solara.backend.entity.ProjectMembership;
import com.solara.backend.entity.User;
import com.solara.backend.entity.enums.NotificationType;
import com.solara.backend.exception.ApiException;
import com.solara.backend.repository.NotificationPreferenceRepository;
import com.solara.backend.repository.NotificationRepository;
import com.solara.backend.repository.ProjectMembershipRepository;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * Manages inbox queries, preference persistence, and event-driven notification creation.
 */
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationPreferenceRepository notificationPreferenceRepository;
    private final ProjectMembershipRepository projectMembershipRepository;
    private final PermissionService permissionService;
    private final RequestContextService requestContextService;

    public NotificationService(
            NotificationRepository notificationRepository,
            NotificationPreferenceRepository notificationPreferenceRepository,
            ProjectMembershipRepository projectMembershipRepository,
            PermissionService permissionService,
            RequestContextService requestContextService
    ) {
        this.notificationRepository = notificationRepository;
        this.notificationPreferenceRepository = notificationPreferenceRepository;
        this.projectMembershipRepository = projectMembershipRepository;
        this.permissionService = permissionService;
        this.requestContextService = requestContextService;
    }

    /**
     * Loads the current user's inbox with an optional read filter.
     */
    @Transactional
    public Page<NotificationDtos.NotificationResponse> listNotifications(Boolean read, int page, int size) {
        String currentUserId = requestContextService.getCurrentUserId();
        permissionService.requireCurrentUser(currentUserId);
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Page<Notification> notificationPage = read == null
                ? notificationRepository.findByRecipientUserIdOrderByCreatedAtDesc(currentUserId, pageRequest)
                : notificationRepository.findByRecipientUserIdAndReadOrderByCreatedAtDesc(currentUserId, read, pageRequest);
        return notificationPage.map(this::mapNotification);
    }

    /**
     * Updates the read state for a single notification.
     */
    @Transactional
    public NotificationDtos.NotificationResponse updateReadState(Long notificationId, boolean read) {
        String currentUserId = requestContextService.getCurrentUserId();
        permissionService.requireCurrentUser(currentUserId);
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "NOTIFICATION_NOT_FOUND", "Notification not found"));
        if (!notification.getRecipientUser().getId().equals(currentUserId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "You do not have access to this notification");
        }
        notification.setRead(read);
        notification.setReadAt(read ? Instant.now() : null);
        return mapNotification(notificationRepository.save(notification));
    }

    /**
     * Returns the current user's preference row, creating defaults on first access.
     */
    @Transactional
    public NotificationDtos.NotificationPreferenceResponse getPreferences() {
        User currentUser = permissionService.requireCurrentUser(requestContextService.getCurrentUserId());
        return mapPreference(findOrCreatePreference(currentUser));
    }

    /**
     * Persists notification-preference changes for the current user.
     */
    @Transactional
    public NotificationDtos.NotificationPreferenceResponse updatePreferences(
            NotificationDtos.UpdateNotificationPreferencesRequest request
    ) {
        User currentUser = permissionService.requireCurrentUser(requestContextService.getCurrentUserId());
        NotificationPreference preference = findOrCreatePreference(currentUser);
        preference.setInAppEnabled(request.inAppEnabled());
        preference.setHelpRequestsEnabled(request.helpRequestsEnabled());
        preference.setProjectResourcesEnabled(request.projectResourcesEnabled());
        preference.setTeamActivityEnabled(request.teamActivityEnabled());
        return mapPreference(notificationPreferenceRepository.save(preference));
    }

    /**
     * Emits inbox entries when a help request is created.
     */
    @Transactional
    public void emitHelpRequestCreated(HelpRequest helpRequest) {
        Map<String, User> recipients = new LinkedHashMap<>();
        recipients.put(helpRequest.getRequesterUser().getId(), helpRequest.getRequesterUser());
        if (helpRequest.getAssignedHelperUser() != null) {
            recipients.put(helpRequest.getAssignedHelperUser().getId(), helpRequest.getAssignedHelperUser());
        }
        if (helpRequest.getProject() != null) {
            for (ProjectMembership membership : projectMembershipRepository.findByProjectId(helpRequest.getProject().getId())) {
                recipients.put(membership.getUser().getId(), membership.getUser());
            }
        }

        for (User recipient : recipients.values()) {
            createNotificationIfEnabled(
                    recipient,
                    NotificationType.HELP_REQUEST_CREATED,
                    helpRequest.getRequesterUser(),
                    helpRequest.getProject(),
                    helpRequest,
                    "new help request",
                    helpRequest.getRequesterUser().getName() + " submitted a help request" +
                            (helpRequest.getProject() == null ? "." : " for " + helpRequest.getProject().getName() + "."),
                    helpRequest.getProject() == null ? "/help-requests/" + helpRequest.getId() : "/projects/" + helpRequest.getProject().getId()
            );
        }
    }

    /**
     * Emits inbox entries when a guide is linked to a project.
     */
    @Transactional
    public void emitGuideSavedToProject(Project project, User actor, String guideTitle) {
        Map<String, User> recipients = new LinkedHashMap<>();
        for (ProjectMembership membership : projectMembershipRepository.findByProjectId(project.getId())) {
            recipients.put(membership.getUser().getId(), membership.getUser());
        }

        for (User recipient : recipients.values()) {
            createNotificationIfEnabled(
                    recipient,
                    NotificationType.GUIDE_SAVED_TO_PROJECT,
                    actor,
                    project,
                    null,
                    "guide saved to project",
                    actor.getName() + " linked " + guideTitle + " to " + project.getName() + ".",
                    "/projects/" + project.getId()
            );
        }
    }

    /**
     * Emits the membership notification sent to a newly added project member.
     */
    @Transactional
    public void emitMemberAdded(ProjectMembership membership) {
        createNotificationIfEnabled(
                membership.getUser(),
                NotificationType.MEMBER_ADDED,
                membership.getAddedByUser(),
                membership.getProject(),
                null,
                "you were added to a project",
                membership.getAddedByUser().getName() + " added you to " + membership.getProject().getName() + " as " + membership.getRole().name() + ".",
                "/projects/" + membership.getProject().getId()
        );
    }

    /**
     * Creates a notification when the recipient's preferences allow that event type.
     */
    private void createNotificationIfEnabled(
            User recipient,
            NotificationType type,
            User actor,
            Project project,
            HelpRequest helpRequest,
            String title,
            String message,
            String actionUrl
    ) {
        NotificationPreference preference = findOrCreatePreference(recipient);
        if (!isEnabledForType(preference, type)) {
            return;
        }

        Notification notification = new Notification();
        notification.setRecipientUser(recipient);
        notification.setActorUser(actor);
        notification.setProject(project);
        notification.setHelpRequest(helpRequest);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setActionUrl(actionUrl);
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    /**
     * Maps each notification type to the preference flag that governs it.
     */
    private boolean isEnabledForType(NotificationPreference preference, NotificationType type) {
        if (!preference.isInAppEnabled()) {
            return false;
        }
        return switch (type) {
            case HELP_REQUEST_CREATED -> preference.isHelpRequestsEnabled();
            case GUIDE_SAVED_TO_PROJECT -> preference.isProjectResourcesEnabled();
            case MEMBER_ADDED, TASK_UPDATED -> preference.isTeamActivityEnabled();
        };
    }

    /**
     * Ensures every user has a stored preference row.
     */
    private NotificationPreference findOrCreatePreference(User user) {
        return notificationPreferenceRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    NotificationPreference preference = new NotificationPreference();
                    preference.setUser(user);
                    preference.setInAppEnabled(true);
                    preference.setHelpRequestsEnabled(true);
                    preference.setProjectResourcesEnabled(true);
                    preference.setTeamActivityEnabled(true);
                    return notificationPreferenceRepository.save(preference);
                });
    }

    /**
     * Maps a notification entity into the frontend response contract.
     */
    private NotificationDtos.NotificationResponse mapNotification(Notification notification) {
        return new NotificationDtos.NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getActionUrl(),
                notification.isRead(),
                notification.getReadAt(),
                notification.getCreatedAt(),
                notification.getRecipientUser().getId(),
                notification.getActorUser() == null ? null : notification.getActorUser().getId(),
                notification.getActorUser() == null ? null : notification.getActorUser().getName(),
                notification.getProject() == null ? null : notification.getProject().getId(),
                notification.getProject() == null ? null : notification.getProject().getName(),
                notification.getHelpRequest() == null ? null : notification.getHelpRequest().getId()
        );
    }

    /**
     * this shapes the preference response for the settings panel.
     */
    private NotificationDtos.NotificationPreferenceResponse mapPreference(NotificationPreference preference) {
        return new NotificationDtos.NotificationPreferenceResponse(
                preference.getUser().getId(),
                preference.isInAppEnabled(),
                preference.isHelpRequestsEnabled(),
                preference.isProjectResourcesEnabled(),
                preference.isTeamActivityEnabled(),
                preference.getUpdatedAt()
        );
    }
}
