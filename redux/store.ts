import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appThemeReducer from "./features/appTheme/appThemeSlice";
import addNoteReducer from "./features/addNote/addNoteSlice";

const reducer = combineReducers({
  appTheme: appThemeReducer,
  addNote: addNoteReducer,
});

export const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
