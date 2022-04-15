import { Portal, List, Dialog } from "react-native-paper";

import { ChooseDialogProps } from "./types";

const ChooseDialog = ({
  visible,
  setVisible,
  openImagePickerAsync,
  captureImageAsync,
}: ChooseDialogProps) => {
  return (
    // @ts-ignore
    <Portal>
      {/* @ts-ignore */}
      <Dialog
        visible={visible}
        onDismiss={setVisible.off}
        style={{ padding: 0 }}
      >
        <Dialog.Content style={{ padding: 0 }}>
          {/* @ts-ignore */}
          <List.Item
            title="Camera"
            onPress={() => {
              setVisible.off();
              captureImageAsync();
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
            left={(props) => <List.Icon icon="google-photos" {...props} />}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ChooseDialog;
