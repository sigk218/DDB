package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.Review;
import com.a305.balbadack.repository.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService{
    
    @Autowired
    ReviewRepository reviewRepository;

    //리뷰 작성
    @Override
    public void insert(Review review){
        try{
            reviewRepository.save(review);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void delete(int r_code) {
        try{
            reviewRepository.reviewDelete(r_code);
        }catch(Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public void update(Review review) {
        try{
            reviewRepository.save(review);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
    

}