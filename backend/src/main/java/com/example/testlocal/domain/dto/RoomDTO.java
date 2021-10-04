package com.example.testlocal.domain.dto;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class RoomDTO {

    private String roomNo;
    private String roomName;

    //채팅방 생성하는 메소드
    public static RoomDTO create(String roomNo, String roomName){
        RoomDTO room = new RoomDTO();

        //채팅방 식별자 생성
        //room.roomNo = UUID.randomUUID().toString();
        room.roomNo = roomNo;
        room.roomName = roomName;

        return room;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
