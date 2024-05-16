package com.project.dto;
import java.time.LocalDateTime;

import lombok.Data;


@Data
public class ChatDTO {

    private int chatNum;
    private String senderId;
    private String receiverId;
    private String message;
    private String name;
    private LocalDateTime timestamp;

}
