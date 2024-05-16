package com.project.board;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.dto.BoardDTO;
import com.project.mapper.BoardMapper;


@Service
public class BoardServiceImpl implements BoardService {

    private BoardMapper boardMapper;

    @Override
    public List<BoardDTO> boardList() throws Exception {
        
        return boardMapper.boardList();
    }

    @Override
    public int boardNum() throws Exception {
       
        return boardMapper.boardNum();
    }

    @Override
    public void insertBoard(BoardDTO dto) throws Exception {
        boardMapper.insertBoard(dto);
        
    }

}
