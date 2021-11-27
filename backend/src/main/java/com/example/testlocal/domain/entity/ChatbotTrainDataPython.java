package com.example.testlocal.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "chatbot_train_data_python")
@Table(name = "chatbot_train_data_python")
public class ChatbotTrainDataPython {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "intent")
    private String intent;

    @Column(name = "ner")
    private String ner;

    @Column(name = "language")
    private String language;

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "query")
    private String query;

    @Column(name = "answer")
    private String answer;

    @Column(name = "answer_image")
    private String answer_image;

    @Column(name = "count")
    private Integer count;
}
