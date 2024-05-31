package com.project.board;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.BoardDTO;
import com.project.dto.CommentDTO;
import com.project.mapper.BoardMapper;


@Service
public class BoardServiceImpl implements BoardService {

    @Override
    public List<BoardDTO> boardList(Map<String, String> searchParams) {
        
        return boardMapper.boardList(searchParams);
    }

    @Override
    public BoardDTO boardContent(int registNum) throws Exception {
        
        return boardMapper.boardContent(registNum);
    }

    @Override
    public List<CommentDTO> commentList(int registNum) throws Exception {
       
        return boardMapper.commentList(registNum);
    }

    @Override
    public int commentNum() throws Exception {
        
        return boardMapper.commentNum();
    }

    @Override
    public void insertComment(CommentDTO dto) throws Exception {
        boardMapper.insertComment(dto);
        
    }

    @Autowired
    private BoardMapper boardMapper;


    @Override
    public int boardNum() throws Exception {
       
        return boardMapper.boardNum();
    }

    @Override
    public void insertBoard(BoardDTO dto) throws Exception {
        boardMapper.insertBoard(dto);
        
    }

}
