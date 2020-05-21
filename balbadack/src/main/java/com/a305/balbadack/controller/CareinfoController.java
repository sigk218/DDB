package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.model.service.CareinfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/careinfo/*")
public class CareinfoController {
    
    @Autowired
    CareinfoService careinfoService;

    @ApiOperation("진료 정보 등록하기")
    @PostMapping(value="/insert")
    public void insertCareinfo(@RequestBody Careinfo careinfo) {
        careinfoService.insert(careinfo);
    }

    @ApiOperation("진료 정보 수정하기")
    @PostMapping(value="/update")
    public void updateCareinfo(@RequestBody Careinfo careinfo) {
        careinfoService.update(careinfo);
    }

    @ApiOperation("진료 정보 삭제하기")
    @PostMapping(value="/delete")
    public void deleteCareinfo(@RequestBody Careinfo careinfo) {
        careinfoService.delete(careinfo);
    }

    @ApiOperation("진료 정보 리뷰별 조회하기")
    @PostMapping(value="/findByReview")
    public void findCareinfoByReview(@RequestBody int r_code) {
        careinfoService.findByR_code(r_code);
    }

}