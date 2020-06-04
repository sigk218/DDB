package com.a305.balbadack.model.service;

import javax.servlet.http.HttpServletRequest;

import com.a305.balbadack.security.*;

import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class JwtServiceImpl implements JwtService {

    @Autowired
    JwtProvider jwtProvider;

    @Override
    public String getIdFromJwt() {
        String token = getJwt();
        String id = jwtProvider.getUserIdFromJWT(token);

        System.out.println("getIdFromJwt() ... " + id);

        return id;
    }

    @Override
    public String getJwt() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        
        String token = request.getHeader("Authorization");
        System.out.println("JWT is .... " + token);
        
        if(StringUtils.hasText(token)) {
            return token;
        }

        return null;
    }
    
}