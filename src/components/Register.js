import React from 'react'
import '../index.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { db, auth } from "../firebase-config";
import { collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


export default function Register() {

    const navigate = useNavigate();
    const[newUser, setNewUser] = useState(""); 
    const[userName, setUserName] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const[currentUser, setCurrentUser] = useState([]);
    const[users, setUsers] = useState([]);

    const user = auth.currentUser;

    if (user) {
      
    } else {
      // No user is signed in.
    }

    const userCollectionRef = collection(db, "users");

    onAuthStateChanged(auth, (userCurrent) => {
        setCurrentUser(userCurrent)
    })

    const register = async () => {
        // const userDocRef = doc(userCollectionRef, newUser)
        // await setDoc(userDocRef, {username: userName, email: newUser, password: registerPassword})
        
        try {
          const user = await createUserWithEmailAndPassword(auth, newUser, registerPassword);
          await addDoc(userCollectionRef, {username: userName, email: newUser, password: registerPassword})
          navigate("/login");
          console.log(user);
        } 
        catch(error) {
          switch(error.code){
            case "auth/email-already-in-use":
              window.alert("Email already registered");
              break;
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              window.alert(error.message)
            default:
              //do nothing

          }
        }
        
    }


    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    }

    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };

        getUsers();
    });

    return (    
        <div>
        <h2>Register</h2>
        <div>
            <input type="text" placeholder="Your username..." onChange={(e) => setUserName(e.target.value)}/>
            <input type="email" placeholder="email..." onChange={(e) => setNewUser(e.target.value)}/>
            <input type="password" placeholder="Password..." onChange={(e) => setRegisterPassword(e.target.value)}/>
            <button type="submit" onClick={register}>Register User</button>
            <p>Already a User? Click <button onClick={() => {navigate("/login")}}>here</button> to Login</p>
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

