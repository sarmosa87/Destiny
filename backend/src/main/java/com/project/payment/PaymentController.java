package com.project.payment;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.dto.PaymentDTO;

public class PaymentController {


    @Resource
    private PaymentService paymentService;

    @PostMapping("api/paymentReady")
    public String paymentReady(@RequestBody PaymentDTO dto)throws Exception {
        
        int maxNum = paymentService.payMaxNum();

        dto.setOrderNumber(maxNum+1);

        paymentService.paymentInsert(dto);
        
        return "success";
    }

    @PostMapping("/api/processPayments")
public ResponseEntity<String> processPayments(@RequestBody PaymentDTO dto) throws Exception {

    if (dto == null || dto.getLists() == null) {
        return ResponseEntity.badRequest().body("Invalid request");
    }

    try {

        for (PaymentDTO item : dto.getLists()) {

        int maxNum = paymentService.payMaxNum();

        item.setOrderNumber(maxNum+1);
        
        paymentService.paymentInsert(item); // 각 결제 정보를 데이터베이스에 저장
        }

        return ResponseEntity.ok("Success");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payments: " + e.getMessage());
    }


}
 
  @GetMapping("/api/payList/{userId}")
    public ResponseEntity<?> payList(@PathVariable String userId) throws Exception {

        if (userId == null) {
            return ResponseEntity.badRequest().body("사용자 ID가 제공되지 않았습니다.");
        }
        try {
            List<PaymentDTO> lists = paymentService.payList(userId);
            if (lists.isEmpty()) {
                return ResponseEntity.notFound().build();  // 아무 것도 찾지 못했을 때
            }
            return ResponseEntity.ok(lists);  // 정상적인 경우, 데이터와 함께 200 OK 응답
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다: " + e.getMessage());
        }
    }

}
