package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface CareinfoRepository extends JpaRepository<Careinfo, Integer> {
    
    List<Careinfo> findByReview(int r_code);

    // 병원 검색 하기 
    @Query(value="select h_code from careinfo as c where c.c_name like concat('%', :keyword, '%')",nativeQuery = true)
    List<Integer> findByName(@Param("keyword") String keyword);

}