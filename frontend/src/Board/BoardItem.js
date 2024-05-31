import React,{useState,useEffect} from 'react';

//게시판 리스트 별 데이터를 출력하는 화면


const BoardItem =({item,onContent}) => {

    const {registNum,subject,content,id,name,hitcount,registData} = item



 return (

    <div className='BordList' onClick={()=>onContent(registNum)}>
        <span className='c1'>{registNum}</span>
        <span className='c2'>{subject}</span>
        <span className='c3'>{name}</span>
        <span className='c4'>{registData}</span>
        <span className='c5'>{hitcount}</span>
    </div>


 )


};

export default BoardItem;