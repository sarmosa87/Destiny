package com.project.board;

import java.util.List;
import java.util.Map;

import com.project.dto.BoardDTO;
import com.project.dto.CommentDTO;

public interface BoardService {

    public int boardNum() throws Exception;
    
    public void insertBoard(BoardDTO dto) throws Exception;

    public List<BoardDTO> boardList(Map<String, String> searchParams);

    public BoardDTO boardContent(int registNum) throws Exception;

    public int commentNum() throws Exception;

    public void insertComment(CommentDTO dto) throws Exception;

    public List<CommentDTO> commentList(int registNum) throws Exception;

   

}
