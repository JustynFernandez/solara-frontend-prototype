package com.solara.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Reads request-scoped identifiers used during local development and demos.
 */
@Component
public class SolaraRequestContextFilter extends OncePerRequestFilter {

    private final String defaultUserId;

    public SolaraRequestContextFilter(@Value("${solara.dev.default-user-id:user-demo-1}") String defaultUserId) {
        this.defaultUserId = defaultUserId;
    }

    /**
     * Attaches the current user id and request id before the request reaches the controller layer.
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String requestId = Optional.ofNullable(request.getHeader("X-Request-Id"))
                .filter(value -> !value.isBlank())
                .orElse(UUID.randomUUID().toString());
        String currentUserId = Optional.ofNullable(request.getHeader("X-User-Id"))
                .filter(value -> !value.isBlank())
                .orElse(defaultUserId);

        request.setAttribute(RequestAttributeKeys.REQUEST_ID, requestId);
        request.setAttribute(RequestAttributeKeys.CURRENT_USER_ID, currentUserId);
        response.setHeader("X-Request-Id", requestId);

        filterChain.doFilter(request, response);
    }
}
