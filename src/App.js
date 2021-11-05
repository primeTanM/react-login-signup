import './index.css'
import {useState, useEffect} from "react"; 
import { db, auth } from "./firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut } from "firebase/auth"

function App() {
  const[newUser, setNewUser] = useState("");
  const[registerPassword, setRegisterPassword] = useState("");
  const[loginEmail, setloginEmail] = useState("");
  const[loginPassword, setloginPassword] = useState("");

  const[currentUser, setCurrentUser] = useState([]);
  const[users, setUsers] = useState([]);
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
    <div className="App">
      <div>
        <h2>Register</h2>
        <input type="email" placeholder="email" onChange={(e) => setNewUser(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Register User</button>
      </div>

      <div>
        <h2>Login</h2>
        <input type="email" placeholder="email" onChange={(e) => setloginEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e) => setloginPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
      </div>

      <div>
        <h3>Currently Logged In User: </h3>
        {currentUser?.email}
        <button onClick={logout}>Sign Out</button>
        <h3>Registerd Users: </h3>
        {users.map((user) => {
          return(
            <div key={user.id}>
              <h4>{user.email}</h4>
              <button>Update Details</button>
              <button onClick={() => deleteUser(user.id)}>Delete User</button>
            </div>
          )
        })}
        
      </div>

      
    </div>
  );
}

export default App;
