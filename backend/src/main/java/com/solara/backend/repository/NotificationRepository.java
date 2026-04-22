package com.solara.backend.repository;

import com.solara.backend.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * this repo handles inbox reads and unread counts for the notifications feature.
 */
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findByRecipientUserIdOrderByCreatedAtDesc(String recipientUserId, Pageable pageable);

    Page<Notification> findByRecipientUserIdAndReadOrderByCreatedAtDesc(String recipientUserId, boolean read, Pageable pageable);

    long countByRecipientUserId(String recipientUserId);

    long countByRecipientUserIdAndReadFalse(String recipientUserId);
}
