package com.solara.backend.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        boolean success,
        ErrorBody error,
        String requestId,
        Instant timestamp
) {

    public record ErrorBody(
            String code,
            String message,
            List<FieldValidationError> fieldErrors
    ) {
    }

    public record FieldValidationError(
            String field,
            String message
    ) {
    }
}
