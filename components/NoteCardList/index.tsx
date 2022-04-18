import { Fragment } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { useBoolean } from "@react-native-material/core";
import { Caption } from "react-native-paper";

import FAB from "../FAB";
import NoteCard from "../NoteCard";
import { NoteCardListProps } from "./types";
import { NoteCardProps } from "../NoteCard/types";
import { isSmallDevice, window } from "../../constants/Layout";

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

const NoteCardList = ({ theme, navigation }: NoteCardListProps) => {
  const [showFabButton, setShowFabButton] = useBoolean(false);

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

  const hideFabButton = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y >= 200) {
      if (showFabButton === false) return;
      setShowFabButton.off();
    } else {
      if (showFabButton === true) return;
      setShowFabButton.on();
    }
  };

  return (
    <Fragment>
      <FlatList
        style={{ ...styles.container, backgroundColor: theme.background }}
        data={data}
        renderItem={({ item }) => (
          <RenderItem
            theme={theme}
            id={item.id}
            note={item.note}
            title={item.title}
          />
        )}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent}
        onScroll={hideFabButton}
        scrollEventThrottle={50}
      />
      <FAB theme={theme} onPress={() => navigation.navigate("AddNote")} />
    </Fragment>
  );
};

export default NoteCardList;

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
