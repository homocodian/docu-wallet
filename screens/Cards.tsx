import { Fragment, useEffect } from "react";

import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import useTheme from "../hooks/useTheme";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsDark } from "../redux/features/appTheme/appThemeSlice";
import CardsList from "../components/CardsList";
import FAB from "../components/FAB";

function Cards({ navigation }: RootTabScreenProps<"Cards">) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const nativeColorScheme = useColorScheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  useEffect(() => {
    if (isDarkMode) {
      Promise.all([
        NavigationBar.setBackgroundColorAsync("black"),
        NavigationBar.setButtonStyleAsync("light"),
      ]).catch(() => {});
    } else {
      Promise.all([
        NavigationBar.setBackgroundColorAsync("white"),
        NavigationBar.setButtonStyleAsync("dark"),
      ]).catch(() => {});
    }
  }, [isDarkMode]);

  useEffect(() => {
    dispatch(getIsDark(nativeColorScheme));
  }, [nativeColorScheme]);

  return (
    <Fragment>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={theme.primary}
      />
      <CardsList theme={theme} />

      {/* fab button */}
      <FAB theme={theme} onPress={() => navigation.navigate("AddCard")} />
    </Fragment>
  );
}

export default Cards;
