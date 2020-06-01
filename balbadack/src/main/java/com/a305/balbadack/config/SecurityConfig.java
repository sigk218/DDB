package com.a305.balbadack.config;

import com.a305.balbadack.model.dto.JwtProvider;
import com.a305.balbadack.model.dto.Role;
import com.a305.balbadack.model.service.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private JwtProvider jwtProvider;

    // Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // authenticationManager를 Bean 등록합니다.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/res/**").antMatchers("/images/**").antMatchers("/swagger-ui.html"); // JSP 리소스 파일이나 자바스크립트, 이미지 파일 등이 저장된 경로는 무시
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                    .sessionManagement()
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
                    // .antMatchers("/api/v1/**").hasRole(Role.USER.name())
                    .antMatchers("/review/**", "/user/mypage", "/animal/**").hasAnyRole("USER", "STAFF", "ADMIN")
                    .antMatchers("/admin/**").hasRole("ADMIN")
                    .antMatchers("/hospital/**").hasAnyRole("STAFF", "ADMIN")
                    .antMatchers("/**", "/user/login", "/user/signup").permitAll()
                    .anyRequest().authenticated() // 기타 경로는 인증을 필요로 함
                .and()
                    .formLogin()
                    .loginPage("/user/login")
                    .loginProcessingUrl("/user/loginProcess") // ID, PW 입력 후 로그인 버튼
                    .defaultSuccessUrl("/") // 로그인 성공 시 화면
                    // .faileureUrl("/user/loginError")
                .and()
                    .logout()
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true) // 리다이렉트 후 세션 초기화
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtProvider),
                        UsernamePasswordAuthenticationFilter.class);
                    // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 넣음.
                // .and()
                // .authenticationProvider(authProvider); // 로그인에서 authenticated 호출하면 연결
    }
}