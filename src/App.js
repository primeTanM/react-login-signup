import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";

function App(){
  return(
    <>
      <Register />
      <Login />
    </>
  )
}

export default App;
