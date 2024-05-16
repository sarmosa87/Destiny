package com.project.dto;

import lombok.Data;

@Data
public class PostDTO {

    private int postNum;
    private String senderId;
    private String receiverId;
    private String name;
    private String message;
    private String postDate;
    private String readCheck;

}
