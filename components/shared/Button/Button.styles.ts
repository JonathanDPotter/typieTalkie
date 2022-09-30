import { StyleSheet } from "react-native";
import { colors, textSize } from "../../../sharedStyles";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: "center",
    width: "30%",
    alignItems: "center",
    backgroundColor: colors.orange,
  },
  title: {
    fontSize: textSize,
    color: colors.darkGreen,
  },
});

export default styles;
