package com.example.testlocal.service;

import com.example.testlocal.domain.dto.ChatDTO2;
import com.example.testlocal.domain.entity.Chat;
import com.example.testlocal.exception.InvalidChatIdException;
import com.example.testlocal.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository repository;
    private final UserService2 userService;
    private final RoomService roomService;

    public Chat create(ChatDTO2 chatDTO){
        Chat chat = new Chat(chatDTO, roomService, userService);
        return repository.save(chat);
    }

    public Map<String, Object> findById2(Long id) {

        Chat checkedChat = repository.findById(id).orElseThrow(()-> new InvalidChatIdException());

        Map<String, Object> map = new HashMap<>();
        map.put("id", checkedChat.getId());
        map.put("message", checkedChat.getMessage());
        map.put("UserId",checkedChat.getUser());
        map.put("createTime",checkedChat.getCreateTime());
        map.put("roomId",checkedChat.getRoom());
        // 추가
        map.put("chatReed", checkedChat.getChatRead());
        return map;
    }

    public List<Chat> findByRoomId(Long id) {
        return repository.findAllByRoomId(id);
    }

    public List<Chat> findAll(){
        return repository.findAll();
    }

    public Chat findById(Long id){
        return repository.findById(id).orElseThrow(()-> new InvalidChatIdException());
    }

    public void deleteChat(Long id) {
        repository.deleteById(id);
    }
}
