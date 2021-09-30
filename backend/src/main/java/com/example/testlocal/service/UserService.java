package com.example.testlocal.service;

import com.example.testlocal.domain.dto.UserDTO;
import com.example.testlocal.domain.entity.UserEntity;
import com.example.testlocal.repository.UserRepository;
import com.example.testlocal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Transactional
    public String signUp(UserDTO user) {
        // pw를 암호화하는 과정
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user.toEntity()).getId();
    }

    // 중복체크
    public void checkId(String id) {
        Optional<UserEntity> member = userRepository.findById(id);
        if (member.isPresent()) {

        } else {
        }
    }

    public Map<String, String> login(Map<String, String> user) {

        String accessToken = "";
        String refreshToken = "";

        // id확인
        UserEntity checkedUser = userRepository.findById(user.get("id"))
                .orElseThrow(() -> new IllegalArgumentException("id가 존재하지 않습니다."));

        // 비번 확인
        if (!passwordEncoder.matches(user.get("pwd"), checkedUser.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀 번호입니다.");
        }

        accessToken = jwtTokenProvider.createToken(checkedUser.getId(), 10L);
        refreshToken = jwtTokenProvider.createToken(checkedUser.getId(), 60L);

        Map<String, String> map = new HashMap<>();
        map.put("accessToken", accessToken);
        map.put("refreshToken", refreshToken);

        return map;

    }

    public Map<String, String> refreshToken(String id, Cookie[] cookies) {
        String accessToken = "";
        String refreshToken = "";
        System.out.println(cookies);

        if (cookies != null && cookies.length > 0) {

            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();

                    if (jwtTokenProvider.validateToken(refreshToken)) {
                        accessToken = jwtTokenProvider.createToken(id, 10L);
                        refreshToken = jwtTokenProvider.createToken(id, 60L);
                    } else {
                        throw new IllegalArgumentException("토큰 오류");
                    }
                }
            }
        }

        if (refreshToken == null || "".equals(refreshToken)) {
            throw new IllegalArgumentException("토큰 오류");
        }

        Map<String, String> map = new HashMap<>();
        map.put("accessToken", accessToken);
        map.put("refreshToken", refreshToken);

        return map;
    }

}
