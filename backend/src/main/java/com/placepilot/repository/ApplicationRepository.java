package com.placepilot.repository;

import com.placepilot.entity.Application;
import com.placepilot.entity.ApplicationStatus;
import com.placepilot.entity.PlacementDrive;
import com.placepilot.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentProfile(StudentProfile studentProfile);
    List<Application> findByStudentProfileIdOrderByAppliedAtDesc(Long studentProfileId);
    List<Application> findByPlacementDrive(PlacementDrive placementDrive);
    List<Application> findByPlacementDriveIdOrderByAppliedAtDesc(Long placementDriveId);
    Optional<Application> findByStudentProfileAndPlacementDrive(StudentProfile studentProfile, PlacementDrive placementDrive);
    boolean existsByStudentProfileAndPlacementDrive(StudentProfile studentProfile, PlacementDrive placementDrive);
    long countByStatus(ApplicationStatus status);

    @Query("SELECT a.status, COUNT(a) FROM Application a GROUP BY a.status")
    List<Object[]> countByStatusGroup();

    @Query("SELECT COUNT(DISTINCT a.studentProfile) FROM Application a WHERE a.status = com.placepilot.entity.ApplicationStatus.SELECTED")
    long countPlacedStudents();

    @Query("SELECT COUNT(a) FROM Application a WHERE a.placementDrive.company.id = :companyId")
    long countByCompanyId(Long companyId);
}

