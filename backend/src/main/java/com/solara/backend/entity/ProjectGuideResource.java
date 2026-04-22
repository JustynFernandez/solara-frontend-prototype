package com.solara.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;

/**
 * Join entity linking a project workspace to a saved guide resource.
 */
@Entity
@Table(
        name = "project_guide_resources",
        indexes = {
                @Index(name = "idx_project_guide_resources_project", columnList = "project_id"),
                @Index(name = "idx_project_guide_resources_guide", columnList = "guide_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_project_guide_resources_project_guide", columnNames = {"project_id", "guide_id"})
        }
)
public class ProjectGuideResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "guide_id", nullable = false)
    private Guide guide;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "added_by_user_id", nullable = false)
    private User addedByUser;

    /**
     * Indicates whether the linked guide is pinned in the workspace.
     */
    @Column(nullable = false)
    private boolean pinned;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant addedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getAddedByUser() {
        return addedByUser;
    }

    public void setAddedByUser(User addedByUser) {
        this.addedByUser = addedByUser;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    public Instant getAddedAt() {
        return addedAt;
    }
}
