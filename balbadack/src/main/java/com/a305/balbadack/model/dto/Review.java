package com.a305.balbadack.model.dto;

import java.util.Date;

import javax.persistence.*;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "review")
public class Review {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY로 해야 Auto Increment
	@Column(nullable = false, unique = true)
    private int r_code;
    
    @ManyToOne
    @JoinColumn(name = "u_id", referencedColumnName = "u_id", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_user_u_id"))
    private User user;

    @Column(length = 20, nullable = false)
    private String r_nickname;

    @Column(length = 500, nullable = true)
    private String r_photo;

    @Column(length = 1000, nullable = true)
    private String r_content;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean r_receipt;

    @Column(nullable = false)
    private Date r_treatmentdate;

    @Column(nullable = false)
    private Date r_date;
    
    @Column(nullable = false)
    private int r_overtreatment;
    
    @Column(nullable = false)
    private int r_kindness;
    
    @Column(nullable = false)
    private int r_result;
    
    @Column(nullable = false)
    private int r_clean;
    
    @Column(nullable = false, columnDefinition = "int default 0")
    private int r_report;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean r_deleted;

    @OneToMany(mappedBy="review")
    private Careinfo careinfo;

    @ManyToOne
    @JoinColumn(name = "h_code", referencedColumnName = "h_code", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_hospital_h_code"))
    private Hospital hospital;
    
}