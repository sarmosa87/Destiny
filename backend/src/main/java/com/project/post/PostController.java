package com.project.post;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.PostDTO;
import com.project.dto.UsersDTO;

@RestController
public class PostController {


    @Resource
    private PostService postService;


    @PostMapping("/api/post")
    public String post(@RequestBody PostDTO dto) throws Exception {


        int maxNum = postService.postMaxNum();

        dto.setPostNum(maxNum+1);
        dto.setReadCheck("false");

        postService.postInsert(dto);
        
        return "success";


    }


    @GetMapping("/api/postList/{receiverId}")
    public ResponseEntity<?> postList(@PathVariable String receiverId) throws Exception {

        try {
            List<PostDTO> lists = postService.postList(receiverId);
            if (lists.isEmpty()) {
                return ResponseEntity.notFound().build();  // 아무 것도 찾지 못했을 때
            }
            return ResponseEntity.ok(lists);  // 정상적인 경우, 데이터와 함께 200 OK 응답
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다: " + e.getMessage());
        }
    }


    
    @GetMapping("/api/profile/{id}")
    public ResponseEntity<?> profile(@PathVariable String id) throws Exception {

        try {
            UsersDTO dto = postService.profile(id);
            if  (dto == null) {
                return ResponseEntity.notFound().build();  // 아무 것도 찾지 못했을 때
            }
            return ResponseEntity.ok(dto);  // 정상적인 경우, 데이터와 함께 200 OK 응답
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다: " + e.getMessage());
        }
    }

}
