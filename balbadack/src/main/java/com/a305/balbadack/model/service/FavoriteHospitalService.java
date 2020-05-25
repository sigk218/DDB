package com.a305.balbadack.model.service;

import java.util.*;

import com.a305.balbadack.model.dto.FavoriteHospital;
import com.a305.balbadack.model.dto.Hospital;

public interface FavoriteHospitalService {
    public void insert(FavoriteHospital favoriteHospital);

    public List<Hospital> findByU_id(String u_id);

    public void delete(FavoriteHospital favoriteHospital);
}