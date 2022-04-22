import { StyleSheet, View } from "react-native";
import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";

import { IconButton, Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { NoteCardProps } from "./types";
import Menu from "./Menu";

const NoteCard = ({ theme, id, note, title }: NoteCardProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
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
              fontWeight: "600",
            }}
          >
            {title}
          </Text>
          <IconButton
            icon={() => (
              // @ts-ignore
              <Icon name="dots-vertical" size={24} color={theme.tint} />
            )}
            onPress={() => setVisible(true)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text color={theme.text} ellipsizeMode="tail" numberOfLines={7}>
            {note}
          </Text>
        </View>
      </View>
      <Menu
        visible={visible}
        setVisible={setVisible}
        theme={theme}
        note={note}
        id={id}
      />
    </Fragment>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
