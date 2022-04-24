import { StyleSheet, View, Text as DefaultText, Alert } from "react-native";

import { Text, ActivityIndicator } from "@react-native-material/core";
import PDFView from "react-native-view-pdf";

import useTheme from "../hooks/useTheme";
import { RootStackScreenProps } from "../types";
import ThemedStatusBar from "../components/ThemedStatusBar";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";

function DocumentDetail({
  navigation,
  route,
}: RootStackScreenProps<"DocumentDetail">) {
  const data = route.params;
  const theme = useTheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const [loading, setLoading] = useState(true);

  const onErrorLoading = () => {
    Alert.alert("Error!", "Failed to load pdf");
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <ThemedStatusBar />

      {/* Header */}
      <View style={{ padding: 15 }}>
        {/* document name and date created at */}
        <View style={styles.row}>
          <Text style={{ color: theme.text }}>{data.name}</Text>
          <DefaultText style={{ color: isDarkMode ? "#fffA" : "#12121280" }}>
            {data.createdAt}
          </DefaultText>
        </View>

        {/* uid & filename */}
        <View style={{ ...styles.row, marginTop: 15 }}>
          <DefaultText style={{ color: theme.text }} ellipsizeMode="tail">
            UID: {data.uid}
          </DefaultText>
          <DefaultText style={{ color: theme.text }} ellipsizeMode="tail">
            Filename: {data.fileName}
          </DefaultText>
        </View>
      </View>

      {/* pdf view */}
      {/* @ts-ignore */}
      <PDFView
        style={{ flex: 1 }}
        resource={data.fileUri}
        resourceType="file"
        onLoad={() => setLoading(false)}
        onError={onErrorLoading}
      />
      {loading && <ActivityIndicator color="green" size="large" />}
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
});
