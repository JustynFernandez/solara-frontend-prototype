package com.solara.backend.service;

import com.solara.backend.entity.HelpRequest;
import com.solara.backend.entity.Project;
import com.solara.backend.entity.User;
import com.solara.backend.entity.enums.ProjectMembershipRole;
import com.solara.backend.entity.enums.UserRole;
import com.solara.backend.exception.ApiException;
import com.solara.backend.repository.ProjectMembershipRepository;
import com.solara.backend.repository.UserRepository;
import java.util.EnumSet;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    private final ProjectMembershipRepository projectMembershipRepository;
    private final UserRepository userRepository;

    public PermissionService(
            ProjectMembershipRepository projectMembershipRepository,
            UserRepository userRepository
    ) {
        this.projectMembershipRepository = projectMembershipRepository;
        this.userRepository = userRepository;
    }

    public User requireCurrentUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "INVALID_CURRENT_USER", "A valid X-User-Id is required"));
    }

    public void requireProjectManager(Long projectId, String userId) {
        User currentUser = requireCurrentUser(userId);
        if (currentUser.getRole() == UserRole.ADMIN) {
            return;
        }
        boolean allowed = projectMembershipRepository.existsByProjectIdAndUserIdAndRoleIn(
                projectId,
                userId,
                EnumSet.of(ProjectMembershipRole.OWNER, ProjectMembershipRole.ADMIN)
        );
        if (!allowed) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "Project manager access is required");
        }
    }

    public void requireProjectMember(Long projectId, String userId) {
        User currentUser = requireCurrentUser(userId);
        if (currentUser.getRole() == UserRole.ADMIN) {
            return;
        }
        boolean isMember = projectMembershipRepository.existsByProjectIdAndUserId(projectId, userId);
        if (!isMember) {
            throw new ApiException(HttpStatus.FORBIDDEN, "FORBIDDEN", "Project membership is required");
        }
    }

    public boolean canViewHelpRequest(HelpRequest helpRequest, String userId) {
        User currentUser = requireCurrentUser(userId);
        if (currentUser.getRole() == UserRole.ADMIN) {
            return true;
        }
        if (helpRequest.getRequesterUser().getId().equals(userId)) {
            return true;
        }
        if (helpRequest.getAssignedHelperUser() != null && helpRequest.getAssignedHelperUser().getId().equals(userId)) {
            return true;
        }
        Project project = helpRequest.getProject();
        return project != null && projectMembershipRepository.existsByProjectIdAndUserIdAndRoleIn(
                project.getId(),
                userId,
                EnumSet.of(ProjectMembershipRole.OWNER, ProjectMembershipRole.ADMIN)
        );
    }

    public boolean canUpdateHelpRequest(HelpRequest helpRequest, String userId) {
        return canViewHelpRequest(helpRequest, userId);
    }
}
