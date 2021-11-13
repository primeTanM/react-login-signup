//react modules
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
//authentication components
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
//todolist components
import TodoApp from "./components/TodoApp";


function App(){
  return(
    <>
    <Routes>  
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='*' element={<PageNotFound/>} />
      <Route path='/todo' element={<TodoApp />} />
    </Routes> 
    </>
  )
}
 
export default App;

