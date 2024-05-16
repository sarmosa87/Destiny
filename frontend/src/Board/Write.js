import React,{useState} from 'react';
import '../CSS/Board.css';
import axios from 'axios';




const Write = () => {


    const user = JSON.parse(localStorage.getItem('user'));
    const [form,setForm] = useState({

        subject:'',
        content:'',    

    })

    const {subject,content} = form


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
            <h1>글쓰기</h1>
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
                resize= 'none'     
                style={{ width: '100%' }}  // 너비를 100%로 설정하여 부모 요소를 채움
            />
            </p>
            
            <div>
                <button onClick={addBoard}>글 등록</button>
                <button>글 취소</button>
            </div>
        </div>
    );
};

export default Write;