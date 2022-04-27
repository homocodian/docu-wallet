import { View, Text } from "react-native";

import { RadioButton } from "react-native-paper";
import { Divider } from "@react-native-material/core";

import { Appearance, AppAppearanceDialogProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAppAppearance } from "../../redux/features/appTheme/appThemeSlice";
import useTheme from "../../hooks/useTheme";
import useColorScheme from "../../hooks/useColorScheme";
import { styles } from "./styles";
import Dialog from "../Dialog";

const ChooseAppearance = ({
  visible,
  setVisible,
}: AppAppearanceDialogProps) => {
  const { appearance, isDark } = useAppSelector((state) => state.appTheme);
  const nativeColorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const onValueChange = (value: Appearance) => {
    dispatch(
      setAppAppearance({
        appearance: value,
        nativeColorScheme,
      })
    );
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={setVisible.off}
      onRequestClose={setVisible.off}
    >
      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: 4,
          width: 300,
        }}
      >
        <View style={{ padding: 10, marginTop: 10, paddingLeft: 20 }}>
          <Text style={{ ...styles.title, color: theme.text }}>
            Choose Appearance
          </Text>
        </View>
        <Divider color={isDark ? "#121212" : "#ccc"} />
        <View
          style={{
            padding: 15,
            paddingTop: 5,
          }}
        >
          <RadioButton.Group
            onValueChange={(newValue) => {
              setVisible.off();
              onValueChange(newValue as Appearance);
            }}
            value={appearance}
          >
            <View style={styles.row}>
              {/* @ts-ignore */}
              <RadioButton
                value="system"
                theme={{
                  colors: {
                    text: theme.text,
                  },
                  mode: "exact",
                  dark: isDark,
                }}
              />
              <Text style={{ ...styles.spacedText, color: theme.text }}>
                System
              </Text>
            </View>
            <View style={styles.row}>
              {/* @ts-ignore */}
              <RadioButton
                value="light"
                theme={{
                  colors: {
                    text: theme.tint,
                  },
                  mode: "exact",
                }}
              />
              <Text style={{ ...styles.spacedText, color: theme.text }}>
                Light
              </Text>
            </View>
            <View style={styles.row}>
              {/* @ts-ignore */}
              <RadioButton
                value="dark"
                theme={{
                  colors: {
                    text: theme.tint,
                  },
                  mode: "exact",
                  dark: isDark,
                }}
              />
              <Text style={{ ...styles.spacedText, color: theme.text }}>
                Dark
              </Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </Dialog>
  );
};

export default ChooseAppearance;
