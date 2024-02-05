import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvf17nDo6sNZmf9tEBHI6ABsboiR8pQQk",
    authDomain: "firstapp-81884.firebaseapp.com",
    databaseURL: "https://firstapp-81884-default-rtdb.firebaseio.com",
    projectId: "firstapp-81884",
    storageBucket: "firstapp-81884.appspot.com",
    messagingSenderId: "640215432215",
    appId: "1:640215432215:web:52a2c185664dd83d90b052",
    measurementId: "G-JWCKZFRN31"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);