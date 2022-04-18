import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";

import { useAppSelector } from "../redux/hooks";
import useTheme from "../hooks/useTheme";
import { Divider } from "@react-native-material/core";

const AddNote = () => {
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <View>
        <TextInput
          style={{
            ...styles.titleInput,
            backgroundColor: theme.background,
            color: theme.text,
          }}
          numberOfLines={2}
          placeholder="Title"
          placeholderTextColor={"#C4C4C4"}
          selectionColor={theme.tint}
        />
      </View>
      <Text style={{ color: "#C4C4C4" }}>
        {dayjs(Date.now()).format("DD MMMM YYYY")}
      </Text>
      <Divider
        style={{
          marginVertical: 15,
          height: 2,
          backgroundColor: isDarkMode ? "#656262" : "#C4C4C4",
        }}
      />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Note"
          multiline
          selectionColor={theme.tint}
          style={{ ...styles.noteInput, color: theme.text }}
          placeholderTextColor={"#C4C4C4"}
        />
      </View>
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
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
  },
  noteInput: {
    fontSize: 18,
    fontWeight: "600",
  },
});
