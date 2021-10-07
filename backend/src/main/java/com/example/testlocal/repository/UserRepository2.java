package com.example.testlocal.repository;

import com.example.testlocal.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository2 extends JpaRepository< User, Long> {
    @Override
    <S extends User> S save(S entity);

    Optional<User> findById(String id);
    

    @Query(value = "select exists (select * from assistant where user_id = (select id from user where student_number = ?1))as isAssistant", nativeQuery = true)
    int findIsAssistantByStudentNumber(String studentNumber);
}
