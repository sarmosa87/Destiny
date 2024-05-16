package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.ChatDTO;
import com.project.dto.UsersDTO;

@Mapper
public interface ChattingMapper {


    
    public void insertChat(ChatDTO dto) throws Exception;

    public void insertRanChat(ChatDTO dto) throws Exception;

    public int maxNum() throws Exception; 

    public List<ChatDTO> chatList(ChatDTO dto) throws Exception;

    public List<ChatDTO> chattingList(String id) throws Exception;

    public int ranMaxNum() throws Exception;

    public List<UsersDTO> ranList(String id) throws Exception;

    public List<ChatDTO> ranChatList(String id) throws Exception;

    public List<ChatDTO> ranDomChatList(ChatDTO dto) throws Exception;

}
