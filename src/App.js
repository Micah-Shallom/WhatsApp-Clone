import React from 'react'
import SideBar from './components/SideBar/SideBar';
import './App.css'
import Chats from './components/Chats/Chat';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';


const App = () => {

  const [{user}, dispatch] = useStateValue();

  return (
    //BEM naming convention

    <div className="App">
     {
       !user ?  (
         <Login/>
       ) : (
        <div className="app__body">
      <Router>
        {/* <Switch> */}

            <SideBar/>
            <Route path='/rooms/:roomId'>
              <Chats/>
            </Route>
            <Route exact path='/'>
              <Chats/>
            </Route>
         
        {/* </Switch> */}
      </Router>
       
      </div>
       ) 
     }

    </div>
  )
}

export default App
