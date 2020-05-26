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
  @Column(nullable = false, unique = true, name = "h_code")
  private int hCode;

  @OneToMany(mappedBy="hospital")
  private List<Veterinarian> veterinarian; 

  @Column(nullable = false, length = 50, name = "h_name")
  private String hName;

  @Column(nullable = false, length = 50, name = "h_location")
  private String hLocation;

  @Column(length = 50, name = "h_city")
  private String hCity;

  @Column(length = 10, name = "h_gu")
  private String hGu;

  @Column(length = 20, name = "h_dong")
  private String hDong;
  
  @Column(length = 100, name = "h_address")
  private String hAddress;

  @Column(length = 20, name = "h_station")
  private String hStation;

  @Column(length = 20, name = "h_tel")
  private String hTel;

  @Column(length = 20, name = "h_holidaytreatment")
  private String hHolidaytreatment;

  @Column(columnDefinition = "boolean default false", name = "h_roundtheclock")
  private boolean hRoundtheclock;

  @Column(length = 100, name = "h_tag")
  private String hTag;

  @Column(columnDefinition = "boolean default false", name = "h_certification")
  private boolean hCertification;

  @Column(nullable = true, name = "h_open")
  private boolean hOpen;

  @Column(length = 60, name = "h_monday")
  private String hMonday;

  @Column(length = 60, name = "h_tuesday")
  private String hTuesday;

  @Column(length = 60, name = "h_wednesday")
  private String hWednesday;
  
  @Column(length = 60, name = "h_thursday")
  private String hThursday;

  @Column(length = 60, name = "h_friday")
  private String hFriday;

  @Column(length = 60, name = "h_saturday")
  private String hSaturday;

  @Column(length = 60, name = "h_sunday")
  private String hSunday;

  @Column(columnDefinition = "boolean default false", name = "h_deleted")
  private boolean hDeleted;

  @Column(length = 200, name = "h_website")
  private String hWebsite;
}