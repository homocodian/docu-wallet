import { StyleSheet, View } from "react-native";
import React from "react";

import { IconButton, Text } from "@react-native-material/core";

import { NoteCardProps } from "./types";
import { Feather } from "@expo/vector-icons";
import { copyToClipboard } from "../../utils";

const NoteCard = ({ theme, id, note, title }: NoteCardProps) => {
  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          color={theme.text}
          style={{
            textTransform: "capitalize",
            maxWidth: "75%",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <IconButton
          icon={() => (
            // @ts-ignore
            <Feather name="copy" size={18} color={theme.tint} />
          )}
          onPress={() => copyToClipboard(note)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text color={theme.text} ellipsizeMode="tail" numberOfLines={7}>
          {note}
        </Text>
      </View>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginBottom: 15,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
