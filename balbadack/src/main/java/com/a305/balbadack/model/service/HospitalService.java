package com.a305.balbadack.model.service;

import java.util.List;
import com.a305.balbadack.model.dto.Hospital;

public interface HospitalService {
  // 병원 등록하기
  public void insert(Hospital hospital);

  // 병원 수정하기
  public void update(Hospital hospital);
  
  // 병원 삭제하기
  public void delete(Hospital hospital);
  
  // 병원 검색하기
  public List<Hospital> findByKeyword(String keyword);

  // 위치로 병원 조회하기 
  public List<Hospital> findByLocation(Double latitude, Double longtitude);

  // 병원 코드 목록으로 병원 목록 조회
  public List<Hospital> findByCode(List<Integer> hCodeList);

  // 별점에 따라 병원 목록 조회 
  public List<Hospital> findByStar(Double latitude, Double longtitude);
}