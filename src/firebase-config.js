import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"
import { getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: "react-login-4efd0.firebaseapp.com",
    projectId: "react-login-4efd0",
    storageBucket: "react-login-4efd0.appspot.com",
    messagingSenderId: "517514569616",
    appId: "1:517514569616:web:a97af2bab535fabd0af515",
    measurementId: "G-VHGC3FDB8J"
}; 

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);    
export const auth = getAuth(app);
  

// apiKey: process.env.REACT_APP_API_KEY ,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_SENDER_ID,
// appId: process.env.REACT_APP_ID,
// measurementId: process.env.REACT_APP_MEASUREMENT_ID

// authDomain: "react-login-4efd0.firebaseapp.com",
// projectId: "react-login-4efd0",
// storageBucket: "react-login-4efd0.appspot.com",
// messagingSenderId: "517514569616",
// appId: "1:517514569616:web:a97af2bab535fabd0af515",
// measurementId: "G-VHGC3FDB8J"