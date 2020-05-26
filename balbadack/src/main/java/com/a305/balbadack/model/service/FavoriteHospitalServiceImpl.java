package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.FavoriteHospital;
import com.a305.balbadack.model.dto.Hospital;
import com.a305.balbadack.repository.FavoriteHospitalRepository;
import com.a305.balbadack.repository.HospitalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteHospitalServiceImpl implements FavoriteHospitalService {

    @Autowired
    FavoriteHospitalRepository favoriteHospitalRepository;

    // @Autowired
    // HospitalRepository hospitalRepository;

    @Override
    public void insert(FavoriteHospital favoriteHospital) {
        
        try {
            favoriteHospitalRepository.save(favoriteHospital);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("즐겨 찾는 병원 추가 중 오류가 발생했습니다.");
        }

    }
    
    @Override
    public void delete(FavoriteHospital favoriteHospital) {
        
        try {
            favoriteHospitalRepository.delete(favoriteHospital);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("즐겨 찾는 병원 삭제 중 오류가 발생했습니다.");
        }

    }   

    @Override
    public List<Hospital> findByU_id(String u_id) {
        List<Hospital> hospitals = null;
        try {
            System.out.println();
            // List<FavoriteHospital> favoriteHospital
        } catch (Exception e) {
            e.printStackTrace();
        }
        return hospitals;
    }

}