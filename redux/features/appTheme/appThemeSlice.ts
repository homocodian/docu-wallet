import { Appearance as SystemAppearance } from "react-native";

import { createSlice } from "@reduxjs/toolkit";
import { MMKVLoader } from "react-native-mmkv-storage";

import { AppTheme } from "./types";

const MMKV = new MMKVLoader().initialize();
const appearanceString = MMKV.getString("appearance");

const { isDark, appearance } = getAppThemeData(appearanceString);

const initialState: AppTheme = {
  isDark,
  appearance,
};

const appThemeSlice = createSlice({
  name: "appTheme",
  initialState,
  reducers: {
    setAppAppearance: (state, action) => {
      state.isDark = action.payload.isDark;
      state.appearance = action.payload.appearance;
      MMKV.setStringAsync(
        "appearance",
        action.payload.appearance as string
      ).catch(() => {});
    },
    setDarkMode: (state, action) => {
      state.isDark = action.payload as boolean;
    },
  },
});

export const { setAppAppearance, setDarkMode } = appThemeSlice.actions;

export default appThemeSlice.reducer;

function getAppThemeData(appearance: string | null | undefined): AppTheme {
  switch (appearance) {
    case "dark":
      return {
        isDark: true,
        appearance: "dark",
      };

    case "light":
      return {
        isDark: false,
        appearance: "light",
      };

    default:
      const colorScheme = SystemAppearance.getColorScheme();
      return {
        isDark: colorScheme === "dark" ? true : false,
        appearance: "system",
      };
  }
}
