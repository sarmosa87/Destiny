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
import com.project.dto.UsersDTO;



@RestController
public class ChattingController {

    @Resource
    private ChattingService chattingService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/api/messages")
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


     // 메시지 로딩
    @GetMapping("/api/messages/{senderId}/{receiverId}")
    public List<ChatDTO> fetchMessages(@PathVariable String senderId, @PathVariable String receiverId) throws Exception  {

        ChatDTO dto = new ChatDTO();

        dto.setSenderId(senderId);
        dto.setReceiverId(receiverId);

        return chattingService.chatList(dto);

    }


    @GetMapping("/api/chattingList/{senderId}")
    public List<ChatDTO> chattingList(@PathVariable String senderId) throws Exception {

        if(senderId==null){

            System.out.println("데이터없음");

            return null;
        }

        List<ChatDTO> lists = chattingService.chattingList(senderId);

        System.out.println(lists);
        

        return lists;
    }



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


    

    /* 
    @PostMapping("/api/setChatStatus")
    public String status(@RequestBody TestDTO dto) throws Exception  {

        if (dto.getId() == null) {
            throw new Exception("User not logged in");
        }

       // tranService.updateLog(dto);

        return "sucess";
    
    }
    */

      //랜덤채팅 인원 찾기
      @PostMapping("/api/findUser")
      public ResponseEntity<?> find(@RequestBody UsersDTO dto) throws Exception  {


        if (dto.getId() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: User not logged in");
        }

        List<UsersDTO> users = chattingService.ranList(dto.getId());

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: No users available");
        }

        Random random = new Random();
        UsersDTO randomUser = users.get(random.nextInt(users.size())); // 랜덤 유저 선택

        return ResponseEntity.ok(randomUser);
}

    @GetMapping("/api/ranChatList/{senderId}")
    public List<ChatDTO> ranChatList(@PathVariable String senderId) throws Exception {

        if(senderId==null){

            System.out.println("데이터없음");

            return null;
        }

        List<ChatDTO> lists = chattingService.ranChatList(senderId);

        System.out.println(lists);
        

        return lists;
    }


         // 메시지 로딩
        @GetMapping("/api/ranMessages/{senderId}/{receiverId}")
         public List<ChatDTO> ranhMessages(@PathVariable String senderId, @PathVariable String receiverId) throws Exception  {
     
             ChatDTO dto = new ChatDTO();
     
             dto.setSenderId(senderId);
             dto.setReceiverId(receiverId);
     
             return chattingService.ranDomChatList(dto);
     
         }

}
