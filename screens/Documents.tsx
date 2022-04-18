import { Fragment, useEffect } from "react";

import { StatusBar } from "expo-status-bar";

import useTheme from "../hooks/useTheme";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsDark } from "../redux/features/appTheme/appThemeSlice";
import DocumentList from "../components/DocumentList";
import FAB from "../components/FAB";

function Documents({ navigation }: RootTabScreenProps<"Cards">) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const nativeColorScheme = useColorScheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  useEffect(() => {
    dispatch(getIsDark(nativeColorScheme));
  }, [nativeColorScheme]);

  return (
    <Fragment>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={theme.primary}
      />
      <DocumentList theme={theme} />
      {/* fab button */}
      <FAB theme={theme} onPress={() => navigation.navigate("AddDocument")} />
    </Fragment>
  );
}

export default Documents;
