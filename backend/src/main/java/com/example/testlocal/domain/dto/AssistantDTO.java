package com.example.testlocal.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AssistantDTO {
    private Long userId;
    private String studentNumber;

    public AssistantDTO(Long id, String number) {
        this.userId = id;
        this.studentNumber = number;
    }

}
