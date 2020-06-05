package com.a305.balbadack.controller;

import com.a305.balbadack.model.dto.User;
import com.a305.balbadack.model.service.JwtService;
import com.a305.balbadack.model.service.UserService;
import com.a305.balbadack.payload.ApiResponse;
import com.a305.balbadack.payload.JwtAuthenticationResponse;
import com.a305.balbadack.repository.UserRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "{*}", maxAge = 6000)
@RestController
@Api(value = "회원관리", description = "회원관리")
@EnableAutoConfiguration
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtService jwtService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	com.a305.balbadack.security.JwtProvider jwtProvider;

	@Autowired
	PasswordEncoder passwordEncoder;

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handleFail(e.getMessage(), HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleSuccess(Object data, String token) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", HttpStatus.OK);
		resultMap.put("message", data);
		resultMap.put("JWT", token);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	private ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "fail");
		resultMap.put("message", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation("회원가입")
	@PostMapping("/user/signup")
	public ResponseEntity<?> signUp(@RequestBody User user) {

		user.setUPw(passwordEncoder.encode(user.getUPw()));
		user.setUCode(1);
		System.out.println("회원"+user.getUId());
		System.out.println(user.toString());
		boolean flag = true;

		try {
			flag = userService.create(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace(); 
		}


		System.out.println("가입" + flag);		

		return new ResponseEntity(new ApiResponse(true, "User registered successfully"),
		HttpStatus.OK);
        // try {
		// 	Boolean check = userService.create(user);
		// 	if(!check) { // 이미 가입된 아이디일 경우
		// 		return handleSuccess(null);
		// 	}
        //     return handleSuccess("회원가입을 완료하였습니다.");
        // } catch (Exception e) {
        //     return handleFail(e.toString(), HttpStatus.OK);
        // }

	}

	@ApiOperation("회원가입(병원 STAFF)")
    @PostMapping("/user/signup/staff")
    public ResponseEntity<Map<String, Object>> signUpStaff(@RequestBody User user) {
        
        try {
			Boolean check = userService.create(user);
			if(!check) { // 이미 가입된 아이디일 경우
				return handleSuccess(null);
			}
            return handleSuccess("회원가입을 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK);
        }

	}
	
	@ApiOperation("로그인")
	@PostMapping("/user/login")
	public ResponseEntity<?> login(@RequestParam String uId, @RequestParam String uPw) {
		System.out.println("로그인~~~~");
		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(uId, uPw)
		);
		System.out.println("1");
		SecurityContextHolder.getContext().setAuthentication(authentication);
		System.out.println("2");
		// String jwt = jwtProvider.createToken(id, roles);
		String jwt = jwtProvider.generateToken(authentication);
		System.out.println("JWT: "+ jwt); 
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));

        // try {
		// 	boolean flag = userService.login(id, password);
		// 	if(flag) {
		// 		return handleSuccess("로그인에 성공하였습니다.");
		// 	} else {
		// 		return handleFail("아이디나 비밀번호가 잘못되었습니다.", HttpStatus.OK); // 여기 HTTP Code 다르게
		// 	}
        // } catch (Exception e) {
        //     return handleFail(e.toString(), HttpStatus.OK);
        // }

	}

	@ApiOperation("회원정보수정")
	@PostMapping("/user/update")
	public ResponseEntity<Map<String, Object>> update(@RequestBody User user) {
        
        try {
            userService.update(user);
            return handleSuccess("회원정보를 수정하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK);
        }

	}

	@ApiOperation("회원 탈퇴")
	@PostMapping("/user/signout")
	public ResponseEntity<Map<String, Object>> signout(@RequestBody String uId) {
        
        try {
            userService.delete(uId);
            return handleSuccess("회원탈퇴를 완료하였습니다.");
        } catch (Exception e) {
            return handleFail(e.toString(), HttpStatus.OK); //Status 다시 지정
        }

	}

	@ApiOperation("마이페이지 조회")
	@PostMapping("/user/mypage")
	public ResponseEntity<Map<String, Object>> mypage(@RequestParam String uId) {
		User user = null;
		
		String tokenId = jwtService.getIdFromJwt();

		System.out.println(uId + " vs " + tokenId);

		if(uId.equals(tokenId)) {
			try {
				user = userService.findById(uId);
				return handleSuccess(user);
			} catch (Exception e) {
				return handleFail(e.toString(), HttpStatus.OK);
			}
		} else {
			return handleFail("사용자 정보가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
		}
	}

}