package com.solara.backend.controller;

import com.solara.backend.dto.common.ApiResponse;
import com.solara.backend.dto.common.PageMeta;
import com.solara.backend.dto.project.ProjectDtos;
import com.solara.backend.entity.enums.ProjectStatus;
import com.solara.backend.service.ProjectService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Exposes project catalogue, detail, resource-linking, and dashboard endpoints.
 */
@Validated
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Creates a project and records the requester as the initial owner.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProjectDtos.ProjectDetailResponse> createProject(
            @Valid @RequestBody ProjectDtos.CreateProjectRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, projectService.createProject(body));
    }

    /**
     * Lists projects with optional filtering and pagination.
     */
    @GetMapping
    public ApiResponse<?> listProjects(
            @RequestParam(required = false) ProjectStatus status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "1") @Min(1) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,
            HttpServletRequest request
    ) {
        Page<ProjectDtos.ProjectSummaryResponse> projectPage = projectService.listProjects(status, search, location, page, size);
        return ApiResponse.success(
                request,
                projectPage.getContent(),
                new PageMeta(page, size, projectPage.getTotalElements(), projectPage.getTotalPages())
        );
    }

    /**
     * Returns one project with owners, linked guides, and summary counts.
     */
    @GetMapping("/{id}")
    public ApiResponse<ProjectDtos.ProjectDetailResponse> getProject(@PathVariable Long id, HttpServletRequest request) {
        return ApiResponse.success(request, projectService.getProject(id));
    }

    /**
     * Returns the aggregated workspace dashboard payload for a single project.
     */
    @GetMapping("/{id}/dashboard")
    public ApiResponse<ProjectDtos.ProjectDashboardResponse> getProjectDashboard(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, projectService.getProjectDashboard(id));
    }

    @PatchMapping("/{id}")
    public ApiResponse<ProjectDtos.ProjectDetailResponse> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectDtos.UpdateProjectRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, projectService.updateProject(id, body));
    }

    /**
     * Links a guide resource to a project workspace.
     */
    @PostMapping("/{id}/resources/guides/{guideSlug}")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProjectDtos.ProjectGuideResourceResponse> addGuideResource(
            @PathVariable Long id,
            @PathVariable String guideSlug,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, projectService.addGuideResource(id, guideSlug));
    }

    /**
     * Updates the pinned state for a linked project guide.
     */
    @PatchMapping("/{id}/resources/guides/{guideSlug}/pin")
    public ApiResponse<ProjectDtos.ProjectGuideResourceResponse> toggleGuidePinned(
            @PathVariable Long id,
            @PathVariable String guideSlug,
            @Valid @RequestBody ProjectDtos.TogglePinnedRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, projectService.toggleGuidePinned(id, guideSlug, body.pinned()));
    }
}
