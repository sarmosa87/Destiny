import React from "react";
import '../CSS/UserList.css';


//이상형페이지에서 선호하는 스타일을 선택할 수 있는 화면


const Option = ({closeOption,onChange,form,submitOption}) =>{


    const {gender,tall,weight,mbti} = form



    return(

        <div className="OptionContainer">
                <h3 style={{textAlign:"center",fontSize:"15px"}}>옵션선택</h3>
                    <p>
                    <label style={{marginLeft:"30px"}}>성별:</label>
                    <input type='text' name='gender' value={gender} onChange={onChange} style={{marginLeft:"10px", width:"40px"}}/>
                    </p>

                    <p>
                     <label style={{marginLeft:"30px"}}> 키:</label> 
                    <input type='text' name='tall' value={tall} onChange={onChange} style={{marginLeft:"10px", width:"40px"}} />cm
                    </p>

                    <p>
                    <label style={{marginLeft:"30px"}}>몸무게:</label> 
                    <input type='text' name='weight' value={ weight} onChange={onChange} style={{marginLeft:"10px", width:"40px"}} />kg
                    </p>

                    <p>
                    <label style={{marginLeft:"30px"}}>MBTI:</label>
                    <input type='text' name='mbti' value={mbti} onChange={onChange}  style={{marginLeft:"10px", width:"40px"}}/>
                    </p>
                    <div style={{display:"flex", justifyContent:"center"}}>
                    <button onClick={submitOption } style={{marginRight:"10px"}}>확인</button>
                    <button onClick={closeOption }>취소</button>
                    </div>
        </div>


    )



}

export default Option;