package com.project.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaymentDTO {

    private int orderNumber;
    private String id;
    private int diamonds;
    private int price;
    private String paymentDate;
    private String payCheck;
    private List<PaymentDTO> lists; 

}
