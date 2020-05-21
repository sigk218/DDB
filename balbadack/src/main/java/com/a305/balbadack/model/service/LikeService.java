package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Like;

public interface LikeService {
    
    public void insert(Like like);

    public List<Like> findByU_id(String u_id);
    
    public List<Like> findByR_code(int r_code);

    public void delete(Like like);

}