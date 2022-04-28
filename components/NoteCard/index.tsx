import { View } from "react-native";
import { Fragment, useState } from "react";

import { IconButton, Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import withObservables from "@nozbe/with-observables";

import { NoteCardProps } from "./types";
import Menu from "./Menu";
import { styles } from "./styles";

const NoteCard = ({ theme, item }: NoteCardProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <View style={{ ...styles.container, backgroundColor: theme.background }}>
        <View style={styles.header}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            color={theme.text}
            style={styles.titleText}
          >
            {item.title}
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
            {item.note}
          </Text>
        </View>
      </View>
      <Menu
        visible={visible}
        setVisible={setVisible}
        theme={theme}
        note={item.note}
        id={item.id}
        title={item.title}
        date={item.createdAt}
      />
    </Fragment>
  );
};

export default withObservables(["notes"], ({ notes: item }) => ({
  item,
}))(NoteCard);
