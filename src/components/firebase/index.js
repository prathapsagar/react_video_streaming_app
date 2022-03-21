import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhxw8eeXMtWfobM0hYSXckZ_4BhdlX5QA",
  authDomain: "mernupload.firebaseapp.com",
  projectId: "mernupload",
  storageBucket: "mernupload.appspot.com",
  messagingSenderId: "14950479840",
  appId: "1:14950479840:web:12176f9c31cc0d4fc65d85",
  measurementId: "G-624D30REN3",
};

export const app = firebase.initializeApp(firebaseConfig);
