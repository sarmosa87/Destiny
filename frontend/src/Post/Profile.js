import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../CSS/Profile.css'


const Profile = ({onClose,id}) => {


    const [profile,setProfile] = useState({ 
    name: "",
    gender: "",
    tall: "",
    weight: "",
    mbti:"",
    saveFileName: ""
    })


    const {name,gender,tall,weight,saveFileName,mbti} = profile


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
            <h1>프로필 </h1>
                <div className='profileBox'>
                <div className='photo'>
                <img src={`http://localhost:8081/image/${saveFileName}`} alt={name} />
                </div>           
                <div style={{border:"1px solid black",width:"300px", height:"250px",display: "flex",flexDirection: "column",alignItems:"flex-start",justifyContent:"center",paddingLeft:"20px"}}>
                <p style={{margin:"7px"}}>이름: {name}</p>
                <p style={{margin:"7px"}}>성별: {gender}</p>
                <p style={{margin:"7px"}}>키: {tall}</p>
                <p style={{margin:"7px"}}>몸무게: {weight}</p>
                <p style={{margin:"7px"}}>MBTI: {mbti}</p>
                </div>
                </div>
                <div style={{ display: "flex", justifyContent:"center",margin:"auto"}}>
                <button onClick={onClose} style={{width:"100px",marginTop:"10px",borderRadius:"10px"}} >닫기</button>
                </div>
        </div>

    )

    };

    export default Profile;