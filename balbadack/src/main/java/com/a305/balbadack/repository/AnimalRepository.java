package com.a305.balbadack.repository;

import com.a305.balbadack.model.dto.Animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer>{

    @Modifying
    @Query(value = "delete from animal a where a.id=:id and a.a_code=:code", nativeQuery = true)
	void delete(@Param("id") String id, @Param("code") String code);
    
}