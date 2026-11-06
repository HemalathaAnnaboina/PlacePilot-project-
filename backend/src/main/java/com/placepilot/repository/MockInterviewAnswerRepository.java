package com.placepilot.repository;

import com.placepilot.entity.MockInterviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MockInterviewAnswerRepository extends JpaRepository<MockInterviewAnswer, Long> {
    List<MockInterviewAnswer> findBySessionIdOrderByQuestionNumberAsc(Long sessionId);
}

