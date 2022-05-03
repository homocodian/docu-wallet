import { Theme } from "../Card/types";

export type DocCardItem = {
  id: string;
  name: string;
  uid: string;
  fileName: string;
  fileSize: number;
  fileUri: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentProps = {
  theme: Theme;
  item: DocCardItem;
};
