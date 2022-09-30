import { StyleSheet } from "react-native";
import { colors, textSize } from "../../../sharedStyles";

const styles = StyleSheet.create({
  labelInput: {
    width: "100%",
    flexDirection: "row",
    padding: textSize * 0.5,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: textSize / 2,
    lineHeight: textSize * 2,
  },
  label: { flex: 1 },
  inputButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: textSize * 2,
    lineHeight: textSize * 2,
  },
  input: {
    borderColor: colors.orange,
    borderWidth: 2,
    flex: 1,
    paddingHorizontal: textSize,
    color: colors.orange,
    fontSize: textSize,
    height: textSize * 2,
  },
});

export default styles;
