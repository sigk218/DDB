package com.a305.balbadack.model.service;

import java.util.*;

public interface JwtService {
    
    public String getIdFromJwt();

    public List<String> getAuthorityFromJwt();

    public String getJwt();

}