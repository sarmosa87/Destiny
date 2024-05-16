import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../CSS/Profile.css'


const Profile = ({onClose,id}) => {


    const [profile,setProfile] = useState({ 
    name: "",
    gender: "",
    tall: "",
    weight: "",
    saveFileName: ""
    })


    const {name,gender,tall,weight,saveFileName} = profile


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/profile/${id}`);
                setProfile(res.data);
                console.log('API Response:', res.data); // API 응답 확인
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);





    return (

        <div className='profileContainer'>
            <h1>프로필 확인</h1>
            <div className='profileBox'>
                <div className='profileBox2'>
                <img src={`http://localhost:8081/image/${saveFileName}`} alt={name} width={200} height={200} />
                </div>
                <div profileBox3>
                <p>이름:{name}</p>
                <p>성별:{gender}</p>
                <p>키:{tall}</p>
                <p>몸무게:{weight}</p>
                <button onClick={onClose}>닫기</button>
                </div>
        
            </div>
        </div>


    )

    };

    export default Profile;