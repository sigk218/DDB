package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.FavoriteHospital;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteHospitalRepository extends JpaRepository<FavoriteHospital, Integer> {
    
}