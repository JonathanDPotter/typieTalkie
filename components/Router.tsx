import React from "react";
import { useUser } from "../context/user.context";
import Home from "./Home/Home";
import Login from "./Login/Login";

const Router = () => {
  const { user } = useUser();

  return user ? <Home /> : <Login />;
};

export default Router;
