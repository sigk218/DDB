package com.a305.balbadack.model.service;

import javax.transaction.Transactional;

import com.a305.balbadack.model.dto.Animal;
import com.a305.balbadack.repository.AnimalRepository;
import com.a305.balbadack.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    AnimalRepository animalRepository;

    @Override
    public void create(Animal animal) throws Exception {
        try {
            animalRepository.save(animal);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("동물 등록 중 오류가 발생했습니다.");
        }
    }
    
    @Override
    public void update(Animal animal) throws Exception {
        try {
            animalRepository.save(animal);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("동물정보 수정 중 오류가 발생했습니다.");
        }

    }

    @Transactional
    @Override
    public void delete(String id, String key) throws Exception {
        try {
            animalRepository.delete(id, key);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("동물정보 삭제 중 오류가 발생했습니다.");
        }
    }
    
}