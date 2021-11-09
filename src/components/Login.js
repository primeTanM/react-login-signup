
import React from 'react'
import { useState} from "react"; 
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged,GoogleAuthProvider,
    signInWithPopup } from "firebase/auth"

const Login = () => {

    let navigate = useNavigate();
    const[loginEmail, setloginEmail] = useState("");
    const[loginPassword, setloginPassword] = useState("");
    const[currentUser, setCurrentUser] = useState([]);

    const signInWithGoogle = async() =>{
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
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

    // const provider = new GoogleAuthProvider();
    


    onAuthStateChanged(auth, (userCurrent) => {
        setCurrentUser(userCurrent)
    })
    const login = async() => {
        try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
        }
        catch(error) {
        console.log(error.message);
        }
    }

    const logout = async() => {
        await signOut(auth);
    }
    return (
        <div>
            <div>
                <h2>Login</h2>
                <input type="email" placeholder="email" onChange={(e) => setloginEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => setloginPassword(e.target.value)}/>
                <button onClick={login}>Login</button>
                <p>Dont have an account? <button onClick={() => {navigate("/")}}>Register</button> here </p>
                <p>----------------OR------------------</p>
                <button onClick={signInWithGoogle}>Sign In With Google</button>
                <h3>Currently Logged In User: </h3>
                {currentUser?.email}
                <button onClick={logout}>Sign Out</button>
            </div>
            
        </div>
    )
}

export default Login

