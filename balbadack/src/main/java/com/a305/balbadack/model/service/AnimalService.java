package com.a305.balbadack.model.service;

import com.a305.balbadack.model.dto.Animal;

import java.util.*;

public interface AnimalService {

	public void create(Animal animal) throws Exception;

	public void update(Animal animal) throws Exception;

	public void delete(String id, String key) throws Exception;

	public Animal findByACode(String u_id, Integer a_code) throws Exception;

	public List<Animal> findByUid(String u_id) throws Exception;
    
}