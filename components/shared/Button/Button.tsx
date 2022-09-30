import { Pressable, TextStyle, View, ViewStyle } from "react-native";
import React, { FC, ReactNode } from "react";
import Text from "../Text/Text";
import styles from "./Button.styles";
import { colors } from "../../../sharedStyles";

interface Iprops {
  title: string | ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: any;
}

const Button: FC<Iprops> = ({ title, style, textStyle, onPress }) => {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      android_ripple={{ color: colors.darkGreen }}
    >
      {typeof title === "string" ? (
        <Text style={[styles.title, textStyle]}>{title}</Text>
      ) : (
        title
      )}
    </Pressable>
  );
};

export default Button;
