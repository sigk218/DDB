package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.repository.HospitalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalServicelmpl implements HospitalService {

  @Autowired
  HospitalRepository hospitalRepository;

  @Override
  public void insert(Hospital hospital) {
    try {
      hospitalRepository.save(hospital);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void update(Hospital hospital) {
    try {
      hospitalRepository.save(hospital);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void delete(Hospital hospital) {
    try {
      hospitalRepository.delete(hospital);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  
  @Override
  public List<Hospital> findByName(String h_name){
    try {
      System.out.println("서비스에서 출력");
      System.out.println(h_name);
      List<Hospital> temp = hospitalRepository.findByName(h_name);
      System.out.println(temp);
      return hospitalRepository.findByName(h_name);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public List<Hospital> findByLocation(String h_location) {
    try {
      List<Hospital> temp = hospitalRepository.findByName(h_location);
      return hospitalRepository.findByName(h_location);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("위치로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }
  
}