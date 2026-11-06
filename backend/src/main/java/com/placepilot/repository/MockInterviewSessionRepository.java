package com.placepilot.repository;

import com.placepilot.entity.MockInterviewSession;
import com.placepilot.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MockInterviewSessionRepository extends JpaRepository<MockInterviewSession, Long> {
    List<MockInterviewSession> findByStudentProfileOrderByCreatedAtDesc(StudentProfile studentProfile);
    List<MockInterviewSession> findByStudentProfileIdOrderByCreatedAtDesc(Long studentProfileId);
}

