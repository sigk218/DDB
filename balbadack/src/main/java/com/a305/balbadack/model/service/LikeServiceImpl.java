package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Like;
import com.a305.balbadack.repository.LikeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    LikeRepository likeRepository;

    @Override
    public void insert(Like like) {
        try {
            likeRepository.save(like);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public List<Like> findByU_id(String u_id) {
        try {
            return likeRepository.findByU_id(u_id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Like> findByR_code(int r_code) {
        try {
            return likeRepository.findByR_code(r_code);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public void delete(Like like) {
        try {
            likeRepository.delete(like);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}