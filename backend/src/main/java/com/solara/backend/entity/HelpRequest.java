package com.solara.backend.entity;

import com.solara.backend.entity.enums.HelpRequestStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Represents a support request raised by a user against an optional project or guide.
 */
@Entity
@Table(
        name = "help_requests",
        indexes = {
                @Index(name = "idx_help_requests_requester_status", columnList = "requester_user_id,status"),
                @Index(name = "idx_help_requests_project_status", columnList = "project_id,status"),
                @Index(name = "idx_help_requests_assigned_helper_status", columnList = "assigned_helper_user_id,status")
        }
)
public class HelpRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requester_user_id", nullable = false)
    private User requesterUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_helper_user_id")
    private User assignedHelperUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    /**
     * Optional guide reference for requests created from a specific learning resource.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guide_id")
    private Guide guide;

    @Column(nullable = false, length = 200)
    private String whatNeeded;

    @Column(nullable = false, length = 100)
    private String whenNeeded;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false, length = 120)
    private String contactMethod;

    @Column(length = 500)
    private String context;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24)
    private HelpRequestStatus status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getRequesterUser() {
        return requesterUser;
    }

    public void setRequesterUser(User requesterUser) {
        this.requesterUser = requesterUser;
    }

    public User getAssignedHelperUser() {
        return assignedHelperUser;
    }

    public void setAssignedHelperUser(User assignedHelperUser) {
        this.assignedHelperUser = assignedHelperUser;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Guide getGuide() {
        return guide;
    }

    public void setGuide(Guide guide) {
        this.guide = guide;
    }

    public String getWhatNeeded() {
        return whatNeeded;
    }

    public void setWhatNeeded(String whatNeeded) {
        this.whatNeeded = whatNeeded;
    }

    public String getWhenNeeded() {
        return whenNeeded;
    }

    public void setWhenNeeded(String whenNeeded) {
        this.whenNeeded = whenNeeded;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(String contactMethod) {
        this.contactMethod = contactMethod;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public HelpRequestStatus getStatus() {
        return status;
    }

    public void setStatus(HelpRequestStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
