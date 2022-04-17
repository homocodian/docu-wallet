import { ToastAndroid, Platform } from "react-native";

function toastMessage(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
}

export default toastMessage;
