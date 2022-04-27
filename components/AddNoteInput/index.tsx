import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

import dayjs from "dayjs";

import { Divider } from "@react-native-material/core";
import { AppTheme } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setNoteText,
  setTitleText,
} from "../../redux/features/addNote/addNoteSlice";
import { styles } from "./styles";

const AddNoteInput = ({
  theme,
  isDarkMode,
}: {
  theme: AppTheme;
  isDarkMode: boolean;
}) => {
  const { titleText, noteText } = useAppSelector((state) => state.addNote);
  const dispatch = useAppDispatch();

  const onTitleTextChage = (text: string) => {
    dispatch(setTitleText({ text: text }));
  };

  const onNoteTextChage = (text: string) => {
    dispatch(setNoteText({ note: text }));
  };

  return (
    <>
      <View>
        <TextInput
          style={{
            ...styles.titleInput,
            backgroundColor: theme.background,
            color: theme.text,
          }}
          numberOfLines={2}
          placeholder="Title"
          placeholderTextColor={"#C4C4C4"}
          selectionColor={theme.tint}
          onChangeText={onTitleTextChage}
          blurOnSubmit
          value={titleText}
        />
      </View>
      <Text style={{ color: "#C4C4C4" }}>
        {dayjs(Date.now()).format("DD MMMM YYYY")}
      </Text>
      <Divider
        style={{
          marginTop: 15,
          height: 2,
          backgroundColor: isDarkMode ? "#656262" : "#C4C4C4",
        }}
      />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Note"
          multiline
          selectionColor={theme.tint}
          style={{ ...styles.noteInput, color: theme.text }}
          placeholderTextColor={"#C4C4C4"}
          onChangeText={onNoteTextChage}
          value={noteText}
        />
      </View>
    </>
  );
};

export default AddNoteInput;
