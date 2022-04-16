export type AppAppearanceDialogProps = {
  visible: boolean;
  setVisible: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
};

export type Appearance = "system" | "light" | "dark";
