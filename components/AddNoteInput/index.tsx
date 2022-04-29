import { Text, TextInput, View } from "react-native";

import dayjs from "dayjs";

import { Divider } from "@react-native-material/core";
import { AppTheme, RootStackParamList } from "../../types";
import { styles } from "./styles";
import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setNoteText,
  setTitleText,
} from "../../redux/features/addNote/addNoteSlice";

const AddNoteInput = ({
  theme,
  isDarkMode,
  route,
}: {
  theme: AppTheme;
  isDarkMode: boolean;
  route: RouteProp<RootStackParamList, "AddNote">;
}) => {
  const { titleText, noteText } = useAppSelector((state) => state.addNote);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (route.params) {
      dispatch(setTitleText(route.params.title));
      dispatch(setNoteText(route.params.note));
    }
  }, []);

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
          onChangeText={(text) => dispatch(setTitleText(text))}
          blurOnSubmit
          value={titleText}
        />
      </View>
      <Text style={{ color: "#C4C4C4" }}>
        {route.params
          ? route.params.dateCreated
          : dayjs(Date.now()).format("MMM DD, YYYY")}
      </Text>
      <Divider
        style={{
          marginTop: 15,
          height: 2,
          backgroundColor: isDarkMode ? "#656262" : "#C4C4C4",
        }}
      />
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <TextInput
          placeholder="Note"
          multiline
          underlineColorAndroid="transparent"
          style={{ ...styles.noteInput, color: theme.text }}
          placeholderTextColor={"#C4C4C4"}
          onChangeText={(text) => dispatch(setNoteText(text))}
          value={noteText}
        />
      </View>
    </>
  );
};

export default AddNoteInput;
