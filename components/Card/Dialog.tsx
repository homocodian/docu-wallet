import {
  Dialog as DefaultDialog,
  Button,
  Portal,
  Paragraph,
} from "react-native-paper";
import { DialogProps } from "./types";

function Dialog({ visible, setVisible, openImagePickerAsync }: DialogProps) {
  return (
    // @ts-ignore
    <Portal>
      {/* @ts-ignore */}
      <DefaultDialog visible={visible} onDismiss={setVisible.off}>
        <DefaultDialog.Content>
          <Paragraph>
            Do you really want to upload another image for this document ?
          </Paragraph>
        </DefaultDialog.Content>
        <DefaultDialog.Actions>
          {/* @ts-ignore */}
          <Button onPress={setVisible.off} uppercase>
            Cancel
          </Button>
          {/* @ts-ignore */}
          <Button
            onPress={() => {
              setVisible.off();
              openImagePickerAsync();
            }}
            uppercase
          >
            OK
          </Button>
        </DefaultDialog.Actions>
      </DefaultDialog>
    </Portal>
  );
}

export default Dialog;
