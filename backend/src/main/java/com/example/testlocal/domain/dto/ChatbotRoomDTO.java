package com.example.testlocal.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatbotRoomDTO {

    private Long userId;

    private Long user2Id;

    private String title;

    private String updateDate;
}
