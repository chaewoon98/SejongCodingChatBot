package com.example.testlocal.service;

import com.example.testlocal.domain.dto.AssistantDTO;
import com.example.testlocal.domain.dto.ChatDTO2;
import com.example.testlocal.domain.dto.RoomDTO;
import com.example.testlocal.domain.entity.Assistant;
import com.example.testlocal.domain.entity.Room;
import com.example.testlocal.domain.entity.User;
import com.example.testlocal.repository.AssistantRepository;
import com.example.testlocal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AssistantService {

    final private AssistantRepository assistantRepository;
    final private UserService2 userService;
    final private RoomService roomService;
    private final ChatService chatService;
    private final JwtTokenProvider jwtTokenProvider;

    public Assistant create(AssistantDTO requestDTO){
        Assistant assistant = new Assistant(requestDTO, userService);
        return assistantRepository.save(assistant);
    }

    public List<Assistant> read(){
        return assistantRepository.findAll();
    }

    public List<String> findAllByStudentId(String token) {
        String studentNumber = jwtTokenProvider.getUserPk(token);
        return assistantRepository.findAllStudentEmailByStudentNumber(studentNumber);
    }
    public void deleteAssistant(Long id) {
        assistantRepository.deleteById(id);
    }

    public void insertStudentNumbers(String userId, Object studentNumbers, Object roomName) {

        Long id = Long.valueOf(userId);

        for (String number:(List<String>)studentNumbers){
            if(!validateDuplicateAssistant(id, number))
            {
                assistantRepository.save(new Assistant(new AssistantDTO(id, number), userService));
                Long id2 = (long) validateExistsUserId(number);
                if (id2 != 0){
                    String nowTime = new Timestamp(System.currentTimeMillis()).toString();
                    Room createdRoom =  roomService.create(new RoomDTO(id, id2, (String) roomName,nowTime));
                    User assistant = userService.findById(id);
                    // 채팅방 생성 후 첫 채팅 생성
                    chatService.create(new ChatDTO2(createdRoom.getId(), id,new Timestamp(System.currentTimeMillis()),
                            assistant.getName(), (String)roomName + "과목" +
                            " TA " + assistant.getName() + "님에 의해 생성된 채팅방입니다.",0));
                }
            }
        }


    }

    private Boolean validateDuplicateAssistant(Long id, String number) {

        if(assistantRepository.existsByidNumber(id.intValue(), number) == 1){
            return true;
        } else{
            return false;
        }
    }

    private int validateExistsUserId(String number){
        return userService.findUserIdByStudentNumber(number);
    }
}
