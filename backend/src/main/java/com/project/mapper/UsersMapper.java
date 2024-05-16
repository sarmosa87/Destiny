package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.UsersDTO;

@Mapper
public interface UsersMapper {



    public void insertDate(UsersDTO dto) throws Exception;

    public UsersDTO idCheck(String id) throws Exception;

    public List<UsersDTO> getList(UsersDTO dto) throws Exception;

    public UsersDTO profile(String id) throws Exception;

    public UsersDTO userCheck(String id) throws Exception;

}
