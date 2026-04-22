package com.solara.backend.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.solara.backend.config.RequestAttributeKeys;
import jakarta.servlet.http.HttpServletRequest;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        T data,
        Object meta,
        String requestId
) {

    public static <T> ApiResponse<T> success(HttpServletRequest request, T data) {
        return new ApiResponse<>(true, data, null, requestId(request));
    }

    public static <T> ApiResponse<T> success(HttpServletRequest request, T data, Object meta) {
        return new ApiResponse<>(true, data, meta, requestId(request));
    }

    private static String requestId(HttpServletRequest request) {
        Object value = request.getAttribute(RequestAttributeKeys.REQUEST_ID);
        return value == null ? null : value.toString();
    }
}
