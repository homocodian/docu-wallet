import { useEffect, useState } from "react";

import Colors from "../constants/Colors";
import { useAppSelector } from "../redux/hooks";

function useTheme() {
  const { isDark, appearance } = useAppSelector((state) => state.appTheme);
  const [theme, setTheme] = useState(Colors.light);

  useEffect(() => {
    if (isDark) {
      setTheme(Colors.dark);
    } else {
      setTheme(Colors.light);
    }
  }, [isDark, Colors, appearance]);

  return theme;
}

export default useTheme;
