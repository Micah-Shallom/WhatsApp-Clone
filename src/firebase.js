import firebase from 'firebase/app';
import  'firebase/firestore';
import  'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByCAe7jrLki8CyYPTv8cDejXvlFR0xBgc",
  authDomain: "whatsapp-clone-56f70.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-56f70.firebaseio.com",
  projectId: "whatsapp-clone-56f70",
  storageBucket: "whatsapp-clone-56f70.appspot.com",
  messagingSenderId: "433233656775",
  appId: "1:433233656775:web:5e3b7e04d4a0bec9d4b7e2",
  measurementId: "G-RM44CNMJY8"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider , db};

export default firebase;