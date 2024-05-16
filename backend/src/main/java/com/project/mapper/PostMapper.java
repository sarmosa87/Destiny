package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.PostDTO;
import com.project.dto.UsersDTO;

@Mapper
public interface PostMapper {


    public int postMaxNum() throws Exception;

    public List<PostDTO> postList(String receiverId) throws Exception;

    public void postInsert (PostDTO dto) throws Exception;

    public UsersDTO profile(String id) throws Exception;

}
