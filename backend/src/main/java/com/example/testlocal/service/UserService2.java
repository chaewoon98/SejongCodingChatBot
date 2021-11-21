package com.example.testlocal.service;

import com.example.testlocal.domain.dto.UserDTO2;
import com.example.testlocal.domain.entity.User;
import com.example.testlocal.exception.InvalidUserIdException;
import com.example.testlocal.repository.UserRepository2;
import com.example.testlocal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService2 {

    private final UserRepository2 userRepository2;
    private final JwtTokenProvider jwtTokenProvider;

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

    public Map<String, Object> findByAssistant(String refreshToken){
        String studentNumber = jwtTokenProvider.getUserPk(refreshToken);
        List<Map<String, Object>> assistantDTO2 = userRepository2.findIsAssistantByStudentNumber(studentNumber);
        Map<String, Object> map = new HashMap<>();
        map.put("name", assistantDTO2.get(0).get("name"));
        map.put("isAssistant", assistantDTO2.get(1).get("name"));
        map.put("studentNumber",studentNumber);
        map.put("email",findUserEmailByStudentNumber(studentNumber));
        map.put("id", findUserIdByStudentNumber(studentNumber));
        return map;
    }

    public int findUserIdByStudentNumber(String studentNumber){
        try{
            return userRepository2.findUserIdByStudentNumber(studentNumber);
        }catch(Exception e){
          return 0;
        }
    }

    public String findUserEmailByStudentNumber(String studentNumber){
        return userRepository2.findUserEmailByStudentNumber(studentNumber);
    }

}
