import { AppTheme } from "../../types";
import { Theme } from "../Card/types";

export type NoteCard = {
  id: string;
  note: string;
  title: string;
};

export type NoteCardProps = {
  theme: Theme;
  item: {
    id: string;
    note: string;
    title: string;
    createdAt: Date;
  };
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
