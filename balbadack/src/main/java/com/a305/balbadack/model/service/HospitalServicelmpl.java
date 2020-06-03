package com.a305.balbadack.model.service;

import java.util.*;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.HospitalService;
import com.a305.balbadack.repository.HospitalRepository;
import com.a305.balbadack.repository.CareinfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalServicelmpl implements HospitalService {

  static int limit = 7;
  static List<Hospital> fResult;
  
  @Autowired
  HospitalRepository hospitalRepository;

  @Autowired
  CareinfoRepository careinfoRepository;

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
  public Map<String, Object> findByKeyword(String keyword, Integer page) {
    Map<String, Object> resultmap = new HashMap<String, Object>();
    int limit = 15;
    try {
      if (page == 0) {
        // 이름, 위치에 따른 결과
        List<Hospital> result = hospitalRepository.findByhKeyword(keyword);
        // 진료 테이블에서 병원 코드 받아오기 -> 중복 제거 같은 코드가 있으면 빼기
        List<Integer> hCodeList = careinfoRepository.findByName(keyword);
        System.out.println(hCodeList);
        // 병원 코드로 병원 조회하기 -> 중복 제거 해야함
        result.addAll(hospitalRepository.findByhCodeIn(hCodeList));
        HashSet<Hospital> resultSet = new HashSet<Hospital>(result);
        fResult = new ArrayList<Hospital>(resultSet);
        limit = Integer.min(limit, fResult.size());
        // 갯수별로(15개씩)
        if ((limit < 15)|(fResult.size()==15)){
          resultmap.put("next", false);
        }else{
          resultmap.put("next", true);
        }
        
        List<Hospital> hospitalList = new ArrayList<>();
        for (int i = 0; i < limit; i++) {
          System.out.println(limit);
          System.out.println(i);
          hospitalList.add(fResult.get(i));
        }
        resultmap.put("hospital", hospitalList);
      }else{ 
        // 시작점 
        // page = Integer.min(fResult.size(), page*limit);
        if ((fResult.size() <= page*limit)){
          resultmap.put("next", false);
        }else{
          resultmap.put("next", true);
        }
        page = page * limit;
        limit = Integer.min(page+limit, fResult.size());
        List<Hospital> hospitalList = new ArrayList<>();
        for (int i = page; i < limit; i++) { 
          System.out.println(i+", "+page+","+limit);
          // System.out.println(page);
          // System.out.println(limit);
          // System.out.println(fResult.size());
          hospitalList.add(fResult.get(i));
        }
        resultmap.put("hospital", hospitalList);
      }
      return resultmap;
    } catch (final Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public List<Hospital> findByLocation(final Double latitude, final Double longtitude, Integer page) {
    try {
      return hospitalRepository.findByLocation(latitude, longtitude, page, limit);
    } catch (final Exception e) {
      e.printStackTrace();
      System.out.println("내 위치로 병원 조회 중 오류 발생 함.");
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
  public List<Hospital> findByStar(final Double latitude, final Double longtitude, Integer page) {
    try {
      return hospitalRepository.findByStar(latitude, longtitude, page, limit);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("별점 순으로 병원 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public Hospital isLastPage(Double latitude, Double longtitude, Integer page){
    try {
      return hospitalRepository.isLastPage(latitude, longtitude, page);
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("위치, 별점 기반 검색 마지막 페이지 조회 중 오류 발생 함.");
    }
    return null;
  }

  @Override
  public Hospital isLastPageNear(Double latitude, Double longtitude, Integer page){
    try{
      return hospitalRepository.isLastPageNear(latitude, longtitude, page);
    }catch(Exception e){
      e.printStackTrace();
      System.out.println("거리순, 별점 순, 마지막 페이지 조회 중 오류 발생");
    }
    return null;
  }
}

    