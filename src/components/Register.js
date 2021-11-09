import React from 'react'
import '../index.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { db, auth } from "../firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import {    
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  onAuthStateChanged,  
  signOut } from "firebase/auth"


export default function Register() {

    const navigate = useNavigate();
    const[newUser, setNewUser] = useState(""); 
    const[registerPassword, setRegisterPassword] = useState("");
    const[loginEmail, setloginEmail] = useState("");
    const[loginPassword, setloginPassword] = useState("");

    const[currentUser, setCurrentUser] = useState([]);
    const[users, setUsers] = useState([]);

    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      // No user is signed in.
    }
    const userCollectionRef = collection(db, "users");

      onAuthStateChanged(auth, (userCurrent) => {
          setCurrentUser(userCurrent)
      })

    const register = async () => {
        await addDoc(userCollectionRef, {email: newUser, password: registerPassword})
        try {
        const user = await createUserWithEmailAndPassword(auth, newUser, registerPassword);
        console.log(user);
        } catch(e) {
        console.log(e.message);
        }
        
    }


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

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    }

    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        // console.log(data);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };

        getUsers();
    });

    return (
        <div>
        <h2>Register</h2>
        <div>
            <input type="email" placeholder="email" onChange={(e) => setNewUser(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)}/>
            <button onClick={register}>Register User</button>
            <p>Already a User? Click <button onClick={() => {navigate("/login")}} >here</button> to Login</p>
        </div>

      <div>
        <h3>Registerd Users: </h3>
        {users.map((user) => {
          return(
            <>
              {/* <div>
                <h4>{user.email}</h4>
                <button>Update Details</button>
                <button onClick={() => deleteUser(user.id)}>Delete User</button>
              </div> */}
              <div key={user.id}>
                <h4>{user.email}</h4>
                <button>Update Details</button>
                <button onClick={() => deleteUser(user.id)}>Delete User</button>
              </div>
            </>
          )
        })}
       </div>
        
    </div>
    )
}

