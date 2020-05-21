package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository{
    
    List<Like> findByU_id(String u_id);

    List<Like> findByR_code(int r_code);
}