package com.example.testlocal.service;

import com.example.testlocal.domain.entity.ChatbotTrainDataC;
import com.example.testlocal.repository.ChatbotTrainDataCRepository;
import com.example.testlocal.repository.ChatbotTrainDataPythonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatbotTrainDataService {

    private final ChatbotTrainDataCRepository chatbotTrainDataCRepository;
    private final ChatbotTrainDataPythonRepository chatbotTrainDataPythonRepository;

    public List<ChatbotTrainDataC> findTop10TrainDataC(){
        return chatbotTrainDataCRepository.findTop15ByOrderByCountDesc();
    }

    public List<ChatbotTrainDataC> findTop10TrainDataPython(){
        return chatbotTrainDataCRepository.findTop15ByOrderByCountDesc();
    }
}
