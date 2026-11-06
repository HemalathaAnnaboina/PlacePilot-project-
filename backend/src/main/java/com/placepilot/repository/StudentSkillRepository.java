package com.placepilot.repository;

import com.placepilot.entity.StudentProfile;
import com.placepilot.entity.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {
    List<StudentSkill> findByStudentProfile(StudentProfile profile);
    void deleteByStudentProfile(StudentProfile profile);
}

