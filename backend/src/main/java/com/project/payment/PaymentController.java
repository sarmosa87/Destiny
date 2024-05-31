package com.project.payment;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.PaymentDTO;


//결제 관련 기능
@RestController
public class PaymentController {


    @Resource
    private PaymentService paymentService;

    //다이아 충전 페이지에서 직접 결제 항목으로 등록하는 기능
    @PostMapping("api/paymentReady")
    public String paymentReady(@RequestBody PaymentDTO dto)throws Exception {

        
        int maxNum = paymentService.payMaxNum();

        dto.setOrderNumber(maxNum+1);

        paymentService.paymentInsert(dto);
        
        return "success";
    }

    //장바구니에서 결제 항목으로 등록하는 기능
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
 
  //결제해야 될 리스트를 불러오는 기능
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

    //결제 모듈로 결제 시 paycheck를 통하여 결제 된것과 결제 대기중인 데이터 구분하는 기능
    @PostMapping("/api/payConfrim")
    public ResponseEntity<?> payConfrim(@RequestBody PaymentDTO dto) throws Exception {

   
        try {
            for (Integer orderNumber : dto.getOrderNumbers()) {
                PaymentDTO item = new PaymentDTO();
                item.setOrderNumber(orderNumber);
                paymentService.payCheck(item); // 각 결제 정보를 데이터베이스에 저장
            }

        return ResponseEntity.ok("Success");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("데이터가 입력 실패입니다.");
    }

}


    //결제리스트 삭제 기능
    @PostMapping("/api/paymentRemove")
    public ResponseEntity<?> paymentRemove(@RequestBody PaymentDTO dto) throws Exception{

        int paymentNum = dto.getOrderNumber();

        paymentService.paymentRemove(paymentNum );

        return ResponseEntity.ok("삭제가 완료되었습니다.");


}
}
