package com.a305.balbadack.security;

import org.hibernate.annotations.Filter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import io.swagger.annotations.BasicAuthDefinition;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.a305.balbadack.context.BeanUtils;
import com.a305.balbadack.model.dto.JwtProvider;
import com.a305.balbadack.model.service.CustomUserDetailService;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // @Autowired
    // private JwtProvider tokenProvider;
    JwtProvider tokenProvider = (JwtProvider) BeanUtils.getBean("JwtProvider");

    CustomUserDetailService customUserDetailService = (CustomUserDetailService) BeanUtils.getBean("CustomUserDetailService");
    // @Autowired
    // private CustomUserDetailService customUserDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request); 

            System.out.println("JWT:" + jwt);

            if (StringUtils.hasText(jwt)){
                System.out.println("if.........1....................." + jwt);
                // System.out.println(customUserDetailsService.loadUserById("hope").toString());
                System.out.println(tokenProvider.returnToken(jwt));                
                
                if(tokenProvider.validateToken(jwt)) {
                System.out.println("if..............................!!!");
                String userId = tokenProvider.getUserPk(jwt);
                System.out.println("userId: " + userId);
                UserDetails userDetails = customUserDetailService.loadUserById(userId);
                System.out.println("userDetails: " + userDetails.toString());
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                System.out.println("else............1...........");
            }
            System.out.println("else...........................");
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("bearerToken: " + bearerToken);
        // if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
        //     return bearerToken.substring(7, bearerToken.length());
        // }
        if(StringUtils.hasText(bearerToken)) {
            return bearerToken;
        }
        return null;
    }
}