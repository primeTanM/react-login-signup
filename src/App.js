import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { Route, Routes, Link } from "react-router-dom";

function App(){
  return(
    <>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </>
  )
}
 
export default App;
