package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Review;

public interface ReviewService {
    
    // 리뷰 작성
    public void insert(Review review);

    
    // 내가 쓴 리뷰 검색
    // public List<Review> findByR_code(int r_code);
    
    // 동물병원별 리뷰 검색
    // public List<Review> findBy
    
    // 리뷰 수정
    public void update(Review review);

    // 내가 쓴 리뷰 삭제 (r_deleted를 true로 변경)
    public void delete(int r_code);
    
}