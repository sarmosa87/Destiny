package com.project.board;

import java.util.List;

import com.project.dto.BoardDTO;

public interface BoardService {


    public int boardNum() throws Exception;
    
    public void insertBoard(BoardDTO dto) throws Exception;

    public List<BoardDTO> boardList() throws Exception;

}
