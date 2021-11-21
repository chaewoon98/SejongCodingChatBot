package com.example.testlocal.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO2 {
    private Long roomId;
    private Long userId;
    private Timestamp createTime;
    private String name;
    private String message;
    private Integer chatRead;

    public Timestamp getCreateTime() {
        createTime = new Timestamp(System.currentTimeMillis());
        return createTime;
    }
}
