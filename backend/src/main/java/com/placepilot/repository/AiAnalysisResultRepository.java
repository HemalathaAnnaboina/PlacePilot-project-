package com.placepilot.repository;

import com.placepilot.entity.AiAnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AiAnalysisResultRepository extends JpaRepository<AiAnalysisResult, Long> {
    List<AiAnalysisResult> findByStudentProfileIdOrderByCreatedAtDesc(Long studentProfileId);
    Optional<AiAnalysisResult> findTopByStudentProfileIdAndAnalysisTypeOrderByCreatedAtDesc(Long studentProfileId, String analysisType);
    Optional<AiAnalysisResult> findTopByStudentProfileIdAndPlacementDriveIdAndAnalysisTypeOrderByCreatedAtDesc(Long studentProfileId, Long placementDriveId, String analysisType);
    Optional<AiAnalysisResult> findTopByAnalysisTypeOrderByCreatedAtDesc(String analysisType);
}

