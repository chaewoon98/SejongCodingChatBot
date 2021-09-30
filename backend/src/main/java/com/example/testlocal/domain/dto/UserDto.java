package com.example.testlocal.domain.dto;

import com.example.testlocal.domain.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private String id,password,name,studentNumber;

    public UserDTO(String studentNumber, String id, String password, String name) {
        this.studentNumber = studentNumber;
        this.id = id;
        this.password = password;
        this.name = name;
    }

    public UserEntity toEntity(){
        return UserEntity.builder().studentNumber(studentNumber).id(id).password(password).name(name).build();
    }

}
