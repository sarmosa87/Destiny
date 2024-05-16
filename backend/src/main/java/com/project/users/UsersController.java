package com.project.users;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.dto.UsersDTO;



@RestController
public class UsersController {

    @Autowired
    private FileManager fileManager;

    @Resource
    private UsersService usersService;

    
    @PostMapping("/api/add")
    public String postMethodName(@ModelAttribute UsersDTO dto) throws Exception {


       
    
        MultipartFile file = dto.getUpload();
    
        if (file == null || file.isEmpty()) {
            return "error: No file uploaded";
        } else {


            InputStream is = file.getInputStream();

            String savePath = "C:\\VSCode\\project\\backend\\src\\main\\resources\\static\\image";


            String originalFileName = file.getOriginalFilename();
            
            String newFileName = fileManager.doFileUpload(is, originalFileName, savePath); //핵심
            
           
            dto.setOriginalFileName(originalFileName);
            dto.setSaveFileName(newFileName);
    
            usersService.insertDate(dto);
        }
    
        return "success";
    }

    @PostMapping("/api/getList")
    public Map<String, Object> getList(@RequestBody UsersDTO dto) throws Exception {

        System.out.println("여기로 오나????");


        List<UsersDTO> lists = usersService.getList(dto);


        String savePath =  "C:\\VSCode\\project\\backend\\src\\main\\resources\\static\\image";

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("lists", lists);
        responseData.put("imagePath", savePath);
    
        return responseData;

    }

    
    @PostMapping("/api/overlapCheck")
    public ResponseEntity<?> idCheck(@RequestBody String id) throws Exception {

    System.out.println("여기로 왜 안오네?");

    UsersDTO dto = usersService.userCheck(id);

    if (dto == null) {
        return ResponseEntity.ok("사용 가능한 ID입니다.");
    } else {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용 불가능한 ID입니다.");
    }
}


    @PostMapping("/api/login")
    public Map<String, Object> login(@RequestBody UsersDTO dto) throws Exception {

  

       String id = dto.getId();
       String pwd = dto.getPassword();

       UsersDTO dto2 = usersService.idCheck(id);

       Map<String, Object> res = new HashMap<>();

    
       if (dto2 == null || !dto2.getPassword().equals(pwd)) {
            res.put("error", "아이디 또는 비밀번호가 잘못되었습니다.");
            return res;

      }else{
      
       String userId = dto2.getId();
       String name = dto2.getName();

        res.put("user", dto2);
        res.put("success", true);
    
        /* 
        session.setAttribute("userId", userId);
        session.setAttribute("name", name);
        */
        return res;
      }
    
    }

    /* 
    @GetMapping("/api/logout")
    public Map<String, Object> logout(HttpSession session) {

    session.invalidate();  // 세션 무효화

    Map<String, Object> res = new HashMap<>();
    res.put("message", "Logged out successfully");
    return res;
    */

}
