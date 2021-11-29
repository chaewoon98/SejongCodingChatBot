package com.example.testlocal.repository;

import com.example.testlocal.domain.entity.ChatbotTrainDataC;
import com.example.testlocal.domain.entity.ChatbotTrainDataPython;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatbotTrainDataPythonRepository extends JpaRepository<ChatbotTrainDataPython, Long> {

    List<ChatbotTrainDataPython> findTop15ByOrderByCountDesc();

}
