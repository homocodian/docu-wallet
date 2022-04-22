import { Platform, Text } from "react-native";

import { useEffect, useState } from "react";

import { Snackbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { reset } from "../../redux/features/addNote/addNoteSlice";
import useIsFirstRender from "../../hooks/useIsFirstRender";

const NoteAlertSnackbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const { isDeleted } = useAppSelector((state) => state.addNote);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) return;
    if (isDeleted) setVisible(true);
    else setVisible(false);
  }, [isDeleted]);

  return (
    <>
      {/* @ts-ignore */}
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false), dispatch(reset());
        }}
        action={{
          label: "Dismiss",
          onPress: () => {
            setVisible(false);
            dispatch(reset());
          },
        }}
        style={{
          zIndex: 10,
          elevation: Platform.OS === "android" ? 50 : 0,
        }}
        theme={{
          colors: {
            accent: isDarkMode ? "#121212" : "#fff",
            onSurface: isDarkMode ? "#fff" : "#121212",
          },
        }}
      >
        <Text style={{ color: isDarkMode ? "#121212" : "#fff" }}>
          Note deleted
        </Text>
      </Snackbar>
    </>
  );
};

export default NoteAlertSnackbar;
