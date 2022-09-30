import { StyleSheet } from "react-native";
import { colors, textSize } from "../../sharedStyles";

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: colors.darkGreen,
    paddingTop: textSize,
    paddingHorizontal: textSize * 0.5,
  },
  button: {
    flex: 0.25,
    height: textSize * 2,
    lineHeight: textSize * 2,
    textAlign: "center",
  },
  myMessage: { color: colors.red },
  othersMessage: { color: colors.green },
  serverMessage: { color: colors.blue },
});

export default styles;
