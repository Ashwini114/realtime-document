import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios"
import openSocket from "socket.io-client"
import Document from "./Document"
import Preview from "./Preview"
import constants from "../constants"



const useStyles = makeStyles((theme) => ({
root: {
    flexGrow: 1,

  },
  avatarClass : {
    display: 'inline-flex',
    '& > *': {
      margin: theme.spacing(-0.8),
    },
   

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color : "#FFF"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  documentCard : {
      margin: "2%"
  }
 
}));



const Home = ({userData,changeStatus}) =>{
    const classes = useStyles();
    
   
    const [allUsers,updateUsers] = React.useState([])
    const [onlineUsers,updateOnlineUsers] = React.useState([])
    const socket = openSocket(constants.apiUrl)

React.useEffect(()=>{
getUsers()

 
 socket.emit('send-socket-id', { id: userData._id });
  socket.on('online', result => {
    getUsers()
  });
  socket.on('user-disconnected',result=>{
    getUsers()
  })
 
},[])

const getUsers = () =>{
  axios.get(constants.apiUrl+'users')
  .then((result)=>{
    updateUsers(result.data.users)
    let online = result.data.users.filter((item)=>item.online)
    updateOnlineUsers(online)
    console.log(online)
  })
}

const logout = () =>{
  socket.emit('logout')
  changeStatus('login')
}



    return(
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>

            <Typography variant="h6" className={classes.title}>
                Realtime Document
            </Typography>
            <Typography variant="h6" className={classes.title} onClick={()=>logout()}>
               Logout
            </Typography>
            
            </Toolbar>
        </AppBar>
        <div>
        <Card  variant="outlined" style={{backgroundColor: '#282c34',margin: "0 20%"}}>
        <CardContent>
           
         
         <Preview classes={classes} onlineUsers={onlineUsers} />


        </CardContent>
  
        </Card>
        <Document classes={classes} onlineUsers={onlineUsers} allUsers={allUsers}/>
        
       
        </div>

        </div>
    )
}

export default Home