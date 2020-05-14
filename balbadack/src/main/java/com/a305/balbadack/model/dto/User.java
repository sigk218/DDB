package com.a305.balbadack.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ForeignKey;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
@Entity(name="user")
public class User {
    @Id
	@GeneratedValue()
	@Column(length = 50, nullable = false, unique = true)
    private String u_id;
    
    @Column(length = 100, nullable = false)
    private String u_pw;

    @Column(nullable = false)
    private int u_code; //회원-1, 수의사-2, 병원관계자-3

    @Column(columnDefinition="tinyint(1) default 0", nullable = false)
    private boolean u_manager;

    @Column(length = 20, nullable = false)
    private String u_nickname;

    @Column(length = 30)
    private String h_code;

    @Column(columnDefinition = "tinyint(1) default 0")
    private Boolean u_deleted;
}