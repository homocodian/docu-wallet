import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable as DefaultPressable,
  Image,
} from "react-native";

import { Pressable, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import RNFetchBlog from "react-native-blob-util";

import useTheme from "../hooks/useTheme";
import { useAppSelector } from "../redux/hooks";
import { StatusBar } from "expo-status-bar";
import AlertSnackbar from "../components/Snackbars/AlertSnackbar";
import storagePermission from "../utils/storagePermission";
import cardDao from "../db/dao/Card";
import getFileExt from "../utils/getFileExt";
import { RootStackScreenProps } from "../types";

type ImageInfo = {
  front: ImagePicker.ImageInfo | null;
  back: ImagePicker.ImageInfo | null;
};

let message = "Permissin is required";

const AddCard = ({ navigation }: RootStackScreenProps<"AddCard">) => {
  const theme = useTheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cardTextInfo, setCardTextInfo] = useState({
    cardName: "",
    cardNumber: "",
  });

  const [imagesInfo, setImageInfo] = useState<ImageInfo>({
    front: null,
    back: null,
  });

  const openPicker = useCallback(async (imageSide: "front" | "back") => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!status.granted) {
      message = "Media permissions is required!";
      setVisible(true);
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [16, 9],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (pickerResult.cancelled) return;
    setImageInfo((prev) => ({
      ...prev,
      [imageSide]: pickerResult,
    }));
  }, []);

  const onTextChange = (text: string, whatInfo: "cardName" | "cardNumber") => {
    setCardTextInfo((prev) => ({
      ...prev,
      [whatInfo]: text,
    }));
  };

  const addCard = useCallback(async () => {
    if (
      cardTextInfo.cardName === "" ||
      cardTextInfo.cardNumber === "" ||
      !imagesInfo.front ||
      !imagesInfo.back
    ) {
      message = "Every field is required";
      setVisible(true);
      return;
    }

    try {
      setLoading(true);
      const permission = await storagePermission();

      if (!permission) {
        message = "Storage Permission is required";
        setVisible(true);
        return;
      }

      const path =
        (await RNFetchBlog.android.getSDCardApplicationDir()) + "/cards";

      const frontImageNameExt = getFileExt(imagesInfo.front.uri);
      const backImageNameExt = getFileExt(imagesInfo.back.uri);

      const frontFileName =
        path + `/${(Date.now() + 10).toString()}.${frontImageNameExt}`;
      const backFileName =
        path + `/${(Date.now() + 15).toString()}.${backImageNameExt}`;

      const frontBase64 = await RNFetchBlog.fs.readFile(
        imagesInfo.front?.uri,
        "base64"
      );

      const backBase64 = await RNFetchBlog.fs.readFile(
        imagesInfo.back?.uri,
        "base64"
      );

      // check if folder exists
      if (!(await RNFetchBlog.fs.isDir(path))) {
        await RNFetchBlog.fs.mkdir(path);
      }

      // create file in cards folder
      await Promise.all([
        RNFetchBlog.fs.createFile(frontFileName, frontBase64, "base64"),
        RNFetchBlog.fs.createFile(backFileName, backBase64, "base64"),
      ]);

      // add card
      await cardDao.createCard({
        cardName: cardTextInfo.cardName,
        cardNumber: cardTextInfo.cardNumber,
        frontImageUri: frontFileName,
        backImageUri: backFileName,
      });

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      message = "Failed to add";
      setVisible(true);
    }
  }, [imagesInfo, cardTextInfo]);

  return (
    <>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={theme.background}
      />
      <View
        style={{
          ...styles.container,
          backgroundColor: isDarkMode ? "#212121" : "#fff",
        }}
      >
        <Stack spacing={26} style={styles.stack}>
          {/* card name */}
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
              color: theme.text,
            }}
            placeholder="Card Name"
            placeholderTextColor={isDarkMode ? "#666161" : "#C4C4C4"}
            selectionColor={theme.tint}
            blurOnSubmit
            value={cardTextInfo.cardName}
            onChangeText={(text) => onTextChange(text, "cardName")}
          />

          {/* card uid */}
          <TextInput
            placeholder="UID Number"
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
              color: theme.text,
            }}
            placeholderTextColor={isDarkMode ? "#666161" : "#C4C4C4"}
            selectionColor={theme.tint}
            blurOnSubmit
            value={cardTextInfo.cardNumber}
            onChangeText={(text) => onTextChange(text, "cardNumber")}
          />
        </Stack>

        {/* upload text */}
        <View style={{ marginTop: 27 }}>
          <Text style={styles.uploadText}>Upload Images of ID</Text>
        </View>

        {/* image container */}
        <View style={styles.boxContainer}>
          {/* front image */}
          <DefaultPressable
            style={{
              ...styles.box,
              backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
            }}
            onPress={() => openPicker("front")}
          >
            {imagesInfo.front ? (
              <Image
                source={{ uri: imagesInfo.front.uri }}
                style={styles.imagePreview}
              />
            ) : (
              <>
                {/* @ts-ignore */}
                <Icon
                  name="add-photo-alternate"
                  size={24}
                  color={isDarkMode ? "#fff" : "#C4C4C4"}
                />
                <Text style={{ color: isDarkMode ? "#fff" : "#C4C4C4" }}>
                  Front
                </Text>
              </>
            )}
          </DefaultPressable>
          {/* back image */}
          <DefaultPressable
            style={{
              ...styles.box,
              backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
            }}
            onPress={() => openPicker("back")}
          >
            {imagesInfo.back ? (
              <Image
                source={{ uri: imagesInfo.back.uri }}
                style={styles.imagePreview}
              />
            ) : (
              <>
                {/* @ts-ignore */}
                <Icon
                  name="add-photo-alternate"
                  size={24}
                  color={isDarkMode ? "#fff" : "#C4C4C4"}
                />
                <Text style={{ color: isDarkMode ? "#fff" : "#C4C4C4" }}>
                  Front
                </Text>
              </>
            )}
          </DefaultPressable>
        </View>

        {/* save card button */}
        <Pressable
          style={{ ...styles.button, backgroundColor: theme.primary }}
          onPress={addCard}
          disabled={loading}
        >
          {loading ? (
            // @ts-ignore
            <LottieView
              source={require("../assets/animations/dots-loading.json")}
              autoPlay
              loop
              resizeMode="cover"
              style={{
                width: "100%",
                height: 150,
              }}
            />
          ) : (
            <Text
              style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}
            >
              Save Card
            </Text>
          )}
        </Pressable>
      </View>
      <AlertSnackbar
        visible={visible}
        setVisible={setVisible}
        message={message}
      />
    </>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  stack: {
    marginTop: 46,
  },
  input: {
    width: "100%",
    height: 59,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 20,
  },
  uploadText: {
    color: "#939090",
    fontSize: 15,
    fontWeight: "600",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 27,
  },
  box: {
    width: "47%",
    height: 103,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    marginTop: 55,
    height: 61,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  imagePreview: {
    resizeMode: "cover",
    width: "100%",
    height: 103,
  },
});
