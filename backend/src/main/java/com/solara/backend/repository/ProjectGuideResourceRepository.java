package com.solara.backend.repository;

import com.solara.backend.entity.ProjectGuideResource;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Accesses the guide links attached to each project workspace.
 */
public interface ProjectGuideResourceRepository extends JpaRepository<ProjectGuideResource, Long> {

    List<ProjectGuideResource> findByProjectIdOrderByPinnedDescAddedAtAsc(Long projectId);

    List<ProjectGuideResource> findTop5ByProjectIdOrderByAddedAtDesc(Long projectId);

    Optional<ProjectGuideResource> findTopByProjectIdOrderByAddedAtDesc(Long projectId);

    Optional<ProjectGuideResource> findByProjectIdAndGuideSlug(Long projectId, String guideSlug);

    boolean existsByProjectIdAndGuideId(Long projectId, Long guideId);

    long countByProjectId(Long projectId);
}
