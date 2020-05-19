package com.a305.balbadack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository{
    
    /*리뷰 CRUD(리뷰는 무조건 익명으로)
리뷰 작성할 때 인증여부 체크
*/

    //내가 쓴 리뷰
    


}