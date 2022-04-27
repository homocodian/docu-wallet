import React from "react";
import { View, Text } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { IconButton } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";

import useTheme from "../../hooks/useTheme";
import { NavHeaderProps } from "./types";
import { styles } from "./styles";

const NavHeader = ({
  title,
  headerProps: { navigation },
  back,
}: NavHeaderProps) => {
  const theme = useTheme();

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
          <View style={styles.crossButtonContainer}>
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
