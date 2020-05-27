package com.a305.balbadack.repository;

import java.util.*;

import com.a305.balbadack.model.dto.Hospital;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {
  
  // 이름이 있으면 이름 검색, 위치 검색 
  @Query(value = "select * from hospital h where h.h_name like concat('%', :keyword, '%') or h.h_gu like concat('%', :keyword, '%') or h.h_dong like concat('%', :keyword, '%') or h.h_station like concat('%', :keyword, '%')", nativeQuery = true)
  List<Hospital> findByhKeyword(@Param("keyword") String keyword);
  
  // 진료 정보 테이블에서 키워드로 병원 검색 후, 병원 객체 담아주기
  @Query(value="select h_code from careinfo as c where c.c_name like concat('%', :keyword, '%')")
  List<Integer> findByCareKeyword(@Param("keyword") String keyword);

  // 가까운 위치별로 
  @Query(value = "select * from hospital as h where (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) ))) < 3 order by (6371 * acos(cos( radians(:latitude) ) * cos( radians(h.h_latitude) ) * cos( radians(:longtitude) - radians(h.h_longitude) ) + sin( radians(:latitude) ) * sin( radians( h.h_latitude ) )))", nativeQuery = true)
  List<Hospital> findByLocation(@Param("latitude") Double latitude, @Param("longtitude") Double longtitude);

  // @Query(value="select * from hospital as h where h.h_code hCodeList in :code")
  List<Hospital> findByhCodeIn(List<Integer> hCodeList);

}