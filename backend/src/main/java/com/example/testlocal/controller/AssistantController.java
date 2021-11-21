package com.example.testlocal.controller;

import com.example.testlocal.config.Constants;
import com.example.testlocal.domain.dto.AssistantDTO;
import com.example.testlocal.domain.entity.Assistant;
import com.example.testlocal.service.AssistantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = Constants.URL  , allowCredentials = "true")
public class AssistantController {

    final private AssistantService assistantService;

    @PostMapping("/assistant/studentEmail/{studentNumber}")
    public List<String> findAllStudentEmailByStudentNumber(@PathVariable String studentNumber){return assistantService.findAllByStudentId(studentNumber);}

    // 유저 생성
    @ResponseBody
    @PostMapping("/assistant")
    public Assistant createAssistant(@RequestBody AssistantDTO requestDTO) {
        return assistantService.create(requestDTO);
    }

    // 학번 저장하기
    @ResponseBody
    @PostMapping("/assistant/studentNumbers/{userId}")
    public String insertStudentNumbers(@PathVariable String userId, @RequestBody Map<String, Object> map){

        assistantService.insertStudentNumbers(userId, map.get("studentNumbers"), map.get("roomName"));
        return "success";
    }



}
