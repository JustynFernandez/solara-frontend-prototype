package com.solara.backend.dto.helprequest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.solara.backend.entity.enums.HelpRequestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class HelpRequestDtos {

    private HelpRequestDtos() {
    }

    public record CreateHelpRequestRequest(
            @NotBlank @Size(min = 3, max = 200) String whatNeeded,
            @NotBlank @Size(min = 2, max = 100) String whenNeeded,
            @NotBlank @Size(min = 10, max = 1000) String description,
            @NotBlank
            @Size(min = 5, max = 120)
            @Pattern(
                    regexp = "^(?=.{5,120}$)(.+@.+\\..+|\\+?[\\d\\s\\-()]{5,})$",
                    message = "contactMethod must be a valid email or phone number"
            )
            String contactMethod,
            String helperId,
            Long projectId,
            String guideSlug,
            @Size(max = 500) String context
    ) {
    }

    public record UpdateHelpRequestRequest(
            HelpRequestStatus status,
            String assignedHelperUserId
    ) {
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public record HelpRequestResponse(
            Long id,
            String requesterUserId,
            String requesterName,
            String assignedHelperUserId,
            String assignedHelperName,
            Long projectId,
            String projectName,
            String guideSlug,
            String guideTitle,
            String whatNeeded,
            String whenNeeded,
            String description,
            String contactMethod,
            String context,
            HelpRequestStatus status,
            Instant createdAt,
            Instant updatedAt
    ) {
    }
}
