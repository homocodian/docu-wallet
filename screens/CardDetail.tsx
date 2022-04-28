import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import { Divider, Pressable } from "@react-native-material/core";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import useTheme from "../hooks/useTheme";
import { RootStackScreenProps } from "../types";
import ThemedStatusBar from "../components/ThemedStatusBar";
import cardDao from "../db/dao/Card";
import AlertSnackbar from "../components/Snackbars/AlertSnackbar";

let message = "";

function CardDetail({ navigation, route }: RootStackScreenProps<"CardDetail">) {
  const { id, cardName, cardNumber, createdAt } = route.params;
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const deleteCard = async () => {
    try {
      await cardDao.deleteCard(id);
      navigation.canGoBack() ? navigation.goBack() : navigation.pop();
    } catch (error) {
      message = "Failed to delete";
      setVisible(true);
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <ThemedStatusBar />

      <View style={{ marginTop: 30 }}>
        {/* edit button */}
        <Divider style={{ height: 2 }} />
        <Pressable style={styles.editButton} pressEffectColor="#ccc">
          {/* @ts-ignore */}
          <AntDesign name="edit" size={24} color={theme.tint} />
          <Text style={{ ...styles.editButtonText, color: theme.text }}>
            Edit Card
          </Text>
        </Pressable>

        <Divider style={{ height: 2 }} />

        {/* delete button */}
        <Pressable
          style={styles.editButton}
          pressEffectColor="#ccc"
          onPress={deleteCard}
        >
          {/* @ts-ignore */}
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={theme.tint}
          />
          <Text style={{ ...styles.editButtonText, color: theme.text }}>
            Delete Card
          </Text>
        </Pressable>
        <Divider style={{ height: 2 }} />
      </View>
      {/* card detail */}
      <View
        style={{
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>
          Name: {cardName}, UID: {cardNumber}
        </Text>
        <Text style={styles.text}>Card Created: {createdAt}</Text>
      </View>
      <AlertSnackbar
        visible={visible}
        setVisible={setVisible}
        message={message}
      />
    </View>
  );
}

export default CardDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  editButtonText: {
    marginLeft: 15,
    fontSize: 17,
  },
  text: {
    fontSize: 16,
    color: "gray",
    fontWeight: "300",
  },
});
