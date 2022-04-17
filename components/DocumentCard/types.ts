import { Theme } from "../Card/types";

export type CardItem = {
  name: string;
  docUrl: string;
  id: string;
};

export type DocumentProps = {
  theme: Theme;
  item: CardItem;
};
