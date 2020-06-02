package com.a305.balbadack.controller;

import java.util.Date;
import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.model.dto.HospitalCarelist;
import com.a305.balbadack.model.dto.Review;
import com.a305.balbadack.model.dto.ReviewCareinfo;
import com.a305.balbadack.model.service.CareinfoService;
import com.a305.balbadack.model.service.HospitalCarelistService;
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

    @Autowired
    HospitalCarelistService hospitalCarelistService;

    @ApiOperation("리뷰 등록")
    @PostMapping("/insert") 
    public void insertReview(@RequestBody ReviewCareinfo reviewCareinfo){

        Review review = reviewCareinfo.getReview();
        List<Careinfo> careinfos = reviewCareinfo.getCareinfo();

        // 리뷰 테이블에 리뷰 등록
        System.out.println(review);
        review.setRDate(new Date());
        reviewService.insert(review);

        int getrCode = reviewService.findRecentReviewsRCode();
        review.setRCode(getrCode);

        // careinfo 테이블에 진료 정보 등록
        for (int i = 0; i < careinfos.size(); i++) {
            Careinfo careinfo = careinfos.get(i);
            careinfo.setReview(review);
            careinfoService.insert(careinfo);

            // 동시에 hospital carelist에 등록
            String carelist = careinfo.getCiName();
            int price = careinfo.getCiPrice();
            int hcode = careinfo.getHospital().getHCode();

            // 해당 진료항목이 hospita carelist에 있는지 확인
            HospitalCarelist hospitalcarelist = hospitalCarelistService.findByhCodeAndHcName(hcode, carelist);
            if(hospitalcarelist != null){
                // 가격 업데이트
                if(price < hospitalcarelist.getHcMin()){
                    hospitalcarelist.setHcMin(price);
                    hospitalCarelistService.update(hospitalcarelist);
                }else if(price > hospitalcarelist.getHcMax()){
                    hospitalcarelist.setHcMax(price);
                    hospitalCarelistService.update(hospitalcarelist);
                }
            }else{// 없으면 메뉴판에 새로 집어넣기
                HospitalCarelist newHospitalCarelist = new HospitalCarelist(0, hcode, carelist, price, price);
                hospitalCarelistService.insert(newHospitalCarelist);
            }
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