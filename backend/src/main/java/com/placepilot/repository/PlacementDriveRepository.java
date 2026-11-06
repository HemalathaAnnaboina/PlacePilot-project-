package com.placepilot.repository;

import com.placepilot.entity.Company;
import com.placepilot.entity.PlacementDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {
    List<PlacementDrive> findByStatus(String status);
    List<PlacementDrive> findByCompany(Company company);
    List<PlacementDrive> findByCompanyId(Long companyId);
    List<PlacementDrive> findAllByOrderByCreatedAtDesc();

    @Query("SELECT AVG(p.packageLpa) FROM PlacementDrive p WHERE p.status = 'ACTIVE' OR p.status = 'CLOSED'")
    Double getAveragePackage();

    @Query("SELECT MAX(p.packageLpa) FROM PlacementDrive p")
    Double getHighestPackage();
}

