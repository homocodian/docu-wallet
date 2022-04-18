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

import { fakeData } from "../../utils/fakeDataDocument";
import { DocumentListProps } from "./types";
import { isSmallDevice, window } from "../../constants/Layout";
import DocumentCard from "../DocumentCard";
import { CardItem } from "../DocumentCard/types";
import FAB from "../FAB";

const DocumentList = ({ navigation, theme }: DocumentListProps) => {
  const RenderItem = ({ item }: ListRenderItemInfo<CardItem>) => {
    return <DocumentCard theme={theme} item={item} />;
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
          No document to show, add one to see here!
        </Caption>
      </View>
    );
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <FlatList
          data={fakeData}
          renderItem={RenderItem}
          keyExtractor={(data) => data.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            width: "100%",
            paddingHorizontal: 15,
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: 72,
          }}
          ListEmptyComponent={EmptyComponent}
        />
      </View>
      {/* fab button */}
      <FAB theme={theme} onPress={() => navigation.navigate("AddDocument")} />
    </Fragment>
  );
};

export default React.memo(DocumentList);

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
