import Colors from "../../constants/Colors";
import { CardDetails } from "../../types";

export type Theme = typeof Colors.light;

export type DialogProps = {
  visible: boolean;
  setVisible: {
    readonly off: () => void;
    readonly on: () => void;
    readonly toggle: () => void;
  };
  openImagePickerAsync: () => Promise<void>;
};

export type ChooseDialogProps = {
  visible: boolean;
  setVisible: {
    readonly off: () => void;
    readonly on: () => void;
    readonly toggle: () => void;
  };
  openImagePickerAsync: () => Promise<void>;
  captureImageAsync: () => Promise<void>;
};

export type CardItem = {
  id: string;
  cardName: string;
  cardNumber: string;
  frontImageUri: string;
  backImageUri: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CardProps = {
  theme: Theme;
  item: CardItem;
};
