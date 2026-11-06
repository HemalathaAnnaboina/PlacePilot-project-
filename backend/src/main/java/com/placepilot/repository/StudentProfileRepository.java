package com.placepilot.repository;

import com.placepilot.entity.StudentProfile;
import com.placepilot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUser(User user);
    Optional<StudentProfile> findByUserId(Long userId);
    Optional<StudentProfile> findByRollNumber(String rollNumber);
    boolean existsByRollNumber(String rollNumber);
    List<StudentProfile> findByBranch(String branch);
    List<StudentProfile> findByGraduationYear(Integer graduationYear);

    @Query("SELECT s.branch, COUNT(s) FROM StudentProfile s GROUP BY s.branch")
    List<Object[]> countByBranch();

    @Query("SELECT AVG(s.cgpa) FROM StudentProfile s")
    Double getAverageCgpa();
}

