import { StyleSheet, View } from "react-native";

import NoteCardList from "../components/NoteCardList";
import useTheme from "../hooks/useTheme";
import { RootTabScreenProps } from "../types";
import FAB from "../components/FAB";

const Notes = ({ navigation }: RootTabScreenProps<"Notes">) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <NoteCardList theme={theme} />
      <FAB theme={theme} onPress={() => navigation.navigate("AddNote")} />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
