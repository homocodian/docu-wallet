import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";

import { IconButton, useBoolean } from "@react-native-material/core";
import {
  AntDesign,
  SimpleLineIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Fragment, useState } from "react";
import { DocumentProps } from "./types";
import { copyToClipboard, shareCard } from "../../utils";
import AlertDialog from "../AlertDialog";

function DocumentCard({ theme, item }: DocumentProps) {
  const [selectedDoc, setSelectedDoc] = useState<ImagePicker.ImageInfo | null>(
    null
  );
  const [alert, setAlert] = useBoolean(false);
  const [alertMessage, setAlertMessage] = useState("");

  //  share card
  const share = () => {
    if (!(selectedDoc && selectedDoc.uri)) {
      setAlertMessage("No document found to share");
      setAlert.on();
      return;
    }
    shareCard(selectedDoc.uri, item.name);
  };

  return (
    // card
    <Fragment>
      <View style={styles.cardContainer}>
        {/* card header */}
        <View style={styles.cardHeader}>
          <Text style={{ ...styles.cardTitle, color: theme.text }}>
            {item.name}
          </Text>
          <Pressable style={styles.cardSubtitle}>
            <Text style={{ color: theme.secondaryText }}>See details</Text>
          </Pressable>
        </View>

        {/* card image */}
        {!selectedDoc ? (
          <Pressable onPress={() => {}} style={styles.placeholderContainer}>
            <View style={styles.placeholder}>
              {/* @ts-ignore */}
              <Feather name="camera" size={32} color={theme.tint} />
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={{ ...styles.card, backgroundColor: theme.background }}
            onPress={() => {}}
          >
            <Image source={{ uri: selectedDoc.uri }} style={styles.image} />
          </Pressable>
        )}

        {/* card footer */}
        <View style={styles.cardFooter}>
          <Pressable
            style={styles.copyButton}
            onPress={() => copyToClipboard(item.id)}
          >
            <Text style={{ color: theme.secondaryText }}>Copy uid </Text>
            {/* @ts-ignore */}
            <MaterialIcons name="content-copy" size={15} color={theme.text} />
          </Pressable>
          <View style={{ flexDirection: "row" }}>
            {/* @ts-ignore */}
            <IconButton
              icon={() => (
                // @ts-ignore
                <AntDesign name="sharealt" size={24} color={theme.tint} />
              )}
              color={theme.tint}
              onPress={share}
            />
            {/* @ts-ignore */}
            <IconButton
              icon={() => (
                // @ts-ignore
                <SimpleLineIcons
                  name="size-fullscreen"
                  size={20}
                  color={theme.tint}
                />
              )}
              color={theme.tint}
            />
          </View>
        </View>
      </View>
      <AlertDialog
        visible={alert}
        setvisible={setAlert}
        message={alertMessage}
      />
    </Fragment>
  );
}

export default DocumentCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    marginVertical: 10,
  },
  cardHeader: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {},
  card: {
    width: "100%",
    borderRadius: 15,
    borderColor: "#121212",
    borderWidth: 1,
    overflow: "hidden",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  copyButton: {
    color: "#B0BEC5",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },
  placeholderContainer: {
    borderColor: "#121212",
    borderWidth: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  placeholder: {
    aspectRatio: 16 / 9,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
});
