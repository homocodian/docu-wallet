import { Fragment } from "react";
import { View, Text, Image, Alert } from "react-native";

import { Pressable, IconButton } from "@react-native-material/core";
import { AntDesign, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import WithObservables from "@nozbe/with-observables";

import { CardProps } from "./types";
import { styles } from "./styles";
import { shareCard, copyToClipboard } from "../../utils/";
import { useNavigation } from "@react-navigation/native";

function Card({
  theme,
  item: { id, cardName, backImageUri, cardNumber, frontImageUri },
}: CardProps) {
  const navigation = useNavigation();

  const share = async (shareImageSide: "front" | "back") => {
    if (shareImageSide === "front" && frontImageUri) {
      await shareCard(`file:///${frontImageUri}`, cardName);
    } else if (shareImageSide === "back" && backImageUri) {
      await shareCard(`file:///${backImageUri}`, cardName);
    } else {
      Alert.alert("Alert!", "Can't share this file");
    }
  };

  const showFullScreen = () => {
    navigation.navigate("ShowImages", {
      frontImageUri,
      backImageUri,
    });
  };

  return (
    // card
    <Fragment>
      <View style={styles.cardContainer}>
        {/* card header */}
        <View style={styles.cardHeader}>
          <Text style={{ ...styles.cardTitle, color: theme.text }}>
            {cardName}
          </Text>
          <Pressable style={styles.cardSubtitle} pressEffectColor="#ccc">
            <Text
              style={{
                color: theme.secondaryText,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}
            >
              See details
            </Text>
          </Pressable>
        </View>

        {/* card image */}
        <View
          style={{
            ...styles.card,
            backgroundColor: theme.background,
            borderColor: theme.tint,
          }}
        >
          <Image
            source={{
              uri: `file:///${frontImageUri}`,
            }}
            style={styles.image}
          />
        </View>

        {/* card footer */}
        <View style={styles.cardFooter}>
          {/* copy button */}
          <Pressable
            style={styles.copyButton}
            pressEffectColor="#ccc"
            onPress={() => copyToClipboard(cardNumber)}
          >
            <Text style={{ color: theme.secondaryText }}>Copy uid </Text>
            {/* @ts-ignore */}
            <MaterialIcons name="content-copy" size={15} color={theme.text} />
          </Pressable>

          {/* other buttons */}
          <View style={{ flexDirection: "row" }}>
            {/* share button */}
            {/* @ts-ignore */}
            <IconButton
              icon={() => (
                // @ts-ignore
                <AntDesign name="sharealt" size={24} color={theme.tint} />
              )}
              color={theme.tint}
              onPress={() => share("front")}
            />
            {/* see both image */}
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
              onPress={showFullScreen}
            />
          </View>
        </View>
      </View>
    </Fragment>
  );
}

export default WithObservables(["cards"], ({ cards: item }) => ({
  item,
}))(Card);
