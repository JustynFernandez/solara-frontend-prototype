package com.solara.backend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.solara.backend.repository.NotificationPreferenceRepository;
import com.solara.backend.repository.NotificationRepository;
import com.solara.backend.repository.ProjectRepository;
import com.solara.backend.seed.DemoDataSeeder;
import java.time.Instant;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class NotificationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DemoDataSeeder demoDataSeeder;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationPreferenceRepository notificationPreferenceRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        demoDataSeeder.resetAndSeed();
    }

    @Test
    void listNotificationsReturnsSeededNotificationsForCurrentUser() throws Exception {
        mockMvc.perform(get("/api/notifications")
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].type").value("GUIDE_SAVED_TO_PROJECT"));
    }

    @Test
    void updateReadStateMarksNotificationAsRead() throws Exception {
        Long notificationId = notificationRepository
                .findByRecipientUserIdOrderByCreatedAtDesc("user-demo-1", PageRequest.of(0, 1))
                .getContent()
                .get(0)
                .getId();

        mockMvc.perform(patch("/api/notifications/{id}/read", notificationId)
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("read", true))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.read").value(true));

        assertThat(notificationRepository.findById(notificationId).orElseThrow().isRead()).isTrue();
    }

    @Test
    void updatePreferencesPersistsNotificationPreferenceChoices() throws Exception {
        mockMvc.perform(put("/api/notification-preferences")
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "inAppEnabled", true,
                                "helpRequestsEnabled", true,
                                "projectResourcesEnabled", false,
                                "teamActivityEnabled", false
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.projectResourcesEnabled").value(false))
                .andExpect(jsonPath("$.data.teamActivityEnabled").value(false));

        var preference = notificationPreferenceRepository.findByUserId("user-demo-1");
        assertThat(preference).isPresent();
        assertThat(preference.get().isProjectResourcesEnabled()).isFalse();
        assertThat(preference.get().isTeamActivityEnabled()).isFalse();
    }

    @Test
    void creatingHelpRequestEmitsNotificationForCurrentUserInbox() throws Exception {
        Long projectId = projectRepository.findBySlug("brixton-solar-rooftops").orElseThrow().getId();

        mockMvc.perform(post("/api/help-requests")
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "whatNeeded", "Need a design review",
                                "whenNeeded", "This week",
                                "description", "Please check the workspace flow and confirm the data is being stored correctly.",
                                "contactMethod", "justyn@solara.dev",
                                "projectId", projectId,
                                "guideSlug", "workspace-playbook",
                                "context", "Optional notification demo"
                        ))))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/notifications")
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].type").value("HELP_REQUEST_CREATED"));
    }

    @Test
    void addingGuideResourceEmitsNotificationForCurrentUserInbox() throws Exception {
        Long projectId = projectRepository.findBySlug("camden-solar-coop").orElseThrow().getId();

        mockMvc.perform(post("/api/projects/{id}/resources/guides/{guideSlug}", projectId, "rooftop-safety-basics")
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/notifications")
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].type").value("GUIDE_SAVED_TO_PROJECT"));
    }

    @Test
    void dashboardReturnsProjectSummaryAndRecentActivity() throws Exception {
        Long projectId = projectRepository.findBySlug("brixton-solar-rooftops").orElseThrow().getId();

        String response = mockMvc.perform(get("/api/projects/{id}/dashboard", projectId)
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Brixton Solar Rooftops"))
                .andExpect(jsonPath("$.data.membershipCount").value(3))
                .andExpect(jsonPath("$.data.openHelpRequestCount").value(0))
                .andExpect(jsonPath("$.data.recentResources.length()").value(2))
                .andExpect(jsonPath("$.data.recentHelpRequests.length()").value(1))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode data = objectMapper.readTree(response).path("data");
        assertThat(data.path("volunteerProgressPercent").asInt()).isPositive();
        assertThat(data.path("fundingProgressPercent").asText()).isEqualTo("51.67");
    }

    @Test
    void dashboardUpdatedAtTracksLatestHelpRequestActivity() throws Exception {
        Long projectId = projectRepository.findBySlug("brixton-solar-rooftops").orElseThrow().getId();

        String initialResponse = mockMvc.perform(get("/api/projects/{id}/dashboard", projectId)
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Instant initialUpdatedAt = Instant.parse(objectMapper.readTree(initialResponse).path("data").path("updatedAt").asText());

        mockMvc.perform(post("/api/help-requests")
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "whatNeeded", "Need a permit check",
                                "whenNeeded", "This week",
                                "description", "We need someone to review the permit checklist before we contact the council.",
                                "contactMethod", "justyn@solara.dev",
                                "projectId", projectId,
                                "guideSlug", "navigator-warmup",
                                "context", "Permit review"
                        ))))
                .andExpect(status().isCreated());

        String updatedResponse = mockMvc.perform(get("/api/projects/{id}/dashboard", projectId)
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.openHelpRequestCount").value(1))
                .andExpect(jsonPath("$.data.recentHelpRequests[0].whatNeeded").value("Need a permit check"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Instant updatedAt = Instant.parse(objectMapper.readTree(updatedResponse).path("data").path("updatedAt").asText());
        assertThat(updatedAt).isAfter(initialUpdatedAt);
    }
}
