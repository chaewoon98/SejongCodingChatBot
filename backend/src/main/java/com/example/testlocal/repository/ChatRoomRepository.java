package com.example.testlocal.repository;


import com.example.testlocal.domain.dto.RoomDTO;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

//채팅방 생성 및 정보 조회 Repository
@Repository
public class ChatRoomRepository {
    private Map<String, RoomDTO> chatRoomDTOMap;

    public ChatRoomRepository() {
        //임시 채팅방 데이터
        chatRoomDTOMap = Collections.unmodifiableMap(
                Stream.of(RoomDTO.create("1", "1번방"), RoomDTO.create("2", "2번방"))
                        .collect(Collectors.toMap(RoomDTO::getRoomNo, Function.identity())));
    }

    public RoomDTO findRoomById(String id){
        return chatRoomDTOMap.get(id);
    }

    public List<RoomDTO> findAllRooms(){
        List<RoomDTO> result = new ArrayList<>(chatRoomDTOMap.values());
        Collections.reverse(result);

        return result;
    }

    public RoomDTO createChatRoomDTO(String no, String name){
        RoomDTO room = RoomDTO.create(no, name);
        chatRoomDTOMap.put(room.getRoomNo(), room);

        return room;
    }
}
