package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Hospital;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {
  
  @Query(value = "select * from hospital h where h.h_name like concat('%', :h_name, '%')", nativeQuery = true)
  // @Query("select h from hospital h where h.h_website='http://paper1984.blog.me/'")
  // @Query(value = "select * from hospital h where h_city = '경기도'", nativeQuery = true)
  List<Hospital> findByName(@Param("h_name") String h_name); 

  @Query(value = "select * from hospital h where h.h_name like concat('%', :h_name, '%')", nativeQuery = true)
  List<Hospital> findByLocation(@Param("latitude") String latitude, @Param("longtitude") String longtitude);

}