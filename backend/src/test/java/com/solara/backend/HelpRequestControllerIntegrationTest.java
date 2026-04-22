package com.solara.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.solara.backend.repository.HelpRequestRepository;
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
class HelpRequestControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DemoDataSeeder demoDataSeeder;

    @Autowired
    private HelpRequestRepository helpRequestRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @BeforeEach
    void setUp() {
        demoDataSeeder.resetAndSeed();
    }

    @Test
    void createHelpRequestMatchesFrontendContract() throws Exception {
        Long projectId = projectRepository.findBySlug("brixton-solar-rooftops").orElseThrow().getId();
        String body = objectMapper.writeValueAsString(Map.of(
                "whatNeeded", "Need a permit check",
                "whenNeeded", "This week",
                "description", "We need someone to review the permit checklist before we contact the council.",
                "contactMethod", "justyn@solara.dev",
                "projectId", projectId,
                "guideSlug", "navigator-warmup",
                "context", "Permit review"
        ));

        mockMvc.perform(post("/api/help-requests")
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.requesterUserId").value("user-demo-1"))
                .andExpect(jsonPath("$.data.status").value("OPEN"))
                .andExpect(jsonPath("$.data.projectId").value(projectId));

        assertThat(helpRequestRepository.count()).isGreaterThanOrEqualTo(3);
    }

    @Test
    void listHelpRequestsDefaultsToCurrentUser() throws Exception {
        mockMvc.perform(get("/api/help-requests")
                        .header("X-User-Id", "user-demo-1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].requesterUserId").value("user-demo-1"));
    }

    @Test
    void projectManagerCanListProjectHelpRequests() throws Exception {
        Long projectId = projectRepository.findBySlug("brixton-solar-rooftops").orElseThrow().getId();

        mockMvc.perform(get("/api/help-requests")
                        .header("X-User-Id", "user-demo-2")
                        .param("projectId", String.valueOf(projectId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].projectId").value(projectId));
    }

    @Test
    void updateHelpRequestCanAssignHelperAndClose() throws Exception {
        Long helpRequestId = helpRequestRepository.findAll().stream()
                .filter(item -> item.getStatus().name().equals("OPEN"))
                .findFirst()
                .orElseThrow()
                .getId();

        mockMvc.perform(patch("/api/help-requests/{id}", helpRequestId)
                        .header("X-User-Id", "user-demo-3")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "assignedHelperUserId", "user-demo-3",
                                "status", "MATCHED"
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.assignedHelperUserId").value("user-demo-3"))
                .andExpect(jsonPath("$.data.status").value("MATCHED"));
    }

    @Test
    void requesterCannotEscalateStatusToMatched() throws Exception {
        Long helpRequestId = helpRequestRepository.findAll().stream()
                .filter(item -> item.getStatus().name().equals("OPEN"))
                .findFirst()
                .orElseThrow()
                .getId();

        mockMvc.perform(patch("/api/help-requests/{id}", helpRequestId)
                        .header("X-User-Id", "user-demo-1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "MATCHED"))))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error.code").value("FORBIDDEN"));
    }
}
