import * as React from "react";
import { ColorSchemeName } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Cards from "../screens/Cards";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Documents from "../screens/Documents";
import Notes from "../screens/Notes";
import useTheme from "../hooks/useTheme";
import Colors from "../constants/Colors";
import AppBar from "../components/AppBar";
import { useAppSelector } from "../redux/hooks";
import AddCard from "../screens/AddCard";
import AddCardHeader from "../components/AddCardHeader";

export default function Navigation({
  ColorScheme,
}: {
  ColorScheme: ColorSchemeName;
}) {
  const isDark = useAppSelector((state) => state.appTheme.isDark);
  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
    },
  };

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={isDark ? darkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    // @ts-ignore
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TopTabNavigator}
        options={{
          headerShown: true,
          header: (props) => <AppBar {...props} />,
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerShown: true,
          header: (props) => <AddCardHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!", headerShown: false }}
      />
      {/* @ts-ignore */}
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

function TopTabNavigator() {
  const theme = useTheme();

  return (
    // @ts-ignore
    <Tab.Navigator
      initialRouteName="Cards"
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarShowIcon: false,
        tabBarStyle: {
          backgroundColor: theme.primary,
        },
        tabBarInactiveTintColor: theme.text,
        tabBarIndicatorStyle: {
          backgroundColor: theme.tint,
        },
      }}
    >
      <Tab.Screen
        name="Cards"
        component={Cards}
        options={() => ({
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="id-card" color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="Documents"
        component={Documents}
        options={{
          title: "Documents",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pencil-square-o" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  // @ts-ignore
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
