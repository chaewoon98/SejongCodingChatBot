package com.example.testlocal.domain.dto;

public class ChatDTO {
    private int roomNo;
    private String userId;
    private String message;
    private String createdAt;
    private String type;

    public ChatDTO() {
    }

    public ChatDTO(int roomNo, String userId, String message) {
        this.roomNo = roomNo;
        this.userId = userId;
        this.message = message;
    }

    public ChatDTO(int roomNo, String userId, String message, String createdAt, String type) {
        this.roomNo = roomNo;
        this.userId = userId;
        this.message = message;
        this.createdAt = createdAt;
        this.type = type;
    }

    public int getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}