package entrue.websocketchat.DTO;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class RoomDTO {

    private String roomNo;
    private String roomName;

    //Websocket의 connection이 맺어진 Session을 저장
    private Set<WebSocketSession> sessions = new HashSet<>();

    //채팅방 생성하는 메서드, 현재 구현하려는 기능에선 필요 X
    public static RoomDTO create(String roomName){
        RoomDTO room = new RoomDTO();

        //채팅방 식별자 생성
        room.roomNo = UUID.randomUUID().toString();
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

    public Set<WebSocketSession> getSessions() {
        return sessions;
    }
}
