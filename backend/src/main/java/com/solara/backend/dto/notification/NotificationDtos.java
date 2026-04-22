package com.solara.backend.dto.notification;

import com.solara.backend.entity.enums.NotificationType;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;

public final class NotificationDtos {

    private NotificationDtos() {
    }

    public record UpdateNotificationReadRequest(
            boolean read
    ) {
    }

    public record UpdateNotificationPreferencesRequest(
            @NotNull Boolean inAppEnabled,
            @NotNull Boolean helpRequestsEnabled,
            @NotNull Boolean projectResourcesEnabled,
            @NotNull Boolean teamActivityEnabled
    ) {
    }

    public record NotificationResponse(
            Long id,
            NotificationType type,
            String title,
            String message,
            String actionUrl,
            boolean read,
            Instant readAt,
            Instant createdAt,
            String recipientUserId,
            String actorUserId,
            String actorName,
            Long projectId,
            String projectName,
            Long helpRequestId
    ) {
    }

    public record NotificationPreferenceResponse(
            String userId,
            boolean inAppEnabled,
            boolean helpRequestsEnabled,
            boolean projectResourcesEnabled,
            boolean teamActivityEnabled,
            Instant updatedAt
    ) {
    }
}
