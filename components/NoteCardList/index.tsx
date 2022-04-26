import { FlatList, View } from "react-native";

import { Caption } from "react-native-paper";
import withObservables from "@nozbe/with-observables";

import NoteCard from "../NoteCard";
import { NoteCardProps } from "../NoteCard/types";
import { isSmallDevice } from "../../constants/Layout";
import NoteDAO from "../../db/dao/Note";
import { AppTheme } from "../../types";
import { styles } from "./styles";

const NoteCardList = ({ theme, notes }: { theme: AppTheme; notes: any }) => {
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
          No notes to show, add one to see here!
        </Caption>
      </View>
    );
  }

  return (
    <FlatList
      style={{ ...styles.container, backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
      data={notes}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={EmptyComponent}
      renderItem={({ item }) => <NoteCard theme={theme} notes={item} />}
    />
  );
};

const enhance = withObservables([], () => ({
  notes: NoteDAO.observerNote(),
}));

export default enhance(NoteCardList);
