package com.project.post;

import java.util.List;

import com.project.dto.PostDTO;
import com.project.dto.UsersDTO;

public interface PostService {

    public int postMaxNum() throws Exception;

    public List<PostDTO> postList(String receiverId) throws Exception;

    public void postInsert (PostDTO dto) throws Exception;

    public UsersDTO profile(String id) throws Exception;

}
