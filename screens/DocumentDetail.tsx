import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import { Divider, Pressable } from "@react-native-material/core";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import useTheme from "../hooks/useTheme";
import { RootStackScreenProps } from "../types";
import ThemedStatusBar from "../components/ThemedStatusBar";
import documentDao from "../db/dao/Document";
import AlertSnackbar from "../components/Snackbars/AlertSnackbar";

let message = "";

function DocumentDetail({
  navigation,
  route,
}: RootStackScreenProps<"DocumentDetail">) {
  const data = route.params;
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const deleteDocument = async () => {
    try {
      await documentDao.deleteDocument(data.id);
      navigation.canGoBack() ? navigation.goBack() : navigation.pop();
    } catch (error) {
      message = "Failed to delete";
      setVisible(true);
    }
  };

  const editDocument = () => {
    navigation.replace("AddDocument", {
      id: data.id,
      documentName: data.name,
      fileName: data.fileName,
      fileUri: data.fileUri,
      uid: data.uid,
      screenTitle: "Edit Document",
    });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <ThemedStatusBar />

      <View style={{ marginTop: 30 }}>
        {/* edit button */}
        <Divider style={{ height: 2 }} />
        <Pressable
          style={styles.editButton}
          pressEffectColor="#ccc"
          onPress={editDocument}
        >
          {/* @ts-ignore */}
          <AntDesign name="edit" size={24} color={theme.tint} />
          <Text style={{ ...styles.editButtonText, color: theme.text }}>
            Edit Document
          </Text>
        </Pressable>

        <Divider style={{ height: 2 }} />

        {/* delete button */}
        <Pressable
          style={styles.editButton}
          pressEffectColor="#ccc"
          onPress={deleteDocument}
        >
          {/* @ts-ignore */}
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={theme.tint}
          />
          <Text style={{ ...styles.editButtonText, color: theme.text }}>
            Delete Document
          </Text>
        </Pressable>
        <Divider style={{ height: 2 }} />
      </View>
      {/* document detail */}
      <View
        style={{
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>
          Name: {data.name}, UID: {data.uid}
        </Text>
        <Text style={styles.text}>Document Created: {data.createdAt}</Text>
      </View>
      <AlertSnackbar
        visible={visible}
        setVisible={setVisible}
        message={message}
      />
    </View>
  );
}

export default DocumentDetail;

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
