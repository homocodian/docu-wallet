import { Fragment } from "react";

import useTheme from "../hooks/useTheme";
import { RootTabScreenProps } from "../types";
import CardsList from "../components/CardsList";
import FAB from "../components/FAB";
import ThemedStatusBar from "../components/ThemedStatusBar";

function Cards({ navigation }: RootTabScreenProps<"Cards">) {
  const theme = useTheme();

  return (
    <Fragment>
      <ThemedStatusBar />
      <CardsList theme={theme} />
      {/* fab button */}
      <FAB theme={theme} onPress={() => navigation.navigate("AddCard")} />
    </Fragment>
  );
}

export default Cards;
