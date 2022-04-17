import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { Fragment } from "react";

import { Caption } from "react-native-paper";
import { IconButton, useBoolean } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";

import Card from "../Card";
import { data } from "../../utils/data";
import { CardsListProps } from "./types";
import { CardDetails } from "../../types";
import { isSmallDevice, window } from "../../constants/Layout";

const CardsList = ({ navigation, theme }: CardsListProps) => {
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

  const RenderItem = ({ item }: ListRenderItemInfo<CardDetails>) => {
    return <Card theme={theme} item={item} />;
  };

  function EmptyComponent() {
    return (
      <View style={styles.emptyComponent}>
        {/* @ts-ignore */}
        <Caption
          style={{
            fontSize: isSmallDevice ? 14 : 16,
            color: theme.secondaryText,
          }}
        >
          No card to show, add one to see here!
        </Caption>
      </View>
    );
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={RenderItem}
          keyExtractor={(data) => data.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={hideFabButton}
          scrollEventThrottle={50}
          style={{
            width: "100%",
            paddingHorizontal: 15,
            flex: 1,
          }}
          ListEmptyComponent={EmptyComponent}
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
          onPress={() => navigation.navigate("AddCard")}
        />
      )}
    </Fragment>
  );
};

export default CardsList;

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
