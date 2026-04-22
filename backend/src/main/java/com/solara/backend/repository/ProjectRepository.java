package com.solara.backend.repository;

import com.solara.backend.entity.Project;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Primary repository for project persistence and filtered catalogue queries.
 */
public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {

    Optional<Project> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
