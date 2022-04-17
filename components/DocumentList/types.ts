import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "../../types";
import { Theme } from "../Card/types";

export type DocumentListProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<RootTabParamList, "Documents", undefined>,
    NativeStackNavigationProp<
      RootStackParamList,
      keyof RootStackParamList,
      undefined
    >
  >;
  theme: Theme;
};
