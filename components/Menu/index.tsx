import { Fragment } from "react";
import { StatusBar } from "react-native";

import { useBoolean } from "@react-native-material/core";

import {
  Menu as DefaultMenu,
  useTheme as usePaperTheme,
} from "react-native-paper";
import { MenuProps } from "../../types";

import useTheme from "../../hooks/useTheme";
import ChooseAppearance from "../ChooseAppearance";
import { useAppSelector } from "../../redux/hooks";

function Menu({ button: Button, visible, setVisible }: MenuProps) {
  const [isAppearanceDialogOpen, setIsAppearanceDialogOpen] = useBoolean(false);
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  const defaultTheme = useTheme();
  const theme = usePaperTheme({
    dark: isDarkMode,
    mode: "exact",
    colors: {
      background: defaultTheme.background,
      onSurface: defaultTheme.text,
      accent: defaultTheme.tint,
    },
  });

  return (
    <Fragment>
      {/* @ts-ignore */}
      <DefaultMenu
        visible={visible}
        onDismiss={setVisible.off}
        // @ts-ignore
        anchor={Button}
        statusBarHeight={StatusBar.currentHeight}
        theme={theme}
      >
        {/* @ts-ignore */}
        <DefaultMenu.Item
          onPress={() => {
            setVisible.off();
            setIsAppearanceDialogOpen.on();
          }}
          title="Appearance"
        />
      </DefaultMenu>
      <ChooseAppearance
        visible={isAppearanceDialogOpen}
        setVisible={setIsAppearanceDialogOpen}
      />
    </Fragment>
  );
}

export default Menu;
