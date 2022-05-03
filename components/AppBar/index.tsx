import {
  AppBar as DefaultAppBar,
  HStack,
  IconButton,
  useBoolean,
} from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import useTheme from "../../hooks/useTheme";
import Menu from "../Menu";

const AppBar = ({ navigation }: NativeStackHeaderProps) => {
  const theme = useTheme();
  const [visible, setVisible] = useBoolean(false);
  return (
    <SafeAreaView>
      <DefaultAppBar
        title="Docu Wallet"
        titleStyle={{
          fontSize: 18,
        }}
        color={theme.primary}
        tintColor={theme.tint}
        trailing={(props) => (
          <HStack>
            {/* search button */}
            <IconButton
              icon={(props) => (
                // @ts-ignore
                <AntDesign name="search1" {...props} />
              )}
              {...props}
              onPress={() => navigation.navigate("Search")}
            />
            {/* Menu */}
            <Menu
              button={
                <IconButton
                  icon={(props) => (
                    // @ts-ignore
                    <MaterialCommunityIcons name="dots-vertical" {...props} />
                  )}
                  {...props}
                  onPress={setVisible.on}
                />
              }
              visible={visible}
              setVisible={setVisible}
            />
          </HStack>
        )}
      ></DefaultAppBar>
    </SafeAreaView>
  );
};

export default AppBar;
