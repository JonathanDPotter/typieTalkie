import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
// utils
import api from "../../api";
import { useSockets } from "../../context/socket.context";
import { useUser } from "../../context/user.context";
// components
import Button from "../shared/Button/Button";
import LabelInput from "../shared/LabelInput/LabelInput";
import Text from "../shared/Text/Text";
// styles
import styles from "./Home.styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { colors, textSize } from "../../sharedStyles";

const Home = () => {
  const { user, token, setUser, setToken } = useUser();
  // local state
  const [users, setUsers] = useState<string[] | null>(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([
    { name: "name", message: "message", id: "id" },
  ]);

  const { socket } = useSockets();

  socket.on("connection", ({ name, message, id }) => {
    setResponse([...response, { name, message, id }]);
    setUsers(users);
  });

  socket.on("message", (received) => {
    setResponse([...response, received]);
  });

  socket.on("new", ({ users }) => {
    setUsers(users);
  });

  const handleSubmit = () => {
    socket.emit("message", { name: user, message });
    setResponse([...response, { name: "Me", message, id: uuid() }]);
    setMessage("");
  };

  const removeUser = () => {
    setUser(null);
    AsyncStorage.setItem("user", "");
    setToken(null);
    AsyncStorage.setItem("token", "");
  };

  useEffect(() => {
    // users kept connecting multiple times until I added the setTimeout
    if (!socket.connected) window.setTimeout(() => socket.connect(), 500);
    socket.emit("new", { name: user });

    // checks if user token is still valid every time the page loads
    (async () => {
      if (token) {
        const valid = await api.validate(token);
        if (valid.data.message !== "Token validated.") removeUser();
      }
    })();

    return () => {
      // removes user from state and disconnects socket when the component is unmounted
      setUsers(null);
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.home}>
      <View>
        <Text>Current Users</Text>
        {users && (
          <FlatList
            data={users}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        )}
      </View>
      <LabelInput
        label={"Enter a message"}
        onChangeText={setMessage}
        value={message}
        placeholder={"message"}
        autoComplete={undefined}
        button={
          <Button
            title={
              <FontAwesomeIcon
                icon={faBullhorn}
                style={{ color: colors.darkGreen }}
                size={textSize * 1.25}
              />
            }
            onPress={handleSubmit}
            style={styles.button}
          />
        }
      />
      <View>
        <FlatList
          data={response}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.name === "name" ? null : (
              <Text
                style={
                  item.name === "Me"
                    ? styles.myMessage
                    : item.name === "Server"
                    ? styles.serverMessage
                    : styles.othersMessage
                }
              >
                {item.name}: {item.message}
              </Text>
            )
          }
        />
      </View>
    </View>
  );
};

export default Home;
