package com.example.testlocal.config;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Getter
@Component  //프로터피의 값 사용하기 위해 스프링 빈으로 등록
public class ApiKey {
    public static String secretKey;

    @Value("${key}") // 저장된 키 값 가져오기
    public void setSecretKey(String value){
        secretKey = value;
    }
    //private String secretKey;

    public static String apiUrl;

    @Value("${url}")
    public void setApiUrl(String value){
        apiUrl = value;
    }
    //private String apiUrl;

    private static ApiKey instance = new ApiKey();

    private ApiKey(){

    }

    public static ApiKey getInstance() {
        if(instance == null){
            instance = new ApiKey();
        }

        System.out.println("!!!!! getInstance");
        return instance;
    }
}
