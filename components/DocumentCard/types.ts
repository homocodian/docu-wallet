import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Theme } from "../Card/types";
import { RootStackParamList, RootTabParamList } from "../../types";

export type CardItem = {
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
  item: CardItem;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<RootTabParamList, "Cards", undefined>,
    NativeStackNavigationProp<
      RootStackParamList,
      keyof RootStackParamList,
      undefined
    >
  >;
};
