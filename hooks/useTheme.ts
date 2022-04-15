import { useEffect, useState } from "react";

import Colors from "../constants/Colors";
import useColorScheme from "./useColorScheme";

function useTheme() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(Colors.light);

  useEffect(() => {
    if (colorScheme === "light") {
      setTheme(Colors.light);
    } else {
      setTheme(Colors.dark);
    }
  }, [colorScheme, Colors]);

  return theme;
}

export default useTheme;
