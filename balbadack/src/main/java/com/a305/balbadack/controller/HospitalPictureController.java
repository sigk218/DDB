package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.HospitalPicture;
import com.a305.balbadack.model.service.HospitalPictureService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="HospitalPictureController", description="병원 사진")
@RequestMapping("/hospitalpicture/*")
public class HospitalPictureController {

  @Autowired
  HospitalPictureService hospitalPictureService;

  // create : 병원 사진 등록하기 
  @ApiOperation("병원 사진 등록하기")
  @PostMapping(value="/")
  public void insertReport(@RequestBody HospitalPicture hospitalPicture) {
      hospitalPictureService.insert(hospitalPicture);
  }
  
}