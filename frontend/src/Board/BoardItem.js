import React,{useState,useEffect} from 'react';



const BoardItem =({item}) => {

    const {registNum,subject,content,id,name,hitcount,registData} = item


 const onBoard =()=>{

  

 }


 return (

    <div>
        <span>{registNum}</span>
        <span>{subject}</span>
        <span>{name}</span>
        <span>{registData}</span>
        <span>{hitcount}</span>
    </div>


 )


};

export default BoardItem;