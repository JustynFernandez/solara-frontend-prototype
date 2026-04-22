package com.solara.backend.controller;

import com.solara.backend.dto.common.ApiResponse;
import com.solara.backend.dto.common.PageMeta;
import com.solara.backend.dto.helprequest.HelpRequestDtos;
import com.solara.backend.entity.enums.HelpRequestStatus;
import com.solara.backend.service.HelpRequestService;
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
 * Exposes help-request creation, lookup, listing, and update endpoints.
 */
@Validated
@RestController
@RequestMapping("/api/help-requests")
public class HelpRequestController {

    private final HelpRequestService helpRequestService;

    public HelpRequestController(HelpRequestService helpRequestService) {
        this.helpRequestService = helpRequestService;
    }

    /**
     * Creates a help request linked to the current user and optional project or guide.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<HelpRequestDtos.HelpRequestResponse> createHelpRequest(
            @Valid @RequestBody HelpRequestDtos.CreateHelpRequestRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, helpRequestService.createHelpRequest(body));
    }

    /**
     * Lists help requests, defaulting to the current user when no filter is supplied.
     */
    @GetMapping
    public ApiResponse<?> listHelpRequests(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) String helperId,
            @RequestParam(required = false) HelpRequestStatus status,
            @RequestParam(defaultValue = "1") @Min(1) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,
            HttpServletRequest request
    ) {
        Page<HelpRequestDtos.HelpRequestResponse> helpRequestPage = helpRequestService.listHelpRequests(
                userId,
                projectId,
                helperId,
                status,
                page,
                size
        );
        return ApiResponse.success(
                request,
                helpRequestPage.getContent(),
                new PageMeta(page, size, helpRequestPage.getTotalElements(), helpRequestPage.getTotalPages())
        );
    }

    /**
     * Returns a single help request if the caller has access to it.
     */
    @GetMapping("/{id}")
    public ApiResponse<HelpRequestDtos.HelpRequestResponse> getHelpRequest(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, helpRequestService.getHelpRequest(id));
    }

    /**
     * Updates help-request status or helper assignment.
     */
    @PatchMapping("/{id}")
    public ApiResponse<HelpRequestDtos.HelpRequestResponse> updateHelpRequest(
            @PathVariable Long id,
            @Valid @RequestBody HelpRequestDtos.UpdateHelpRequestRequest body,
            HttpServletRequest request
    ) {
        return ApiResponse.success(request, helpRequestService.updateHelpRequest(id, body));
    }
}
