export type Appearance = "system" | "light" | "dark";

export type SetThemeProps = {
  appearance: Appearance;
  nativeColorScheme: NativeColorScheme;
};

export interface AppTheme {
  isDark: boolean;
  appearance: Appearance;
}

export type NativeColorScheme = "light" | "dark";
