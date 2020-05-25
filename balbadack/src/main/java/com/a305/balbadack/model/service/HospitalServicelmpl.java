package com.a305.balbadack.model.service;

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
    try{
      hospitalRepository.save(hospital);
    }catch (Exception e){
      e.printStackTrace();
    }
  }

  @Override
  public void update(Hospital hospital) {
    try{
      hospitalRepository.save(hospital);
    }catch (Exception e){
      e.printStackTrace();
    }
  }

  @Override
  public void delete(Hospital hospital) {
    try{
      hospitalRepository.delete(hospital);
    }catch (Exception e){
      e.printStackTrace();
    }
  }
  
}