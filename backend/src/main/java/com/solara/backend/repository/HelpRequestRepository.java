package com.solara.backend.repository;

import com.solara.backend.entity.HelpRequest;
import com.solara.backend.entity.enums.HelpRequestStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Provides filtered help-request queries for workspace lists and dashboard summaries.
 */
public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long>, JpaSpecificationExecutor<HelpRequest> {

    long countByProjectIdAndStatus(Long projectId, HelpRequestStatus status);

    List<HelpRequest> findTop5ByProjectIdOrderByCreatedAtDesc(Long projectId);

    Optional<HelpRequest> findTopByProjectIdOrderByUpdatedAtDesc(Long projectId);
}
