package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.Animal;

import org.springframework.stereotype.Service;

@Service
public interface AnimalService {

	public void create(Animal animal) throws Exception;

	public void update(Animal animal) throws Exception;

	public void delete(String id, String key) throws Exception;
    
}