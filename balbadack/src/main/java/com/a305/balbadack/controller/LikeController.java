package com.a305.balbadack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import com.a305.balbadack.model.dto.Like;
import com.a305.balbadack.model.service.LikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="{*}")
@RestController
@Api(value="LikeController", description="도움이 됐어요")
@RequestMapping("/like/*")
public class LikeController {

    @Autowired
    LikeService likeService;
    
    @ApiOperation("도움이 됐어요 등록하기")
    @PostMapping(value="/insert")
    public void insertLike(@RequestBody Like like) {
        likeService.insert(like);
    }

    @ApiOperation("도움이 됐어요 회원별 조회하기")
    @PostMapping(value="/findById")
    public List<Like> findLikeByU_id(@RequestBody String u_id) {
        return likeService.findByU_id(u_id);
    }

    @ApiOperation("도움이 됐어요 리뷰별 조회하기")
    @PostMapping(value="/findByReview")
    public List<Like> findLikeByR_code(@RequestBody int r_code) {
        return likeService.findByR_code(r_code);
    }
    
    @ApiOperation("도움이 됐어요 삭제하기")
    @PostMapping(value="/delete")
    public void deleteLike(@RequestBody Like like) {
        likeService.delete(like);   
    }

}