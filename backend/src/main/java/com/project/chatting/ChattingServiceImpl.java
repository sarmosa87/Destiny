package com.project.chatting;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.ChatDTO;
import com.project.dto.UsersDTO;
import com.project.mapper.ChattingMapper;


@Service
public class ChattingServiceImpl implements ChattingService {

    @Autowired
    private ChattingMapper chattingMapper;

    @Override
    public List<ChatDTO> chatList(ChatDTO dto) throws Exception {
       
        return chattingMapper.chatList(dto);
    }

    @Override
    public List<ChatDTO> chattingList(String id) throws Exception {
        
        return chattingMapper.chattingList(id);
    }

    @Override
    public void insertChat(ChatDTO dto) throws Exception {
       
        chattingMapper.insertChat(dto);
        
    }

    @Override
    public void insertRanChat(ChatDTO dto) throws Exception {
        
        chattingMapper.insertRanChat(dto);
        
    }

    @Override
    public int maxNum() throws Exception {
        
        return chattingMapper.maxNum();
    }

    @Override
    public List<ChatDTO> ranChatList(String id) throws Exception {
     
        return chattingMapper.ranChatList(id);
    }

    @Override
    public List<ChatDTO> ranDomChatList(ChatDTO dto) throws Exception {
      
        return chattingMapper.ranDomChatList(dto);
    }

    @Override
    public List<UsersDTO> findUser(String id) throws Exception {
        
        return chattingMapper.findUser(id);
    }

    @Override
    public int ranMaxNum() throws Exception {
        
        return chattingMapper.ranMaxNum();
    }
    

}
