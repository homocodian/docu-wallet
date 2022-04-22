import { StyleSheet } from "react-native";
import { window } from "../../constants/Layout";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyComponent: {
    height: window.height,
    justifyContent: "center",
    alignItems: "center",
  },
});
