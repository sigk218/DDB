package com.a305.balbadack.controller;

import java.io.Console;
import java.util.List;

import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.HospitalService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

  @ApiOperation("병원 정보 등록하기")
  @PostMapping(value="/update")
  public void updateHospital(@RequestBody Hospital hospital) {
    hospitalService.update(hospital);
  }

  @ApiOperation("병원 정보 삭제하기")
  @DeleteMapping(value="/delete")
  public void deleteHospital(@RequestBody Hospital hospital){
    hospitalService.delete(hospital);
  }

  @ApiOperation("병원 이름으로 조회")
  @PostMapping(value="/{h_name}")
  public List<Hospital> findHospitalByname(@PathVariable String h_name){
    System.out.println(h_name);
    return hospitalService.findByName(h_name);
  } 

}