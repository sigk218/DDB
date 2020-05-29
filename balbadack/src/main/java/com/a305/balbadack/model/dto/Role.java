package com.a305.balbadack.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    // Spring Security에서 권한 코드 설정 시 'ROLE_' 반드시 붙어야 함.
    ADMIN("ROLE_ADMIN", "관리자")
    , STAFF("ROLE_STAFF", "병원 관계자")
    , USER("ROLE_USER", "일반 사용자")
    , GUEST("ROLE_GUEST", "손님");

    private final String key;
    private final String title;
}