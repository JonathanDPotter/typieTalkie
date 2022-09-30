import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import api from "../../api";
import { useUser } from "../../context/user.context";
// components
import Button from "../shared/Button/Button";
import CheckInput from "../shared/CheckInput/CheckInput";
import LabelInput from "../shared/LabelInput/LabelInput";
import Text from "../shared/Text/Text";
//
import styles from "./Login.styles";

const Login = () => {
  // get setUser and setToken from context
  const { setUser, setToken, user } = useUser();

  // ref for submit button to press it programatically
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // boolean to set if it is login or register action
  const [login, setLogin] = useState(false);

  const clearFormState = () => {
    setUsername("");
    setPassword("");
    setRepeatPassword("");
  };

  const setUserAndToken = (username: string, token: string) => {
    setUser(username);
    AsyncStorage.setItem("user", username);
    setToken(token);
    AsyncStorage.setItem("token", token);
  };

  const handleSubmit = async (username: string, password: string) => {
    try {
      const res = login
        ? await api.login({ username, password })
        : await api.register({ username, password });
      res.data.token
        ? setUserAndToken(username, res.data.token)
        : window.alert(res.data.message);
    } catch (error: any) {
      window.alert(error.message);
    }
    clearFormState();
  };

  const EasyLogin: FC = () => {
    const names = ["Greebo", "Hero", "Tina"];
    return (
      <View>
        <FlatList
          data={names}
          keyExtractor={(item) => item + "login"}
          renderItem={({ item }) => (
            <Button
              title={"Login as " + item}
              onPress={() => {
                handleSubmit(item, "password");
              }}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.login}>
      <Text>{login ? "Log In" : "Register"}</Text>
      <Text>{user ? user : "no user"}</Text>
      <CheckInput label={"Registered?"} bool={login} onChange={setLogin} />
      {login ? <EasyLogin /> : null}
      <LabelInput
        label={"username"}
        onChangeText={setUsername}
        value={username}
        placeholder={"username"}
        autoComplete={"username"}
      />
      <LabelInput
        label={"password"}
        onChangeText={setPassword}
        value={password}
        placeholder={"password"}
        autoComplete={login ? "password" : "password-new"}
      />
      {!login && (
        <LabelInput
          label={"repeat password"}
          onChangeText={setRepeatPassword}
          value={repeatPassword}
          placeholder={"repeat password"}
          autoComplete={"password-new"}
        />
      )}
      <Button
        title={"Submit"}
        onPress={() => handleSubmit(username, password)}
      />
    </View>
  );
};

export default Login;

// <div className="page">
//   <h2>{login ? "Log In" : "Register"}</h2>
//   {login ? <EasyLogin /> : null}
//   <form action="submit" onSubmit={handleSubmit}>
//     <div className="label-input">
//       <label htmlFor="username">username</label>
//       <input
//         type="text"
//         name="username"
//         onChange={handleChange}
//         value={username}
//         id="username"
//         autoComplete="username"
//       />
//     </div>
//     <div className="label-input">
//       <label htmlFor="password">password</label>
//       <input
//         type="password"
//         name="password"
//         onChange={handleChange}
//         value={password}
//         id="password"
//         autoComplete="new-password"
//       />
//     </div>
//     {login ? (
//       <></>
//     ) : (
//       <div className="label-input">
//         <label htmlFor="repeatPassword">repeat password</label>
//         <input
//           type="password"
//           name="repeatPassword"
//           onChange={handleChange}
//           value={repeatPassword}
//           id="repeatPassword"
//           autoComplete="new-password"
//         />
//       </div>
//     )}
//     <div className="label-input">
//       <button
//         type="submit"
//         ref={submitButtonRef}
//         disabled={
//           login
//             ? !(username && password)
//             : !(username && password && password === repeatPassword)
//         }
//       >
//         Submit
//       </button>
//     </div>
//   </form>
//   <div className="toggle-box">
//     <p>{login ? "Need to Register?" : "Already Registered?"}</p>
//     <button onClick={() => setLogin(!login)}>
//       {login ? "Register" : "Log In"}
//     </button>
//   </div>
// </div>
