package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.Review;
import com.a305.balbadack.model.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/review/*")
public class ReviewController {
    
    @Autowired
    ReviewService reviewService;

    @ApiOperation("리뷰 등록")
    @PostMapping("/insert") 
    public void insertReview(Review review){
        reviewService.insert(review);
    }

}