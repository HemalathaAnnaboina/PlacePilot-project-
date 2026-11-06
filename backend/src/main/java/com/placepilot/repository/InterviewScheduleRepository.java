package com.placepilot.repository;

import com.placepilot.entity.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Long> {
    List<InterviewSchedule> findByApplicationIdOrderByScheduledTimeAsc(Long applicationId);
    List<InterviewSchedule> findByApplicationPlacementDriveCompanyIdOrderByScheduledTimeAsc(Long companyId);
}

