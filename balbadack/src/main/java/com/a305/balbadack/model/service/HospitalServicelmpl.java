package com.a305.balbadack.model.service;

import java.util.*;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.HospitalService;
import com.a305.balbadack.repository.HospitalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalServicelmpl implements HospitalService {

  @Autowired
  HospitalRepository hospitalRepository;

  @Override
  public void insert(final Hospital hospital) {
    try {
      hospitalRepository.save(hospital);
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void update(final Hospital hospital) {
    try {
      hospitalRepository.save(hospital);
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void delete(final Hospital hospital) {
    try {
      hospitalRepository.delete(hospital);
    } catch (final Exception e) {
      e.printStackTrace();
    }
  }
  // 이름, 위치, 진료명에 따른 병원 결과
  @Override
  public List<Hospital> findByKeyword(final String keyword) {
    try {
      // 이름, 위치에 따른 결과 
      final List<Hospital> result = hospitalRepository.findByhKeyword(keyword);
      // 진료 테이블에서 병원 코드 받아오기 -> 중복 제거 같은 코드가 있으면 빼기
      // final List<Integer> hCodeList = hospitalRepository.findByCareKeyword(keyword);
      // 병원 코드로 병원 조회하기 -> 중복 제거 해야함
      // result.addAll(hospitalRepository.findByhCodeIn(hCodeList));
      // final HashSet<Hospital> resultSet = new HashSet<Hospital>(result);
      // final List<Hospital> fResult = new ArrayList<Hospital>(resultSet);
      return result;
    } catch (final Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public List<Hospital> findByLocation(final Double latitude, final Double longtitude) {
    try {
      return hospitalRepository.findByLocation(latitude, longtitude);
    } catch (final Exception e) {
      e.printStackTrace();
      System.out.println("위치로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public List<Hospital> findByCode(final List<Integer> hCodeList) {
    try {
      return hospitalRepository.findByhCodeIn(hCodeList);
    } catch (final Exception e) {
      e.printStackTrace();
      System.out.println("병원 코드로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public List<Hospital> findByStar(final Double latitude, final Double longtitude) {
    try {
      return hospitalRepository.findByStar(latitude, longtitude);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("별점 순으로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

}

    