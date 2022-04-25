import { Platform, Text } from "react-native";

import { Snackbar } from "react-native-paper";
import { useAppSelector } from "../../redux/hooks";
import { reset } from "../../redux/features/addNote/addNoteSlice";

export type AlertSnackbarProps = {
  visible: boolean;
  setVisible: (prop: boolean) => void;
  message: string;
};

const AlertSnackbar = ({
  visible,
  setVisible,
  message,
}: AlertSnackbarProps) => {
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  return (
    <>
      {/* @ts-ignore */}
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          label: "Dismiss",
          onPress: () => {
            setVisible(false);
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
          {message}
        </Text>
      </Snackbar>
    </>
  );
};

export default AlertSnackbar;
