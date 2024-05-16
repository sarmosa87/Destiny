import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import '../CSS/Style.css'
import Modal from '../Chatting/Modal';
import PostSender from '../Post/PostSender';

const List = () => {


    const [lists, setLists] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [optionShow,setOptionShow] = useState(false)
    const [form,setForm] = useState({

        gender:'',
        tall:'',
        weight:''
    })

    const [confirmForm,setConfirmForm] = useState({

        gender:'',
        tall:'',
        weight:''


    })

    const {gender,tall,weight} = form


        const onChange = (evt) => {

        const {value,name} = evt.target
    
        setForm({
              ...form,
              [name]:value
          })
      }


      const option = () => {

        setOptionShow(!optionShow)

      }


      const confirm = () =>{

        setConfirmForm(form)
        option()

      }


    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data with:', confirmForm);
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
        <div className='wrap'>

            <p onClick={option}>
                옵션선택
            </p>

            {
                optionShow &&(

                <div >
                    <p>
                        성별:<input type='text' name='gender' value={gender} onChange={onChange} />
                    </p>

                    <p>
                        키:<input type='text' name='tall' value={tall} onChange={onChange} />
                    </p>

                    <p>
                        몸무게:<input type='text' name='weight' value={ weight} onChange={onChange} />
                    </p>

                    <button onClick={confirm }>확인</button>

                </div>


                )
            }
            <h1>유저 리스트</h1>
            <ul className='list'>
                {lists.map((item) => (
                    <Item key={item.id} item={item}  onItemClick={handleItemClick} />
                ))}
            </ul>

            {/*selectedUser && <Modal users={selectedUser} onClose={handleCloseModal} />*/}
            {selectedUser && <PostSender users={selectedUser} onClose={handleCloseModal} />}
        </div>
    );
};

export default List;