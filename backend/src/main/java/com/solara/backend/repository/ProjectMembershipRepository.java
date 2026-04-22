package com.solara.backend.repository;

import com.solara.backend.entity.ProjectMembership;
import com.solara.backend.entity.enums.ProjectMembershipRole;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembership, Long> {

    Optional<ProjectMembership> findByProjectIdAndUserId(Long projectId, String userId);

    List<ProjectMembership> findByProjectId(Long projectId);

    boolean existsByProjectIdAndUserId(Long projectId, String userId);

    boolean existsByProjectIdAndUserIdAndRoleIn(Long projectId, String userId, Collection<ProjectMembershipRole> roles);

    long countByProjectId(Long projectId);

    List<ProjectMembership> findByProjectIdAndRoleInOrderByJoinedAtAsc(Long projectId, Collection<ProjectMembershipRole> roles);

    Optional<ProjectMembership> findTopByProjectIdOrderByJoinedAtDesc(Long projectId);
}
