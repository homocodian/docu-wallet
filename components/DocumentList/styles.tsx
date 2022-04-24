import { StatusBar, StyleSheet } from "react-native";
import { window } from "../../constants/Layout";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyComponent: {
    height:
      window.height -
      (StatusBar.currentHeight ? StatusBar.currentHeight + 100 : 140),
    justifyContent: "center",
    alignItems: "center",
  },
});
