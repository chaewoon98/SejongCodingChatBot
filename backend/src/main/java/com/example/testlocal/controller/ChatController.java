package com.example.testlocal.controller;

import com.example.testlocal.domain.dto.ChatDTO;
import com.example.testlocal.domain.dto.RoomDTO;
import com.example.testlocal.repository.ChatRoomRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    //특정 Broker로 메세지 전달
    private final SimpMessagingTemplate template;

    private final ChatRoomRepository chatRoomRepository;

    public ChatController(SimpMessagingTemplate template) {

        this.template = template;
        chatRoomRepository = new ChatRoomRepository();
    }

    //채팅방 리스트를 JSON 형식으로 전달
    @PostMapping("/chat")
    public List<RoomDTO> index(Model model){
        List<RoomDTO> roomDTOList = chatRoomRepository.findAllRooms();

        return roomDTOList;
    }

    //WebSocketConfig에서 설정한 applicationDestinationPrefixes와
    // MessageMapping 경로가 병합됨
    //"/pub/chat/enter"
    @MessageMapping("/chat/enter")
    public void enter(ChatDTO msg){
        msg.setMessage(msg.getUserId() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room/" + msg.getRoomNo(), msg);
    }

    @MessageMapping("/chat/message")
    public void message(ChatDTO msg){
        template.convertAndSend("/sub/chat/room/" + msg.getRoomNo(), msg);
    }

}