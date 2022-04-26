import { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import {
  Stack,
  Pressable as StyledPressable,
} from "@react-native-material/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import RNFetchBlob from "react-native-blob-util";

import useTheme from "../hooks/useTheme";
import { useAppSelector } from "../redux/hooks";
import documentDao from "../db/dao/Document";
import storagePermission from "../utils/storagePermission";
import { RootStackScreenProps } from "../types";

interface PickerResult {
  type: "success";
  name: string;
  size?: number | undefined;
  uri: string;
  mimeType?: string | undefined;
  lastModified?: number | undefined;
  file?: File | undefined;
  output?: FileList | null | undefined;
}

const AddDocument = ({
  navigation,
  route,
}: RootStackScreenProps<"AddDocument">) => {
  const docToEdit = route.params;

  const theme = useTheme();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);
  const [selectedDocument, setSelectedDocument] = useState<PickerResult | null>(
    docToEdit
      ? {
          type: "success",
          name: docToEdit.fileName,
          uri: docToEdit.fileUri,
        }
      : null
  );

  const [docName, setDocName] = useState(
    docToEdit ? docToEdit.documentName : ""
  );
  const [docUID, setDocUID] = useState(docToEdit ? docToEdit.uid : "");
  const [loading, setLoading] = useState(false);
  const [storageRWPermission, setStorageRWPermission] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const isPermitted = await storagePermission();
      setStorageRWPermission(isPermitted);
    };
    checkPermission();
  }, []);

  const openPicker = useCallback(async () => {
    try {
      // check for permissions

      if (!storageRWPermission) {
        const isPermitted = await storagePermission();
        if (isPermitted) {
          setStorageRWPermission(isPermitted);
        } else {
          Alert.alert(
            "Permission!",
            "Give storage permission to save documents"
          );
          return;
        }
      }

      const pickerResult = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: "application/pdf",
      });

      if (pickerResult.type === "cancel") return;
      setSelectedDocument(pickerResult);
    } catch (error) {
      Alert.alert("Alert!", "Failed to pick file");
    }
  }, []);

  const addDocument = useCallback(
    async (name: string, uid: string, fileName: string, fileUri: string) => {
      return await documentDao.createDocument({
        name: name,
        uid: uid,
        fileName: fileName,
        fileUri: fileUri,
      });
    },
    []
  );

  const updateDocument = useCallback(
    async (
      id: string,
      name: string,
      uid: string,
      fileName: string,
      fileUri: string
    ) => {
      return await documentDao.updateDocument({
        id,
        name,
        uid,
        fileName,
        fileUri,
      });
    },
    []
  );

  const saveDocument = useCallback(async () => {
    if (!docName || !docUID || !selectedDocument) {
      Alert.alert("Invalid data!", "Provide name, uid and file");
      return;
    }

    setLoading(true);

    if (!storageRWPermission) {
      setLoading(false);
      Alert.alert("Alert!", "Please give storage permission to save document");
      return;
    }

    const path =
      (await RNFetchBlob.android.getSDCardApplicationDir()) + "/documents";
    const fileName = path + `/${selectedDocument.name}`;

    const isDir = await RNFetchBlob.fs.isDir(path);

    if (!isDir) {
      try {
        await RNFetchBlob.fs.mkdir(path + "/documents");
      } catch (error) {
        Alert.alert(
          "Failed!",
          "Failed to create folder, please check storage permission"
        );
        setLoading(false);
        return;
      }
    }

    try {
      if (await RNFetchBlob.fs.exists(fileName)) {
        if (docToEdit) {
          await updateDocument(
            docToEdit.id,
            docName,
            docUID,
            selectedDocument.name,
            fileName
          );
        } else {
          await addDocument(docName, docUID, selectedDocument.name, fileName);
        }
      } else {
        const base64PDF = await RNFetchBlob.fs.readFile(
          selectedDocument.uri,
          "base64"
        );
        await RNFetchBlob.fs.createFile(fileName, base64PDF, "base64");
        if (docToEdit) {
          await updateDocument(
            docToEdit.id,
            docName,
            docUID,
            selectedDocument.name,
            fileName
          );
        } else {
          await addDocument(docName, docUID, selectedDocument.name, fileName);
        }
      }
    } catch (error) {
      Alert.alert("Failed to save document");
    }

    setLoading(false);
    navigation.canGoBack() && navigation.goBack();
  }, [docName, docUID, selectedDocument]);

  return (
    <>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={theme.background}
      />
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.background,
        }}
      >
        <Stack spacing={26} style={styles.stack}>
          {/* document name input */}
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
              color: theme.text,
            }}
            placeholder="Document Name"
            placeholderTextColor={isDarkMode ? "#666161" : "#C4C4C4"}
            selectionColor={isDarkMode ? "#fff" : "#121212"}
            onChangeText={setDocName}
            value={docName}
          />
          {/* uid or document number */}
          <TextInput
            placeholder="UID"
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
              color: theme.text,
            }}
            placeholderTextColor={isDarkMode ? "#666161" : "#C4C4C4"}
            selectionColor={isDarkMode ? "#fff" : "#121212"}
            onChangeText={setDocUID}
            value={docUID}
          />
        </Stack>
        <View style={{ marginTop: 27 }}>
          <Text style={styles.uploadText}>Upload Document</Text>
        </View>
        {!selectedDocument ? (
          <View style={styles.boxContainer}>
            <Pressable
              style={{
                ...styles.box,
                backgroundColor: isDarkMode ? "#141313" : "#F9F9F9",
              }}
              onPress={openPicker}
            >
              {/* @ts-ignore */}
              <MaterialIcons
                name="add-photo-alternate"
                size={24}
                color={isDarkMode ? "#fff" : "#C4C4C4"}
              />
              <Text style={{ color: isDarkMode ? "#fff" : "#C4C4C4" }}>
                PDF
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            {/* @ts-ignore */}
            <LottieView
              source={require("../assets/animations/success.json")}
              autoPlay
              loop={false}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 150,
              }}
            />
            <Text style={{ color: theme.text }}>{selectedDocument?.name}</Text>
            <StyledPressable
              onPress={() => setSelectedDocument(null)}
              pressEffectColor="#ccc"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginTop: 10,
              }}
            >
              <Text style={{ color: theme.text, fontSize: 17 }}>Remove</Text>
            </StyledPressable>
          </View>
        )}
        <Pressable
          style={{ ...styles.button, backgroundColor: theme.primary }}
          onPress={saveDocument}
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
              {docToEdit ? "Save Changes" : "Save Card"}
            </Text>
          )}
        </Pressable>
      </View>
    </>
  );
};

export default AddDocument;

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
    fontSize: 20,
    fontWeight: "600",
  },
  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
  },
  box: {
    width: "100%",
    height: 135,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 55,
    height: 61,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
