import {
  NativeSyntheticEvent,
  StyleSheet,
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

const AddNoteInput = ({
  theme,
  isDarkMode,
}: {
  theme: AppTheme;
  isDarkMode: boolean;
}) => {
  const { titleText, noteText } = useAppSelector((state) => state.addNote);
  const dispatch = useAppDispatch();

  const onTitleTextChage = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    dispatch(setTitleText({ text: e.nativeEvent.text }));
  };

  const onNoteTextChage = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    dispatch(setNoteText({ note: e.nativeEvent.text }));
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
          onChange={onTitleTextChage}
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
          onChange={onNoteTextChage}
          value={noteText}
        />
      </View>
    </>
  );
};

export default AddNoteInput;

const styles = StyleSheet.create({
  titleInput: {
    fontSize: 22,
    fontWeight: "600",
  },
  noteInput: {
    fontSize: 20,
    fontWeight: "600",
    paddingTop: 15,
  },
});
