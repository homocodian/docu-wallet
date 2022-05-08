import { StatusBar } from "react-native";

const useChangeStateBar = () => {
  return (color: string, isDarkIcon: boolean) => {
    StatusBar.setBackgroundColor(color);
    StatusBar.setBarStyle(isDarkIcon ? "light-content" : "dark-content", true);
  };
};

export default useChangeStateBar;
