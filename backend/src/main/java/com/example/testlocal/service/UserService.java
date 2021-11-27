package com.example.testlocal.service;

import com.example.testlocal.domain.dto.UserDTO2;
import com.example.testlocal.domain.entity.User;
import com.example.testlocal.exception.InvalidUserIdException;
import com.example.testlocal.repository.UserRepository2;
import com.example.testlocal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
import java.util.*;


@RequiredArgsConstructor
@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository2 userRepository2;
    private final JavaMailSender javaMailSender;

    public User create(UserDTO2 requestDTO) {
        User user = new User(requestDTO);
        return userRepository2.save(user);
    }

    // 전체 유저 읽기
    public List<User> read() {
        return userRepository2.findAll();
    }

    public Optional<User> readOne(Long id) {
        return userRepository2.findById(id);
    }

    public void deleteAccount(Long id) {
        userRepository2.deleteById(id);
    }

    public User findById(Long id) {
        return userRepository2.findById(id).orElseThrow(() -> new InvalidUserIdException());
    }

    @Transactional
    public Long signUp(UserDTO2 user) {
        // pw를 암호화하는 과정
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        long id = userRepository2.save(user.toEntity()).getId();
        return id;
    }

    // id 중복체크
    public boolean isOverlapStudentNumber(String studentNumber) {
        Optional<User> member = userRepository2.findByStudentNumber(studentNumber);
        if (member.isPresent()) {
            return true;
        }
        return false;
    }

    // email 중복체크
    public boolean isOverlapEmail(String email) {
        Optional<User> member = userRepository2.findByEmail(email);

        if (member.isPresent()) {
            return true;
        }
        return false;
    }

    public Map<String, String> login(Map<String, String> user) {

        String accessToken = "";
        String refreshToken = "";

        // id확인
        User checkedUser = userRepository2.findByStudentNumber(user.get("id"))
                .orElseThrow(() -> new IllegalArgumentException("id가 존재하지 않습니다."));

        // 비번 확인
        if (!passwordEncoder.matches(user.get("pwd"), checkedUser.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀 번호입니다.");
        }

        accessToken = jwtTokenProvider.createToken(checkedUser.getStudentNumber(), 10L);
        refreshToken = jwtTokenProvider.createToken(checkedUser.getStudentNumber(), 60L);

        Map<String, String> map = new HashMap<>();
        map.put("accessToken", accessToken);
        map.put("refreshToken", refreshToken);

        return map;

    }

    @Transactional
    public String updatePw(String refreshToken,String nowPwd,String newPwd) {

        String username = jwtTokenProvider.getUserPk(refreshToken);

        // id확인
        User checkedUser = userRepository2.findByStudentNumber(username)
                .orElseThrow(() -> new IllegalArgumentException("id가 존재하지 않습니다."));

        // 비번 확인
        if (!passwordEncoder.matches(nowPwd, checkedUser.getPassword())) {
            return "pwdError";
        }

        userRepository2.updatePwd(username, passwordEncoder.encode(newPwd));
        return "accepted";

    }

    @Transactional
    public String deleteUser(String refreshToken,String nowPwd) {

        String studentNumber = jwtTokenProvider.getUserPk(refreshToken);

        // id확인
        User checkedUser = userRepository2.findByStudentNumber(studentNumber)
                .orElseThrow(() -> new IllegalArgumentException("id가 존재하지 않습니다."));

        // 비번 확인
        if (!passwordEncoder.matches(nowPwd, checkedUser.getPassword())) {
            return "pwdError";
        }
        int userId = userRepository2.findUserIdByStudentNumber(studentNumber);

        //db에서 삭제./

        return "accepted";

    }

    @Transactional
    public String searchPw(String id,String name,String email) throws MessagingException {
        // id확인
        User checkedUser = userRepository2.findByStudentNumber(id)
                .orElseThrow(() -> new IllegalArgumentException("noSearched"));

        if(!checkedUser.getName().equals(name) || !checkedUser.getEmail().equals(email)){
            throw new IllegalArgumentException("noSearched");
        }

        String tempPwd = getAuthCode();
        userRepository2.updatePwd(id, passwordEncoder.encode(tempPwd));

        // 키값 생성

        String content = "<h4>안녕하세요.</h4><h4>Sejong Coding Helper입니다.</h4>" + "<h4>회원님에게 임시 비밀번호를 발급해드립니다. 임시 비밀번호를 통해" +
                "로그인을 완료하신 후, 반드시 비밀번호를 변경해주세요.</h4>" +
                "<h2>임시 비밀 번호 : " + "<b><u>" + tempPwd + "</u></b><h2>" + "<h4>감사합니다.</h4>";

        // 메일 보내기
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom("Sejong Coding Helper<sjhelper10@gmail.com>");
        message.setSubject("Sejong Coding Helper 임시 비밀번호 발급.");
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setText(content, "UTF-8", "html");
        message.setSentDate(new Date());

        javaMailSender.send(message);
        System.out.println(tempPwd);

        return "accepted";
    }

    public Map<String, String> refreshToken(String refreshToken) {
        String accessToken = "";

        String username = jwtTokenProvider.getUserPk(refreshToken);

        if (jwtTokenProvider.validateToken(refreshToken)) {
            accessToken = jwtTokenProvider.createToken(username, 60L);
            refreshToken = jwtTokenProvider.createToken(username, 120L);
        } else {
            throw new IllegalArgumentException("토큰 오류");
        }

        if (refreshToken == null || "".equals(refreshToken)) {
            throw new IllegalArgumentException("토큰 오류");
        }

        Map<String, String> map = new HashMap<>();
        map.put("accessToken", accessToken);
        map.put("refreshToken", refreshToken);

        return map;
    }

    //임시 비밀번호 난수 발생
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