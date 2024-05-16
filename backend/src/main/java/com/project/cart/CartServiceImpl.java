package com.project.cart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.CartDTO;
import com.project.mapper.CartMapper;


@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    @Override
    public List<CartDTO> basketList(String id) throws Exception {
        
        return cartMapper.basketList(id);
    }

    @Override
    public int basketMaxNum() throws Exception {
        
        return cartMapper.basketMaxNum();
    }

    @Override
    public void insertBasket(CartDTO dto) throws Exception {
        
        cartMapper.insertBasket(dto);
        
    }

    

}
