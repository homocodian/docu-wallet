import * as Sharing from "expo-sharing";

import toastMessage from "./ToastMessage";

async function shareCard(file: string, name: string) {
  if (!(await Sharing.isAvailableAsync())) {
    toastMessage("File can't be shared");
    return;
  }

  await Sharing.shareAsync(file, {
    dialogTitle: `Share your ${name}`,
  });
}

export default shareCard;
