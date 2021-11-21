package com.example.testlocal.repository;

import com.example.testlocal.domain.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query(value = "select * from chat where room_id = ?1", nativeQuery = true)
    List<Chat> findAllByRoomId(Long roomId);

}
