package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByrCode(int r_code);
    
    @Modifying
    @Query(value = "update review r set r.deleted = 1 where r.r_code=:r_code", nativeQuery = true)
    void reviewDelete(@Param("r_code") int r_code);

}