package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.User;
import com.a305.balbadack.model.service.UserService;

import java.util.*;

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
@Api(value="회원관리", description="회원관리")
@EnableAutoConfiguration
public class UserController {
    
    @Autowired
    private UserService userService;

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

	private ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state",  "fail");
		resultMap.put("message",  data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
    
    @ApiOperation("회원가입")
    @PostMapping("/user/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        
        try {
			Boolean check = userService.create(user);
			if(!check) { // 이미 가입된 아이디일 경우
				return handleSuccess(null);
			}
            return handleSuccess("회원가입을 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }

	}
	
	@ApiOperation("로그인")
	@PostMapping("/user/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody String id, @RequestBody String password) {
        
        try {
			boolean flag = userService.login(id, password);
			if(flag) {
				return handleSuccess("로그인에 성공하였습니다.");
			} else {
				return handleFail("아이디나 비밀번호가 잘못되었습니다.", HttpStatus.BAD_REQUEST);
			}
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }

	}

	@ApiOperation("회원정보수정")
	@PostMapping("/user/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody User user) {
        
        try {
            userService.update(user);
            return handleSuccess("회원정보를 수정하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }

	}

	@ApiOperation("회원 탈퇴")
	@PostMapping("/user/signout")
	public ResponseEntity<Map<String, Object>> signout(@RequestBody String id) {
        
        try {
            userService.delete(id);
            return handleSuccess("회원탈퇴를 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }

	}

	@ApiOperation("마이페이지 조회")
	@PostMapping("/user/mypage")
	public ResponseEntity<Map<String, Object>> mypage(@RequestBody String id) {
        User user = null;
        try {
            user = userService.findById(id);
            return handleSuccess(user);
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.BAD_REQUEST);
        }
	}

}