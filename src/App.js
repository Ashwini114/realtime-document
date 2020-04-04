import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  const [userStatus,changeUserStatus] = React.useState('login')
  const [userData,changeUserData] = React.useState([])
  
  const updateStatus = (status,data=[]) =>{
    if(data.data)
    changeUserData(data.data.loggedUser)
    changeUserStatus(status)
  }

  let appBody;
  if(userStatus == 'login')
    appBody = <Login  changeStatus={updateStatus}/>
  else if(userStatus == 'register')
    appBody = <Register  changeStatus={updateStatus}/>
  else if(userStatus == 'loggedIn')
    appBody = <Home  changeStatus={updateStatus} userData={userData}/>    
  return (
    <div className="App">
     {appBody}
    </div>
  );
}

export default App;
