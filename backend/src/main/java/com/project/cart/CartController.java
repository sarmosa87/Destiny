package com.project.cart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.CartDTO;
import com.project.mapper.CartMapper;

@RestController
public class CartController {

    @Autowired
    private CartMapper cartMapper;


    @PostMapping("api/addToCart")
    public String postMethodName(@RequestBody CartDTO dto)throws Exception {
        
        int maxNum = cartMapper.basketMaxNum();

        dto.setBasketNumber(maxNum+1);

        cartMapper.insertBasket(dto);
        
        return "success";
    }
    
    @GetMapping("api/basketList/{userId}")
    public List<CartDTO> baskeList(@PathVariable String userId) throws Exception{

        if(userId==null){

            return null;
        }

        List<CartDTO> lists = cartMapper.basketList(userId);

        return lists;

    }

}
