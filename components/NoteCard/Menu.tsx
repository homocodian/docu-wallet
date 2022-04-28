import { View } from "react-native";

import { List } from "react-native-paper";

import Dialog from "../Dialog";
import { NoteMenuProps } from "./types";
import { useAppDispatch } from "../../redux/hooks";
import copyToClipboard from "../../utils/copyToClipboard";
import { deleteNote } from "../../redux/features/addNote/addNoteSlice";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Menu = ({ visible, setVisible, theme, note, id }: NoteMenuProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  return (
    <Dialog
      visible={visible}
      onDismiss={() => setVisible(false)}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          backgroundColor: theme.background,
          width: 300,
          padding: 10,
          borderRadius: 4,
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
          title="Edit"
          left={(props) => (
            <List.Icon {...props} icon="content-edit" color={theme.tint} />
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
            <List.Icon {...props} icon="trash-can-outline" color="red" />
          )}
          onPress={() => {
            setVisible(false);
            dispatch(deleteNote(id));
          }}
          rippleColor="#fee2e2"
          titleStyle={{ color: "red" }}
        />
      </View>
    </Dialog>
  );
};

export default Menu;
