import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { db } from '../../firebase';
import './SideBarChats.css'

const SideBarChats = ({addNewChat,id,name}) => {

  const [seed , setSeed] = useState('');
  const [messages , setMessages] = useState([])
  // const {path,url} = useRouteMatch();

  useEffect(() => {
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp' , 'desc').onSnapshot(snapshot => (
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
  },[id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  },[]);

  const createChat = () => {

    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //Do something nice
      alert('ChatRoom Created')
      db.collection('rooms').add({
        name : roomName
      })
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    {/* <Link to={`${url}/${id}`}> */}
    <div className='sidebarChat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>

      </div>
    </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      Add New Chat
    </div>
  )
}

export default SideBarChats
