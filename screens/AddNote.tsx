import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "../redux/hooks";
import useTheme from "../hooks/useTheme";
import AddNoteInput from "../components/AddNoteInput";

const AddNote = () => {
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <AddNoteInput theme={theme} isDarkMode={isDarkMode} />
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={theme.background}
      />
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 53,
  },
});
