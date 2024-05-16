package com.project.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.UsersDTO;
import com.project.mapper.UsersMapper;



@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersMapper usersMapper;


    @Override
    public UsersDTO userCheck(String id) throws Exception {
       
        return usersMapper.userCheck(id);
        
    }

    @Override
    public List<UsersDTO> getList(UsersDTO dto) throws Exception {
        
        return usersMapper.getList(dto);
    }

    @Override
    public UsersDTO idCheck(String id) throws Exception {
 

        return usersMapper.idCheck(id);
    }

    @Override
    public void insertDate(UsersDTO dto) throws Exception {
        
        usersMapper.insertDate(dto);
        
    }



}
