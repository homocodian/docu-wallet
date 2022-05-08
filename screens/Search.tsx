import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../components/SearchComponent";

import ThemedStatusBar from "../components/ThemedStatusBar";
import useTheme from "../hooks/useTheme";
import { RootStackScreenProps } from "../types";

const Search = ({ navigation }: RootStackScreenProps<"Search">) => {
  const activeTabIndex = navigation.getState().routes[0].state?.index;
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ThemedStatusBar bgColor={theme.background} />
      <SearchComponent
        navigation={navigation}
        theme={theme}
        tabIndex={activeTabIndex || 0}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
