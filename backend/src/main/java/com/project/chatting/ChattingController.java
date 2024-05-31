package com.project.chatting;

import java.util.List;
import java.util.Random;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.ChatDTO;
import com.project.dto.PaymentDTO;
import com.project.dto.UsersDTO;
import com.project.payment.PaymentService;
import com.project.users.UsersService;


//랜덤 채팅 및 일반 채팅 기능
@RestController
public class ChattingController {

    @Resource
    private ChattingService chattingService;

    @Resource
    private UsersService usersService;

    @Resource
    private PaymentService paymentService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    //쪽지함 채팅 메세지 입력
    @PostMapping("/api/messageInsert")
    public String sendMessage(@RequestBody ChatDTO dto) throws Exception  {

    
        int maxNum = 0;

        maxNum = chattingService.maxNum();

        dto.setChatNum(maxNum+1);

        chattingService.insertChat(dto);

          // 메시지를 수신자의 전용 채널로 전송
        String receiverId = dto.getReceiverId();
        messagingTemplate.convertAndSend("/topic/messages/" + receiverId, dto);

        return "succese";
    }


     //쪽지함 채팅 메세지리스트 불러오기
    @GetMapping("/api/messageList/{senderId}/{receiverId}")
    public List<ChatDTO> fetchMessages(@PathVariable String senderId, @PathVariable String receiverId) throws Exception  {

       // System.out.println("접속:"+senderId);
       // System.out.println("받는:"+receiverId);

        ChatDTO dto = new ChatDTO();

        dto.setSenderId(senderId);
        dto.setReceiverId(receiverId);

        return chattingService.chatList(dto);

    }

    //쪽지함 채팅방 리스트 불러오기
    @GetMapping("/api/chattingList/{senderId}")
    public List<ChatDTO> chattingList(@PathVariable String senderId) throws Exception {

        if(senderId==null){

            return null;
        }

        List<ChatDTO> lists = chattingService.chattingList(senderId);

        return lists;
    }


     //랜덤채팅 메세지 입력
    @PostMapping("/api/ranMessages")
    public String ranMessage(@RequestBody ChatDTO dto) throws Exception  {
        
        int maxNum = 0;

        maxNum = chattingService.ranMaxNum();

        dto.setChatNum(maxNum+1);

        chattingService.insertRanChat(dto);

          // 메시지를 수신자의 전용 채널로 전송
        String receiverId = dto.getReceiverId();
        messagingTemplate.convertAndSend("/topic/ranMessages/" + receiverId, dto);

        return "succese";
    }


    

      //랜덤채팅 인원 찾기
      @PostMapping("/api/findUser")
      public ResponseEntity<?> find(@RequestBody UsersDTO dto) throws Exception  {


 
        String id = dto.getId();

        UsersDTO user = usersService.idCheck(id);

        if(user.getDiamonds()==null || user.getDiamonds() < 200 ){

            return ResponseEntity.status(HttpStatus.CONFLICT).body("다이아 수량이 부족합니다.");


        }else{

            try {

             
                List<UsersDTO> users = chattingService.findUser(dto.getId());

                Random random = new Random();
                UsersDTO randomUser = users.get(random.nextInt(users.size()));

                // Payment 처리
                int payNum = paymentService.payMaxNum();
                PaymentDTO payment = new PaymentDTO();
                payment.setOrderNumber(payNum + 1);
                payment.setId(id);
                payment.setDiamonds(-200);
                paymentService.chargeInsert(payment);   
                return ResponseEntity.ok(randomUser);
            } catch (Exception e) {
                // 트랜잭션 롤백
                throw new RuntimeException("서버 오류가 발생했습니다.", e);
            }
        }

}
    //랜덤채팅 채팅방 리스트 불러오기
    @GetMapping("/api/ranChatList/{senderId}")
    public List<ChatDTO> ranChatList(@PathVariable String senderId) throws Exception {

        if(senderId==null){

            return null;
        }

        List<ChatDTO> lists = chattingService.ranChatList(senderId);
        

        return lists;
    }


         // 랜덤채팅 채팅방 메시지 불러오기
        @GetMapping("/api/ranMessages/{senderId}/{receiverId}")
         public List<ChatDTO> ranhMessages(@PathVariable String senderId, @PathVariable String receiverId) throws Exception  {
     
             ChatDTO dto = new ChatDTO();
     
             dto.setSenderId(senderId);
             dto.setReceiverId(receiverId);
     
             return chattingService.ranDomChatList(dto);
     
         }

}
