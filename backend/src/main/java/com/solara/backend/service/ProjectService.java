package com.solara.backend.service;

import com.solara.backend.dto.project.ProjectDtos;
import com.solara.backend.entity.Guide;
import com.solara.backend.entity.Project;
import com.solara.backend.entity.ProjectGuideResource;
import com.solara.backend.entity.ProjectMembership;
import com.solara.backend.entity.User;
import com.solara.backend.entity.enums.HelpRequestStatus;
import com.solara.backend.entity.enums.ProjectMembershipRole;
import com.solara.backend.entity.enums.ProjectStatus;
import com.solara.backend.exception.ApiException;
import com.solara.backend.repository.GuideRepository;
import com.solara.backend.repository.HelpRequestRepository;
import com.solara.backend.repository.ProjectGuideResourceRepository;
import com.solara.backend.repository.ProjectMembershipRepository;
import com.solara.backend.repository.ProjectRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.Normalizer;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Coordinates project lifecycle, resource-linking flows, and dashboard aggregation.
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMembershipRepository projectMembershipRepository;
    private final ProjectGuideResourceRepository projectGuideResourceRepository;
    private final GuideRepository guideRepository;
    private final HelpRequestRepository helpRequestRepository;
    private final PermissionService permissionService;
    private final RequestContextService requestContextService;
    private final NotificationService notificationService;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectMembershipRepository projectMembershipRepository,
            ProjectGuideResourceRepository projectGuideResourceRepository,
            GuideRepository guideRepository,
            HelpRequestRepository helpRequestRepository,
            PermissionService permissionService,
            RequestContextService requestContextService,
            NotificationService notificationService
    ) {
        this.projectRepository = projectRepository;
        this.projectMembershipRepository = projectMembershipRepository;
        this.projectGuideResourceRepository = projectGuideResourceRepository;
        this.guideRepository = guideRepository;
        this.helpRequestRepository = helpRequestRepository;
        this.permissionService = permissionService;
        this.requestContextService = requestContextService;
        this.notificationService = notificationService;
    }

    /**
     * this builds a new project record and adds the creator as the owner membership.
     */
    @Transactional
    public ProjectDtos.ProjectDetailResponse createProject(ProjectDtos.CreateProjectRequest request) {
        String currentUserId = requestContextService.getCurrentUserId();
        User currentUser = permissionService.requireCurrentUser(currentUserId);
        validateFundingAndVolunteerBounds(
                request.goalVolunteers(),
                request.currentVolunteers(),
                request.goalFunding(),
                request.currentFunding()
        );

        Project project = new Project();
        project.setSlug(generateUniqueSlug(request.name()));
        project.setName(request.name().trim());
        project.setShortDescription(request.shortDescription().trim());
        project.setFullDescription(request.fullDescription().trim());
        project.setStatus(request.status());
        project.setLocation(request.location().trim());
        project.setLatitude(request.latitude());
        project.setLongitude(request.longitude());
        project.setGoalVolunteers(defaultInteger(request.goalVolunteers()));
        project.setCurrentVolunteers(defaultInteger(request.currentVolunteers()));
        project.setGoalFunding(request.goalFunding());
        project.setCurrentFunding(request.currentFunding());
        project.setImpactEstimateKwhPerYear(request.impactEstimateKwhPerYear());
        project.setImpactEstimateTonsCo2PerYear(request.impactEstimateTonsCo2PerYear());
        project.setCreatedByUser(currentUser);
        project.setTags(normalizeTags(request.tags()));

        Project savedProject = projectRepository.save(project);

        ProjectMembership membership = new ProjectMembership();
        membership.setProject(savedProject);
        membership.setUser(currentUser);
        membership.setAddedByUser(currentUser);
        membership.setRole(ProjectMembershipRole.OWNER);
        ProjectMembership savedMembership = projectMembershipRepository.save(membership);
        notificationService.emitMemberAdded(savedMembership);

        return getProject(savedProject.getId());
    }

    /**
     * this handles project edits, but only for people who are allowed to manage that project.
     */
    @Transactional
    public ProjectDtos.ProjectDetailResponse updateProject(Long projectId, ProjectDtos.UpdateProjectRequest request) {
        String currentUserId = requestContextService.getCurrentUserId();
        permissionService.requireProjectManager(projectId, currentUserId);

        Project project = requireProject(projectId);

        Integer goalVolunteers = request.goalVolunteers() != null ? request.goalVolunteers() : project.getGoalVolunteers();
        Integer currentVolunteers = request.currentVolunteers() != null ? request.currentVolunteers() : project.getCurrentVolunteers();
        BigDecimal goalFunding = request.goalFunding() != null ? request.goalFunding() : project.getGoalFunding();
        BigDecimal currentFunding = request.currentFunding() != null ? request.currentFunding() : project.getCurrentFunding();
        validateFundingAndVolunteerBounds(goalVolunteers, currentVolunteers, goalFunding, currentFunding);

        if (StringUtils.hasText(request.name())) {
            String trimmedName = request.name().trim();
            project.setName(trimmedName);
            String newBaseSlug = slugify(trimmedName);
            if (!project.getSlug().startsWith(newBaseSlug)) {
                project.setSlug(generateUniqueSlug(trimmedName));
            }
        }
        if (StringUtils.hasText(request.shortDescription())) {
            project.setShortDescription(request.shortDescription().trim());
        }
        if (StringUtils.hasText(request.fullDescription())) {
            project.setFullDescription(request.fullDescription().trim());
        }
        if (request.status() != null) {
            project.setStatus(request.status());
        }
        if (StringUtils.hasText(request.location())) {
            project.setLocation(request.location().trim());
        }
        if (request.latitude() != null) {
            project.setLatitude(request.latitude());
        }
        if (request.longitude() != null) {
            project.setLongitude(request.longitude());
        }
        if (request.goalVolunteers() != null) {
            project.setGoalVolunteers(request.goalVolunteers());
        }
        if (request.currentVolunteers() != null) {
            project.setCurrentVolunteers(request.currentVolunteers());
        }
        if (request.goalFunding() != null) {
            project.setGoalFunding(request.goalFunding());
        }
        if (request.currentFunding() != null) {
            project.setCurrentFunding(request.currentFunding());
        }
        if (request.impactEstimateKwhPerYear() != null) {
            project.setImpactEstimateKwhPerYear(request.impactEstimateKwhPerYear());
        }
        if (request.impactEstimateTonsCo2PerYear() != null) {
            project.setImpactEstimateTonsCo2PerYear(request.impactEstimateTonsCo2PerYear());
        }
        if (request.tags() != null) {
            project.setTags(normalizeTags(request.tags()));
        }

        return mapProjectDetail(projectRepository.save(project));
    }

    /**
     * this is the bit that creates the link between a project and a guide for the resources tab.
     */
    @Transactional
    public ProjectDtos.ProjectGuideResourceResponse addGuideResource(Long projectId, String guideSlug) {
        String currentUserId = requestContextService.getCurrentUserId();
        permissionService.requireProjectManager(projectId, currentUserId);

        Project project = requireProject(projectId);
        Guide guide = guideRepository.findBySlug(guideSlug)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "GUIDE_NOT_FOUND", "Guide not found"));
        if (projectGuideResourceRepository.existsByProjectIdAndGuideId(projectId, guide.getId())) {
            throw new ApiException(HttpStatus.CONFLICT, "RESOURCE_ALREADY_LINKED", "Guide is already linked to this project");
        }

        User currentUser = permissionService.requireCurrentUser(currentUserId);
        ProjectGuideResource resource = new ProjectGuideResource();
        resource.setProject(project);
        resource.setGuide(guide);
        resource.setAddedByUser(currentUser);
        resource.setPinned(false);
        ProjectGuideResource savedResource = projectGuideResourceRepository.save(resource);
        notificationService.emitGuideSavedToProject(project, currentUser, guide.getTitle());
        return mapProjectResource(savedResource);
    }

    /**
     * this just flips the pinned flag, which makes it easy to demo a clean before and after update.
     */
    @Transactional
    public ProjectDtos.ProjectGuideResourceResponse toggleGuidePinned(Long projectId, String guideSlug, boolean pinned) {
        String currentUserId = requestContextService.getCurrentUserId();
        permissionService.requireProjectManager(projectId, currentUserId);

        ProjectGuideResource resource = projectGuideResourceRepository.findByProjectIdAndGuideSlug(projectId, guideSlug)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "RESOURCE_NOT_FOUND", "Project guide resource not found"));
        resource.setPinned(pinned);
        return mapProjectResource(projectGuideResourceRepository.save(resource));
    }

    /**
     * this builds the full project detail response i use in the workspace view.
     */
    @Transactional
    public ProjectDtos.ProjectDetailResponse getProject(Long projectId) {
        return mapProjectDetail(requireProject(projectId));
    }

    /**
     * Builds the aggregate dashboard response used by the project workspace.
     */
    @Transactional
    public ProjectDtos.ProjectDashboardResponse getProjectDashboard(Long projectId) {
        String currentUserId = requestContextService.getCurrentUserId();
        permissionService.requireProjectMember(projectId, currentUserId);

        Project project = requireProject(projectId);
        long membershipCount = projectMembershipRepository.countByProjectId(project.getId());
        long linkedGuideCount = projectGuideResourceRepository.countByProjectId(project.getId());
        long openHelpRequestCount = helpRequestRepository.countByProjectIdAndStatus(project.getId(), HelpRequestStatus.OPEN);

        List<ProjectDtos.ProjectOwnerSummary> owners = projectMembershipRepository
                .findByProjectIdAndRoleInOrderByJoinedAtAsc(
                        project.getId(),
                        List.of(ProjectMembershipRole.OWNER, ProjectMembershipRole.ADMIN)
                )
                .stream()
                .map(membership -> new ProjectDtos.ProjectOwnerSummary(
                        membership.getUser().getId(),
                        membership.getUser().getName(),
                        membership.getRole().name()
                ))
                .toList();

        List<ProjectDtos.ProjectGuideResourceResponse> recentResources = projectGuideResourceRepository
                .findTop5ByProjectIdOrderByAddedAtDesc(project.getId())
                .stream()
                .map(this::mapProjectResource)
                .toList();

        List<ProjectDtos.ProjectDashboardHelpRequestItem> recentHelpRequests = helpRequestRepository
                .findTop5ByProjectIdOrderByCreatedAtDesc(project.getId())
                .stream()
                .map(helpRequest -> new ProjectDtos.ProjectDashboardHelpRequestItem(
                        helpRequest.getId(),
                        helpRequest.getRequesterUser().getName(),
                        helpRequest.getWhatNeeded(),
                        helpRequest.getStatus().name(),
                        helpRequest.getCreatedAt()
                ))
                .toList();

        Instant dashboardUpdatedAt = resolveDashboardUpdatedAt(project);

        return new ProjectDtos.ProjectDashboardResponse(
                project.getId(),
                project.getSlug(),
                project.getName(),
                project.getStatus(),
                Math.toIntExact(membershipCount),
                Math.toIntExact(linkedGuideCount),
                Math.toIntExact(openHelpRequestCount),
                calculateVolunteerProgressPercent(project),
                calculateFundingProgressPercent(project),
                owners,
                recentResources,
                recentHelpRequests,
                dashboardUpdatedAt
        );
    }

    /**
     * this is the filtered project list query for status, search, and location.
     */
    @Transactional
    public Page<ProjectDtos.ProjectSummaryResponse> listProjects(
            ProjectStatus status,
            String search,
            String location,
            int page,
            int size
    ) {
        Specification<Project> specification = (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (status != null) {
                predicates.add(builder.equal(root.get("status"), status));
            }
            if (StringUtils.hasText(location)) {
                predicates.add(builder.like(builder.lower(root.get("location")), "%" + location.trim().toLowerCase(Locale.ROOT) + "%"));
            }
            if (StringUtils.hasText(search)) {
                query.distinct(true);
                Join<Project, String> tagJoin = root.joinSet("tags", JoinType.LEFT);
                String likeValue = "%" + search.trim().toLowerCase(Locale.ROOT) + "%";
                predicates.add(builder.or(
                        builder.like(builder.lower(root.get("name")), likeValue),
                        builder.like(builder.lower(root.get("shortDescription")), likeValue),
                        builder.like(builder.lower(root.get("fullDescription")), likeValue),
                        builder.like(builder.lower(root.get("location")), likeValue),
                        builder.like(builder.lower(tagJoin), likeValue)
                ));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };

        Page<Project> projectPage = projectRepository.findAll(specification, PageRequest.of(page - 1, size));
        return projectPage.map(this::mapProjectSummary);
    }

    private Project requireProject(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "PROJECT_NOT_FOUND", "Project not found"));
    }

    private ProjectDtos.ProjectSummaryResponse mapProjectSummary(Project project) {
        long membershipCount = projectMembershipRepository.countByProjectId(project.getId());
        long linkedGuideCount = projectGuideResourceRepository.countByProjectId(project.getId());
        long openHelpRequestCount = helpRequestRepository.countByProjectIdAndStatus(project.getId(), HelpRequestStatus.OPEN);

        return new ProjectDtos.ProjectSummaryResponse(
                project.getId(),
                project.getSlug(),
                project.getName(),
                project.getShortDescription(),
                project.getStatus(),
                project.getLocation(),
                project.getLatitude(),
                project.getLongitude(),
                project.getGoalVolunteers(),
                project.getCurrentVolunteers(),
                project.getGoalFunding(),
                project.getCurrentFunding(),
                Math.toIntExact(membershipCount),
                Math.toIntExact(linkedGuideCount),
                Math.toIntExact(openHelpRequestCount),
                List.copyOf(project.getTags()),
                project.getCreatedByUser().getId(),
                project.getCreatedByUser().getName(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    /**
     * this shapes the single project response so the demo can show owners, counts, and linked guides together.
     */
    private ProjectDtos.ProjectDetailResponse mapProjectDetail(Project project) {
        long membershipCount = projectMembershipRepository.countByProjectId(project.getId());
        long linkedGuideCount = projectGuideResourceRepository.countByProjectId(project.getId());
        long openHelpRequestCount = helpRequestRepository.countByProjectIdAndStatus(project.getId(), HelpRequestStatus.OPEN);

        List<ProjectDtos.ProjectOwnerSummary> owners = projectMembershipRepository
                .findByProjectIdAndRoleInOrderByJoinedAtAsc(
                        project.getId(),
                        List.of(ProjectMembershipRole.OWNER, ProjectMembershipRole.ADMIN)
                )
                .stream()
                .map(membership -> new ProjectDtos.ProjectOwnerSummary(
                        membership.getUser().getId(),
                        membership.getUser().getName(),
                        membership.getRole().name()
                ))
                .toList();

        List<ProjectDtos.ProjectGuideResourceResponse> resources = projectGuideResourceRepository
                .findByProjectIdOrderByPinnedDescAddedAtAsc(project.getId())
                .stream()
                .map(this::mapProjectResource)
                .toList();

        return new ProjectDtos.ProjectDetailResponse(
                project.getId(),
                project.getSlug(),
                project.getName(),
                project.getShortDescription(),
                project.getFullDescription(),
                project.getStatus(),
                project.getLocation(),
                project.getLatitude(),
                project.getLongitude(),
                project.getGoalVolunteers(),
                project.getCurrentVolunteers(),
                project.getGoalFunding(),
                project.getCurrentFunding(),
                project.getImpactEstimateKwhPerYear(),
                project.getImpactEstimateTonsCo2PerYear(),
                List.copyOf(project.getTags()),
                Math.toIntExact(membershipCount),
                Math.toIntExact(linkedGuideCount),
                Math.toIntExact(openHelpRequestCount),
                project.getCreatedByUser().getId(),
                project.getCreatedByUser().getName(),
                owners,
                resources,
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }

    private ProjectDtos.ProjectGuideResourceResponse mapProjectResource(ProjectGuideResource resource) {
        return new ProjectDtos.ProjectGuideResourceResponse(
                resource.getId(),
                resource.getGuide().getId(),
                resource.getGuide().getSlug(),
                resource.getGuide().getTitle(),
                resource.isPinned(),
                resource.getAddedByUser().getId(),
                resource.getAddedByUser().getName(),
                resource.getAddedAt()
        );
    }

    private Integer calculateVolunteerProgressPercent(Project project) {
        if (project.getGoalVolunteers() == null || project.getGoalVolunteers() <= 0) {
            return null;
        }
        return Math.min(100, (int) Math.round((project.getCurrentVolunteers() * 100.0) / project.getGoalVolunteers()));
    }

    private BigDecimal calculateFundingProgressPercent(Project project) {
        if (project.getGoalFunding() == null || project.getGoalFunding().compareTo(BigDecimal.ZERO) <= 0 || project.getCurrentFunding() == null) {
            return null;
        }
        return project.getCurrentFunding()
                .multiply(BigDecimal.valueOf(100))
                .divide(project.getGoalFunding(), 2, RoundingMode.HALF_UP)
                .min(BigDecimal.valueOf(100));
    }

    private Instant resolveDashboardUpdatedAt(Project project) {
        return Stream.of(
                        project.getUpdatedAt(),
                        projectGuideResourceRepository.findTopByProjectIdOrderByAddedAtDesc(project.getId())
                                .map(ProjectGuideResource::getAddedAt)
                                .orElse(null),
                        helpRequestRepository.findTopByProjectIdOrderByUpdatedAtDesc(project.getId())
                                .map(helpRequest -> helpRequest.getUpdatedAt() != null ? helpRequest.getUpdatedAt() : helpRequest.getCreatedAt())
                                .orElse(null),
                        projectMembershipRepository.findTopByProjectIdOrderByJoinedAtDesc(project.getId())
                                .map(ProjectMembership::getJoinedAt)
                                .orElse(null)
                )
                .filter(Objects::nonNull)
                .max(Comparator.naturalOrder())
                .orElse(project.getUpdatedAt());
    }

    private void validateFundingAndVolunteerBounds(
            Integer goalVolunteers,
            Integer currentVolunteers,
            BigDecimal goalFunding,
            BigDecimal currentFunding
    ) {
        int safeGoalVolunteers = defaultInteger(goalVolunteers);
        int safeCurrentVolunteers = defaultInteger(currentVolunteers);
        if (safeCurrentVolunteers > safeGoalVolunteers) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_VOLUNTEER_COUNTS", "currentVolunteers cannot exceed goalVolunteers");
        }
        if (goalFunding != null && currentFunding != null && currentFunding.compareTo(goalFunding) > 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "INVALID_FUNDING_COUNTS", "currentFunding cannot exceed goalFunding");
        }
    }

    private String generateUniqueSlug(String name) {
        String baseSlug = slugify(name);
        String slug = baseSlug;
        int suffix = 2;
        while (projectRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + suffix;
            suffix++;
        }
        return slug;
    }

    private String slugify(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        return StringUtils.hasText(normalized) ? normalized : "project";
    }

    private int defaultInteger(Integer value) {
        return value == null ? 0 : value;
    }

    private Set<String> normalizeTags(List<String> tags) {
        if (tags == null) {
            return new LinkedHashSet<>();
        }
        return tags.stream()
                .filter(StringUtils::hasText)
                .map(String::trim)
                .collect(LinkedHashSet::new, LinkedHashSet::add, LinkedHashSet::addAll);
    }
}
