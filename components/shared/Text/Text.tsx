import { StyleProp, Text as RNText, TextStyle } from "react-native";
import React, { FC } from "react";
import { useFonts } from "expo-font";
// styles
import styles from "./Text.styles";

interface Iprops {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

const Text: FC<Iprops> = ({ children, style }) => {
  const [fontsLoaded] = useFonts({
    "IBMPlexMono-Regular": require("../../../assets/IBMPlexMono-Regular.ttf"),
  });
  return (
    <RNText
      style={[
        styles.text,
        style,
        fontsLoaded ? { fontFamily: "IBMPlexMono-Regular" } : null,
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;
