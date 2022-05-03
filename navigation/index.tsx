import * as React from "react";

import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Cards from "../screens/Cards";
import Notes from "../screens/Notes";
import AddNote from "../screens/AddNote";
import AddCard from "../screens/AddCard";
import Colors from "../constants/Colors";
import useTheme from "../hooks/useTheme";
import AppBar from "../components/AppBar";
import Documents from "../screens/Documents";
import NavHeader from "../components/NavHeader";
import ModalScreen from "../screens/ModalScreen";
import AddDocument from "../screens/AddDocument";
import NotFoundScreen from "../screens/NotFoundScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getIsDark } from "../redux/features/appTheme/appThemeSlice";
import { NativeColorScheme } from "../redux/features/appTheme/types";
import { StatusBar } from "expo-status-bar";
import DocumentDetail from "../screens/DocumentDetail";
import ShowImages from "../screens/ShowImages";
import CardDetail from "../screens/CardDetail";
import Search from "../screens/Search";

export default function Navigation({
  ColorScheme,
}: {
  ColorScheme: NativeColorScheme;
}) {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.appTheme.isDark);

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
    },
  };

  React.useEffect(() => {
    dispatch(getIsDark(ColorScheme));
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={isDarkMode ? darkTheme : DefaultTheme}
    >
      <RootNavigator />
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={isDarkMode ? "#333333" : "#F2EFEA"}
      />
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
          header: (props) => (
            <NavHeader
              title={props.route.params ? "Update Card" : "Add Card"}
              headerProps={props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddDocument"
        component={AddDocument}
        options={({ route }) => ({
          headerShown: true,
          header: (props) => (
            <NavHeader
              title={route.params?.screenTitle || "Add Document"}
              headerProps={props}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{
          headerShown: true,
          header: (props) => (
            <NavHeader
              title={props.route.params ? "Update Note" : "Add Note"}
              headerProps={props}
              back
            />
          ),
        }}
      />
      <Stack.Screen
        name="DocumentDetail"
        component={DocumentDetail}
        options={{
          headerShown: true,
          header: (props) => (
            <NavHeader title="Document Details" headerProps={props} />
          ),
        }}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        options={{
          headerShown: true,
          header: (props) => (
            <NavHeader title="Card Details" headerProps={props} />
          ),
        }}
      />
      <Stack.Screen
        name="ShowImages"
        component={ShowImages}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          header: (props) => <NavHeader title="" back headerProps={props} />,
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
