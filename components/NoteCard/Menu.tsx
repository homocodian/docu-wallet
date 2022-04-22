import { StyleSheet } from "react-native";

import { Dialog, List, Portal } from "react-native-paper";

import { NoteMenuProps } from "./types";
import copyToClipboard from "../../utils/copyToClipboard";
import { useAppDispatch } from "../../redux/hooks";
import { deleteNote } from "../../redux/features/addNote/addNoteSlice";
import { StatusBar } from "expo-status-bar";

const Menu = ({ visible, setVisible, theme, note, id }: NoteMenuProps) => {
  const dispatch = useAppDispatch();

  return (
    // @ts-ignore
    <Portal>
      {/* @ts-ignore */}
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        theme={{
          colors: {
            background: theme.background,
            primary: theme.primary,
            surface: theme.background,
          },
          mode: "exact",
        }}
      >
        {/* @ts-ignore */}
        <List.Item
          title="Copy"
          left={(props) => (
            <List.Icon {...props} icon="content-copy" color={theme.tint} />
          )}
          onPress={() => {
            setVisible(false);
            copyToClipboard(note);
          }}
          rippleColor="#C4C4C4"
          titleStyle={{ color: theme.text }}
        />
        {/* @ts-ignore */}
        <List.Item
          title="Delete"
          left={(props) => (
            <List.Icon {...props} icon="trash-can-outline" color={theme.tint} />
          )}
          onPress={() => {
            setVisible(false);
            dispatch(deleteNote(id));
          }}
          rippleColor="#C4C4C4"
          titleStyle={{ color: theme.text }}
        />
      </Dialog>
    </Portal>
  );
};

export default Menu;

const styles = StyleSheet.create({});
