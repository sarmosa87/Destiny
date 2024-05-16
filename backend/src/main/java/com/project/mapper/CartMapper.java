package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.CartDTO;


@Mapper
public interface CartMapper {


    public int basketMaxNum() throws Exception;
    
    public void insertBasket(CartDTO dto) throws Exception;

    public List<CartDTO> basketList(String id) throws Exception;

}
