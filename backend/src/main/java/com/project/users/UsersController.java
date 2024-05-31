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


//회원 가입 및 로그인 기능
@RestController
public class UsersController {

    @Autowired
    private FileManager fileManager;

    @Resource
    private UsersService usersService;

    //회원가입 하는 기능
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

    //유저 리스트를 불러오는 기능
    @PostMapping("/api/getList")
    public Map<String, Object> getList(@RequestBody UsersDTO dto) throws Exception {


        List<UsersDTO> lists = usersService.getList(dto);


        String savePath =  "C:\\VSCode\\project\\backend\\src\\main\\resources\\static\\image";

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("lists", lists);
        responseData.put("imagePath", savePath);
    
        return responseData;

    }

    //회원가입 시 중복아이디인지 확인하는 기능
    @PostMapping("/api/overlapCheck")
    public ResponseEntity<?> idCheck(@RequestBody String id) throws Exception {

    UsersDTO dto = usersService.userCheck(id);

    if (dto == null) {
        return ResponseEntity.ok("사용 가능한 ID입니다.");
    } else {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용 불가능한 ID입니다.");
    }
}

    //로그인시 회원정보를 확인하는 기능
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody UsersDTO dto) throws Exception {

  
       String id = dto.getId();
       String pwd = dto.getPassword();

       UsersDTO dto2 = usersService.idCheck(id);
    
       if (dto2 == null || !dto2.getPassword().equals(pwd)) {
     
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용자 정보가 일치하지 않습니다.");

      }else{

        if(dto2.getDiamonds()==null){

            dto2.setDiamonds(0);

        }
      
        return ResponseEntity.ok(dto2); 
        
      }
    
    }



}
