package com.a305.balbadack.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.a305.balbadack.model.dto.HospitalPicture;
import com.a305.balbadack.repository.HospitalPictureRepository;

@Service
public class HospitalPictureServiceImpl implements HospitalPictureService {
  @Autowired
  HospitalPictureRepository hospitalPictureRepository;

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
      return hospitalPictureRepository.findByhPhotoCode(hPhotoCode);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public void delete(Integer Pcode) {
      try {
        hospitalPictureRepository.delete(Pcode);
      } catch (Exception e) {
          e.printStackTrace();
      }
  }

}