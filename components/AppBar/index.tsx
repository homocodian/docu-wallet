import { useEffect, useState } from "react";

import {
  AppBar as DefaultAppBar,
  HStack,
  IconButton,
  useBoolean,
} from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import useTheme from "../../hooks/useTheme";
import Menu from "../Menu";
import { useAppSelector } from "../../redux/hooks";
import { StatusBar } from "expo-status-bar";
import useColorScheme from "../../hooks/useColorScheme";

const AppBar = (_props: NativeStackHeaderProps) => {
  const theme = useTheme();
  const ColorScheme = useColorScheme();
  const [visible, setVisible] = useBoolean(false);
  const { appearance, isDark } = useAppSelector((state) => state.appTheme);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (appearance === "system") {
      const isSystemDark = ColorScheme === "light" ? false : true;
      setDark(isSystemDark);
    } else {
      setDark(isDark);
    }
  }, [appearance, isDark]);

  return (
    <SafeAreaView>
      <DefaultAppBar
        title="Document keeper"
        titleStyle={{
          fontSize: 18,
        }}
        color={theme.primary}
        tintColor={theme.tint}
        trailing={(props) => (
          <HStack>
            <IconButton
              icon={(props) => (
                // @ts-ignore
                <AntDesign name="search1" {...props} />
              )}
              {...props}
            />
            <Menu
              button={
                <IconButton
                  icon={(props) => (
                    // @ts-ignore
                    <MaterialCommunityIcons name="dots-vertical" {...props} />
                  )}
                  {...props}
                  onPress={setVisible.on}
                />
              }
              visible={visible}
              setVisible={setVisible}
            />
          </HStack>
        )}
      ></DefaultAppBar>

      <StatusBar
        style={!dark ? "dark" : "light"}
        backgroundColor={theme.primary}
      />
    </SafeAreaView>
  );
};

export default AppBar;
