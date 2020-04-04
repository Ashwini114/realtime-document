import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
import constants from "../constants"

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      margin : "10%",
      padding : "5%"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    forminput : {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
    },
    loginbtn: {
      marginTop : "10px",
      float : "right"
    }

  }));
  

const Register = (props) =>{
    const classes = useStyles();
    const [values,changeValues] = React.useState({first_name:"",last_name:"",email:"",password:""});
    const [registerStatus,changeRegisterStatus] = React.useState(2)
    const [errorMessage,changeErrorMessage]=React.useState("")

    const handleChanges = (e,field) =>{
       let obj =values;
      obj[field]=e.target.value;
      changeValues(obj)
      
    }
    const registerUser = () =>{
       if(values.first_name == ""  || values.email == "" ||  values.password == "")
       {
         changeRegisterStatus(0)
         changeErrorMessage("Please fill all the required fields")
       }
       else{
         axios.post(constants.apiUrl+"auth/createUser",values)
         .then((res)=>{
           
           changeRegisterStatus(1)
         }).catch((err)=>{
           changeRegisterStatus(0)
           if(err.response)
           changeErrorMessage(err.response.data.message)
         })

         
       }
    }


    const success =<Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    User successfully registered. Login to continue
    </Alert>;
    const error =<Alert severity="error">
    <AlertTitle>Error</AlertTitle>
     {errorMessage}
    </Alert>;
    
   
    return(
        <div>

              <Card className={classes.root} variant="outlined">


                <CardContent>
                  
                    {(registerStatus == 1)?success:(registerStatus == 0)?error:""}
                    <Typography variant="h5" component="h2">
                      Register
                    </Typography>
                    <div >
                    <TextField
                    id="filled-full-width"
                    label="First name *"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    onChange={(e, value) =>  handleChanges(e,"first_name") }/>
                    
                    <TextField
                    id="filled-full-width"
                    label="Last name"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    onChange={(e, value) =>  handleChanges(e,"last_name") }
                    />
                    <TextField
                    id="filled-full-width"
                    label="Email *"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    onChange={(e, value) =>  handleChanges(e,"email") }
                    
                    />
                    <TextField
                    id="filled-full-width"
                    label="Password *"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    onChange={(e, value) =>  handleChanges(e,"password") }
                    type="password"
                    />
                    </div>
                    <Button variant="contained" color="primary" onClick={()=>registerUser()}>
                    Submit
                    </Button>
                </CardContent>
                <Divider />
                    <Button variant="contained" color="secondary" onClick={()=>props.changeStatus('login')} className={classes.loginbtn}>Login</Button>

                </Card>
        </div>
    )
}

export default Register