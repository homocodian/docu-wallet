import { ReactNode } from "react";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  AddCard: undefined;
  AddDocument: undefined;
  AddNote: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Cards: undefined;
  Documents: undefined;
  Notes: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type CardDetails = {
  id: string;
  name: string;
  imageUrl: any;
  uid: string;
};

export type MenuProps = {
  button: ReactNode;
  visible: boolean;
  setVisible: {
    readonly off: () => void;
    readonly on: () => void;
    readonly toggle: () => void;
  };
};
