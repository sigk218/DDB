package com.a305.balbadack.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.a305.balbadack.model.dto.HospitalPicture;
import com.a305.balbadack.repository.HospitalPictureRepository;
import com.a305.balbadack.repository.HospitalRepository;

@Service
public class HospitalPictureServiceImpl implements HospitalPictureService {
  @Autowired
  HospitalPictureRepository hospitalPictureRepository;

  @Autowired
  HospitalRepository hospitalRepository;

  @Override
  public void insert(HospitalPicture hospitalPicture) {
    try {
      hospitalPictureRepository.save(hospitalPicture);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public List<HospitalPicture> findByhPhotoCode(String hPhotoCode) {
    try {
      // System.out.println(hPhotoCode);
      return hospitalPictureRepository.findByhPhotoCode(hPhotoCode);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public void delete(Integer pCode) {
      try {
        // 유저 정보의 테이블과 조회
        // 병원 사진 코드로 병원 코드 조회
        // Integer hCode = hospitalRepository.findhCode(hPhotoCode).getHCode();
        hospitalPictureRepository.delete(pCode);
      } catch (Exception e) {
          e.printStackTrace();
      }
  }

}