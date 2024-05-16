import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css'


// props에서 updateUser 함수를 받음
const Login = ({ updateUser }) => {



    const [form, setForm] = useState({
        id: '',
        password: ''
    });
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    


    useEffect(() => {
     

       
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
            const res = response.data;
            console.log("========="+response.data.id)

            if (res.error) {
                setMessage(res.error);
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } else if (res.success) {
                localStorage.setItem('user', JSON.stringify(res.user));
                updateUser(res.user);
                setLogin(true);
                setName(res.user.name);
            }
        } catch (error) {
            setMessage('회원정보가 없습니다.');
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }
    };

    const logout = async () => {
        try {
            //const res = await axios.get('http://localhost:8081/api/logout');
            localStorage.removeItem('user');
            updateUser(null);
            setLogin(false);
            setMessage("로그아웃이 완료됐습니다.");
            setName('');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className='Login'>
            <h3>{message}</h3>
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
                    <p>{user.name}님 반갑습니다.</p>
                    <div className='Movement2'>
                        <div>
                        <button onClick={logout}>로그아웃</button>
                        </div>
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