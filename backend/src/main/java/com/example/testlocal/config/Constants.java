package com.example.testlocal.config;

public class Constants {

    public static final String URL =  "https://www.sju-coding-helper.site";
    //public static final String URL =  "http://localhost:3000";

    public static final String BOT_PREDICTION_URL =  "http://172.17.0.4:8082/predict/bot_response";
    //public static final String BOT_PREDICTION_URL =  "http://127.0.0.1:5000/predict/bot_response";

    public static final String CHATBOT_TIP = "SJ HELPER에게 질문하는 TIP!\n" +
            "1. 키워드 위주, 명사 위주로 간결한 질문을 하면 더 정확한 답변을 받을 수 있어요.\n\n" +

            "질문 예시\n" +
            "- 함수를 사용하는 법 X => 함수 사용 O\n"+
            "- 구조체 변수를 선언하기 X => 구조체 변수 선언 O\n\n"+

            "2. 질문은 한 번에 한 주제로만!\n\n"+

            "질문 예시\n"+
            "- 가정법이랑 반복문이 뭐야 X => 가정법 O\n"+
            "- 가정법, 반복문 X => 가정법 O\n\n"+

            "3. C언어와 Python 질문 채팅방이 분리돼 있어요!\n\n"+
            "적절한 언어의 채팅방에서 질문해보세요!";
}
