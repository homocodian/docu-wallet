import { FlatList, StatusBar, StyleSheet, View } from "react-native";

import { Caption } from "react-native-paper";
import withObservables from "@nozbe/with-observables";

import NoteCard from "../NoteCard";
import { NoteCardProps } from "../NoteCard/types";
import { isSmallDevice, window } from "../../constants/Layout";
import NoteDAO from "../../db/dao/Note";
import { AppTheme } from "../../types";

const data = [
  {
    id: "1",
    title: "Main Id lauch speech for google play good",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores blanditiis reiciendis adipisci dolor, rem aut necessitatibus repellat quae ut sapiente accusantium, voluptatibus aliquam, eligendi cum? Nisi veritatis nihil necessitatibus possimus!",
  },
  {
    id: "2",
    title: "two",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores blanditiis reiciendis adipisci dolor, rem aut necessitatibus repellat quae ut sapiente accusantium, voluptatibus aliquam, eligendi cum? Nisi veritatis nihil necessitatibus possimus! Nisi veritatis nihil necessitatibus possimus!Nisi veritatis nihil necessitatibus possimus!",
  },
  {
    id: "3",
    title: "three",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores blanditiis reiciendis adipisci dolor, rem aut necessitatibus repellat quae ut sapiente accusantium, voluptatibus aliquam, eligendi cum? Nisi veritatis nihil necessitatibus possimus!",
  },
  {
    id: "4",
    title: "four",
    note: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores blanditiis reiciendis adipisci dolor, rem aut necessitatibus repellat quae ut sapiente accusantium, voluptatibus aliquam, eligendi cum? Nisi veritatis nihil necessitatibus possimus!",
  },
];

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
      data={notes}
      renderItem={({ item }) => (
        <RenderItem
          theme={theme}
          id={item.id}
          note={item.note}
          title={item.title}
        />
      )}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 88,
      }}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={EmptyComponent}
    />
  );
};

const enhance = withObservables([], () => ({
  notes: NoteDAO.observerNote(),
}));

export default enhance(NoteCardList);

function RenderItem({ theme, id, note, title }: NoteCardProps) {
  return <NoteCard theme={theme} id={id} note={note} title={title} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  emptyComponent: {
    height:
      window.height -
      (StatusBar.currentHeight ? StatusBar.currentHeight + 100 : 140),
    justifyContent: "center",
    alignItems: "center",
  },
});
