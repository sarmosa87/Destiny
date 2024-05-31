package com.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.PaymentDTO;


@Mapper
public interface PaymentMapper {


    public void paymentInsert(PaymentDTO dto) throws Exception;

    public int payMaxNum() throws Exception;

    public List<PaymentDTO> payList(String id) throws Exception;

    public void payCheck(PaymentDTO dto) throws Exception;

    public void chargeInsert(PaymentDTO dto) throws Exception;

    public List<PaymentDTO> paymentList(PaymentDTO dto) throws Exception;

    public void paymentRemove(int orderNumber) throws Exception;

}
