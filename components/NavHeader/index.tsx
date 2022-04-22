import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { IconButton } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";

import useTheme from "../../hooks/useTheme";
import { NavHeaderProps } from "./types";
import { useAppDispatch } from "../../redux/hooks";
import { saveNote } from "../../redux/features/addNote/addNoteSlice";

const NavHeader = ({
  title,
  headerProps: { navigation },
  back,
}: NavHeaderProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <View style={{ ...styles.container, backgroundColor: theme.background }}>
        {back ? (
          <>
            <IconButton
              icon={() => (
                // @ts-ignore
                <AntDesign name="arrowleft" size={20} color={theme.tint} />
              )}
              onPress={() => {
                dispatch(saveNote());
                navigation.canGoBack() ? navigation.goBack() : navigation.pop();
              }}
            />
            <Text
              style={{ ...styles.title, color: theme.text, paddingLeft: 10 }}
            >
              {title}
            </Text>
          </>
        ) : (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <Text style={{ ...styles.title, color: theme.text }}>{title}</Text>
            <IconButton
              icon={() => (
                // @ts-ignore
                <AntDesign name="close" size={20} color={theme.tint} />
              )}
              onPress={() =>
                navigation.canGoBack() ? navigation.goBack() : navigation.pop()
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
