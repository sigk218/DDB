package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import com.a305.balbadack.model.dto.FavoriteHospital;
import com.a305.balbadack.model.dto.Good;
import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.model.service.FavoriteHospitalService;
import com.a305.balbadack.model.service.GoodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="FavoriteHospitalController", description="즐겨찾는 병원")
@RequestMapping("/favoriteHospital/*")
public class FavoriteHospitalController {

    @Autowired
    FavoriteHospitalService favoriteHospitalService;
    
    @ApiOperation("즐겨찾기 추가")
    @PostMapping(value="/insert")
    public void insertGood(@RequestBody FavoriteHospital favoriteHospital) {
        favoriteHospitalService.insert(favoriteHospital);
    }

    @ApiOperation("즐겨찾기 회원별 조회하기")
    @PostMapping(value="/findById")
    public List<Hospital> findGoodByU_id(@RequestBody String u_id) {
        return favoriteHospitalService.findByU_id(u_id);
    }
    
    @ApiOperation("즉겨찾기 삭제하기")
    @PostMapping(value="/delete")
    public void deleteGood(@RequestBody FavoriteHospital favoriteHospital) {
        favoriteHospitalService.delete(favoriteHospital);   
    }

}