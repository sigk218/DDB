package com.a305.balbadack.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomUserdetails implements UserDetails {

    private String uId;
    private String uPassword;
    private String uName;
    private String uAuthority;
    private boolean enabled;

    /**
     * UserDetails
     */
    @Override
	public String getPassword() {
		return uPassword;
	}
    
    @Override
	public boolean isEnabled() {
		return enabled;
	}

	public String getNAME() {
		return uName;
	}

	public void setNAME(String name) {
		this.uName = name;
    }
    
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
        auth.add(new SimpleGrantedAuthority(uAuthority));
        return auth;
    }
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.uId;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
}