package com.solara.backend.service;

import com.solara.backend.dto.helprequest.HelpRequestDtos;
import com.solara.backend.entity.Guide;
import com.solara.backend.entity.HelpRequest;
import com.solara.backend.entity.Project;
import com.solara.backend.entity.User;
import com.solara.backend.entity.enums.HelpRequestStatus;
import com.solara.backend.entity.enums.UserRole;
import com.solara.backend.exception.ApiException;
import com.solara.backend.repository.GuideRepository;
import com.solara.backend.repository.HelpRequestRepository;
import com.solara.backend.repository.ProjectRepository;
import com.solara.backend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Applies validation, permissions, and persistence rules for help requests.
 */
@Service
public class HelpRequestService {

    private final HelpRequestRepository helpRequestRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final GuideRepository guideRepository;
    private final PermissionService permissionService;
    private final RequestContextService requestContextService;
    private final NotificationService notificationService;

    public HelpRequestService(
            HelpRequestRepository helpRequestRepository,
            UserRepository userRepository,
            ProjectRepository projectRepository,
            GuideRepository guideRepository,
            PermissionService permissionService,
            RequestContextService requestContextService,
            NotificationService notificationService
    ) {
        this.helpRequestRepository = helpRequestRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.guideRepository = guideRepository;
        this.permissionService = permissionService;
        this.requestContextService = requestContextService;
        this.notificationService = notificationService;
    }

