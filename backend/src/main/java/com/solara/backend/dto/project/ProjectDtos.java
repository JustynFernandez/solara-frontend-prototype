package com.solara.backend.dto.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.solara.backend.entity.enums.ProjectStatus;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public final class ProjectDtos {

    private ProjectDtos() {
    }

    public record CreateProjectRequest(
            @NotBlank @Size(min = 3, max = 120) String name,
            @NotBlank @Size(min = 10, max = 240) String shortDescription,
            @NotBlank @Size(min = 20, max = 2000) String fullDescription,
            @NotNull ProjectStatus status,
            @NotBlank @Size(min = 2, max = 120) String location,
            @NotNull @DecimalMin("-90.0") @DecimalMax("90.0") Double latitude,
            @NotNull @DecimalMin("-180.0") @DecimalMax("180.0") Double longitude,
            @PositiveOrZero Integer goalVolunteers,
            @PositiveOrZero Integer currentVolunteers,
            @PositiveOrZero BigDecimal goalFunding,
            @PositiveOrZero BigDecimal currentFunding,
            @PositiveOrZero Integer impactEstimateKwhPerYear,
            @PositiveOrZero BigDecimal impactEstimateTonsCo2PerYear,
            @Size(max = 10) List<@NotBlank @Size(max = 40) String> tags
    ) {
    }

    public record UpdateProjectRequest(
            @Size(min = 3, max = 120) String name,
            @Size(min = 10, max = 240) String shortDescription,
            @Size(min = 20, max = 2000) String fullDescription,
            ProjectStatus status,
            @Size(min = 2, max = 120) String location,
            @DecimalMin("-90.0") @DecimalMax("90.0") Double latitude,
            @DecimalMin("-180.0") @DecimalMax("180.0") Double longitude,
            @PositiveOrZero Integer goalVolunteers,
            @PositiveOrZero Integer currentVolunteers,
            @PositiveOrZero BigDecimal goalFunding,
            @PositiveOrZero BigDecimal currentFunding,
            @PositiveOrZero Integer impactEstimateKwhPerYear,
            @PositiveOrZero BigDecimal impactEstimateTonsCo2PerYear,
            @Size(max = 10) List<@NotBlank @Size(max = 40) String> tags
    ) {
    }

    public record TogglePinnedRequest(
            boolean pinned
    ) {
    }

    public record ProjectSummaryResponse(
            Long id,
            String slug,
            String name,
            String shortDescription,
            ProjectStatus status,
            String location,
            Double latitude,
            Double longitude,
            Integer goalVolunteers,
            Integer currentVolunteers,
            BigDecimal goalFunding,
            BigDecimal currentFunding,
            Integer membershipCount,
            Integer linkedGuideCount,
            Integer openHelpRequestCount,
            List<String> tags,
            String createdByUserId,
            String createdByName,
            Instant createdAt,
            Instant updatedAt
    ) {
    }

    public record ProjectOwnerSummary(
            String userId,
            String name,
            String role
    ) {
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record ProjectGuideResourceResponse(
            Long id,
            Long guideId,
            String guideSlug,
            String guideTitle,
            boolean pinned,
            String addedByUserId,
            String addedByName,
            Instant addedAt
    ) {
    }

    public record ProjectDashboardHelpRequestItem(
            Long id,
            String requesterName,
            String whatNeeded,
            String status,
            Instant createdAt
    ) {
    }

    public record ProjectDashboardResponse(
            Long id,
            String slug,
            String name,
            ProjectStatus status,
            Integer membershipCount,
            Integer linkedGuideCount,
            Integer openHelpRequestCount,
            Integer volunteerProgressPercent,
            BigDecimal fundingProgressPercent,
            List<ProjectOwnerSummary> owners,
            List<ProjectGuideResourceResponse> recentResources,
            List<ProjectDashboardHelpRequestItem> recentHelpRequests,
            Instant updatedAt
    ) {
    }

    public record ProjectDetailResponse(
            Long id,
            String slug,
            String name,
            String shortDescription,
            String fullDescription,
            ProjectStatus status,
            String location,
            Double latitude,
            Double longitude,
            Integer goalVolunteers,
            Integer currentVolunteers,
            BigDecimal goalFunding,
            BigDecimal currentFunding,
            Integer impactEstimateKwhPerYear,
            BigDecimal impactEstimateTonsCo2PerYear,
            List<String> tags,
            Integer membershipCount,
            Integer linkedGuideCount,
            Integer openHelpRequestCount,
            String createdByUserId,
            String createdByName,
            List<ProjectOwnerSummary> owners,
            List<ProjectGuideResourceResponse> resources,
            Instant createdAt,
            Instant updatedAt
    ) {
    }
}
