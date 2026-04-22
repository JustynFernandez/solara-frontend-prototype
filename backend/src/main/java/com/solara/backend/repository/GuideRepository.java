package com.solara.backend.repository;

import com.solara.backend.entity.Guide;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuideRepository extends JpaRepository<Guide, Long> {

    Optional<Guide> findBySlug(String slug);
}
