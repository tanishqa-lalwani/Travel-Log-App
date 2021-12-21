
import React from "react";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import img from './Login/login2.png'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import { getAuth,auth,createUserWithEmailAndPassword,onAuthStateChanged,updateProfile } from "./firebase";
import "./register.css";

export default function Register({ close,setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault()
      setError("")
      setLoading(true)
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
  .then((userCredential) => {
    // Signed in 
   
    // ...
    close();

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  auth.onAuthStateChanged(function(user) {

    if (user) {
      
      // Updates the user attributes:

     updateProfile(auth.currentUser,{ // <-- Update Method here

       displayName: newUser.username,
       photoURL: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg"

     }).then(function() {

       // Profile updated successfully!
       //  "NEW USER NAME"
    //const myStorage = window.localStorage;

   // myStorage.setItem("user",user.displayName)
    //window.location.reload(false);


    console.log(user)
       var displayName = user.displayName;
       // "https://example.com/jane-q-user/profile.jpg"
       var photoURL = user.photoURL;

     }, function(error) {
       // An error happened.
     });     

   }

  });
  };
  return (
    <div className="registerContainer">
      
      {/* <div className="logo">
        <Room className="logoIcon" />
        <span>LamaPin</span>
      </div>
      <div className = "register__parent">
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
      </div> */}
      <div className="left__login" style={{ backgroundImage: `url("${img}")`, backgroundSize: 'cover' }}></div>
     
      <div className="parent__container__login">
        <div>
          
          
          <div className="login__title">
            <h3> Register </h3>
            <CloseIcon onClick={close} style={{ background: 'rgba(0,150,255)', padding: '10px', borderRadius: '50%', color: 'white' }} />
          </div>
          
          
          <div className="login__container">
            <TextField id="outlined-basic" inputRef={usernameRef} name="username" label="Username" variant="outlined" />

            <TextField id="outlined-basic" inputRef={emailRef} name="email" label="Email" variant="outlined" />
            <TextField id="outlined-basic" min = "6" inputRef={passwordRef} name="password" label="Password" variant="outlined" type="password" />
          </div>
          <div className="validation-error">
            {success && (
              <span className="success">Successfull. You can login now!</span>
            )}
            {error && <span className="failure">Something went wrong!</span>}
            <span className="text">{error}</span>
          </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection:'column', gap:'20px'}}>
          <Button id='trial__but' onClick={handleSubmit} variant="filled" style={{ background: '#699DFF', fontFamily: 'Poppins, sans-serif', textTransform: 'capitalize', color: 'white' }}>
          {loading?<CircularProgress size={25} style={{margin:'auto', color:'white'}}/>:<>SignUp</>}
          </Button>
          <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
        </div>

      </div>
    </div>
  );
}
