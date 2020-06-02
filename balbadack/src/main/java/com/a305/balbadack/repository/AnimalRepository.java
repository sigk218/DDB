package com.a305.balbadack.repository;

import java.util.List;

import com.a305.balbadack.model.dto.Animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer>{

    @Modifying
    @Query(value = "delete from animal a where a.u_id=:id and a.a_code=:code", nativeQuery = true)
	void delete(@Param("id") String id, @Param("code") String code);

    @Query(value = "select * from animal a where a.u_id=:uid", nativeQuery = true)
    List<Animal> findByUList(String uid);
    
    @Query(value = "select * from animal a where a.a_code = :acode and a.u_id=:uid", nativeQuery = true)
    Animal findByACode(@Param("uid") String uid, @Param("acode") Integer acode);
    
}