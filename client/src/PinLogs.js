import * as React from 'react';
import { Room, Star, StarBorder,PersonPinCircle,LockOpen ,Lock} from "@material-ui/icons";
import Button from '@material-ui/core/Button';

import { useState, useEffect } from 'react';
import ReactMapGL ,{Marker, Popup} from 'react-map-gl';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Link, useHistory } from "react-router-dom"


import { dbs,getDocs,collection,onSnapshot,doc,auth,signOut } from './firebase'; 
import Login from "./Login.jsx"
import Register from './Register';
import { format } from "timeago.js";

import LoginModal from './Modals/LoginModal'
import SignUpModal from './Modals/SignUpModal'

import './App.css'


import listLogEntries from './api'
import LogEntryForm from './LogEntryForm';
import Recipeitem from './PinCard/Recipeitem';
const PinLogs = () => {

  const myStorage = window.localStorage;
  const history = useHistory()

  const [logEntries,setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [showLogin, setShowLogin] = useState(false);

  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [showRegister, setShowRegister] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28.6374213,
    longitude: 77.0642205,
    zoom: 3
  });

  const handleLogout = () => {
    signOut(auth).then(() => {
  // Sign-out successful.
      console.log("signout")
      }).catch((error) => {
  // An error happened.
    });
    setCurrentUsername(null);

    myStorage.removeItem("user");
    history.push(`/`);

    
  };

  const getEntries = async () => {
      const querySnapshot = await getDocs(collection(dbs, "Logs"));
      querySnapshot.forEach((document)=>{
        const unsub = onSnapshot(doc(dbs, "Logs",document.id), (doc) => {
          // console.log("Current data: ", doc.data());
            const data = {
             _id : doc.id,
             latitude : doc.data().latitude,
             longitude : doc.data().longitude,
             title : doc.data().title,
             description : doc.data().description,
             comments : doc.data().comments,
             rating:isNaN(parseInt(doc.data().rating))?1 : parseInt(doc.data().rating),
             visitDate: doc.data().visitDate,
             image:doc.data().image,
             username : doc.data().username,   
           }
           setLogEntries(logEntries => [...logEntries,data]);
      })

     

    });
      console.log(logEntries)
  };

  useEffect(() => {
    getEntries();
  }, [currentUsername]);

  const handleMarkerClick = (id, lat, long) => {
    setShowPopup({
      [id]: true,
    }) 
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoidHJhdmVsLW1hcCIsImEiOiJja3Z0YWRmb2cxOTEzMzFxcDI4MWtkNms5In0.YJP4eM9qlZjMD8bg6lzYTg"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle = "mapbox://styles/travel-map/ckvtbjh5d1v1a14plrfkmdumf"
      onDblClick={currentUsername && showAddMarkerPopup}

    >
    {console.log(currentUsername)}
    
      {logEntries?.map(entry => (
        <React.Fragment>
        {/* <Marker key={entry._id}
         latitude={entry.latitude} 
         longitude={entry.longitude} 
         offsetLeft={-15} 
         offsetTop={-30}> */}
         <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
              st
          >
            <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color:
                    currentUsername === entry.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(entry._id, entry.latitude, entry.longitude)}
              />

        

          <div 
           onClick = {() => setShowPopup({
           [entry._id]: true,
         })}>
          <svg className="marker" style={{width: '30px', height: '30px',}} 
          viewBox="0 0 24 24" width="48" height="48" stroke-width="0.8" fill="crimson" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
        </Marker>
      {
        showPopup[entry._id] ? ( 
        <Popup
          key = {entry._id}
          className = "popup_"
          latitude={entry.latitude}
          longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup({ 
           [entry._id]: false,
         })
         
        }
          anchor="top"
          >
          {/* <div className="popup"> 
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
            <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
            {entry.image && <img src={entry.image} alt={entry.title}/>}
          </div> */}
           {/* <div className="card">
             {/* {entry.image} 
              <ImageList rowHeight={160} cols={3}>
              {
                <ImageListItem  cols={1}>

                    <img src={entry.image} alt={"Hello"} />
                </ImageListItem>
              }
              </ImageList>
                  <label>Place</label>
                  <h4 className="place">{entry.title}</h4>
                  <label>Review</label>
                  <p className="desc">{entry.description}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(entry.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{entry.username}</b>
                  </span>
                  <span className="date">{format(entry.visitDate)}</span>
            </div> */}
            <Recipeitem 
            title = {entry.title}
            image = {entry.image}
            rating = {entry.rating}
            description = {entry.description}
            comments = {entry.comments}
            username = {entry.username}
            visitDate = {entry.visitDate}
            />
      </Popup> ) : null
      }
      </React.Fragment>
      ))}
      
      {currentUsername ? (
          <Button style = {{
            position: 'absolute',top : '10px',right : '10px',marginRight :'20px',backgroundColor : '#147AC2',color : 'white'}}className="button logout" 
            startIcon = {<LockOpen/>} 
            onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <div className="buttons" >
              {/* <div className="button login" > */}
              <Button style = {{ backgroundColor : 'teal', color : 'white',marginRight : '10px'}} startIcon = {<PersonPinCircle style={{ fontSize:'22px'}}/>} onClick={() => setShowLogin(true) }>
              Log in
            </Button>
              {/* </div> */}
          
            <Button
            startIcon = {<Lock style={{ fontSize:'18px'}}/>}
            style = {{backgroundColor : 'slateblue',color : 'white'}}
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </Button>
          </div>
        )}
        {showRegister && <SignUpModal setShowRegister={setShowRegister} />} 
         {/* {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}  */}
        {showLogin && (
          <LoginModal
            text="Login" border="none" color="white"
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
       
      {
        addEntryLocation ? (
          <>
            <Marker 
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: "tomato",
                    cursor: "pointer",
                  }}
              />

              <div>
                <svg className="marker" style={{width: '30px', height: '30px',}} 
                viewBox="0 0 24 24" width="48" height="48" stroke-width="0.8" fill="crimson" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              className = "popup_"
              onClose={() => setAddEntryLocation(null)}
               >
                <LogEntryForm onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }} location={addEntryLocation} username = {currentUsername}/>
            </Popup>

          </>
        ) : null
        
      }
    </ReactMapGL>
  );
}
export default PinLogs;