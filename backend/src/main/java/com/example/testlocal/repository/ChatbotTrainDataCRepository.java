package com.example.testlocal.repository;

import com.example.testlocal.domain.entity.ChatbotTrainDataC;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatbotTrainDataCRepository extends JpaRepository<ChatbotTrainDataC,Long> {

    List<ChatbotTrainDataC> findTop15ByOrderByCountDesc();

}
