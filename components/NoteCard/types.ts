import { AppTheme } from "../../types";
import { Theme } from "../Card/types";

export type NoteCard = {
  id: string;
  note: string;
  title: string;
};

export type NoteCardProps = {
  id: string;
  note: string;
  title: string;
  theme: Theme;
};

export type NoteMenuProps = {
  visible: boolean;
  setVisible: (prop: boolean) => void;
  theme: AppTheme;
  note: string;
  id: string;
};
