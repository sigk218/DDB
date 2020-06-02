package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.HospitalCarelist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalCarelistRepository extends JpaRepository<HospitalCarelist, Integer> {
    
    // HospitalCarelist findByhcNameAndHospital_hCode(String hc_name, int h_code);
}