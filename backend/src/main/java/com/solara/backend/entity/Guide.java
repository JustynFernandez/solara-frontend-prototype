package com.solara.backend.entity;

import com.solara.backend.entity.enums.GuideDifficulty;
import com.solara.backend.entity.enums.GuideFormat;
import com.solara.backend.entity.enums.GuidePillar;
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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(
        name = "guides",
        indexes = {
                @Index(name = "idx_guides_slug", columnList = "slug"),
                @Index(name = "idx_guides_pillar", columnList = "pillar"),
                @Index(name = "idx_guides_difficulty", columnList = "difficulty")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_guides_slug", columnNames = "slug")
        }
)
public class Guide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String slug;

    @Column(nullable = false, length = 180)
    private String title;

    @Column(nullable = false, length = 500)
    private String summary;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private GuidePillar pillar;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private GuideDifficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private GuideFormat format;

    @Column(nullable = false)
    private Integer durationMins;

    @Column
    private LocalDate publishedOn;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "guide_tags", joinColumns = @JoinColumn(name = "guide_id"))
    @Column(name = "tag", nullable = false, length = 40)
    private Set<String> tags = new LinkedHashSet<>();

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public GuidePillar getPillar() {
        return pillar;
    }

    public void setPillar(GuidePillar pillar) {
        this.pillar = pillar;
    }

    public GuideDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(GuideDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public GuideFormat getFormat() {
        return format;
    }

    public void setFormat(GuideFormat format) {
        this.format = format;
    }

    public Integer getDurationMins() {
        return durationMins;
    }

    public void setDurationMins(Integer durationMins) {
        this.durationMins = durationMins;
    }

    public LocalDate getPublishedOn() {
        return publishedOn;
    }

    public void setPublishedOn(LocalDate publishedOn) {
        this.publishedOn = publishedOn;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
}
