import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "../redux/hooks";
import useTheme from "../hooks/useTheme";

type ThemedStatusBarProps = {
  bgColor?: string;
  style?: string;
};

const ThemedStatusBar = ({ style, bgColor }: ThemedStatusBarProps) => {
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const theme = useTheme();

  return (
    <StatusBar
      style={style || isDarkMode ? "light" : "dark"}
      backgroundColor={bgColor || theme.primary}
    />
  );
};

export default ThemedStatusBar;
