package com.project.payment;

import java.util.List;


import com.project.dto.PaymentDTO;

public interface PaymentService {


    
    public void paymentInsert(PaymentDTO dto) throws Exception;

    public int payMaxNum() throws Exception;

    public List<PaymentDTO> payList(String id) throws Exception;

}
