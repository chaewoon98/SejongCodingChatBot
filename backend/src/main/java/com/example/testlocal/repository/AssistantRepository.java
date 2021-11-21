package com.example.testlocal.repository;

import com.example.testlocal.domain.entity.Assistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssistantRepository extends JpaRepository<Assistant, Long> {

    @Query(value = "select student_email from assistant where user_id = (select id from user where student_number = ?1)", nativeQuery = true)

    List<String> findAllStudentEmailByStudentNumber(String studentNumber);

    @Query(value = "insert into assistant values (?1, ?2)", nativeQuery = true)
    void insertStudentNumber(int userId, String studentNumber);

    @Query(value = "select exists(select id from assistant where user_id=?1 AND student_number=?2)as isChecked", nativeQuery = true)
    int existsByidNumber(int userId, String studentNumber);

}
