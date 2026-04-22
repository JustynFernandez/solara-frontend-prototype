package com.solara.backend.service;

import com.solara.backend.config.RequestAttributeKeys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class RequestContextService {

    public String getCurrentUserId() {
        return currentRequest().getAttribute(RequestAttributeKeys.CURRENT_USER_ID).toString();
    }

    public String getRequestId() {
        Object value = currentRequest().getAttribute(RequestAttributeKeys.REQUEST_ID);
        return value == null ? null : value.toString();
    }

    private HttpServletRequest currentRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null) {
            throw new IllegalStateException("No active HTTP request context");
        }
        return attributes.getRequest();
    }
}
