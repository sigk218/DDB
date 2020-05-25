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
  

}