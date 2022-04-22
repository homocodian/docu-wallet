import { Pressable, Text } from "react-native";
import React from "react";

import { Dialog, Portal } from "react-native-paper";

import useTheme from "../hooks/useTheme";
import { useAppSelector } from "../redux/hooks";

type AlertDialogProps = {
  visible: boolean;
  setvisible: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
  title?: string;
  message: string;
};

const AlertDialog = ({
  visible,
  setvisible,
  title,
  message,
}: AlertDialogProps) => {
  const theme = useTheme();
  const isDarkmode = useAppSelector((state) => state.appTheme.isDark);

  return (
    // @ts-ignore
    <Portal>
      {/* @ts-ignore */}
      <Dialog
        visible={visible}
        onDismiss={setvisible.off}
        theme={{
          dark: isDarkmode,
          colors: {
            surface: theme.background,
          },
          mode: "exact",
        }}
      >
        {title ? (
          // @ts-ignore
          <Dialog.Title>
            <Text style={{ color: theme.text }}>{title}</Text>
          </Dialog.Title>
        ) : null}

        {/* @ts-ignore */}
        <Dialog.Content>
          <Text style={{ color: theme.text }}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Pressable
            onPress={setvisible.off}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: theme.text }}>OK</Text>
          </Pressable>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AlertDialog;
