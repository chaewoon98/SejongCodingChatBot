package com.example.testlocal.domain.entity;

import com.example.testlocal.domain.dto.ChatbotRoomDTO;
import com.example.testlocal.service.UserService2;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "chatbot_room")
@Table(name = "chatbot_room")
@Builder
public class ChatbotRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Room id

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "update_date", nullable = false)
    private String updateDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    public ChatbotRoom(ChatbotRoomDTO requestDTO, UserService2 userService) {
        this.title = requestDTO.getTitle();
        this.updateDate = requestDTO.getUpdateDate();
        this.user = userService.findById(requestDTO.getUserId());
        this.user2 = userService.findById(requestDTO.getUser2Id());
    }
}
