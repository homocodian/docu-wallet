import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppBar from "./components/AppBar";
import { Provider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import useColorScheme from "./hooks/useColorScheme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const ColorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider>
          <AppBar />
          <Navigation ColorScheme={ColorScheme} />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
