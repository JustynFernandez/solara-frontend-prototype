package com.solara.backend.seed;

import com.solara.backend.entity.Guide;
import com.solara.backend.entity.HelpRequest;
import com.solara.backend.entity.Notification;
import com.solara.backend.entity.NotificationPreference;
import com.solara.backend.entity.Project;
import com.solara.backend.entity.ProjectGuideResource;
import com.solara.backend.entity.ProjectMembership;
import com.solara.backend.entity.User;
import com.solara.backend.entity.enums.GuideDifficulty;
import com.solara.backend.entity.enums.GuideFormat;
import com.solara.backend.entity.enums.GuidePillar;
import com.solara.backend.entity.enums.HelpRequestStatus;
import com.solara.backend.entity.enums.NotificationType;
import com.solara.backend.entity.enums.ProjectMembershipRole;
import com.solara.backend.entity.enums.ProjectStatus;
import com.solara.backend.entity.enums.UserRole;
import com.solara.backend.repository.GuideRepository;
import com.solara.backend.repository.HelpRequestRepository;
import com.solara.backend.repository.NotificationPreferenceRepository;
import com.solara.backend.repository.NotificationRepository;
import com.solara.backend.repository.ProjectGuideResourceRepository;
import com.solara.backend.repository.ProjectMembershipRepository;
import com.solara.backend.repository.ProjectRepository;
import com.solara.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * Seeds a repeatable demo dataset for local development and assessment walkthroughs.
 */
