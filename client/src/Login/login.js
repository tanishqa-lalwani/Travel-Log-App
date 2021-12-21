import React, { useState, useRef } from 'react'
import './login.css'
import { Link, useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';
import {Close} from "@material-ui/icons";
import img from './login3.png'
import google_logo from './google_logo.jpg'
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import { getAuth, signInWithPopup, GoogleAuthProvider,auth,provider,signInWithEmailAndPassword } from "../firebase";


function Login({ close,setShowLogin, setCurrentUsername,myStorage }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const myStorage = window.localStorage;
    
        myStorage.setItem("user",user.displayName)
        close();

        console.log(user)
        //window.location.reload(false);

        history.push(`/${user.uid}/${user.displayName}`);

        window.location.reload(false);


        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    
    
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signInWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value).then((res) => {
        // if(res.user.displayName === "Nutritionist")
        // {
        //  db.collection('Users').doc('Nutritionist').collection('staff').doc(res.user.uid)
        //  .onSnapshot(
        //    snap=>{
        //      console.log(snap,res.user.uid)
        //      if(snap.data()?.verify===0)
        //      {auth.signOut(); history.push('/verification') }
        //      else 
        //      history.push(`/${res.user.uid}/${res.user.displayName==="User" ? "dashboard":"Nutritionistdashboard"}`);
        //     }) 
        // }
        // else
        //   history.push(`/${res.user.uid}/${res.user.displayName==="User" ? "dashboard":"Nutritionistdashboard"}`);
       
      
       var user = res.user
        setCurrentUsername(user.displayName);

      myStorage.setItem('user', user.displayName);
      setShowLogin(false)
        history.push(`/${res.user.uid}/${res.user.displayName}`);
        
        close();
        window.location.reload(false);

      })
        .catch((error) => {
          console.log(error.code);
          if (error.code == 'auth/wrong-password')
            setError('Wrong Password.');
          else if (error.code == 'auth/user-not-found')
            setError('This user don\'t exist. Please Sign Up.');
          else
            setError(error.message);
        });

    } catch {
      setError("Failed to log in, please try again after sometime.")
    }

    setLoading(false)
  }

  return (
    <div className="Login">
      <div className="left__login" style={{ backgroundImage: `url("${img}")`, backgroundSize: 'cover' }}></div>
      <div className="parent__container__login">
        <div>

          <div className="login__title">
            <h3> Log in </h3>
            <Close onClick={close} style={{ background: 'rgba(0,150,255)', padding: '10px', borderRadius: '50%', color: 'white' }} />
          </div>
          <div className="login__container">
            <TextField id="outlined-basic" inputRef={emailRef} name="email" label="Email" variant="outlined" />
            <TextField id="outlined-basic" inputRef={passwordRef} name="password" label="Password" variant="outlined" type="password" />
          </div>
          <div className="validation-error">
            <span className="text">{error}</span>
          </div>
          </div>
          <div style = {{border : '3px solid #F0F0F0',display : 'flex',justifyContent : 'center',marginBottom : '10px'}}>
          <Button
            startIcon = {<img style = {{width : '40px', height : '40px'}} src = {google_logo}/>}
            //style = {{color : 'white'}}
            onClick = {signinWithGoogle}
            >Sign In With Google </Button>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection:'column', gap:'20px'}}>
          <Button id='trial__but' onClick={handleSubmit} variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white' }}>
          {loading?<CircularProgress size={25} style={{margin:'auto', color:'white'}}/>:<>Log in</>}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Login