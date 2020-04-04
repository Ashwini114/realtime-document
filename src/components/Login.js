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
      padding: "5%"
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
    signupbtn : {
      marginTop : "10px",
      float : "right"
    }

  }));
  

const Login = (props) =>{
    const classes = useStyles();
    const [values,changeValues] = React.useState({email:"",password:""});
    const [loginStatus,changeLoginStatus] = React.useState(1)
    const [errorMessage,changeErrorMessage]=React.useState("")

    const handleChanges = (e,field) =>{
      let obj =values;
      obj[field]=e.target.value;
      changeValues(obj)
    
    }

    const loginUser = ()=>{
        if(values.email == "" || values.password == "")
        {
          changeLoginStatus(0)
          changeErrorMessage("Please fill in email and password")
        }
        else
        {
          changeLoginStatus(1)
          axios.post(constants.apiUrl+'login',values)
          .then((res)=>{
            props.changeStatus('loggedIn',res)
          })
          .catch(err=>{
            changeLoginStatus(0)
            if(err.response)
            changeErrorMessage(err.response.data.message)
          })
        }
    }


   const error =<Alert severity="error">
   <AlertTitle>Error</AlertTitle>
    {errorMessage}
   </Alert>;

    return(
        <div>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                {(loginStatus == 0)?error:""}
                    <Typography variant="h5" component="h2">
                      Login
                    </Typography>
                    <div >
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
                    <Button variant="contained" color="primary" onClick={()=>loginUser()}>
                    Submit
                    </Button>
                   
                </CardContent>
                     <Divider />
                    <Button variant="contained" color="secondary" onClick={()=>props.changeStatus('register')} className={classes.signupbtn}>Signup</Button>

                </Card>
        </div>
    )
}

export default Login