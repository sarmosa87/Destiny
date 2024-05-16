package com.project.dto;

import lombok.Data;


@Data
public class CartDTO {

    private int basketNumber;
    private String id;
    private String name;
    private int diamonds;
    private int price;
    private String basketDate;

}
