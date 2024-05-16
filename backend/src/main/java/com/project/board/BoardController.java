package com.project.board;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.dto.BoardDTO;

public class BoardController {

    @Resource
    private BoardService boardService;



    @PostMapping("/api/addBoard")
    public String board(@RequestBody BoardDTO dto) throws Exception {


        int maxNum = boardService.boardNum();

        dto.setRegistNum(maxNum+1);

        boardService.insertBoard(dto);
        
        return "success";


    }

    @GetMapping("/api/boardList")
    public List<BoardDTO> boardList() throws Exception {

        List<BoardDTO> lists = boardService.boardList();

        return lists;

    }

}
