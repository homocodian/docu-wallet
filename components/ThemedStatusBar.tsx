import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "../redux/hooks";
import useTheme from "../hooks/useTheme";

const ThemedStatusBar = () => {
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const theme = useTheme();

  return (
    <StatusBar
      style={isDarkMode ? "light" : "dark"}
      backgroundColor={theme.background}
    />
  );
};

export default ThemedStatusBar;
