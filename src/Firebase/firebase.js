import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "todos-auth-806db.firebaseapp.com",
  databaseURL: "https://todos-auth-806db.firebaseio.com",
  projectId: "todos-auth-806db",
  storageBucket: "todos-auth-806db.appspot.com",
  messagingSenderId: "1035659923519",
  appId: "1:1035659923519:web:ae71e0100dabda1a74e88a",
  measurementId: "G-Q4EEZ9HMME"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
