import { useCallback } from "react";
import { View, Text, Pressable, Alert, Image, Platform } from "react-native";

import {
  ActivityIndicator,
  IconButton,
  Pressable as RipplePressable,
} from "@react-native-material/core";
import { AntDesign, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import Pdf from "react-native-pdf";
import RNFetchBlob from "react-native-blob-util";
import WithObservables from "@nozbe/with-observables";

import { Fragment } from "react";
import { DocumentProps } from "./types";
import { copyToClipboard, shareCard } from "../../utils";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function DocumentCard({ theme, item }: DocumentProps) {
  const navigation = useNavigation();
  //  share card
  const share = () => {
    if (!item.fileUri) {
      Alert.alert("Alert!", "No document found to share");
      return;
    }
    shareCard(`file:///${item.fileUri}`, item.name);
  };

  // open details screen
  const openDetails = useCallback(() => {
    navigation.navigate("DocumentDetail", {
      id: item.id,
      uid: item.uid,
      name: item.name,
      fileUri: item.fileUri,
      fileName: item.fileName,
      fileSize: item.fileSize,
      createdAt: item.createdAt.toDateString(),
      updatedAt: item.updatedAt.toDateString(),
    });
  }, []);

  const openPdf = () => {
    if (Platform.OS === "ios") {
      RNFetchBlob.ios.openDocument(item.fileUri);
    } else {
      try {
        RNFetchBlob.android.actionViewIntent(item.fileUri, "application/pdf");
      } catch (error) {
        Alert.alert("Alert!", "Failed to share document");
      }
    }
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
          <RipplePressable
            style={styles.cardSubtitle}
            onPress={openDetails}
            pressEffectColor="#ccc"
          >
            <Text style={{ color: theme.secondaryText }}>See details</Text>
          </RipplePressable>
        </View>

        {/*document card */}
        <Pressable
          style={{
            ...styles.card,
            backgroundColor: theme.background,
            borderColor: theme.tint,
          }}
          onPress={openPdf}
        >
          {/* @ts-ignore */}
          <Pdf
            source={{ uri: `file:///${item.fileUri}` }}
            style={{ aspectRatio: 16 / 9 }}
            renderActivityIndicator={() => (
              <ActivityIndicator color="green" size="large" />
            )}
            enablePaging
            singlePage
            onError={(err) => console.log(err)}
          />
        </Pressable>

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
              onPress={openDetails}
            />
          </View>
        </View>
      </View>
    </Fragment>
  );
}

export default WithObservables(["documents"], ({ documents: item }) => ({
  item,
}))(DocumentCard);
