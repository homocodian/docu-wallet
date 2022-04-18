import { Portal, List, Dialog } from "react-native-paper";
import useTheme from "../../hooks/useTheme";
import { useAppSelector } from "../../redux/hooks";

import { ChooseDialogProps } from "./types";

const ChooseDialog = ({
  visible,
  setVisible,
  openImagePickerAsync,
  captureImageAsync,
}: ChooseDialogProps) => {
  const theme = useTheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  return (
    // @ts-ignore
    <Portal>
      {/* @ts-ignore */}
      <Dialog
        visible={visible}
        onDismiss={setVisible.off}
        theme={{
          dark: isDarkMode,
          colors: {
            background: theme.background,
            surface: theme.background,
            text: theme.text,
          },
        }}
      >
        <Dialog.Content>
          {/* @ts-ignore */}
          <List.Item
            title="Camera"
            onPress={() => {
              setVisible.off();
              captureImageAsync();
            }}
            theme={{
              dark: isDarkMode,
              colors: {
                text: theme.text,
              },
            }}
            left={(props) => <List.Icon icon="camera" {...props} />}
          />
          {/* @ts-ignore */}
          <List.Item
            title="Gallery"
            onPress={() => {
              setVisible.off();
              openImagePickerAsync();
            }}
            theme={{
              dark: isDarkMode,
              colors: {
                text: theme.text,
              },
            }}
            left={(props) => <List.Icon icon="google-photos" {...props} />}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ChooseDialog;
