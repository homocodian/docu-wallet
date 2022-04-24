import { PermissionsAndroid, Alert, Platform } from "react-native";

async function storagePermission() {
  if (Platform.OS === "android") {
    const permissions = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    const status =
      permissions["android.permission.READ_EXTERNAL_STORAGE"] &&
      permissions["android.permission.READ_EXTERNAL_STORAGE"];

    if (status === "never_ask_again") {
      Alert.alert("Give permission manually");
      return false;
    } else if (status === "denied") {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export default storagePermission;
