package com.example.testlocal.controller;

import com.example.testlocal.config.Constants;
import com.example.testlocal.domain.dto.UserDTO2;
import com.example.testlocal.domain.entity.User;
import com.example.testlocal.service.UserService;
import com.example.testlocal.service.UserService2;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = Constants.URL , allowCredentials = "true")
public class LoginController {

    private final UserService userService;
    private final UserService2 userService2;

    @GetMapping("/user")
    public List<User> all() {
        return userService2.read();
    }

   /* // 유저 생성
    @PostMapping("/user")
    @ResponseBody
    public String hello(@RequestBody Map<String, String> map) {
        userService2.create();
        return "good";
    }*/

    @ResponseBody
    @PostMapping("/user")
    public User createUser(@RequestBody UserDTO2 requestDTO) {
        return userService2.create(requestDTO);
    }

    @GetMapping("/user/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        return userService2.readOne(id);
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService2.deleteAccount(id);
        return "delete User" + id.toString();
    }


    @PostMapping("/user/assistant")
    public Map<String, Object> findIsAssistantByStudentNumber(@CookieValue(name = "refreshToken", defaultValue = "-1") String refreshToken) {

        Map<String, Object> map = userService2.findByAssistant(refreshToken);
        return map;
    }


    @PostMapping("/user/userID/{studentNumber}")
    public int findUserIdByStudentNumber(@PathVariable String studentNumber) {
        return userService2.findUserIdByStudentNumber(studentNumber);
    }

    @PostMapping("/logincheck")
    public String loginUser(@RequestBody Map<String, String> map, HttpServletResponse response) {

        String accessToken = "";
        String refreshToken = "";

        Map<String, String> resultMap = userService.login(map);
        accessToken = resultMap.get("accessToken");
        refreshToken = resultMap.get("refreshToken");

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);

        refreshCookie.setMaxAge(120 * 60);   //30분 : 30 * 60
        refreshCookie.setPath("/");
        refreshCookie.setSecure(false);
        refreshCookie.setHttpOnly(true);
        response.addCookie(refreshCookie);

        // 싸인업
//        userService.signUp(new UserDto(map.get("studentId"),map.get("id"),map.get("pwd"),map.get("name")));
//        return "good";

        return accessToken;
    }

    @PostMapping("/refreshLoginToken")
    public String refreshLoginToken( @CookieValue(name = "refreshToken", defaultValue = "-1") String refreshToken,
                                    HttpServletResponse response) {

//        try {
//            Thread.sleep(3000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

        String accessToken = "";

        if(refreshToken.equals("-1"))
            throw new IllegalArgumentException("토큰 오류");

        Map<String, String> resultMap = userService.refreshToken(refreshToken);
        accessToken = resultMap.get("accessToken");
        refreshToken = resultMap.get("refreshToken");

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setMaxAge(120 * 60);   //120분 : 120 * 60
        refreshCookie.setPath("/");
        refreshCookie.setSecure(false);
        refreshCookie.setHttpOnly(true);
        response.addCookie(refreshCookie);

        return accessToken;
    }

    @PostMapping("/userlogout")
    public String logout(HttpServletResponse response,HttpServletRequest request) {

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
        cookie.setPath("/"); // 모든 경로에서 삭제 됬음을 알린다.

        response.addCookie(cookie);

        // 세션 삭제
        HttpSession session = request.getSession();
        session.invalidate(); // 세션 삭제

        return "logout";
    }

    @PostMapping("/update/pw")
    public String checkPw(@CookieValue(name = "refreshToken", defaultValue = "-1") String refreshToken,
                          @RequestBody Map<String, String> map) {

        String result = userService.updatePw(refreshToken,map.get("nowPwd"),map.get("newPwd"));
        return result;
    }

    @PostMapping("/delete/user")
    public String deleteUser(@CookieValue(name = "refreshToken", defaultValue = "-1") String refreshToken,
                          @RequestBody Map<String, String> map,HttpServletResponse response,HttpServletRequest request) {

        String result = userService.deleteUser(refreshToken,map.get("nowPwd"));
        logout(response,request);

        return result;
    }

    @PostMapping("/search/pw")
    public String searchPw(@RequestBody Map<String, String> map) throws MessagingException {
        String result = userService.searchPw(map.get("studentNumber"),map.get("name"),map.get("email")  + "@sju.ac.kr");

        return result;
    }

}