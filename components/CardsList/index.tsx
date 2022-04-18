import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import React, { Fragment } from "react";

import { Caption } from "react-native-paper";
import { useBoolean } from "@react-native-material/core";

import Card from "../Card";
import { data } from "../../utils/data";
import { CardsListProps } from "./types";
import { CardDetails } from "../../types";
import { isSmallDevice, window } from "../../constants/Layout";
import FAB from "../FAB";

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
        <FAB theme={theme} onPress={() => navigation.navigate("AddCard")} />
      )}
    </Fragment>
  );
};

export default React.memo(CardsList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyComponent: {
    height: window.height,
    justifyContent: "center",
    alignItems: "center",
  },
});
