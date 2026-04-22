package com.solara.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.solara.backend.entity.enums.ProjectMembershipRole;
import com.solara.backend.repository.ProjectMembershipRepository;
import com.solara.backend.repository.ProjectRepository;
import com.solara.backend.seed.DemoDataSeeder;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProjectControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DemoDataSeeder demoDataSeeder;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMembershipRepository projectMembershipRepository;

    @BeforeEach
    void setUp() {
        demoDataSeeder.resetAndSeed();
    }

    @Test
    void createProjectCreatesOwnerMembership() throws Exception {
        String body = objectMapper.writeValueAsString(Map.ofEntries(
                Map.entry("name", "Greenwich Garden Canopy"),
                Map.entry("shortDescription", "Solar pergola for an urban garden with battery lighting."),
                Map.entry("fullDescription", "Build a lightweight solar pergola with battery-backed lighting for evening programming and gardening workshops in Greenwich."),
                Map.entry("status", "PLANNING"),
                Map.entry("location", "Greenwich, London"),
                Map.entry("latitude", 51.4826),
                Map.entry("longitude", 0.0077),
                Map.entry("goalVolunteers", 20),
                Map.entry("currentVolunteers", 9),
                Map.entry("goalFunding", 15000.00),
                Map.entry("currentFunding", 4200.00),
                Map.entry("impactEstimateKwhPerYear", 12000),
                Map.entry("impactEstimateTonsCo2PerYear", 3.20),
                Map.entry("tags", new String[]{"Canopy", "Battery", "Garden"})
        ));

        String response = mockMvc.perform(post("/api/projects")
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Greenwich Garden Canopy"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long projectId = objectMapper.readTree(response).path("data").path("id").asLong();
        var membership = projectMembershipRepository.findByProjectIdAndUserId(projectId, "user-demo-1");
        assertThat(membership).isPresent();
        assertThat(membership.get().getRole()).isEqualTo(ProjectMembershipRole.OWNER);
    }

    @Test
    void listProjectsSupportsStatusAndSearchFiltering() throws Exception {
        mockMvc.perform(get("/api/projects")
                        .header("X-User-Id", "user-demo-1")
                        .param("status", "IN_PROGRESS")
                        .param("search", "Camden"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].slug").value("camden-solar-coop"));
    }

    @Test
    void attachGuideAndTogglePin() throws Exception {
        Long projectId = projectRepository.findBySlug("camden-solar-coop").orElseThrow().getId();

        mockMvc.perform(post("/api/projects/{id}/resources/guides/{guideSlug}", projectId, "rooftop-safety-basics")
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.guideSlug").value("rooftop-safety-basics"))
                .andExpect(jsonPath("$.data.pinned").value(false));

        mockMvc.perform(patch("/api/projects/{id}/resources/guides/{guideSlug}/pin", projectId, "rooftop-safety-basics")
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("pinned", true))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.pinned").value(true));
    }

    @Test
    void updateProjectRequiresProjectManager() throws Exception {
        Long projectId = projectRepository.findBySlug("brixton-solar-rooftops").orElseThrow().getId();

        mockMvc.perform(patch("/api/projects/{id}", projectId)
                        .header("X-User-Id", "user-demo-4")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "COMPLETED"))))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error.code").value("FORBIDDEN"));
    }
}
