import { ToastAndroid, Platform, Alert } from "react-native";

import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";

function toastMessage(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
}

function copyUid(id: string) {
  Clipboard.setString(id);
  toastMessage("copied");
}

async function shareCard(file: string, name: string) {
  if (!(await Sharing.isAvailableAsync())) {
    toastMessage("File can't be shared");
    return;
  }

  await Sharing.shareAsync(file, {
    dialogTitle: `Share your ${name}`,
  });
}

export { copyUid, shareCard, toastMessage };
