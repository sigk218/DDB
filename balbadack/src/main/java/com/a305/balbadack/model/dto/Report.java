package com.a305.balbadack.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
@ToString
@Entity
@Getter
@Setter
@Table(name = "report")
public class Report {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true)
    private int re_code;
    
    @Column(length = 30, nullable = false)
    private String re_category;

    @Column(columnDefinition = "tinyint(1) default 0")
    private Boolean re_deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id", referencedColumnName = "u_id", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_report_id"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "r_code", referencedColumnName = "r_code", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_review_rcode"))
	private Review review;
}