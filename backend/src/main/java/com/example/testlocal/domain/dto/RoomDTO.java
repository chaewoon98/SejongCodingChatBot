package com.example.testlocal.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO {

    private Long userId;

    private Long user2Id;

    private String title;

    private String updateDate;


    public RoomDTO(Long id, Long id2, String title, String updateDate) {
        this.userId = id;
        this.user2Id = id2;
        this.title = title;
        this.updateDate = updateDate;
    }
}
