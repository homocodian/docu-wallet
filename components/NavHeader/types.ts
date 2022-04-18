import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export type NavHeaderProps = {
  headerProps: NativeStackHeaderProps;
  title: string;
  back?: boolean;
};
