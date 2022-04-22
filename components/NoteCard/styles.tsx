import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginBottom: 15,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    textTransform: "capitalize",
    maxWidth: "75%",
    fontSize: 18,
    fontWeight: "600",
  },
});
