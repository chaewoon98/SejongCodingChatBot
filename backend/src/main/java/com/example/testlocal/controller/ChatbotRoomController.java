package com.example.testlocal.controller;

import com.example.testlocal.config.Constants;
import com.example.testlocal.domain.dto.ChatbotRoomDTO;
import com.example.testlocal.domain.entity.ChatbotRoom;
import com.example.testlocal.service.ChatbotRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = Constants.URL , allowCredentials = "true")
public class ChatbotRoomController {

    private final ChatbotRoomService chatbotRoomService;

    @ResponseBody
    @PostMapping("/chatbotRoom")
    public ChatbotRoom createRoom(@RequestBody ChatbotRoomDTO requestDTO){
        return chatbotRoomService.create(requestDTO);
    }

    @PostMapping("/chatbotRoom/studentId")
    public List<ChatbotRoom> findAllRoomByStudentId(HttpServletRequest request, @CookieValue(name = "refreshToken", defaultValue = "-1") String refreshToken) {

        List<ChatbotRoom> result = chatbotRoomService.findAllRoomByStudentId(refreshToken);
        HttpSession session = request.getSession();
        String roomId = (String)session.getAttribute("bRoomId");

        // get한 세션이 없을 경우 => 첫 번째 채팅방으로 session set.
        if(roomId == null){

            //c인지 검증
            int i=0;
            if(result.get(0).getTitle().equals("P"))
                i = 1;

            session.setAttribute("bRoomId",String.valueOf(result.get(i).getId()));
        }
        return result;
    }

    @PostMapping("/chatbotRoom/roomSessionId")
    public String getRoomSessionId(HttpServletRequest request){

        HttpSession session = request.getSession();
        String roomId = (String)session.getAttribute("bRoomId");

        return roomId;
    }

    @PostMapping("/chatbotRoom/roomSessionId/{roomId}")
    public void setRoomSessionId(HttpServletRequest request,@PathVariable String roomId){

        HttpSession session = request.getSession();
        session.setAttribute("bRoomId",roomId);
    }

    @PostMapping("/testtt")
    public void test(@RequestBody Map<String, String> map){
        System.out.println(map.get("code"));
    }

}

