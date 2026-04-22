package com.solara.backend.entity;

import com.solara.backend.entity.enums.ProjectStatus;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
import jakarta.persistence.UniqueConstraint;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Represents a project workspace and its core planning, funding, and impact fields.
 */
@Entity
@Table(
        name = "projects",
        indexes = {
                @Index(name = "idx_projects_slug", columnList = "slug"),
                @Index(name = "idx_projects_status", columnList = "status"),
                @Index(name = "idx_projects_location", columnList = "location"),
                @Index(name = "idx_projects_created_by", columnList = "created_by_user_id"),
                @Index(name = "idx_projects_status_updated", columnList = "status,updated_at")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_projects_slug", columnNames = "slug")
        }
)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 140)
    private String slug;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 240)
    private String shortDescription;

    @Column(nullable = false, length = 2000)
    private String fullDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ProjectStatus status;

    @Column(nullable = false, length = 120)
    private String location;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Integer goalVolunteers;

    @Column(nullable = false)
    private Integer currentVolunteers;

    @Column(precision = 12, scale = 2)
    private BigDecimal goalFunding;

    @Column(precision = 12, scale = 2)
    private BigDecimal currentFunding;

    @Column
    private Integer impactEstimateKwhPerYear;

    @Column(precision = 8, scale = 2)
    private BigDecimal impactEstimateTonsCo2PerYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdByUser;

    /**
     * Stores project tags in a separate collection table.
     */
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "project_tags", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tag", nullable = false, length = 40)
    private Set<String> tags = new LinkedHashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getGoalVolunteers() {
        return goalVolunteers;
    }

    public void setGoalVolunteers(Integer goalVolunteers) {
        this.goalVolunteers = goalVolunteers;
    }

    public Integer getCurrentVolunteers() {
        return currentVolunteers;
    }

    public void setCurrentVolunteers(Integer currentVolunteers) {
        this.currentVolunteers = currentVolunteers;
    }

    public BigDecimal getGoalFunding() {
        return goalFunding;
    }

    public void setGoalFunding(BigDecimal goalFunding) {
        this.goalFunding = goalFunding;
    }

    public BigDecimal getCurrentFunding() {
        return currentFunding;
    }

    public void setCurrentFunding(BigDecimal currentFunding) {
        this.currentFunding = currentFunding;
    }

    public Integer getImpactEstimateKwhPerYear() {
        return impactEstimateKwhPerYear;
    }

    public void setImpactEstimateKwhPerYear(Integer impactEstimateKwhPerYear) {
        this.impactEstimateKwhPerYear = impactEstimateKwhPerYear;
    }

    public BigDecimal getImpactEstimateTonsCo2PerYear() {
        return impactEstimateTonsCo2PerYear;
    }

    public void setImpactEstimateTonsCo2PerYear(BigDecimal impactEstimateTonsCo2PerYear) {
        this.impactEstimateTonsCo2PerYear = impactEstimateTonsCo2PerYear;
    }

    public User getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(User createdByUser) {
        this.createdByUser = createdByUser;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