@Component
public class DemoDataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final GuideRepository guideRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMembershipRepository projectMembershipRepository;
    private final ProjectGuideResourceRepository projectGuideResourceRepository;
    private final HelpRequestRepository helpRequestRepository;
    private final NotificationPreferenceRepository notificationPreferenceRepository;
    private final NotificationRepository notificationRepository;
    private final boolean seedEnabled;

    public DemoDataSeeder(
            UserRepository userRepository,
            GuideRepository guideRepository,
            ProjectRepository projectRepository,
            ProjectMembershipRepository projectMembershipRepository,
            ProjectGuideResourceRepository projectGuideResourceRepository,
            HelpRequestRepository helpRequestRepository,
            NotificationPreferenceRepository notificationPreferenceRepository,
            NotificationRepository notificationRepository,
            @Value("${solara.seed.enabled:true}") boolean seedEnabled
    ) {
        this.userRepository = userRepository;
        this.guideRepository = guideRepository;
        this.projectRepository = projectRepository;
        this.projectMembershipRepository = projectMembershipRepository;
        this.projectGuideResourceRepository = projectGuideResourceRepository;
        this.helpRequestRepository = helpRequestRepository;
        this.notificationPreferenceRepository = notificationPreferenceRepository;
        this.notificationRepository = notificationRepository;
        this.seedEnabled = seedEnabled;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (seedEnabled && userRepository.count() == 0L) {
            resetAndSeed();
        }
    }

    /**
     * Rebuilds the demo dataset from scratch.
     */
    @Transactional
    public void resetAndSeed() {
        notificationRepository.deleteAll();
        notificationPreferenceRepository.deleteAll();
        helpRequestRepository.deleteAll();
        projectGuideResourceRepository.deleteAll();
        projectMembershipRepository.deleteAll();
        projectRepository.deleteAll();
        guideRepository.deleteAll();
        userRepository.deleteAll();

        User justyn = user("user-demo-1", "Justyn Demo", "justyn@solara.dev", UserRole.USER);
        User ava = user("user-demo-2", "Ava Mensah", "ava@solara.dev", UserRole.HELPER);
        User lina = user("user-demo-3", "Lina Patel", "lina@solara.dev", UserRole.HELPER);
        User elliot = user("user-demo-4", "Elliot Park", "elliot@solara.dev", UserRole.HELPER);
        User admin = user("admin-demo-1", "Ali Admin", "ali@solara.dev", UserRole.ADMIN);
        userRepository.saveAll(List.of(justyn, ava, lina, elliot, admin));
        notificationPreferenceRepository.saveAll(List.of(
                preference(justyn),
                preference(ava),
                preference(lina),
                preference(elliot),
                preference(admin)
        ));

        Guide navigatorWarmup = guide(
                "navigator-warmup",
                "Navigator Warmup",
                "Get oriented before you launch Solar Navigator and know what to prepare.",
                GuidePillar.PLAN,
                GuideDifficulty.BEGINNER,
                GuideFormat.GUIDE,
                10,
                LocalDate.of(2025, 1, 10),
                List.of("Plan", "Starter", "Navigator")
        );
        Guide rooftopSafety = guide(
                "rooftop-safety-basics",
                "Rooftop Safety Basics",
                "Safe access, PPE, and power-down checks before any hands-on work.",
                GuidePillar.PLAN,
                GuideDifficulty.BEGINNER,
                GuideFormat.CHECKLIST,
                12,
                LocalDate.of(2025, 1, 12),
                List.of("Safety", "Checklist")
        );
        Guide workspacePlaybook = guide(
                "workspace-playbook",
                "Project Workspace Playbook",
                "Track installs, documents, and tasks with one shared project workspace.",
                GuidePillar.COORDINATE,
                GuideDifficulty.INTERMEDIATE,
                GuideFormat.TEMPLATE,
                15,
                LocalDate.of(2025, 1, 8),
                List.of("Projects", "Coordination")
        );
        guideRepository.saveAll(List.of(navigatorWarmup, rooftopSafety, workspacePlaybook));

        Project brixton = project(
                "brixton-solar-rooftops",
                "Brixton Solar Rooftops",
                "Row homes retrofits with rooftop kits plus tenant mentorship.",
                "Retrofit 3kW rooftop arrays on Brixton row homes, pair tenants with mentors for upkeep, and measure savings for the block.",
                ProjectStatus.RECRUITING,
                "Brixton, London",
                51.4613,
                -0.1162,
                25,
                18,
                new BigDecimal("12000.00"),
                new BigDecimal("6200.00"),
                28000,
                new BigDecimal("7.50"),
                justyn,
                List.of("Rooftop", "Mentorship", "Tool-share")
        );
        Project camden = project(
                "camden-solar-coop",
                "Camden Solar Co-op",
                "Co-owned 150kW array with youth training at two centers.",
                "A co-owned 150kW rooftop array across two community centers in Camden, paired with youth training and monitoring dashboards.",
                ProjectStatus.IN_PROGRESS,
                "Camden, London",
                51.5413,
                -0.1433,
                35,
                22,
                new BigDecimal("38000.00"),
                new BigDecimal("21500.00"),
                165000,
                new BigDecimal("42.00"),
                justyn,
                List.of("Co-op", "Training", "Rooftop")
        );
        projectRepository.saveAll(List.of(brixton, camden));

        projectMembershipRepository.saveAll(List.of(
                membership(brixton, justyn, justyn, ProjectMembershipRole.OWNER),
                membership(brixton, ava, justyn, ProjectMembershipRole.ADMIN),
                membership(brixton, elliot, justyn, ProjectMembershipRole.HELPER),
                membership(camden, justyn, justyn, ProjectMembershipRole.OWNER),
                membership(camden, lina, justyn, ProjectMembershipRole.ADMIN),
                membership(camden, admin, justyn, ProjectMembershipRole.ADMIN)
        ));

        projectGuideResourceRepository.saveAll(List.of(
                resource(brixton, navigatorWarmup, justyn, false),
                resource(brixton, workspacePlaybook, justyn, true),
                resource(camden, workspacePlaybook, justyn, true)
        ));

        HelpRequest brixtonHelpRequest = helpRequest(
                justyn,
                ava,
                brixton,
                navigatorWarmup,
                "Need a rooftop safety review",
                "This week",
                "We need a quick review before volunteer onboarding starts.",
                "justyn@solara.dev",
                "Volunteer onboarding prep",
                HelpRequestStatus.MATCHED
        );
        HelpRequest camdenHelpRequest = helpRequest(
                justyn,
                null,
                camden,
                workspacePlaybook,
                "Need help finalising co-op paperwork",
                "Next month",
                "Looking for a helper who can sense-check the handover docs and project workspace structure.",
                "+44 7700 900123",
                "Document handover",
                HelpRequestStatus.OPEN
        );
        helpRequestRepository.saveAll(List.of(brixtonHelpRequest, camdenHelpRequest));

        notificationRepository.saveAll(List.of(
                notification(
                        justyn,
                        justyn,
                        brixton,
                        null,
                        NotificationType.GUIDE_SAVED_TO_PROJECT,
                        "guide saved to project",
                        "you linked Project Workspace Playbook to Brixton Solar Rooftops.",
                        "/projects/" + brixton.getId(),
                        false,
                        null
                ),
                notification(
                        ava,
                        justyn,
                        brixton,
                        brixtonHelpRequest,
                        NotificationType.HELP_REQUEST_CREATED,
                        "new help request",
                        "Justyn Demo submitted a help request for Brixton Solar Rooftops.",
                        "/projects/" + brixton.getId(),
                        false,
                        null
                ),
                notification(
                        elliot,
                        justyn,
                        brixton,
                        null,
                        NotificationType.MEMBER_ADDED,
                        "you were added to a project",
                        "Justyn Demo added you to Brixton Solar Rooftops as HELPER.",
                        "/projects/" + brixton.getId(),
                        true,
                        Instant.now().minusSeconds(3600)
                )
        ));
    }

    private User user(String id, String name, String email, UserRole role) {
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setEmail(email);
        user.setRole(role);
        return user;
    }

    private Guide guide(
            String slug,
            String title,
            String summary,
            GuidePillar pillar,
            GuideDifficulty difficulty,
            GuideFormat format,
            int durationMins,
            LocalDate publishedOn,
            List<String> tags
    ) {
        Guide guide = new Guide();
        guide.setSlug(slug);
        guide.setTitle(title);
        guide.setSummary(summary);
        guide.setPillar(pillar);
        guide.setDifficulty(difficulty);
        guide.setFormat(format);
        guide.setDurationMins(durationMins);
        guide.setPublishedOn(publishedOn);
        guide.setTags(new LinkedHashSet<>(tags));
        return guide;
    }

    private Project project(
            String slug,
            String name,
            String shortDescription,
            String fullDescription,
            ProjectStatus status,
            String location,
            double latitude,
            double longitude,
            int goalVolunteers,
            int currentVolunteers,
            BigDecimal goalFunding,
            BigDecimal currentFunding,
            Integer impactEstimateKwhPerYear,
            BigDecimal impactEstimateTonsCo2PerYear,
            User createdByUser,
            List<String> tags
    ) {
        Project project = new Project();
        project.setSlug(slug);
        project.setName(name);
        project.setShortDescription(shortDescription);
        project.setFullDescription(fullDescription);
        project.setStatus(status);
        project.setLocation(location);
        project.setLatitude(latitude);
        project.setLongitude(longitude);
        project.setGoalVolunteers(goalVolunteers);
        project.setCurrentVolunteers(currentVolunteers);
        project.setGoalFunding(goalFunding);
        project.setCurrentFunding(currentFunding);
        project.setImpactEstimateKwhPerYear(impactEstimateKwhPerYear);
        project.setImpactEstimateTonsCo2PerYear(impactEstimateTonsCo2PerYear);
        project.setCreatedByUser(createdByUser);
        project.setTags(new LinkedHashSet<>(tags));
        return project;
    }

    private ProjectMembership membership(Project project, User user, User addedByUser, ProjectMembershipRole role) {
        ProjectMembership membership = new ProjectMembership();
        membership.setProject(project);
        membership.setUser(user);
        membership.setAddedByUser(addedByUser);
        membership.setRole(role);
        return membership;
    }

    private ProjectGuideResource resource(Project project, Guide guide, User addedByUser, boolean pinned) {
        ProjectGuideResource resource = new ProjectGuideResource();
        resource.setProject(project);
        resource.setGuide(guide);
        resource.setAddedByUser(addedByUser);
        resource.setPinned(pinned);
        return resource;
    }

    private HelpRequest helpRequest(
            User requesterUser,
            User assignedHelperUser,
            Project project,
            Guide guide,
            String whatNeeded,
            String whenNeeded,
            String description,
            String contactMethod,
            String context,
            HelpRequestStatus status
    ) {
        HelpRequest helpRequest = new HelpRequest();
        helpRequest.setRequesterUser(requesterUser);
        helpRequest.setAssignedHelperUser(assignedHelperUser);
        helpRequest.setProject(project);
        helpRequest.setGuide(guide);
        helpRequest.setWhatNeeded(whatNeeded);
        helpRequest.setWhenNeeded(whenNeeded);
        helpRequest.setDescription(description);
        helpRequest.setContactMethod(contactMethod);
        helpRequest.setContext(context);
        helpRequest.setStatus(status);
        return helpRequest;
    }

    private NotificationPreference preference(User user) {
        NotificationPreference preference = new NotificationPreference();
        preference.setUser(user);
        preference.setInAppEnabled(true);
        preference.setHelpRequestsEnabled(true);
        preference.setProjectResourcesEnabled(true);
        preference.setTeamActivityEnabled(true);
        return preference;
    }

    private Notification notification(
            User recipientUser,
            User actorUser,
            Project project,
            HelpRequest helpRequest,
            NotificationType type,
            String title,
            String message,
            String actionUrl,
            boolean read,
            Instant readAt
    ) {
        Notification notification = new Notification();
        notification.setRecipientUser(recipientUser);
        notification.setActorUser(actorUser);
        notification.setProject(project);
        notification.setHelpRequest(helpRequest);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setActionUrl(actionUrl);
        notification.setRead(read);
        notification.setReadAt(readAt);
        return notification;
    }
}
