package com.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.BoardDTO;
import com.project.dto.CommentDTO;

@Mapper
public interface BoardMapper {

    public int boardNum() throws Exception;
    
    public void insertBoard(BoardDTO dto) throws Exception;

    //public List<BoardDTO> boardList() throws Exception;

    public List<BoardDTO> boardList(Map<String, String> searchParams);

    public BoardDTO boardContent(int registNum) throws Exception;

    public int commentNum() throws Exception;

    public void insertComment(CommentDTO dto) throws Exception;

    public List<CommentDTO> commentList(int registNum) throws Exception;



}
