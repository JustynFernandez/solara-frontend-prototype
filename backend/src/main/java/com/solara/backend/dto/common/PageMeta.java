package com.solara.backend.dto.common;

public record PageMeta(
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
