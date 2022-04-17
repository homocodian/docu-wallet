import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { IconButton } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";

import useTheme from "../../hooks/useTheme";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const NavHeader = ({
  title,
  headerProps: { navigation },
}: {
  headerProps: NativeStackHeaderProps;
  title: string;
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView>
      <View style={{ ...styles.container, backgroundColor: theme.background }}>
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
    </SafeAreaView>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
