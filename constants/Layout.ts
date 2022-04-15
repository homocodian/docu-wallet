import { Dimensions } from "react-native";

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
const isSmallDevice = window.width < 375;

export { window, isSmallDevice };
