import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReactNativePaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch } from "react-redux";

import Navigation from "./navigation";
import { store } from "./redux/store";
import useColorScheme from "./hooks/useColorScheme";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const ColorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <ReactNativePaperProvider>
            <Navigation ColorScheme={ColorScheme} />
          </ReactNativePaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
