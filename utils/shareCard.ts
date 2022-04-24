import * as Sharing from "expo-sharing";

import toastMessage from "./ToastMessage";

async function shareCard(file: string, name: string, mimeType?: string) {
  if (!(await Sharing.isAvailableAsync())) {
    toastMessage("File can't be shared");
    return;
  }

  if (mimeType) {
    // const base64File = await RNFetchBlob.fs.;
    // await Sharing.shareAsync(base64File, {
    //   dialogTitle: `Share ${name}`,
    //   mimeType: mimeType,
    // });
  } else {
    await Sharing.shareAsync(file, {
      dialogTitle: `Share your ${name}`,
    });
  }
}

export default shareCard;
