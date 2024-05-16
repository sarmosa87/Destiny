package com.project.dto;

import lombok.Data;

@Data
public class BoardDTO {

    private int registNum;
    private String subject;
    private String content;
    private String id;
    private String name;
    private int hitcount;
    private String registData; 

}

