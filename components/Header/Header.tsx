import React from "react";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
// utils
import { useSockets } from "../../context/socket.context";
import { useUser } from "../../context/user.context";
import Button from "../shared/Button/Button";
import Text from "../shared/Text/Text";
// styles
import styles from "./Header.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { textSize } from "../../sharedStyles";

const Header = () => {
  const { setUser, setToken, user } = useUser();
  const { socket } = useSockets();

  const handleLogOut = () => {
    socket.emit("disconnected", { name: user });
    setUser(null);
    AsyncStorage.setItem("user", "");
    setToken(null);
    AsyncStorage.setItem("token", "");
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleIcon}>
        <Text style={styles.title}>Typie-Talkie</Text>
        <FontAwesomeIcon
          icon={faBullhorn}
          style={styles.icon}
          size={textSize * 1.25}
        />
      </View>
      {user ? (
        <Button
          style={styles.logOut}
          textStyle={styles.logOutText}
          title={"Log out"}
          onPress={handleLogOut}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default Header;