    /**
     * Creates a help request and resolves its related user, project, and guide records.
     */
    @Transactional
    public HelpRequestDtos.HelpRequestResponse createHelpRequest(HelpRequestDtos.CreateHelpRequestRequest request) {
        String currentUserId = requestContextService.getCurrentUserId();
        User currentUser = permissionService.requireCurrentUser(currentUserId);

        User helper = null;
        if (StringUtils.hasText(request.helperId())) {
            helper = userRepository.findById(request.helperId().trim())
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "HELPER_NOT_FOUND", "Helper user not found"));
            if (helper.getRole() != UserRole.HELPER && helper.getRole() != UserRole.ADMIN) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_HELPER", "Assigned helper must have HELPER or ADMIN role");
            }
        }

        Project project = null;
        if (request.projectId() != null) {
            project = projectRepository.findById(request.projectId())
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PROJECT_NOT_FOUND", "Project not found"));
            permissionService.requireProjectMember(project.getId(), currentUserId);
        }

        Guide guide = null;
        if (StringUtils.hasText(request.guideSlug())) {
            guide = guideRepository.findBySlug(request.guideSlug().trim())
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "GUIDE_NOT_FOUND", "Guide not found"));
        }

        HelpRequest helpRequest = new HelpRequest();
        helpRequest.setRequesterUser(currentUser);
        helpRequest.setAssignedHelperUser(helper);
        helpRequest.setProject(project);
        helpRequest.setGuide(guide);
        helpRequest.setWhatNeeded(request.whatNeeded().trim());
        helpRequest.setWhenNeeded(request.whenNeeded().trim());
        helpRequest.setDescription(request.description().trim());
        helpRequest.setContactMethod(request.contactMethod().trim());
        helpRequest.setContext(StringUtils.hasText(request.context()) ? request.context().trim() : null);
        helpRequest.setStatus(helper == null ? HelpRequestStatus.OPEN : HelpRequestStatus.MATCHED);

        HelpRequest savedHelpRequest = helpRequestRepository.save(helpRequest);
        notificationService.emitHelpRequestCreated(savedHelpRequest);
        return mapHelpRequest(savedHelpRequest);
    }

    /**
     * Returns one help request after verifying the caller can view it.
     */
    @Transactional
    public HelpRequestDtos.HelpRequestResponse getHelpRequest(Long helpRequestId) {
        HelpRequest helpRequest = requireHelpRequest(helpRequestId);
        String currentUserId = requestContextService.getCurrentUserId();
        if (!permissionService.canViewHelpRequest(helpRequest, currentUserId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "You do not have access to this help request");
        }
        return mapHelpRequest(helpRequest);
    }

    /**
     * Updates help-request assignment or status subject to role-based checks.
     */
    @Transactional
    public HelpRequestDtos.HelpRequestResponse updateHelpRequest(
            Long helpRequestId,
            HelpRequestDtos.UpdateHelpRequestRequest request
    ) {
        HelpRequest helpRequest = requireHelpRequest(helpRequestId);
        String currentUserId = requestContextService.getCurrentUserId();
        if (!permissionService.canUpdateHelpRequest(helpRequest, currentUserId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "You do not have access to update this help request");
        }

        boolean requesterUpdating = helpRequest.getRequesterUser().getId().equals(currentUserId);
        boolean assignedHelperUpdating = helpRequest.getAssignedHelperUser() != null
                && helpRequest.getAssignedHelperUser().getId().equals(currentUserId);
        boolean managerUpdating = helpRequest.getProject() != null && !requesterUpdating && !assignedHelperUpdating;

        if (request.assignedHelperUserId() != null) {
            if (!managerUpdating) {
                throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "Only project managers can assign helpers");
            }
            User helper = userRepository.findById(request.assignedHelperUserId())
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "HELPER_NOT_FOUND", "Helper user not found"));
            if (helper.getRole() != UserRole.HELPER && helper.getRole() != UserRole.ADMIN) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_HELPER", "Assigned helper must have HELPER or ADMIN role");
            }
            helpRequest.setAssignedHelperUser(helper);
        }

        if (request.status() != null) {
            if (requesterUpdating && request.status() != HelpRequestStatus.CLOSED) {
                throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "Requesters can only close their own help requests");
            }
            helpRequest.setStatus(request.status());
        }

        return mapHelpRequest(helpRequestRepository.save(helpRequest));
    }

    /**
     * Lists help requests with requester, helper, project, and status filters.
     */
    @Transactional
    public Page<HelpRequestDtos.HelpRequestResponse> listHelpRequests(
            String requesterUserId,
            Long projectId,
            String helperId,
            HelpRequestStatus status,
            int page,
            int size
    ) {
        String currentUserId = requestContextService.getCurrentUserId();
        User currentUser = permissionService.requireCurrentUser(currentUserId);

        if (StringUtils.hasText(requesterUserId) && !requesterUserId.equals(currentUserId) && currentUser.getRole() != UserRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "You can only list your own help requests");
        }
        if (StringUtils.hasText(helperId) && !helperId.equals(currentUserId) && currentUser.getRole() != UserRole.ADMIN) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "You can only list help requests assigned to you");
        }
        if (projectId != null) {
            permissionService.requireProjectManager(projectId, currentUserId);
        }

        Specification<HelpRequest> specification = (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(requesterUserId)) {
                predicates.add(builder.equal(root.get("requesterUser").get("id"), requesterUserId));
            } else if (StringUtils.hasText(helperId)) {
                predicates.add(builder.equal(root.get("assignedHelperUser").get("id"), helperId));
            } else if (projectId != null) {
                predicates.add(builder.equal(root.get("project").get("id"), projectId));
            } else {
                predicates.add(builder.equal(root.get("requesterUser").get("id"), currentUserId));
            }

            if (projectId != null) {
                predicates.add(builder.equal(root.get("project").get("id"), projectId));
            }
            if (StringUtils.hasText(helperId)) {
                predicates.add(builder.equal(root.get("assignedHelperUser").get("id"), helperId));
            }
            if (status != null) {
                predicates.add(builder.equal(root.get("status"), status));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };

        return helpRequestRepository.findAll(specification, PageRequest.of(page - 1, size))
                .map(this::mapHelpRequest);
    }

    private HelpRequest requireHelpRequest(Long helpRequestId) {
        return helpRequestRepository.findById(helpRequestId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "HELP_REQUEST_NOT_FOUND", "Help request not found"));
    }

    private HelpRequestDtos.HelpRequestResponse mapHelpRequest(HelpRequest helpRequest) {
        return new HelpRequestDtos.HelpRequestResponse(
                helpRequest.getId(),
                helpRequest.getRequesterUser().getId(),
                helpRequest.getRequesterUser().getName(),
                helpRequest.getAssignedHelperUser() == null ? null : helpRequest.getAssignedHelperUser().getId(),
                helpRequest.getAssignedHelperUser() == null ? null : helpRequest.getAssignedHelperUser().getName(),
                helpRequest.getProject() == null ? null : helpRequest.getProject().getId(),
                helpRequest.getProject() == null ? null : helpRequest.getProject().getName(),
                helpRequest.getGuide() == null ? null : helpRequest.getGuide().getSlug(),
                helpRequest.getGuide() == null ? null : helpRequest.getGuide().getTitle(),
                helpRequest.getWhatNeeded(),
                helpRequest.getWhenNeeded(),
                helpRequest.getDescription(),
                helpRequest.getContactMethod(),
                helpRequest.getContext(),
                helpRequest.getStatus(),
                helpRequest.getCreatedAt(),
                helpRequest.getUpdatedAt()
        );
    }
}
