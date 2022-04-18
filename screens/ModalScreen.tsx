import { StyleSheet, View, Text } from "react-native";

export default function ModalScreen(props: any) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello</Text>
      </View>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // paddingTop: StatusBar.currentHeight ,
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
