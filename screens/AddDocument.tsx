import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import { Stack } from "@react-native-material/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import useTheme from "../hooks/useTheme";
import { useAppSelector } from "../redux/hooks";

const AddDocument = () => {
  const theme = useTheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? "#212121" : "#fff",
      }}
    >
      <Stack spacing={26} style={styles.stack}>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
          }}
          placeholder="Document Name"
          placeholderTextColor={isDarkMode ? "#666161" : "#C4C4C4"}
          selectionColor={isDarkMode ? "#fff" : "#121212"}
        />
        <TextInput
          placeholder="UID Number"
          style={{
            ...styles.input,
            backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
          }}
          placeholderTextColor={isDarkMode ? "#666161" : "#C4C4C4"}
          selectionColor={isDarkMode ? "#fff" : "#121212"}
        />
      </Stack>
      <View style={{ marginTop: 27 }}>
        <Text style={styles.uploadText}>Upload Document</Text>
      </View>
      <View style={styles.boxContainer}>
        <Pressable
          style={{
            ...styles.box,
            backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
          }}
        >
          {/* @ts-ignore */}
          <MaterialIcons
            name="add-photo-alternate"
            size={24}
            color={isDarkMode ? "#fff" : "#C4C4C4"}
          />
          <Text style={{ color: isDarkMode ? "#fff" : "#C4C4C4" }}>PDF</Text>
        </Pressable>
      </View>
      <Pressable style={{ ...styles.button, backgroundColor: theme.primary }}>
        <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>
          Save Card
        </Text>
      </Pressable>
    </View>
  );
};

export default AddDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  stack: {
    marginTop: 46,
  },
  input: {
    width: "100%",
    height: 59,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  uploadText: {
    color: "#939090",
    fontSize: 20,
    fontWeight: "600",
  },
  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
  },
  box: {
    width: "100%",
    height: 135,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 55,
    height: 61,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
