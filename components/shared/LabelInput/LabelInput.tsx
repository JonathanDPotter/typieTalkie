import {
  StyleProp,
  TextInput,
  TextInputAndroidProps,
  TextStyle,
  View,
} from "react-native";
import React, { FC } from "react";
// components
import Text from "../Text/Text";
// styles
import styles from "./LabelInput.styles";
import { colors } from "../../../sharedStyles";

interface Iprops {
  label: string;
  style?: StyleProp<TextStyle>;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  placeholder: string;
  autoComplete: TextInputAndroidProps["autoComplete"];
  button?: React.ReactNode;
}

const LabelInput: FC<Iprops> = ({
  label,
  style,
  onChangeText,
  value,
  placeholder,
  autoComplete,
  button,
}) => {
  return (
    <View style={styles.labelInput}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputButton}>
        <TextInput
          style={[style, styles.input]}
          placeholderTextColor={colors.orange}
          {...{ onChangeText, value, placeholder, autoComplete }}
        />
        {button}
      </View>
    </View>
  );
};

export default LabelInput;
