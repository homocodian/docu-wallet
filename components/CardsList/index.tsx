import { FlatList, ListRenderItemInfo, View } from "react-native";

import { Caption } from "react-native-paper";
import WithObservables from "@nozbe/with-observables";

import Card from "../Card";
import { CardsListProps } from "./types";
import { CardDetails } from "../../types";
import { isSmallDevice } from "../../constants/Layout";
import { styles } from "./styles";
import cardDao from "../../db/dao/Card";

const CardsList = ({ theme, cards }: CardsListProps) => {
  const RenderItem = ({ item }: ListRenderItemInfo<CardDetails>) => {
    return (
      <Card
        theme={theme}
        id={item?.id}
        cardName={item?.cardName}
        cardNumber={item?.cardNumber}
        backImageUri={item?.backImageUri}
        frontImageUri={item?.frontImageUri}
        createdAt={item?.createdAt}
        updateAt={item?.updateAt}
      />
    );
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
    <View style={styles.container}>
      <FlatList
        data={cards}
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

const enhance = WithObservables(["cards"], () => ({
  cards: cardDao.observerCard(),
}));

export default enhance(CardsList);
