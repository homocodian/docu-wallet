import { AppTheme } from "../../types";
import { Theme } from "../Card/types";

export type NoteCard = {
  id: string;
  note: string;
  title: string;
};

export type NoteCardItem = {
  id: string;
  note: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteCardProps = {
  theme: Theme;
  item: NoteCardItem;
};

export type NoteMenuProps = {
  visible: boolean;
  setVisible: (prop: boolean) => void;
  theme: AppTheme;
  note: string;
  id: string;
  title: string;
  date: Date;
};
