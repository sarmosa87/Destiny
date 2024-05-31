import React,{useState} from 'react';
import '../CSS/Board.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
    
//게시글을 등록하는 화면



const Write = () => {


    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [form,setForm] = useState({

        subject:'',
        content:'',    

    })

    const {subject,content} = form

    const cancle = () => {
        navigate('/board');
    };



    const onChange = (evt) => {

        const {value,name} = evt.target
    
        setForm({
              ...form,
              [name]:value
          })
      }



      const addBoard = async () => {

        try {
            const response = await axios.post('http://localhost:8081/api/addBoard', {

                subject:subject,
                content: content,
                id: user.id,
             
            });
            alert("글이 등록되었습니다..");
        } catch (error) {
         
            alert("글 등록에 실패했습니다.");
        }
    };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    
    return (


        <div className='WriteContainer'>
            <h1>게시글 작성</h1>
            <p>
                제목: <input type='text' name='subject' value={subject} onChange={onChange}></input>
            </p>
           <p>
                내용:
            </p>
            <p>
                <textarea
                name='content'
                value={content}
                onChange={onChange}
                placeholder="메시지 입력..."
                rows="4"  // textarea의 높이 설정
                cols="10"     
                style={{ width: '492px',resize: 'none',border: '2px solid #ccdff9',borderRadius:'5px' }}  // 너비를 100%로 설정하여 부모 요소를 채움
            />
            </p>
            <div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
                <button onClick={addBoard}>등록</button>
                <button onClick={cancle}>취소</button>
            </div>
        </div>
    );
};

export default Write;