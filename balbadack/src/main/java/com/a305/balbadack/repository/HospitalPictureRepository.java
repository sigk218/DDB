package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.HospitalPicture;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface HospitalPictureRepository extends JpaRepository<HospitalPicture, Integer> {

}