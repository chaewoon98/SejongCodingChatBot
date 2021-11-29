package com.example.testlocal.service;

import com.example.testlocal.domain.dto.RoomDTO;
import com.example.testlocal.domain.entity.Room;
import com.example.testlocal.exception.InvalidRoomIdException;
import com.example.testlocal.repository.RoomRepository;
import com.example.testlocal.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository repository;
    private final UserService2 userService;
    private final JwtTokenProvider jwtTokenProvider;

    public Room create(RoomDTO roomDTO){
        Room room = new Room(roomDTO, userService);
        return repository.save(room);
    }

    public List<Room> findAll(){
        return repository.findAll();
    }

    public Room findById(Long id){
        return repository.findById(id).orElseThrow(()-> new InvalidRoomIdException());
    }

    public List<Room> findAllRoomByStudentId(String refreshToken){
        String studentId = jwtTokenProvider.getUserPk(refreshToken);

        List<Room> result = repository.findAllRoomByStudentId(studentId);

        for(int i = 0; i<result.size(); i++){
            String updateDate = repository.findLastChatTime(result.get(i).getId());

            if(updateDate == null || updateDate.equals(""))
                result.get(i).setUpdateDate("2000-12-30 00:00:00");
            else
                result.get(i).setUpdateDate(updateDate);
        }
        Collections.sort(result,new SortByDate());

        return result;
    }

    public List<Integer> findUnReadByStudentId(String refreshToken, List<Room> rooms){

        List<Integer> unReadRoomNumbers = new ArrayList<>();
        String studentId = jwtTokenProvider.getUserPk(refreshToken);
        int id = userService.findUserIdByStudentNumber(studentId);

        for(int i = 0; i<rooms.size(); i++){

            try {
                if(repository.findUnReadByStudentId(id, rooms.get(i).getId().intValue()) == 0){

                    System.out.printf(String.valueOf(rooms.get(i).getId().intValue()));
                    System.out.printf(String.valueOf(rooms.size()));
                    unReadRoomNumbers.add(rooms.get(i).getId().intValue());
                }
            } catch (Exception e){

            }

        }

        return unReadRoomNumbers;
    }

    public void updateReadStatus(String refreshToken, int roomId){
        String studentId = jwtTokenProvider.getUserPk(refreshToken);
        int id = userService.findUserIdByStudentNumber(studentId);
        repository.updateReadStatus(id, roomId);
    }

    public void deleteRoom(Long id) {
        repository.deleteById(id);
    }

    static class SortByDate implements Comparator<Room> {
        @Override
        public int compare(Room o1, Room o2) {
            return o2.getUpdateDate(). compareTo(o1.getUpdateDate());
        }
    }
}
