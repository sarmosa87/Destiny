package com.project.payment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.PaymentDTO;
import com.project.mapper.PaymentMapper;


@Service
public class PaymentServiceImpl implements PaymentService {


    @Autowired
    private PaymentMapper paymentMapper;

    @Override
    public List<PaymentDTO> payList(String id) throws Exception {
        
        return paymentMapper.payList(id);
    }

    @Override
    public int payMaxNum() throws Exception {
        
        return paymentMapper.payMaxNum();
    }

    @Override
    public void paymentInsert(PaymentDTO dto) throws Exception {
        
        paymentMapper.paymentInsert(dto);
        
    }

   
}
