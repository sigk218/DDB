package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import java.util.List;

import com.a305.balbadack.model.dto.Carelist;
import com.a305.balbadack.model.service.CarelistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@RequestMapping("/carelist/*")
public class CarelistController {
    
    @Autowired
    CarelistService carelistService;

    @ApiOperation("진료목록 검색")
    @GetMapping(value="/find")
    @ResponseBody
    public List<Carelist> getfindAll() {
        return carelistService.findAll();
    }
    
}