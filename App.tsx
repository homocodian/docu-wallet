import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReactNativePaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import Navigation from "./navigation";
import { store } from "./redux/store";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <ReactNativePaperProvider>
            <Navigation />
          </ReactNativePaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
