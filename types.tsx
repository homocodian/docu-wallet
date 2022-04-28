import { ReactNode } from "react";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "./constants/Colors";
import { CardItem } from "./components/DocumentCard/types";

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
  AddDocument:
    | {
        id: string;
        documentName: string;
        uid: string;
        fileUri: string;
        fileName: string;
        screenTitle: string;
      }
    | undefined;
  AddNote:
    | {
        id: string;
        title: string;
        note: string;
        dateCreated: string;
      }
    | undefined;
  DocumentDetail: {
    id: string;
    name: string;
    uid: string;
    fileName: string;
    fileSize: number;
    fileUri: string;
    createdAt: string;
    updatedAt: string;
  };
  ShowImages: {
    frontImageUri: string;
    backImageUri: string;
  };
  CardDetail: {
    id: string;
    cardName: string;
    cardNumber: string;
    frontImageUri: string;
    backImageUri: string;
    createdAt: string;
    updatedAt: string;
  };
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
  cardName: string;
  cardNumber: string;
  frontImageUri: string;
  backImageUri: string;
  createdAt: Date;
  updateAt: Date;
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

export type AppTheme = typeof Colors.light;
