package com.a305.balbadack.repository;

import java.util.List;
import java.util.Optional;

import com.a305.balbadack.model.dto.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
    @Query("select u from user u where u.id='hope'")
    User findByUid(String id);

    // public User findBy

    @Modifying
    @Query(value = "update User u set u.deleted = 1 where u.id=:id", nativeQuery = true)
    void userDeleted(@Param("id") String id);

    @Query(value = "select u from user u where u.id=:id", nativeQuery = true)
	UserDetails findUserdetailsByUid(String id);

}