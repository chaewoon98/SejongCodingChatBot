package com.example.testlocal.exception;

public class InvalidUserIdException extends RuntimeException{
    public InvalidUserIdException(){
        super("존재하지 않는 User의 ID입니다.");
    }
}
