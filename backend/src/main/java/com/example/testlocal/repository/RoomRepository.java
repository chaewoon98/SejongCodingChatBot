package com.example.testlocal.repository;

import com.example.testlocal.domain.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {

    @Query(value = "select * from room where user_id = " +
            "(select id from user where student_number = ?1) or user2_id = (" +
            "select id from user where student_number = ?1) ", nativeQuery = true)
    List<Room> findAllRoomByStudentId(String studentNumber);

    @Query(value = "select create_time from chat where room_id = ?1 order by en_true2.chat.id desc limit 1" , nativeQuery = true)
    String findLastChatTime(Long roomId);

    @Query(value = "select chat_read_count from chat where user_id != ?1 and room_id = ?2 order by en_true2.chat.id desc limit 1" , nativeQuery = true)

    int findUnReadByStudentId(Integer id, Integer roomId);

    @Transactional
    @Modifying
    @Query(value = "update chat set chat_read_count = 1 where user_id != ?1 and room_id = ?2", nativeQuery = true)
    void updateReadStatus(Integer id, Integer roomId);
}