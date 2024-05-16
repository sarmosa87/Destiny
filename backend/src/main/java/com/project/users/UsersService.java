package com.project.users;

import java.util.List;

import com.project.dto.UsersDTO;


public interface UsersService {


    public void insertDate(UsersDTO dto) throws Exception;

    public UsersDTO idCheck(String id) throws Exception;

    public List<UsersDTO> getList(UsersDTO dto) throws Exception;

    public UsersDTO userCheck(String id) throws Exception;

 
}
