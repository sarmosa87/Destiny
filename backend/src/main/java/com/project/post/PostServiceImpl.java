package com.project.post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.PostDTO;
import com.project.dto.UsersDTO;
import com.project.mapper.PostMapper;



@Service
public class PostServiceImpl implements PostService {

    
    @Override
    public void postRemove(int postNum) throws Exception {
       
        postMapper.postRemove(postNum);
        
    }

    @Autowired
    private PostMapper postMapper;


    @Override
    public UsersDTO profile(String id) throws Exception {
        
        return postMapper.profile(id);
    }



    @Override
    public void postInsert(PostDTO dto) throws Exception {

        postMapper.postInsert(dto);
        
    }

    @Override
    public List<PostDTO> postList(String receiverId) throws Exception {
        
        return postMapper.postList(receiverId);
    }

    @Override
    public int postMaxNum() throws Exception {
       
        return postMapper.postMaxNum();
    }


    
}
