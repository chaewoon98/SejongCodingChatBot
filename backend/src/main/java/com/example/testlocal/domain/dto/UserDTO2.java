package com.example.testlocal.domain.dto;

import com.example.testlocal.domain.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO2 {
    private String studentNumber;
    private String password;
    private String name;
    private String email;

    public UserDTO2(String studentNumber, String password, String name, String email) {
        this.studentNumber = studentNumber;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    public User toEntity() {
        // 뭐하는 코등ㅁ ???
        return User.builder().studentNumber(studentNumber).email(email).password(password).name(name).build();
    }

}
