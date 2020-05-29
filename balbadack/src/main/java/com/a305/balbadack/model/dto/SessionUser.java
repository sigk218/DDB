package com.a305.balbadack.model.dto;

import com.a305.balbadack.model.dto.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;

    public SessionUser(User user) {
        this.name = user.getUName();
        this.email = user.getUId();
    }
}