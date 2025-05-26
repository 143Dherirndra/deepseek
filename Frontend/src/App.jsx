import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { useAuth } from "./context/AuthProvider";
// import { Route } from 'lucide-react'

function App() {
  const [authuser] = useAuth();
  console.log(authuser);
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={authuser ? <Home /> : <Navigate to={"/login"} />}
          ></Route>
          <Route
            path="/login"
            element={authuser ? <Navigate to={"/"} /> : <Login />}
          ></Route>
          <Route
            path="/signup"
            element={authuser ? <Navigate to={"/"} /> : <Signup />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
