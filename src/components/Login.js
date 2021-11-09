
import React from 'react'
import { useState} from "react"; 
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

const Login = () => {

    let navigate = useNavigate();
    const[loginEmail, setloginEmail] = useState("");
    const[loginPassword, setloginPassword] = useState("");
    const[currentUser, setCurrentUser] = useState([]);


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
                <h3>Currently Logged In User: </h3>
                {currentUser?.email}
                <button onClick={logout}>Sign Out</button>
            </div>
            
        </div>
    )
}

export default Login

