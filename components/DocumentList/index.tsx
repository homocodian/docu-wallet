import { FlatList, View } from "react-native";
import React from "react";

import { Caption } from "react-native-paper";
import WithObservables from "@nozbe/with-observables";

import { DocumentListProps } from "./types";
import { isSmallDevice } from "../../constants/Layout";
import DocumentCard from "../DocumentCard";
import { styles } from "./styles";
import documentDao from "../../db/dao/Document";
import { AppTheme } from "../../types";

const DocumentList = ({ theme, documents, navigation }: DocumentListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <DocumentCard
            theme={theme}
            documents={item}
            navigation={navigation}
          />
        )}
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
          paddingBottom: 88,
        }}
        ListEmptyComponent={() => <EmptyComponent theme={theme} />}
      />
    </View>
  );
};

const enhance = WithObservables([], () => ({
  documents: documentDao.observerDocument(),
}));

export default enhance(DocumentList);

function EmptyComponent({ theme }: { theme: AppTheme }) {
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
