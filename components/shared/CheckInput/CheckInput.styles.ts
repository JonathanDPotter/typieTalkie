import { StyleSheet } from "react-native";
import { colors, textSize } from "../../../sharedStyles";

const styles = StyleSheet.create({
  checkInput: {
    width: "100%",
    flexDirection: "row",
    padding: textSize,
    alignItems: "center",
    marginVertical: textSize / 2,
  },
  checkbox: { marginLeft: textSize, color: colors.orange },
});

export default styles;
