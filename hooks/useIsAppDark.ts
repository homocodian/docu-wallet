import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useAppSelector } from "../redux/hooks";

function useIsAppDark() {
  const [dark, setDark] = useState(false);
  const ColorScheme = useColorScheme();
  const { appearance, isDark } = useAppSelector((state) => state.appTheme);

  useEffect(() => {
    if (appearance === "system") {
      const isSystemDark = ColorScheme === "light" ? false : true;
      setDark(isSystemDark);
    } else {
      setDark(isDark);
    }
  }, [appearance, isDark]);

  return dark;
}

export default useIsAppDark;
