package com.a305.balbadack.controller;

import java.util.*;

import com.a305.balbadack.model.dto.Animal;
import com.a305.balbadack.model.service.AnimalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins="{*}", maxAge=6000)
@RestController
@Api(value="Balbadack", description="Balbadack")
@EnableAutoConfiguration
public class AnimalController {
    
    @Autowired
    AnimalService animalService;

    @ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e){
		return handleFail(e.getMessage(), HttpStatus.OK);
	}
	
	private ResponseEntity<Map<String, Object>> handleSuccess(Object data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	private ResponseEntity<Map<String, Object>> handleSuccess(Object data,String token){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		resultMap.put("JWT",token);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state",  "fail");
		resultMap.put("message",  data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation("동물정보 등록")
    @PostMapping("/animal/")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody Animal animal) {
        
        try {
            animalService.create(animal);
            return handleSuccess("회원가입을 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK);
        }

	}
	

	@ApiOperation("동물정보수정")
	@PostMapping("/animal/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Animal animal) {
        
        try {
            animalService.update(animal);
            return handleSuccess("동물정보를 수정하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK);
        }

	}

	@ApiOperation("동물 삭제")
	@PostMapping("/animal/delete")
	public ResponseEntity<Map<String, Object>> signout(@RequestBody String id, @RequestBody String key) {
        
        try {
            animalService.delete(id, key);
            return handleSuccess("동물정보 삭제를 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK); //Status 다시 지정
        }

	}

}