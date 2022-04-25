import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedStatusBar from "../components/ThemedStatusBar";
import useTheme from "../hooks/useTheme";
import { window } from "../constants/Layout";
import { StatusBar } from "expo-status-bar";

const ShowImages = ({ route }: RootStackScreenProps<"ShowImages">) => {
  const theme = useTheme();

  const { frontImageUri, backImageUri } = route.params;

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.background }}
    >
      <StatusBar style="light" backgroundColor="black" />
      <ScrollView
        snapToInterval={window.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.ScrollView}
        endFillColor="black"
      >
        <View style={styles.picture}>
          <Image
            source={{ uri: `file:///${frontImageUri}` }}
            style={styles.image}
          />
        </View>
        <View style={styles.picture}>
          <Image
            source={{ uri: `file:///${backImageUri}` }}
            style={styles.image}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  image: {
    aspectRatio: 16 / 9,
  },
  picture: {
    width: window.width,
    height: window.height,
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
  },
});
