import { Fragment } from "react";
import {
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { IconButton, useBoolean } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";
import { Caption } from "react-native-paper";

import { data } from "../utils/data";
import Card from "../components/Card";
import useTheme from "../hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import useColorScheme from "../hooks/useColorScheme";
import { CardDetails, RootTabScreenProps } from "../types";
import { window, isSmallDevice } from "../constants/Layout";

function Cards({ navigation }: RootTabScreenProps<"Cards">) {
  const theme = useTheme();
  const ColorScheme = useColorScheme();
  const [showFabButton, setShowFabButton] = useBoolean(true);

  const hideFabButton = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y >= 200) {
      if (showFabButton === false) return;
      setShowFabButton.off();
    } else {
      if (showFabButton === true) return;
      setShowFabButton.on();
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<CardDetails>) => (
    <Card theme={theme} item={item} />
  );

  return (
    <Fragment>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(data) => data.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            width: "100%",
            paddingHorizontal: 15,
            flex: 1,
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyComponent}>
              {/* @ts-ignore */}
              <Caption style={{ fontSize: isSmallDevice ? 14 : 16 }}>
                No card to show, add one to see here!
              </Caption>
            </View>
          )}
          onScroll={hideFabButton}
          scrollEventThrottle={50}
        />
      </View>
      {/* fab button */}
      {showFabButton && (
        <IconButton
          icon={() => (
            // @ts-ignore
            <AntDesign name="plus" size={26} color={theme.tint} />
          )}
          style={{ ...styles.fab, backgroundColor: theme.primary }}
          onPress={() => navigation.navigate("Modal")}
        />
      )}
      <StatusBar
        style={ColorScheme === "light" ? "dark" : "light"}
        backgroundColor={theme.primary}
      />
    </Fragment>
  );
}

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 10,
    height: 52,
    width: 52,
    borderRadius: 9999,
  },
  emptyComponent: {
    height: window.height,
    justifyContent: "center",
    alignItems: "center",
  },
});
