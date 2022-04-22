import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  Appearance,
  AppTheme,
  NativeColorScheme,
  SetThemeProps,
} from "./types";

const initialState: AppTheme = {
  isDark: false,
  appearance: "system",
};

const getIsDark = createAsyncThunk(
  "getIsDark",
  async (nativeColorScheme: NativeColorScheme, thunkAPI) => {
    try {
      const appearance = await AsyncStorage.getItem("appearance");
      if (!appearance)
        return {
          appearance: "system",
          isDark: false,
        };
      else if (appearance === "light")
        return {
          appearance,
          isDark: false,
        };
      else if (appearance === "dark")
        return {
          appearance,
          isDark: true,
        };
      else {
        if (nativeColorScheme === "light")
          return {
            appearance: "light",
            isDark: false,
          };
        else
          return {
            appearance: "dark",
            isDark: true,
          };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({
        isDark: true,
      });
    }
  }
);

const setAppAppearance = createAsyncThunk(
  "setAppearance",
  async (setTheme: SetThemeProps, thunkAPI) => {
    const ThemeState: AppTheme = {
      ...initialState,
    };

    if (setTheme.appearance === "light") {
      (ThemeState.appearance = "light"), (ThemeState.isDark = false);
    } else if (setTheme.appearance === "dark") {
      (ThemeState.appearance = "dark"), (ThemeState.isDark = true);
    } else {
      (ThemeState.appearance = setTheme.appearance),
        (ThemeState.isDark =
          setTheme.nativeColorScheme === "dark" ? true : false);
    }

    try {
      await AsyncStorage.setItem("appearance", setTheme.appearance);
      return ThemeState;
    } catch (error) {
      return thunkAPI.rejectWithValue(ThemeState);
    }
  }
);

const appThemeSlice = createSlice({
  name: "appTheme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIsDark.fulfilled, (state, action) => {
        state.isDark = action.payload.isDark;
        state.appearance = action.payload.appearance as Appearance;
      })
      .addCase(getIsDark.rejected, (state, action) => {
        // @ts-ignore
        state.isDark = action.payload?.isDark as boolean;
        state.appearance = state.appearance;
      })
      .addCase(setAppAppearance.fulfilled, (state, action) => {
        state.appearance = action.payload.appearance;
        state.isDark = action.payload.isDark;
      })
      .addCase(setAppAppearance.rejected, (state, action) => {
        // @ts-ignore
        state.appearance = action.payload?.appearance as Appearance;
        // @ts-ignore
        state.isDark = action.payload?.isDark as boolean;
      });
  },
});

export { getIsDark, setAppAppearance };

export default appThemeSlice.reducer;
