// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs,addDoc,onSnapshot,doc } from "firebase/firestore"; 



  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGkw-Q-QIYtxhLGiXVw9R_PwMVB2NowB0",
  authDomain: "travel-log-app-ea804.firebaseapp.com",
  projectId: "travel-log-app-ea804",
  storageBucket: "travel-log-app-ea804.appspot.com",
  messagingSenderId: "712277814943",
  appId: "1:712277814943:web:ac4c27e918afbe5d3a3caa",
  measurementId: "G-DGZ0311SLC"
};

// Initialize Firebase
const firebaseApp =  initializeApp(firebaseConfig);
//firebase.analytics();
  const dbs = getFirestore()
  const auth = getAuth();
  const storage = getStorage();

export { dbs ,collection,getDocs, auth, storage,addDoc,onSnapshot,doc};