package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.HospitalPicture;


import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface HospitalPictureRepository extends JpaRepository<HospitalPicture, Integer> {

  // 병원별 사진 찾기
  @Query(value = "select * from hospital_picture as hp where hp.h_photocode = :hPhotoCode", nativeQuery = true)
  List<HospitalPicture> findByhPhotoCode(@Param("hPhotoCode") String hPhotoCode);

}
