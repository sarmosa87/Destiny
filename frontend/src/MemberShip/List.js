import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import PostSender from '../Post/PostSender';
import '../CSS/UserList.css';
import Option from './Option';


//이상형찾기 리스트를 출력하는 화면

const List = () => {


    const [lists, setLists] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [optionShow,setOptionShow] = useState('')
    const [form,setForm] = useState({

        gender:'',
        tall:'',
        weight:'',
        mbti:''
    })

    const [confirmForm,setConfirmForm] = useState({

        gender:'',
        tall:'',
        weight:'',
        mbti:''


    })



        const onChange = (evt) => {

        const {value,name} = evt.target
    
        setForm({
              ...form,
              [name]:value
          })
      }


      const onOption = () => {

        setOptionShow(true)

      }


      const submitOption = () =>{

        setConfirmForm(form)
        setOptionShow(false)

      }


      const closeOption = () =>{

        setOptionShow(false)

      }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post('http://localhost:8081/api/getList',confirmForm);
                setLists(res.data.lists);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [confirmForm]);

    const handleItemClick = (item) => {
        setSelectedUser(item);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className='userListContainer'>
             <span style={{marginLeft:"450px",color:'green'}}>
                원하는 이성을 선택하면 쪽지를 보낼 수 있습니다. 쪽지 1회당 500 다이아입니다.
            </span>
            <span onClick={onOption} style={{color:'red',marginLeft:"300px"}}>
                옵션선택 
            </span>

            {
                optionShow &&(

                    <Option closeOption={closeOption} onChange={onChange} form={form} submitOption={submitOption }/>

                )
            }
            <h1>유저 리스트</h1>
            <div className='userList'>
                {lists.map((item) => (
                    <Item key={item.id} item={item}  onItemClick={handleItemClick} />
                ))}
            </div>
            {/*selectedUser && <Modal users={selectedUser} onClose={handleCloseModal} />*/}
            {selectedUser && <PostSender users={selectedUser} onClose={handleCloseModal} />}
        </div>
    );
};

export default List;