import { createSlice } from "@reduxjs/toolkit";

import { AppTheme } from "./types";

const initialState: AppTheme = {
  isDark: false,
  appearance: "system",
};

const appThemeSlice = createSlice({
  name: "appTheme",
  initialState,
  reducers: {
    setAppAppearance: (state, action) => {
      state.isDark = action.payload.isDark;
      state.appearance = action.payload.appearance;
    },
    setDarkMode: (state, action) => {
      state.isDark = action.payload as boolean;
    },
  },
});

export const { setAppAppearance, setDarkMode } = appThemeSlice.actions;

export default appThemeSlice.reducer;
