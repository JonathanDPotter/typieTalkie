import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
// interfaces
import IuserContext from "../interfaces/IuserContext";

const UserContext = createContext<IuserContext>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

const UserProvider = (props: any) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const value = { user, token, setUser, setToken };

  const getUserAndTokenFromAsync = async () => {
    try {
      const getUser = await AsyncStorage.getItem("user");
      const getToken = await AsyncStorage.getItem("token");
      setUser(getUser);
      setToken(getToken);
    } catch (error: any) {
      console.log(error)
    }
  };

  useEffect(() => {
    !user && getUserAndTokenFromAsync();
  }, []);

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
