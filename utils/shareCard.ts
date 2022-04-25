import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

import toastMessage from "./ToastMessage";

async function shareCard(file: string, name: string) {
  if (!(await Sharing.isAvailableAsync())) {
    toastMessage("Sharing is not available in this platform");
    return;
  }

  try {
    await Sharing.shareAsync(file, {
      dialogTitle: `Share ${name}`,
    });
  } catch (error) {
    Alert.alert("Sharing failed", "Can't share this file");
  }
}

export default shareCard;
