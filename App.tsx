import React from "react";
import Header from "./components/Header/Header";
import Router from "./components/Router";
import SocketProvider from "./context/socket.context";
import UserProvider from "./context/user.context";

export default function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <Header/>
        <Router />
      </SocketProvider>
    </UserProvider>
  );
}
