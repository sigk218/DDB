package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.*;

import com.a305.balbadack.model.dto.FavoriteHospital;
import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.FavoriteHospitalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="FavoriteHospitalController", description="즐겨찾는 병원")
@RequestMapping("/favoriteHospital/*")
public class FavoriteHospitalController {

    @Autowired
    FavoriteHospitalService favoriteHospitalService;

    @ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e){
		return handleFail(e.getMessage(), HttpStatus.OK);
	}
	
	private ResponseEntity<Map<String, Object>> handleSuccess(Object data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }
    
    private ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state",  "fail");
		resultMap.put("message",  data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    
    
    @ApiOperation("즐겨찾기 추가")
    @PostMapping(value="/insert")
    public void insertFavoriteHospital(@RequestBody FavoriteHospital favoriteHospital) {
        favoriteHospitalService.insert(favoriteHospital);
    }

    @ApiOperation("즐겨찾기 회원별 조회하기")
    @PostMapping(value="/findById")
    public List<Hospital> findFavoriteHospitalByUId(@RequestBody String u_id) {
        return favoriteHospitalService.findByU_id(u_id);
    }
    
    @ApiOperation("즐겨찾기 삭제하기")
    @PostMapping(value="/delete")
    public void deleteFavoriteHospital(@RequestBody FavoriteHospital favoriteHospital) {
        favoriteHospitalService.delete(favoriteHospital);
    }

}