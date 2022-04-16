import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import useTheme from "../hooks/useTheme";

export default function Documents() {
  const theme = useTheme();
  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <Text style={{ ...styles.title, color: theme.text }}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
