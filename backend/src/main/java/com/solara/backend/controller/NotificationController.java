package com.solara.backend.controller;

import com.solara.backend.dto.common.ApiResponse;
import com.solara.backend.dto.common.PageMeta;
import com.solara.backend.dto.notification.NotificationDtos;
import com.solara.backend.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Exposes the notification inbox and notification-preference endpoints.
 */
@RestController
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    /**
     * Lists the current user's notifications with an optional read-state filter.
     */
    @GetMapping("/api/notifications")
    public ApiResponse<?> listNotifications(
            @RequestParam(required = false) Boolean read,
            @RequestParam(defaultValue = "1") @Min(1) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,
            HttpServletRequest request
    ) {
        Page<NotificationDtos.NotificationResponse> notificationPage = notificationService.listNotifications(read, page, size);
        return ApiResponse.success(
                request,
                notificationPage.getContent(),
                new PageMeta(page, size, notificationPage.getTotalElements(), notificationPage.getTotalPages())
        );
    }

    /**
     * Marks one notification as read or unread.
     */
    @PatchMapping("/api/notifications/{id}/read")
    public ApiResponse<NotificationDtos.NotificationResponse> updateReadState(
            @PathVariable Long id,
            @Valid @RequestBody NotificationDtos.UpdateNotificationReadRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, notificationService.updateReadState(id, body.read()));
    }

    /**
     * Returns the saved notification settings for the current user.
     */
    @GetMapping("/api/notification-preferences")
    public ApiResponse<NotificationDtos.NotificationPreferenceResponse> getPreferences(HttpServletRequest request) {
        return ApiResponse.success(request, notificationService.getPreferences());
    }

    /**
     * Persists the current user's notification-preference changes.
     */
    @PutMapping("/api/notification-preferences")
    public ApiResponse<NotificationDtos.NotificationPreferenceResponse> updatePreferences(
            @Valid @RequestBody NotificationDtos.UpdateNotificationPreferencesRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, notificationService.updatePreferences(body));
    }
}
