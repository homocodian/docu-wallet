import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReactNativePaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Navigation from "./navigation";
import { store, persistor } from "./redux/store";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          {/* @ts-ignore */}
          <PersistGate loading={null} persistor={persistor}>
            <ReactNativePaperProvider>
              <Navigation />
            </ReactNativePaperProvider>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
