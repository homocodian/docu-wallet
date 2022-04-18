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
