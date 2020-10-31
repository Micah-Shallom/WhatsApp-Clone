import { Avatar, IconButton } from '@material-ui/core';
import { ChatBubbleOutlineRounded,DonutLargeRounded, MoreVertOutlined, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import SideBarChats from '../SideBarChats/SideBarChats';
import './SideBar.css';


const SideBar = () => {

  const [rooms , setRooms] = useState([]);
 

  const [{user}, dispatch] = useStateValue();
console.log(user)
  useEffect(() => {
   const unsubscribe = db.collection('rooms').onSnapshot(snapshot => 
      setRooms(snapshot.docs.map(doc => ({
        id : doc.id,
        data : doc.data()
      })))
    )

    return(() => {
      unsubscribe();
    })
  },[])

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <Avatar src={user ?.photoURL}/>

        <div className="sidebar__headerRight">
        <IconButton>
          <DonutLargeRounded/>
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineRounded/>
        </IconButton>
        <IconButton>
          <MoreVertOutlined/>
        </IconButton>
        </div>
      </div>

      <div className="sidebar__search">

        <div className="sidebar__searchContainer">
          <SearchOutlined/>
          <input type="text" placeholder='Search or start new chat' />
        </div>

      </div>

      <div className="sidebar__chats">
        <SideBarChats addNewChat/>
          {
            rooms.map(room => (
              <SideBarChats key={room.id} id={room.id} name={room.data.name} />
            ))
          }
     
      </div>
    </div>
  )
}

export default SideBar;
