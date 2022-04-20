import * as Clipboard from "expo-clipboard";

import toastMessage from "./ToastMessage";

function copyToClipboard(text: string) {
  Clipboard.setString(text);
  toastMessage("Text copied");
}

export default copyToClipboard;
