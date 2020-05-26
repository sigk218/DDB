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
	@Column(length = 50, nullable = false, unique = true, name = "u_id")
    private String uId;
    
    @Column(length = 100, nullable = false, name = "u_pw")
    private String uPw;

    @Column(nullable = false, name = "u_code")
    private int uCode; //회원-1, 수의사-2, 병원관계자-3

    @Column(columnDefinition="tinyint(1) default 0", nullable = false, name = "u_manager")
    private boolean uManager;

    @Column(length = 20, nullable = false, name = "u_nickname")
    private String uNickname;

    @Column(length = 30, name = "h_code")
    private String hCode;

    @Column(name = "u_sms")
    private boolean uSms;

    @Column(columnDefinition = "tinyint(1) default 0", name = "u_deleted")
    private Boolean uDeleted;
}