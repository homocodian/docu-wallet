import { FlatList, ListRenderItemInfo, View } from "react-native";
import React from "react";

import { Caption } from "react-native-paper";
import WithObservables from "@nozbe/with-observables";

import { DocumentListProps } from "./types";
import { isSmallDevice } from "../../constants/Layout";
import DocumentCard from "../DocumentCard";
import { CardItem } from "../DocumentCard/types";
import { styles } from "./styles";
import documentDao from "../../db/dao/Document";

const DocumentList = ({ theme, documents, navigation }: DocumentListProps) => {
  const RenderItem = ({ item }: ListRenderItemInfo<CardItem>) => {
    return <DocumentCard theme={theme} item={item} navigation={navigation} />;
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
    <View style={styles.container}>
      <FlatList
        data={documents}
        renderItem={RenderItem}
        keyExtractor={(data) => data.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: "100%",
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: theme.background,
        }}
        contentContainerStyle={{
          paddingBottom: 72,
        }}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
};

const enhance = WithObservables(["documents"], () => ({
  documents: documentDao.observerDocument(),
}));

export default enhance(DocumentList);
