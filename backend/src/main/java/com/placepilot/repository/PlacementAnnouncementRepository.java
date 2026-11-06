package com.placepilot.repository;

import com.placepilot.entity.PlacementAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementAnnouncementRepository extends JpaRepository<PlacementAnnouncement, Long> {
    List<PlacementAnnouncement> findAllByOrderByPinnedDescCreatedAtDesc();
    List<PlacementAnnouncement> findByTargetAudienceInOrderByPinnedDescCreatedAtDesc(List<String> audiences);
}

