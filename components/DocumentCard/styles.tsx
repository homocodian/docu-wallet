import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    marginTop: 10,
  },
  cardHeader: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  card: {
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    overflow: "hidden",
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  copyButton: {
    color: "#B0BEC5",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },
  placeholderContainer: {
    borderColor: "#121212",
    borderWidth: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  placeholder: {
    aspectRatio: 16 / 9,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
});
