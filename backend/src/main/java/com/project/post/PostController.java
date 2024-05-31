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

import com.project.dto.PaymentDTO;
import com.project.dto.PostDTO;
import com.project.dto.UsersDTO;
import com.project.payment.PaymentService;
import com.project.users.UsersService;

//쪽지함 기능
@RestController
public class PostController {


    @Resource
    private PostService postService;

    @Resource 
    private UsersService usersService;

    @Resource
    private PaymentService paymentService;


    //쪽지보내기 및 다이아 차감 기능
    @PostMapping("/api/post")
    public ResponseEntity<?> post(@RequestBody PostDTO dto) throws Exception {



        String id = dto.getSenderId();

        UsersDTO users = usersService.idCheck(id);

        if(users.getDiamonds()==null || users.getDiamonds() < 200 ){

              // Post 처리
              int maxNum = postService.postMaxNum();
              dto.setPostNum(maxNum + 1);
              dto.setReadCheck("false");
              postService.postInsert(dto);

              // Payment 처리
              int payNum = paymentService.payMaxNum();
              PaymentDTO payment = new PaymentDTO();
              payment.setOrderNumber(payNum + 1);
              payment.setId(id);
              payment.setDiamonds(-500);
              paymentService.chargeInsert(payment);

            
              return ResponseEntity.ok("success");

            

        }else{

            try {

                return ResponseEntity.status(HttpStatus.CONFLICT).body("다이아 수량이 부족합니다.");

            } catch (Exception e) {
                // 트랜잭션 롤백
                throw new RuntimeException("쪽지 전송 중 오류가 발생했습니다.", e);
            }
        }
    }


    //쪽지 리스트를 불러오는 기능
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


    //쪽지를 보낸사람의 프로필을 확인 하는 기능
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

    //쪽지 삭제하는 기능
    @PostMapping("/api/postRemove")
    public ResponseEntity<?> postRemove(@RequestBody PostDTO dto) throws Exception{

        int postNum = dto.getPostNum();

        postService.postRemove(postNum);

        return ResponseEntity.ok("삭제가 완료되었습니다.");
 

    }

}
