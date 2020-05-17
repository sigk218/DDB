package com.a305.balbadack.model.dto;

import com.a305.balbadack.model.dto.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Entity(name="like")
public class Like {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true)
    private int l_code;
    
    // 리뷰코드
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "r_code", referencedColumnName = "r_code", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_review_rcode"))
	private Review review;

    // 아이디
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "u_id", referencedColumnName = "u_id", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_like_uid"))
	private User user;
}