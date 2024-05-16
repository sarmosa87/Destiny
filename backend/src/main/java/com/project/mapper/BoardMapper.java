package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.BoardDTO;

@Mapper
public interface BoardMapper {

    public int boardNum() throws Exception;
    
    public void insertBoard(BoardDTO dto) throws Exception;

    public List<BoardDTO> boardList() throws Exception;

}
