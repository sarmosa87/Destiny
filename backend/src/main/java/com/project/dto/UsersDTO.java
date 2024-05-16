package com.project.dto;

import org.springframework.beans.propertyeditors.InputStreamEditor;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;



@Data
public class UsersDTO {

    private String id;
    private String name;
    private String password;
    private String zipCode;
    private String address;
    private String detailAddress;
    private String gender;
    private String mbti;  
    
    private int tall;
    private int weight;

    private String saveFileName;
	private String originalFileName;
	
	private String urlFile;

	private InputStreamEditor inputStream;

    private MultipartFile upload;

}



