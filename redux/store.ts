import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appThemeReducer from "./features/appTheme/appThemeSlice";

const reducer = combineReducers({
  appTheme: appThemeReducer,
});

export const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
