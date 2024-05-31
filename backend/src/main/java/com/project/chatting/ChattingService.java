package com.project.chatting;

import java.util.List;

import com.project.dto.ChatDTO;
import com.project.dto.UsersDTO;

public interface ChattingService {

    public void insertChat(ChatDTO dto) throws Exception;

    public void insertRanChat(ChatDTO dto) throws Exception;

    public int maxNum() throws Exception; 

    public List<ChatDTO> chatList(ChatDTO dto) throws Exception;

    public List<ChatDTO> chattingList(String id) throws Exception;

    public int ranMaxNum() throws Exception;

    public List<UsersDTO> findUser(String id) throws Exception;

    public List<ChatDTO> ranChatList(String id) throws Exception;

    public List<ChatDTO> ranDomChatList(ChatDTO dto) throws Exception;

}
