package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.PaymentDTO;


@Mapper
public interface PaymentMapper {


    public void paymentInsert(PaymentDTO dto) throws Exception;

    public int payMaxNum() throws Exception;

    public List<PaymentDTO> payList(String id) throws Exception;

}
