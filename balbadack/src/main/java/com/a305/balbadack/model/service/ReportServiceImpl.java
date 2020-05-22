package com.a305.balbadack.model.service;

import java.util.List;

import com.a305.balbadack.model.dto.Careinfo;
import com.a305.balbadack.model.dto.Carelist;
import com.a305.balbadack.model.dto.Report;
import com.a305.balbadack.repository.CareinfoRepository;
import com.a305.balbadack.repository.ReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    ReportRepository reportRepository;

	@Override
    public void insert(Report report) {
        try {
            reportRepository.save(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public List<Report> findByU_id(String u_id) {
        try {
            return reportRepository.findByU_id(u_id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Report> findByR_code(int r_code) {
        try {
            return reportRepository.findByR_code(r_code);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public void delete(Report report) {
        try {
            // reportRepository.delete(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}