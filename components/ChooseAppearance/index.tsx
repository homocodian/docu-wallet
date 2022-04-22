import { View, Text } from "react-native";

import {
  Dialog,
  Portal,
  Headline,
  RadioButton,
  Divider,
} from "react-native-paper";

import { Appearance, AppAppearanceDialogProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAppAppearance } from "../../redux/features/appTheme/appThemeSlice";
import useTheme from "../../hooks/useTheme";
import useColorScheme from "../../hooks/useColorScheme";
import { styles } from "./styles";

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
    // @ts-ignore
    <Portal>
      {/* @ts-ignore */}
      <Dialog
        visible={visible}
        onDismiss={setVisible.off}
        theme={{
          colors: {
            background: theme.background,
            primary: theme.primary,
            surface: theme.background,
          },
          mode: "exact",
          dark: isDark,
        }}
      >
        {/* @ts-ignore */}
        <Dialog.Title>
          <Headline style={{ color: theme.text, fontSize: 20 }}>
            Choose Appearance
          </Headline>
        </Dialog.Title>
        {/* @ts-ignore */}
        <Divider />
        <Dialog.Content>
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
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ChooseAppearance;
