package com.a305.balbadack.model.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Getter
@Setter
@ToString
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "hospital")
public class Hospital{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, unique = true, name="h_code")
  private Integer h_code;

  @OneToMany(mappedBy="hospital")
  private List<Veterinarian> veterinarian; 

  @Column(nullable = false, length = 50)
  private String h_name;

  @Column(nullable = false, length = 50)
  private String h_location;

  @Column(length = 50)
  private String h_city;

  @Column(length = 10)
  private String h_gu;

  @Column(length = 20)
  private String h_dong;
  
  @Column(length = 100)
  private String h_address;

  @Column(length = 20)
  private String h_station;

  @Column(length = 20)
  private String h_tel;

  @Column(length = 20)
  private String h_holidaytreatment;

  @Column(columnDefinition = "boolean default false")
  private Boolean h_roundtheclock;

  @Column(length = 100)
  private String h_tag;

  @Column(columnDefinition = "boolean default false")
  private Boolean h_certification;

  @Column(nullable = true)
  private Boolean h_open;

  @Column(length = 20)
  private String h_monday;

  @Column(length = 60)
  private String h_tuesday;

  @Column(length = 60)
  private String h_wednesday;
  
  @Column(length = 60)
  private String h_thursday;

  @Column(length = 60)
  private String h_friday;

  @Column(length = 60)
  private String h_saturday;

  @Column(length = 60)
  private String h_sunday;

  @Column(columnDefinition = "boolean default false")
  private Boolean h_deleted;

  @Column(length = 200)
  private String h_website;
}