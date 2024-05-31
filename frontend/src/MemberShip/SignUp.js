import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Signup.css';


//회원가입 화면

const SignUp = () => {

  const [form, setForm] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
    tall: '',
    weight: '',
    detailAddress:'',
    mbti:'',
    gender: '남자',
  });

  const { id, password, passwordCheck, name, tall, weight, gender, mbti,detailAddress } = form;
  const [upload, setUpload] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [message,setMessage] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => console.log("우편번호 서비스 스크립트 로드 완료");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 

    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setZipCode(data.zonecode);
    setAddress(fullAddress);
    closePostcode();
  };
  const openPostcode = () => {
    let element = document.getElementById('popupPostcode');
    if (!element) {
      element = document.createElement('div');
      element.id = 'popupPostcode';
      document.body.appendChild(element);
  
      // 닫기 버튼을 팝업 외부에 추가
      const closeButton = document.createElement('button');
      closeButton.textContent = '닫기';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';   // 버튼 위치 조정
      closeButton.style.right = '5px'; // 버튼 위치 조정
      closeButton.style.zIndex = '101'; // z-index를 팝업보다 높게 설정
      closeButton.onclick = closePostcode; // 닫기 버튼 클릭 이벤트
      document.body.appendChild(closeButton); // body에 직접 추가
    }
  
    element.style.display = 'none';
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    element.style.border = '1px solid #000';
    element.style.width = '400px';
    element.style.height = '300px';
    element.style.background = 'white'; // 배경색 추가
    element.style.paddingTop = '30px'; // 패딩 조정
  
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: handleComplete,
        width: 400, // 너비 조정
        height: 270  // 높이 조정 (패딩 고려)
      }).embed(element);
      element.style.display = 'block';
    } else {
      console.error('Daum Postcode library is not loaded.');
    }
  };
  
  const closePostcode = () => {
    const element = document.getElementById('popupPostcode');
    const closeButton = document.querySelector('button[textContent="닫기"]');
    if (element) {
      element.style.display = 'none';
    }
    if (closeButton) {
      document.body.removeChild(closeButton); // 닫기 버튼 제거
    }
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const changeImage = (evt) => {
    const file = evt.target.files[0];
    setUpload(file);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!id || !password || !name || password !== passwordCheck) {
      alert('필수 항목을 모두 입력하거나 비밀번호를 확인해 주세요.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('password', password);
      formData.append('name', name);
      formData.append('tall', tall);
      formData.append('weight', weight);
      formData.append('zipCode', zipCode);
      formData.append('gender', gender);
      formData.append('address', address);
      formData.append('detailAddress', detailAddress); 
      formData.append('mbti', mbti); 
      formData.append('upload', upload);
      const response = await axios.post('http://localhost:8081/api/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      setMessage("회원가입이 완료되었습니다.")
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


  const idCheck = async () => {

    if(id===''){

      setMessage('아이디를 입력하세요')
      return

    }


    try {
        const response = await axios.post('http://localhost:8081/api/overlapCheck', { id: id });
        setMessage(response.data);
    } catch (error) {
        if (error.response && error.response.status === 409) {
            setMessage('이미 사용중인 ID입니다.');
        } else {
            setMessage('서버 오류가 발생했습니다.');
        }
    }
};

  const pwCheck =() => {

    if(password === passwordCheck){
      setMessage("비밀번호를 제대로 입력했습니다.")
    }else{
      setMessage("비밀번호를 다시 확인해주세요")
    }



  } 

  return (

    <div className='SignUpContainer'>

      <h1>회원가입</h1>

        <div id="message"> 
          {message}
        </div>
        <div className='SignUpBox'>
        <p>
          <label>아이디 : </label>
          <input type='text' name='id' value={id} onChange={onChange} style={{ marginLeft: '50px' }}/>
          <button type="button" onClick={idCheck} style={{marginLeft:"10px"}}>중복확인</button>
        </p>
        <p>
          <label>패스워드 : </label>
          <input type='password' name='password' value={password} onChange={onChange} style={{ marginLeft: '36px' }}/>
        </p>
        <p>
          <label>패스워드 확인 : </label>
          <input type='password' name='passwordCheck' value={passwordCheck} onChange={onChange}/>
          <button type="button" onClick={pwCheck} style={{marginLeft:"10px"}}>중복확인</button>
        </p>
        <p>
          <label>이름 : </label>
          <input type='text' name='name' value={name} onChange={onChange} style={{ marginLeft: '65px' }}/>
        </p>
        <p>
          <label>우편번호 : </label>
          <input type='text' name='zipCode' value={zipCode} onChange={onChange} style={{ marginLeft: '36px', width:'50px' }}/>
          <button onClick={openPostcode} style={{marginLeft:'10px'}}>주소찾기</button>
          <div id="popupPostcode" style={{ display: 'none' }}></div>
        </p>
        <p>
          <label>주소 : </label>
          <input type='text' name='address' value={address} onChange={onChange} style={{ marginLeft: '65px',width:'300px' }}/>
        </p>
        <p>
          <label>상세주소 : </label>
          <input type='text' name='detailAddress' value={detailAddress} onChange={onChange} style={{ marginLeft: '36px', width:'300px' }}/>
        </p>

        <p>
          <label>키 : </label>
          <input type='text' name='tall' value={tall} onChange={onChange} style={{ marginLeft: '80px' }}/> cm
        </p>
        <p>
          <label>몸무게 : </label>
          <input type='text' name='weight' value={weight} onChange={onChange} style={{ marginLeft: '50px' }}/> kg
        </p>
    
        <p>
          <label>성별 : </label>
          <select name='gender' value={gender} onChange={onChange} style={{ marginLeft: '65px', width: '100px' }}>
            <option value='남자'>남자</option>
            <option value='여자'>여자</option>
          </select>
        </p>
        <p>
          <label>MBTI: </label>
          <input type='text' name='mbti' value={mbti} onChange={onChange} style={{ marginLeft: '65px', width: '40px' }}/>
        </p>
        <p>
          <label>프로필사진 : </label>
          <input type='file' onChange={changeImage} style={{ marginLeft: '22px' }}/>
        </p>
        <div className='ButtonMove'>
          <button type="submit" onClick={onSubmit}>회원가입</button>
          <button type="button" onClick={() => { /* 취소 로직 구현 */ }}>취소</button>
        </div>
        </div>
    </div>
  );
}

export default SignUp;