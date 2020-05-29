package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.HospitalPicture;


import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface HospitalPictureRepository extends JpaRepository<HospitalPicture, Integer> {

  List<HospitalPicture> findByhPhotoCode(@Param("hPhotoCode") String hPhotoCode);

  @Modifying
  @Query(value = "update hospital_picture as hp set hp.hp_deleted = 1 where hp.p_code=:Pcode", nativeQuery = true)
  void delete(@Param("Pcode") int Pcode);

}