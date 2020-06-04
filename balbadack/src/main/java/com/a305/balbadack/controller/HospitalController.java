package com.a305.balbadack.controller;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.HospitalService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins={"*"})
@RestController
@Api(value="HospitalController", description="병원정보")
@RequestMapping("/hospital/*")
public class HospitalController {
  static int limit = 7;
  static List<Hospital> hospitalList;

  @Autowired
  HospitalService hospitalService;

  @ApiOperation("병원 정보 등록하기")
  @PostMapping(value="/insert")
  public void insertHospital(@RequestBody final Hospital hospital) {
    hospitalService.insert(hospital);
  }

  @ApiOperation("병원 정보 수정하기")
  @PostMapping(value="/update")
  public void updateHospital(@RequestBody final Hospital hospital) {
    hospitalService.update(hospital);
  }

  @ApiOperation("병원 정보 삭제하기")
  @DeleteMapping(value="/delete")
  public void deleteHospital(@RequestBody final Hospital hospital){
    hospitalService.delete(hospital);
  }

  // 1. 병원이름으로 검색 2. 지역으로 검색 3. 나머지는 태그 테이블로 
  @ApiOperation("병원 검색하기")
  @PostMapping(value="/name/{page}")
  public Map<String, Object> findHospitalByKeyword(@RequestParam final String keyword, @PathVariable final Integer page){
    return hospitalService.findByKeyword(keyword, page);
  }

  // 위도 : latitude, 경도 : longtitude -> 가까운 순서대로 
  // 거리가 3km 이내인 것중, 평점이 높은 것 
  // 거리가 3km 이내인 것중, 리뷰가 많은 것
  @CrossOrigin(origins={"*"})
  @ApiOperation("현재 내 위치에서 3km 이내의 병원 조회")
  @PostMapping(value="/location/{page}")
  public Map<String, Object> findHospitalByLocation( @RequestParam final Double latitude, @RequestParam final Double longtitude, @PathVariable Integer page, @RequestParam(required = false) String mode){
    page = Integer.max(0, page*limit);
    final Map<String, Object> resultmap = new HashMap<String, Object>();

    Hospital isLast = hospitalService.isLastPageNear(latitude, longtitude, page+limit);
    if (isLast == null){
      resultmap.put("next", false);
    }else{
      resultmap.put("next", true);
    }

    List<Hospital> hospitalList = new ArrayList<>();
    if (mode == null){
      hospitalList = hospitalService.findByLocation(latitude, longtitude, page);
    }
    else if (mode.equals("starrating")){
      System.out.println("평점모드");
      hospitalList = hospitalService.findByStarNear(latitude, longtitude, page);
    }else if(mode.equals("review")){
      System.out.println("리뷰모드");
      hospitalList = hospitalService.findByReviewNear(latitude, longtitude, page);
    }
    // Map에 Object 넣어주기
    if (hospitalList.size()==0){
      resultmap.put("hospital", null);
    }else{
      resultmap.put("hospital", hospitalList);
    }
    return resultmap;
  }
  
  // 병원 코드 리스트를 받으면, 병원 객체를 리턴
  @ApiOperation("병원 코드로 병원 정보 조회")
  @PostMapping(value="/code")
  public List<Hospital> findHospitalByCode(@RequestBody final List<Integer> hCodeList){
      System.out.println(hCodeList);
      return hospitalService.findByCode(hCodeList);
  }

  // HQL ordered by 두개하면 앞에꺼 부터 정렬됨.
  @ApiOperation("평점 높은 순서중 거리순 병원")
  @PostMapping(value="/starrating/{page}")
  public Map<String, Object> findHospitalByStar(@RequestParam final Double latitude, @RequestParam final Double longtitude,@PathVariable Integer page){  
    page = Integer.max(0, page*limit);
    Map<String, Object> resultmap = new HashMap<String, Object>();
    Hospital isLast = hospitalService.isLastPage(latitude, longtitude, page+limit);

    if (isLast == null){
      resultmap.put("next", false);
    }else{
      resultmap.put("next", true);
    }
    final List<Hospital> hospitalList = hospitalService.findByStar(latitude, longtitude, page);
    if (hospitalList.size()==0){
      resultmap.put("hospital", null);
    }else{
      resultmap.put("hospital", hospitalList);
    }
    return resultmap;
  }

  // 리뷰가 많은 것 순서중 거리순 병원
  @ApiOperation("리뷰가 많은 것 순서중 거리순 병원")
  @PostMapping(value="/reviewcnt/{page}")
  public Map<String, Object> findHospitalByReview(@RequestParam Double latitude, @RequestParam Double longtitude,@PathVariable Integer page){
    page = Integer.max(0, page*limit);
    Map<String, Object> resultmap = new HashMap<String, Object>();
    Hospital isLast = hospitalService.isLastPageReview(latitude, longtitude, page+limit);

    if (isLast == null){
      resultmap.put("next", false);
    }else{
      resultmap.put("next", true);
    }
    List<Hospital> hospitalList = hospitalService.findByReview(latitude, longtitude, page);
    if (hospitalList.size()==0){
      resultmap.put("hospital", null);
    }else{
      resultmap.put("hospital", hospitalList);
    }
    return resultmap;
  } 
}
  

