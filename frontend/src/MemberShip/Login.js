import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css'


//로그인을 할 수 있는 화면

// props에서 updateUser 함수를 받음
const Login = ({updateUser,logout2}) => {

    const [form, setForm] = useState({
        id: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, [user]);
   

    const handleSignUp = () => {
        navigate('/addUser');
    };

    const { id, password } = form;
    

    const onChange = (evt) => {
        const { value, name } = evt.target;
        setForm({
            ...form,
            [name]: value
        });
    };

 

    const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/login', {
                id: id,
                password: password,
            });
          const user = response.data;

        if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보를 localStorage에 저장
            setUser(user)
            updateUser(user)
        }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage('사용자 정보가 일치하지 않습니다.');
            } else {
                setMessage('서버 오류가 발생했습니다.');
            }
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('user');
            setUser(null)
            logout2()
            setMessage("로그아웃이 완료됐습니다.");
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className='LoginContainer'>
            <div className='LoginBox'>{message}</div>
            <h1>로그인</h1>
            {!user && (
            <div>
                <div className='Movement1'>
                    <p>아이디: <input type='text' name='id' value={id} onChange={onChange} id='p1' /></p>
                    <p>패스워드: <input type='password' name='password' value={password} onChange={onChange} id='p2' /></p>
                </div>
            <div className='Movement2'>
                <div>
                        <button onClick={onSubmit}>로그인</button>
                </div>
                <div id='Movement3'>
                        <button onClick={handleSignUp}>회원가입</button>
                </div>
            </div>    
            </div> 
            )}
            {user && (
                <div>
                    <p style={{textAlign:"center", height:"90px"}}>{user.name}님 반갑습니다.</p>
                    <div className='Movement2'>             
                        <button onClick={logout}>로그아웃</button>                    
                        <div id='Movement3'>
                        <button onClick={handleSignUp}>회원가입</button>
                        </div>
                 </div>   
                </div>
            )}
        </div>

    );
};

export default Login;