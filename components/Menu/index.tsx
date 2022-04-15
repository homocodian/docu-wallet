import { StatusBar } from "react-native";

import { Menu as DefaultMenu } from "react-native-paper";
import { MenuProps } from "../../types";

function Menu({ button: Button, visible, setVisible }: MenuProps) {
  return (
    // @ts-ignore
    <DefaultMenu
      visible={visible}
      onDismiss={setVisible.off}
      // @ts-ignore
      anchor={Button}
      statusBarHeight={StatusBar.currentHeight}
    >
      {/* @ts-ignore */}
      <DefaultMenu.Item
        onPress={() => {
          setVisible.off();
        }}
        title="Setting"
      />
    </DefaultMenu>
  );
}

export default Menu;
