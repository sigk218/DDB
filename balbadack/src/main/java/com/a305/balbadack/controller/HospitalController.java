package com.a305.balbadack.controller;

import java.util.List;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.HospitalService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "{*}")
@RestController
@Api(value="HospitalController", description="병원정보")
@RequestMapping("/hospital/*")
public class HospitalController {

  @Autowired
  HospitalService hospitalService;

  @ApiOperation("병원 정보 등록하기")
  @PostMapping(value="/")
  public void insertHospital(@RequestBody Hospital hospital) {
    hospitalService.insert(hospital);
  }

  @ApiOperation("병원 정보 수정하기")
  @PostMapping(value="/update")
  public void updateHospital(@RequestBody Hospital hospital) {
    hospitalService.update(hospital);
  }

  @ApiOperation("병원 정보 삭제하기")
  @DeleteMapping(value="/delete")
  public void deleteHospital(@RequestBody Hospital hospital){
    hospitalService.delete(hospital);
  }

  // 1. 병원이름으로 검색 2. 지역으로 검색 3. 나머지는 태그 테이블로 
  @ApiOperation("병원 검색하기")
  @PostMapping(value="/name/{keyword}")
  public List<Hospital> findHospitalByKeyword(@PathVariable String keyword){
    System.out.println(keyword);
    return hospitalService.findByKeyword(keyword);
  }

  // 위도 : latitude, 경도 : longtitude -> 가까운 순서대로 
  @ApiOperation("현재 내 위치에서 3km 이내의 병원 조회")
  @PostMapping(value="/location")
  public List<Hospital> findHospitalByLocation(@RequestParam Double latitude, @RequestParam Double longtitude){
    return hospitalService.findByLocation(latitude, longtitude);
  }
  
  // 병원 코드 리스트를 받으면, 병원 객체를 리턴
  @ApiOperation("병원 코드로 병원 정보 조회")
  @PostMapping(value="/code")
  public List<Hospital> findHospitalByCode(@RequestBody List<Integer> hCodeList){
      System.out.println(hCodeList);
      return hospitalService.findByCode(hCodeList);
  }

  // 거리가 가까운 것들 중 + 평점이 높은 것 이여야 겠지?
  // HQL ordered by 두개하면
  @ApiOperation("거리가 가까운 순서중 평점 높은 순서대로 병원")
  @PostMapping(value="/starrating")
  public List<Hospital> findHospitalByStar(@RequestParam Double latitude, @RequestParam Double longtitude){
      return hospitalService.findByStar(latitude, longtitude);
  }
  
  
}