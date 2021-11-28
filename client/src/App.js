import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL ,{Marker, Popup} from 'react-map-gl';
import { dbs,getDocs,collection,onSnapshot,doc } from './firebase'; 



import listLogEntries from './api'
import LogEntryForm from './LogEntryForm';
const App = () => {

  const [logEntries,setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28.6374213,
    longitude: 77.0642205,
    zoom: 3
  });

  const getEntries = async () => {
    //const logEntries = await listLogEntries();
    /*db.collection('Users')
      .doc('M23uyn45rgKEvsyZtIux')
      .collection('pins')
      .onSnapshot(
        (snapsht) => {
          setLogEntries(
            snapsht.docs.map((docs) => ({
              ids: docs.id,
              latitude: docs.data().latitude,
              longitude : docs.data().longitude
            })))
        }
      )
      */
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
             rating:doc.data().rating,
             visitDate: doc.data().visitDate,
             image:doc.data().image,


   
           }
           setLogEntries(logEntries => [...logEntries,data]);
      })

     

    });
      /*const querySnapshot = await getDocs(collection(dbs, "Users"));
      querySnapshot.forEach((doc) => {
        const pinData = collection(dbs, "pins")
        console.log(pinData)
        pinData.forEach((pin)=>{
          console.log(`${pin.id} => ${pin.data()}`);
        });
        
      });*/
      console.log(logEntries  )
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    console.log("hiii",longitude)
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
      onDblClick={showAddMarkerPopup}
    >
    <Marker latitude={48.8584} longitude={2.2945} offsetLeft={-20} offsetTop={-10}>
        <div>You are here</div>
    </Marker>
    {console.log(logEntries)}
      {logEntries?.map(entry => (
        console.log(entry.title),
        <React.Fragment>
        <Marker key={entry._id}
         latitude={entry.latitude} 
         longitude={entry.longitude} 
         offsetLeft={-15} 
         offsetTop={-30}>

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
          latitude={entry.latitude}
          longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup({ 
           [entry._id]: false,
         })}
          anchor="top" >
          <div className="popup"> 
          {console.log(entry)}
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
            <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
            {entry.image && <img src={entry.image} alt={entry.title}/>}
          </div>
      </Popup> ) : null
      }
      </React.Fragment>
      ))}
      {
        addEntryLocation ? (
          <>
            <Marker 
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
              offsetLeft={-15} 
              offsetTop={-30}>

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
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup"> 
                <LogEntryForm onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }} location={addEntryLocation}/>
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}
export default App;