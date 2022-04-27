import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useTheme from "../hooks/useTheme";
import AddNoteInput from "../components/AddNoteInput";
import { useEffect } from "react";
import { RootStackScreenProps } from "../types";
import { saveNote } from "../redux/features/addNote/addNoteSlice";

const AddNote = ({}: RootStackScreenProps<"AddNote">) => {
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(saveNote());
    };
  }, []);

  return (
    <>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={theme.background}
      />
      <View style={{ ...styles.container, backgroundColor: theme.background }}>
        <AddNoteInput theme={theme} isDarkMode={isDarkMode} />
      </View>
    </>
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
