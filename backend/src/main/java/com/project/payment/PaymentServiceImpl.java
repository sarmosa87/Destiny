package com.project.payment;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.PaymentDTO;
import com.project.mapper.PaymentMapper;


@Service
public class PaymentServiceImpl implements PaymentService {


  

    @Override
    public void paymentRemove(int orderNumber) throws Exception {
        
        paymentMapper.paymentRemove(orderNumber);
        
    }

    @Override
    public List<PaymentDTO> paymentList(PaymentDTO dto) throws Exception {
        
        return paymentMapper.paymentList(dto);
    }

    @Override
    public void chargeInsert(PaymentDTO dto) throws Exception {
        
        paymentMapper.chargeInsert(dto);
        
    }

    @Override
    public void payCheck(PaymentDTO dto) throws Exception {
        
        paymentMapper.payCheck(dto);
        
    }

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
