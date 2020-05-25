package com.a305.balbadack.model.dto;

import javax.persistence.*;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "carelist")
public class Carelist {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true)
    private int c_code;
    
    @Column(length = 50, nullable = false)
    private String c_name;

    @Column(length = 50, nullable = false)
    private String c_category;
}