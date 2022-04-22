import { View, Text, Image, Pressable as DefaultPressable } from "react-native";

import { Pressable, IconButton, useBoolean } from "@react-native-material/core";
import { AntDesign, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Fragment, useState } from "react";
import { CardProps } from "./types";
import { shareCard, copyToClipboard } from "../../utils/";
import ChooseDialog from "./ChooseDialog";
import AlertDialog from "../AlertDialog";
import { styles } from "./styles";

function Card({ theme, item }: CardProps) {
  // dialog state
  const [chooseVisible, setChooseVisible] = useBoolean(false);
  const [alert, setAlert] = useBoolean(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImageInfo | null>(null);

  // pick a image from device
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setAlertMessage("Permission to access storage is required!");
      setAlert.on();
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
    });

    if (pickerResult.cancelled) {
      return;
    }

    setSelectedImage(pickerResult);
  };

  //  share card
  const share = () => {
    if (!(selectedImage && selectedImage.uri)) {
      setAlertMessage("No image found to share");
      setAlert.on();
      return;
    }
    shareCard(selectedImage.uri, item.name);
  };

  // capture image from camera
  const captureImageAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      setAlertMessage("Permission to access camera is required!");
      setAlert.on();
      return;
    }

    const captureResult = await ImagePicker.launchCameraAsync({
      aspect: [16, 9],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (captureResult.cancelled) {
      return;
    }

    setSelectedImage(captureResult);
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
            <Image source={item.imageUrl} style={styles.image} />
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
            onPress={() => copyToClipboard(item.uid)}
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
      <ChooseDialog
        visible={chooseVisible}
        setVisible={setChooseVisible}
        openImagePickerAsync={openImagePickerAsync}
        captureImageAsync={captureImageAsync}
      />
      <AlertDialog
        visible={alert}
        setvisible={setAlert}
        message={alertMessage}
      />
    </Fragment>
  );
}

export default Card;
