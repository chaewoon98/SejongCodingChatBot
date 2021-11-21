package com.example.testlocal.exception;

public class InvalidAssistantIdException extends RuntimeException{
    public InvalidAssistantIdException(){
        super("존재하지 않는 Assistant의 ID입니다.");
    }
}
