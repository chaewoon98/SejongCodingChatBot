package com.example.testlocal.controller;

import com.example.testlocal.config.Constants;
import com.example.testlocal.domain.dto.ChatbotRoomDTO;
import com.example.testlocal.domain.dto.UserDTO2;
import com.example.testlocal.service.ChatbotRoomService;
import com.example.testlocal.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.Map;
import java.util.Random;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = Constants.URL , allowCredentials = "true")
public class SignupController {

    private final JavaMailSender javaMailSender;
    private final UserService userService;
    private final ChatbotRoomService chatbotRoomService;

    @PostMapping("/sendSejongEmail")
    public void sendSejongEmail(@RequestBody Map<String, String> map, HttpServletRequest request) throws MessagingException {

        String email = map.get("email") + "@sju.ac.kr";

        // 키값 생성
        String authCode = getAuthCode();

        String content = "<h4>안녕하세요.</h4><h4>Sejong Coding Helper입니다.</h4>" + "<h4>세종대학교 이메일 인증을 위해서 아래 인증 코드를 입력해주세요.</h4>" +
                "<h2>인증 코드 : " + "<b><u>" + authCode + "</u></b><h2>" + "<h4>감사합니다.</h4>";

        // 메일 보내기
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom("Sejong Coding Helper<sjhelper10@gmail.com>");
        message.setSubject("Sejong Coding Helper 회원가입 인증 메일");
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setText(content, "UTF-8", "html");
        message.setSentDate(new Date());

        javaMailSender.send(message);

        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(60 * 10);  //10분
        session.setAttribute("authCode", authCode);

        System.out.println(authCode);
    }

    @PostMapping("/checkEmailAuthCode")
    public String checkEmailAuthCode(@RequestBody Map<String, String> map, HttpServletRequest request) {
        HttpSession session = request.getSession();
        String authCode = (String) session.getAttribute("authCode");
        String inputedAuthCode = map.get("authCode");
        System.out.println(authCode + "," + inputedAuthCode);

        if (authCode.equals(inputedAuthCode))
            return "accepted";
        else
            return "fail";


    }

    @PostMapping("/completeUserSignup")
    public String completeUserSignup(@RequestBody Map<String, String> map) {

        //학번 중복 확인
        if (userService.isOverlapStudentNumber(map.get("studentNumber"))) {
            return "denied";
        }
        // db에 저장하는 구문
        long id = userService.signUp(new UserDTO2(map.get("studentNumber"), map.get("pwd"), map.get("name"), map.get("email")));
        System.out.println(id);
        chatbotRoomService.create(new ChatbotRoomDTO(id,4L,"C", "0"));
        chatbotRoomService.create(new ChatbotRoomDTO(id,4L,"P", "0"));

        return "accepted";
    }

    @PostMapping("/checkEmailOverlap")
    public String checkEmailOverlap(@RequestBody Map<String, String> map) {
        if (userService.isOverlapEmail(map.get("email") + "@sju.ac.kr"))
            return "denied";
        return "accepted";
    }

    @PostMapping("/checkIdOverlap")
    public void checkIdOverlap(@RequestBody Map<String, String> map) {

    }


    //인증코드 난수 발생
    private String getAuthCode() {
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while (buffer.length() < 6) {
            num = random.nextInt(10);
            buffer.append(num);
        }

        return buffer.toString();
    }

}
