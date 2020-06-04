package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findAll();

    Review findByrCode(int r_code);

    List<Review> findAllByrDeletedAndHospital_hCode(Boolean r_deleted, int h_code);

    // List<Review> findAllByrDeletedAndrReceiptTrueAndHospital_hCode(boolean r_deleted, boolean r_receipt, int h_code);
    // List<Review> findAllByrReceiptTrueAndrDeletedFalseAndHospital_hCode(int h_code);
    // List<Review> findAllByrReceiptTrueAndrDeletedAndHospital_hCode(boolean r_deleted, int h_code);
    // List<Review> findByrDeletedAndrReceiptAndHospital_HCode(boolean r_deleted, boolean r_receipt, int h_code);

    List<Review> findAllByrDeletedAndUser_uId(Boolean r_deleted, String u_id);

    @Query(value = "select * from review r where r.r_purpose like %:rpurpose% and r.r_deleted = 0", nativeQuery = true)
    List<Review> findByrPurposeContainingAndrDeleted(String rpurpose);
    
    @Query(value = "select * from review r where r.r_content like %:rcontent% and r.r_deleted = 0", nativeQuery = true)
    List<Review> findByrContentContainingAndrDeleted(String rcontent);
    
    @Transactional
    @Modifying
    @Query(value = "update review r set r.r_deleted = 1 where r.r_code=:r_code", nativeQuery = true)
    void reviewDelete(@Param("r_code") int r_code);

    @Query(value = "select r_code from review order by r_code desc", nativeQuery = true)
    List<Integer> findRecentReviewsRCode();

    // List<Review> findAllByOrderByrCodeDesc();

    // Review findFirstByOrderByrCodeDesc();

}