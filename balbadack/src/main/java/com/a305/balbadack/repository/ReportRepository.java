package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    List<Report> findByUser(String u_id);

    List<Report> findByReview(int r_code);

}