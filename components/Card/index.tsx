import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable as DefaultPressable,
  Alert,
} from "react-native";

import { Pressable, IconButton, useBoolean } from "@react-native-material/core";
import {
  AntDesign,
  SimpleLineIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
import { CardProps } from "./types";
import { shareCard, copyUid } from "../../utils/cardScreenHelper";
import ChooseDialog from "./ChooseDialog";

function Card({ theme, item }: CardProps) {
  // dialog state
  const [chooseVisible, setChooseVisible] = useBoolean(false);

  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImageInfo | null>(null);

  // pick a image from device
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Alert!", "Permission to access storage is required!", [
        {
          text: "OK",
        },
      ]);
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    setSelectedImage(pickerResult);
  };

  //  share card
  const share = () => {
    if (!(selectedImage && selectedImage.uri)) {
      Alert.alert("", "No image found to share", [{ text: "OK" }]);
      return;
    }
    shareCard(selectedImage.uri, item.name);
  };

  // capture image from camera
  const captureImageAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Alert!", "Permission to access camera is required!", [
        {
          text: "OK",
        },
      ]);
      return;
    }

    const captureResult = await ImagePicker.launchCameraAsync();

    if (captureResult.cancelled) {
      return;
    }

    setSelectedImage(captureResult);
  };

  return (
    // card
    <View style={styles.cardContainer}>
      {/* card header */}
      <View style={styles.cardHeader}>
        <Text style={{ ...styles.cardTitle, color: theme.text }}>
          {item.name}
        </Text>
        <Pressable style={styles.cardSubtitle} pressEffectColor="#ccc">
          <Text style={{ color: theme.secondaryText }}>See details</Text>
        </Pressable>
      </View>

      {/* card image */}
      {!selectedImage ? (
        <DefaultPressable
          onPress={setChooseVisible.on}
          style={styles.placeholderContainer}
        >
          <View style={styles.placeholder}>
            {/* @ts-ignore */}
            <Feather name="camera" size={32} color={theme.tint} />
          </View>
        </DefaultPressable>
      ) : (
        <DefaultPressable
          style={{ ...styles.card, backgroundColor: theme.background }}
          onPress={setChooseVisible.on}
        >
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        </DefaultPressable>
      )}

      {/* card footer */}
      <View style={styles.cardFooter}>
        <Pressable
          style={styles.copyButton}
          pressEffectColor="#ccc"
          onPress={() => copyUid(item.uid)}
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
      <ChooseDialog
        visible={chooseVisible}
        setVisible={setChooseVisible}
        openImagePickerAsync={openImagePickerAsync}
        captureImageAsync={captureImageAsync}
      />
    </View>
  );
}

export default Card;

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
