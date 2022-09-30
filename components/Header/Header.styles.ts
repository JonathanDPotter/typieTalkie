import { StyleSheet } from "react-native";
import { colors, textSize } from "../../sharedStyles";

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.orange,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: textSize * 2,
    minHeight: "10%",
  },
  title: {
    color: colors.darkGreen,
    fontSize: textSize * 1.5,
  },
  titleIcon: { flexDirection: "row", alignItems: "center", flex: 1 },
  icon: {
    marginLeft: textSize * 0.5,
    color: colors.darkGreen,
  },
  logOut: {
    flex: 0.33,
    marginRight: textSize,
    backgroundColor: colors.darkGreen,
  },
  logOutText: { color: colors.orange },
});

export default styles;
