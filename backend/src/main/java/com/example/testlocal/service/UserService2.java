package com.example.testlocal.service;

import com.example.testlocal.domain.dto.UserDTO2;
import com.example.testlocal.domain.entity.User;
import com.example.testlocal.exception.InvalidUserIdException;
import com.example.testlocal.repository.UserRepository2;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService2 {

    private final UserRepository2 userRepository2;

    public User create(UserDTO2 requestDTO){
        User user = new User(requestDTO);
        return userRepository2.save(user);
    }

    // 전체 유저 읽기
    public List<User> read(){
        return userRepository2.findAll();
    }

    public Optional<User> readOne(Long id){
        return userRepository2.findById(id);
    }

    public Optional<User> findStudentId(Long id){
        return userRepository2.findById(id);
    }

    public void deleteAccount(Long id) {
        userRepository2.deleteById(id);
    }

    public User findById(Long id) {
        return userRepository2.findById(id).orElseThrow(() -> new InvalidUserIdException());
    }

    public int findByAssistant(String studentNumber){
        return userRepository2.findIsAssistantByStudentNumber(studentNumber);
    }



}
