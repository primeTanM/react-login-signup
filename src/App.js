import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import { Route, Routes, Link } from "react-router-dom";

function App(){
  return(
    <>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>
  )
}
 
export default App;
