import { Pressable, View } from "react-native";
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
// components
import Text from "../Text/Text";
// styles
import styles from "./CheckInput.styles";
import { textSize } from "../../../sharedStyles";

interface Iprops {
  label: string;
  bool: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckInput: FC<Iprops> = ({ label, bool, onChange }) => {
  return (
    <View style={styles.checkInput}>
      <Text>{label}</Text>
      <Pressable onPress={() => onChange((prev) => !prev)}>
        <FontAwesomeIcon
          icon={bool ? faSquareCheck : faSquare}
          style={styles.checkbox}
          size={textSize * 1.5}
        />
      </Pressable>
    </View>
  );
};

export default CheckInput;
