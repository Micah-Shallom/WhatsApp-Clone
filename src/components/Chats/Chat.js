import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {db} from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Chat.css';
import firebase from 'firebase';


const Chats = () => {
  const [seed , setSeed] = useState('');
  const [input,setInput] = useState('');
  const {roomId} = useParams();
  const [roomName , setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();


  useEffect(() => {
    if(roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))

      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))
      ))
    }
  },[roomId])
  
  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
  },[roomId]);
  
  const sendMessage = (e) => {
      e.preventDefault();
      console.log('You typed >>>>', input);

      db.collection('rooms').doc(roomId).collection('messages').add({
        name : user.displayName,
        message : input,
        timestamp : firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput('');

  };
  return (
    <div className='chat'>
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            {
              new Date(
                messages[messages.length - 1] ?.timestamp?.toDate()
              ).toUTCString()
            }
          </div>

          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
          </div>
        </div>

        <div className="chat__body">
        {
          messages.map(message => (
            <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timeStamp">
                {
                  new Date(message.timestamp?.toDate()).toUTCString()
                }
              </span>
            </p>
          ))
        }


        </div>

        <div className="chat__footer">
          <InsertEmoticon/>
            <form >
              <input type="text" onChange={e => setInput(e.target.value)} value={input} placeholder='Type a message'/>
              <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
          <MicOutlined/>
        </div>
    </div>
  )
}

export default Chats;
