package com.a305.balbadack.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.model.dto.Review;
import com.a305.balbadack.model.service.CareinfoService;
import com.a305.balbadack.model.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins={"*"})
@RestController
@Api(value="ReviewController", description="리뷰")
@RequestMapping("/review/*")
public class ReviewController {
    
    @Autowired
    ReviewService reviewService;

    @Autowired
    CareinfoService careinfoService;

    @ApiOperation("리뷰 등록")
    @PostMapping("/insert") 
    public void insertReview(@RequestBody Review review, @RequestBody List<Careinfo> careinfos){
        System.out.println(review);
        review.setRDate(new Date());
        reviewService.insert(review);

        int getrCode = reviewService.findRecentReviewsRCode();
        review.setRCode(getrCode);

        for (int i = 0; i < careinfos.size(); i++) {
            Careinfo careinfo = careinfos.get(i);
            careinfo.setReview(review);
            careinfoService.insert(careinfo);
        }

    }

    @ApiOperation("모든 리뷰 가져오기")
    @PostMapping("/findAll") 
    public List<Review> findAll(){
        List<Review> re = reviewService.findAll();
        
        for (int i = 0; i < re.size(); i++) {
            re.get(i).setHospital(null);
            re.get(i).setUser(null);
            System.out.println(re.get(i));
        }
        return re;
    }

    @ApiOperation("리뷰 하나 가져오기")
    @PostMapping("/findOne") 
    public Review findOne(@RequestParam int r_code){
        Review re = reviewService.findOne(r_code);
        
        re.setHospital(null);
        re.setUser(null);
        System.out.println(re);
        
        return re;
    }

    @ApiOperation("리뷰 병원별로 가져오기")
    @PostMapping("/findByHospital")
    public List<Review> findByHospital(@RequestParam int h_code){
        List<Review> re = reviewService.findByHospital(h_code);
        
        for (int i = 0; i < re.size(); i++) {
            re.get(i).setHospital(null);
            re.get(i).setUser(null);
            System.out.println(re.get(i));
        }
        
        return re;
    }

    @ApiOperation("리뷰 회원별로 가져오기")
    @PostMapping("/findByUser")
    public List<Review> findByUser(@RequestParam String u_id){
        List<Review> re = reviewService.findByUser(u_id);
        
        for (int i = 0; i < re.size(); i++) {
            re.get(i).setHospital(null);
            re.get(i).setUser(null);
            System.out.println(re.get(i).toString());
        }
        
        return re;
    }

    @ApiOperation("리뷰 수정")
    @PutMapping("/update") 
    public void updateReview(@RequestBody Review review, @RequestBody List<Careinfo> careinfos){
        
        reviewService.insert(review);

        for (int i = 0; i < careinfos.size(); i++) {
            Careinfo careinfo = careinfos.get(i);
            // careinfo.setReview(review);
            careinfoService.insert(careinfo);
        }

    }

    @ApiOperation("리뷰 삭제")
    @PostMapping("/delete") 
    public void deleteReview(@RequestParam int r_code){
        reviewService.delete(r_code);
    }

}