import { useCallback } from "react";
import { View, Text, Pressable, Alert, Image } from "react-native";

import { IconButton } from "@react-native-material/core";
import { AntDesign, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";

import { Fragment } from "react";
import { DocumentProps } from "./types";
import { copyToClipboard, shareCard } from "../../utils";
import { styles } from "./styles";

function DocumentCard({ theme, item, navigation }: DocumentProps) {
  //  share card
  const share = () => {
    if (!item.fileUri) {
      Alert.alert("No document found to share");
      return;
    }
    shareCard(item.fileUri, item.name, "application/pdf");
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

  return (
    // card
    <Fragment>
      <View style={styles.cardContainer}>
        {/* card header */}
        <View style={styles.cardHeader}>
          <Text style={{ ...styles.cardTitle, color: theme.text }}>
            {item.name}
          </Text>
          <Pressable style={styles.cardSubtitle} onPress={openDetails}>
            <Text style={{ color: theme.secondaryText }}>See details</Text>
          </Pressable>
        </View>

        {/* Card */}
        <View
          style={{
            ...styles.card,
            backgroundColor: theme.background,
            borderColor: theme.tint,
          }}
        >
          <Image
            source={require("../../assets/images/pdf.png")}
            style={{
              resizeMode: "cover",
            }}
          />
          <Text style={{ color: theme.text }}> {item.fileName} </Text>
        </View>

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

export default DocumentCard;
