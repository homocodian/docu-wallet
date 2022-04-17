import * as Clipboard from "expo-clipboard";

import toastMessage from "./ToastMessage";

function copyToClipboard(text: string) {
  Clipboard.setString(text);
  toastMessage("copied");
}

export default copyToClipboard;
