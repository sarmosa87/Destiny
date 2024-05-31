import React,{useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../CSS/Board.css';
import ContentItem from "./ContentItem";

//게시글의 내용과 댓글 리스트를 출력하는 화면

const Content = () =>{

    const { registNum } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [lists,setLists] = useState({

        registNum:'',
        subject:'',
        content:'',
        name:'',
        registData:''

    })

    const [commnetList,setCommentList] = useState([])

    const [message,setMessage] = useState('')


    const handleKeyDown = (e) => {

        if (e.key === 'Enter' && !e.shiftKey) {  // shift키와 함께 엔터를 누르면 개행을 허용
          e.preventDefault();
       
        }
      };

      const onChange = (e) => {
        setMessage(e.target.value);
      };


    

    const {subject,content,name,registData} = lists


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/content/${registNum}`)
                setLists(res.data);
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    alert('불러올 데이터가 없습니다.');
                } else {
                    alert('서버 오류가 발생했습니다.');
                }
            }
        };

        fetchData();
    }, [registNum]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/commentList/${registNum}`)     
                setCommentList(res.data);
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    alert('불러올 데이터가 없습니다.');
                } else {
                    alert('서버 오류가 발생했습니다.');
                }
            }
        };

        fetchData();
    }, [commnetList]);


    const sendMessage = async () => {
    
        try{
        const res= axios.post('http://localhost:8081/api/insertComment', {

            registNum : registNum,
            id: user.id,
            message: message,

        })

        alert('댓글이 등록되었습니다.')
   
        }catch (error) {

            if (error.response && error.response.status === 409) {
                alert('사용자 정보가 일치하지 않습니다.');
            } else {
                alert('서버 오류가 발생했습니다.');
            }
            
        }
     }
    




    return(

        <div className="ContentContainer">
            <div className="content">
                <span className="c1">{subject}</span>
                <span className="c2">작성자:{name}</span>
                <span className="c3">등록일:{registData}</span>
            </div>
            <div className="contentBox">
            <textarea
                value={content}
                rows="4"  // textarea의 높이 설정
                cols="9"      
                style={{ resize:'none', border:"2px solid #eee",width:"700px", height:"300px"}}  // 너비를 100%로 설정하여 부모 요소를 채움
            />
            </div>

            <div className="Comment">
            <textarea
                value={message}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="매너있게 댓글을 작성해주세요..."
                rows="4"  // textarea의 높이 설정
                cols="9"      
                style={{resize:'none',border:"2px solid #eee",width:"600px", height:"100px" }}  // 너비를 100%로 설정하여 부모 요소를 채움
            />
            <button onClick={sendMessage}>댓글등록</button>
            </div>

            <div className="Reply">
                <label>댓글</label>
            </div>

            {commnetList.map((item) => (
                    <ContentItem key={item.commentNum} item={item}  />
                ))}



        </div>

    )



}

export default Content;