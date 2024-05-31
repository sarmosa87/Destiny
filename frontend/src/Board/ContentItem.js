import React from "react";

//댓글 리스트 별 데이터를 출력하는 화면

const ContentItem=({item})=>{

    const {commnetNum,message,commentData,name} = item


    return (


        <div className="CommentList">
            <span style={{fontSize:"13px"}}>{name} </span>
            <span style={{fontSize:"11px"}}>({commentData})</span>
            
            <div style={{marginTop:"20px"}}>
                {message}
            </div>
        </div>



    )


}

export default ContentItem