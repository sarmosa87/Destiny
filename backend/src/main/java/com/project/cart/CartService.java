package com.project.cart;

import java.util.List;

import com.project.dto.CartDTO;

public interface CartService {

    public int basketMaxNum() throws Exception;
    
    public void insertBasket(CartDTO dto) throws Exception;

    public List<CartDTO> basketList(String id) throws Exception;

}
