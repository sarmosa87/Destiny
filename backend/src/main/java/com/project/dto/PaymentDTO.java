package com.project.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaymentDTO {

    private int orderNumber;
    private String id;
    private Integer diamonds;
    private int price;
    private String paymentDate;
    private String payCheck;
    private List<PaymentDTO> lists;
    private String startDate;
    private String endDate;
    private List<Integer> orderNumbers;

}
