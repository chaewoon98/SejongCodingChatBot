package com.example.testlocal.controller;

import com.example.testlocal.domain.dto.ChatDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    //특정 Broker로 메세지 전달
    private final SimpMessagingTemplate template;

    public ChatController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/chat")
    public String index(){

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