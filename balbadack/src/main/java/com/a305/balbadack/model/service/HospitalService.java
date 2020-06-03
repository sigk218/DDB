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
  // public List<Hospital> findByKeyword(String keyword, Integer page);

  // 위치로 병원 조회하기 
  public List<Hospital> findByLocation(Double latitude, Double longtitude, Integer page);

  // 병원 코드 목록으로 병원 목록 조회
  public List<Hospital> findByCode(List<Integer> hCodeList);

  // 별점에 따라 병원 목록 조회 
  public List<Hospital> findByStar(Double latitude, Double longtitude, Integer page);

  //별점에 따른 검색 결과 마지막 페이지인지 확인
  public Hospital isLastPage(Double latitude, Double longtitude, Integer page);

  // 3km 이내의 검색 결과 마지막 인지 확인
  public Hospital isLastPageNear(Double latitude, Double longtitude, Integer page);
}