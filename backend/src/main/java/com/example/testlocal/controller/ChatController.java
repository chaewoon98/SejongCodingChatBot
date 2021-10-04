package com.example.testlocal.controller;

import com.example.testlocal.domain.dto.ChatDTO;
import com.example.testlocal.domain.dto.RoomDTO;
import com.example.testlocal.repository.ChatRoomRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.concurrent.atomic.AtomicInteger;

@Controller
public class ChatController {

    //특정 Broker로 메세지 전달
    private final SimpMessagingTemplate template;

    private final ChatRoomRepository chatRoomRepository;
    private final AtomicInteger seq = new AtomicInteger(0);

    public ChatController(SimpMessagingTemplate template) {

        this.template = template;
        chatRoomRepository = new ChatRoomRepository();
    }

    @GetMapping("/chat")
    public String index(Model model){
        RoomDTO roomDTO = chatRoomRepository.findRoomById("1");

        model.addAttribute("member", "member" + seq.incrementAndGet());

        //해당 채팅방 roomNo를 전달하여 소켓통신
        model.addAttribute("roomNo", roomDTO.getRoomNo());

        return "chat";
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