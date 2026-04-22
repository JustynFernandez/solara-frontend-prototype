package com.solara.backend.exception;

import com.solara.backend.config.RequestAttributeKeys;
import com.solara.backend.dto.common.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException exception, HttpServletRequest request) {
        return ResponseEntity.status(exception.getStatus()).body(error(
                request,
                exception.getCode(),
                exception.getMessage(),
                null
        ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {
        List<ErrorResponse.FieldValidationError> fieldErrors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(this::mapFieldError)
                .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(error(
                request,
                "VALIDATION_ERROR",
                "Request validation failed",
                fieldErrors
        ));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(
            ConstraintViolationException exception,
            HttpServletRequest request
    ) {
        List<ErrorResponse.FieldValidationError> fieldErrors = exception.getConstraintViolations()
                .stream()
                .map(violation -> new ErrorResponse.FieldValidationError(
                        violation.getPropertyPath().toString(),
                        violation.getMessage()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(error(
                request,
                "VALIDATION_ERROR",
                "Request validation failed",
                fieldErrors
        ));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleUnreadableMessage(
            HttpMessageNotReadableException exception,
            HttpServletRequest request
    ) {
        return ResponseEntity.badRequest().body(error(
                request,
                "BAD_REQUEST",
                "Malformed JSON request body",
                null
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnhandledException(Exception exception, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error(
                request,
                "INTERNAL_SERVER_ERROR",
                "An unexpected error occurred",
                null
        ));
    }

    private ErrorResponse error(
            HttpServletRequest request,
            String code,
            String message,
            List<ErrorResponse.FieldValidationError> fieldErrors
    ) {
        Object requestId = request.getAttribute(RequestAttributeKeys.REQUEST_ID);
        return new ErrorResponse(
                false,
                new ErrorResponse.ErrorBody(code, message, fieldErrors),
                requestId == null ? null : requestId.toString(),
                Instant.now()
        );
    }

    private ErrorResponse.FieldValidationError mapFieldError(FieldError fieldError) {
        return new ErrorResponse.FieldValidationError(fieldError.getField(), fieldError.getDefaultMessage());
    }
}
