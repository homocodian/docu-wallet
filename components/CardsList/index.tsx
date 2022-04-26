import { FlatList, ListRenderItemInfo, View } from "react-native";

import { Caption } from "react-native-paper";
import WithObservables from "@nozbe/with-observables";

import Card from "../Card";
import { CardsListProps } from "./types";
import { AppTheme } from "../../types";
import { isSmallDevice } from "../../constants/Layout";
import { styles } from "./styles";
import cardDao from "../../db/dao/Card";

const CardsList = ({ theme, cards }: CardsListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Card theme={theme} cards={item} />}
        keyExtractor={(data) => data.id}
        showsVerticalScrollIndicator={false}
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
  cards: cardDao.observerCard(),
}));

export default enhance(CardsList);

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
        No card to show, add one to see here!
      </Caption>
    </View>
  );
}
