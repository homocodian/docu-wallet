import { StyleSheet } from "react-native";
import React from "react";

import { IconButton } from "@react-native-material/core";
import AntDesign from "@expo/vector-icons/AntDesign";

export type FABProps = {
  theme: {
    text: string;
    background: string;
    tint: string;
    primary: string;
    secondaryText: string;
  };
  size?: number;
  onPress: () => any;
};

const FAB = ({ onPress, theme, size }: FABProps) => {
  return (
    <IconButton
      icon={() => (
        // @ts-ignore
        <AntDesign name="plus" size={size ? size : 26} color={theme.tint} />
      )}
      style={{ ...styles.fab, backgroundColor: theme.primary }}
      onPress={onPress}
    />
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 10,
    height: 52,
    width: 52,
    borderRadius: 9999,
  },
});
