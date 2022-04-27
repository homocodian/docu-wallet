import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ReactElement } from "react";
import { window } from "../constants/Layout";

type ModalProps = {
  visible: boolean;
  onDismiss?: () => void;
  onRequestClose?: any;
  children: ReactElement<any, any>;
};

const Dialog = ({
  visible,
  onDismiss,
  onRequestClose,
  children,
}: ModalProps) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      statusBarTranslucent
      transparent
      onRequestClose={onRequestClose}
      animationType="fade"
      style={{
        height: window.height,
        width: window.width,
      }}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default Dialog;
