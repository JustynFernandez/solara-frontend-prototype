package com.solara.backend.repository;

import com.solara.backend.entity.NotificationPreference;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * this repo is just for reading and saving each user's notification settings row.
 */
public interface NotificationPreferenceRepository extends JpaRepository<NotificationPreference, Long> {

    Optional<NotificationPreference> findByUserId(String userId);
}
