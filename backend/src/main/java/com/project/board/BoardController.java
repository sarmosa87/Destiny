package com.project.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.BoardDTO;
import com.project.dto.CommentDTO;

//게시판 글등록, 게시판리스트, 댓글 기능

@RestController
public class BoardController {

    @Resource
    private BoardService boardService;



    @PostMapping("/api/addBoard")  //게시판 글등록 기능
    public String board(@RequestBody BoardDTO dto) throws Exception {


        int maxNum = boardService.boardNum();

        dto.setRegistNum(maxNum+1);

        boardService.insertBoard(dto);
        
        return "success";


    }

    @GetMapping("/api/boardList") //게시판 리스트를 불러오는 기능
    public ResponseEntity<?> boardList(@RequestParam(defaultValue = "subject") String searchKey,@RequestParam(defaultValue = "") String searchValue) throws Exception {
    

        Map<String, String> searchParams = new HashMap<>();
        searchParams.put("searchKey", searchKey);
        searchParams.put("searchValue",searchValue);

        List<BoardDTO> lists = boardService.boardList(searchParams);


        if (lists == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("불러올 데이터가 없습니다.");
        } else {
            
            return ResponseEntity.ok(lists);
        }

    }

    @GetMapping("/api/content/{registNum}") //게시판 글 선택 시 상세 내용을 불러오는 기능
    public ResponseEntity<?> content(@PathVariable int registNum) throws Exception {

        BoardDTO dto = boardService.boardContent(registNum);


        if (dto == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("불러올 데이터가 없습니다.");
        } else {
            
            return ResponseEntity.ok(dto);
        }

    }


    @PostMapping("/api/insertComment") //댓글 등록 기능
    public String insertComment(@RequestBody CommentDTO dto) throws Exception {

        int maxNum = boardService.commentNum();

        dto.setCommnetNum(maxNum+1);

        boardService.insertComment(dto);

        return "success";
        
    }


    @GetMapping("/api/commentList/{registNum}") //게시판 글 별 댓글을 불러오는 기능
    public ResponseEntity<?> commentList(@PathVariable int registNum) throws Exception {

       List<CommentDTO> lists = boardService.commentList(registNum);

        if (lists== null) {


            return ResponseEntity.status(HttpStatus.CONFLICT).body("불러올 데이터가 없습니다.");
        } else {
            
            return ResponseEntity.ok(lists);
        }

        
    }



}
