package com.placepilot.service;

import com.placepilot.dto.CompanyDto;
import com.placepilot.dto.PlacementDriveDto;
import com.placepilot.entity.Company;
import com.placepilot.entity.RecruiterProfile;
import com.placepilot.exception.ResourceNotFoundException;
import com.placepilot.repository.CompanyRepository;
import com.placepilot.repository.RecruiterProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecruiterService {

    private final RecruiterProfileRepository recruiterProfileRepository;
    private final CompanyRepository companyRepository;
    private final PlacementDriveService placementDriveService;

    public RecruiterService(RecruiterProfileRepository recruiterProfileRepository,
                            CompanyRepository companyRepository,
                            PlacementDriveService placementDriveService) {
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.companyRepository = companyRepository;
        this.placementDriveService = placementDriveService;
    }

    public Map<String, Object> getRecruiterProfile(Long userId) {
        RecruiterProfile profile = recruiterProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found for user ID: " + userId));

        Map<String, Object> res = new HashMap<>();
        res.put("id", profile.getId());
        res.put("userId", profile.getUser().getId());
        res.put("fullName", profile.getUser().getFullName());
        res.put("email", profile.getUser().getEmail());
        res.put("designation", profile.getDesignation());
        res.put("workEmail", profile.getWorkEmail());
        res.put("phone", profile.getPhone());
        res.put("approved", profile.isApproved());
        if (profile.getCompany() != null) {
            res.put("company", toCompanyDto(profile.getCompany()));
        }
        return res;
    }

    @Transactional
    public CompanyDto updateCompany(Long companyId, CompanyDto dto) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + companyId));

        if (dto.getName() != null) company.setName(dto.getName());
        if (dto.getWebsite() != null) company.setWebsite(dto.getWebsite());
        if (dto.getIndustry() != null) company.setIndustry(dto.getIndustry());
        if (dto.getDescription() != null) company.setDescription(dto.getDescription());
        if (dto.getLocation() != null) company.setLocation(dto.getLocation());
        if (dto.getLogoUrl() != null) company.setLogoUrl(dto.getLogoUrl());

        company = companyRepository.save(company);
        return toCompanyDto(company);
    }

    public List<PlacementDriveDto> getMyDrives(Long userId) {
        RecruiterProfile profile = recruiterProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));
        return placementDriveService.getDrivesByCompanyId(profile.getCompany().getId());
    }

    public CompanyDto toCompanyDto(Company c) {
        CompanyDto dto = new CompanyDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setWebsite(c.getWebsite());
        dto.setIndustry(c.getIndustry());
        dto.setDescription(c.getDescription());
        dto.setLogoUrl(c.getLogoUrl());
        dto.setLocation(c.getLocation());
        dto.setApproved(c.isApproved());
        dto.setCreatedAt(c.getCreatedAt());
        return dto;
    }
}

