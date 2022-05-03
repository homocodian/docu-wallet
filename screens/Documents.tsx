import { Fragment } from "react";

import useTheme from "../hooks/useTheme";
import { RootTabScreenProps } from "../types";
import DocumentList from "../components/DocumentList";
import FAB from "../components/FAB";

function Documents({ navigation }: RootTabScreenProps<"Cards">) {
  const theme = useTheme();

  return (
    <Fragment>
      <DocumentList theme={theme} navigation={navigation} />
      {/* fab button */}
      <FAB theme={theme} onPress={() => navigation.navigate("AddDocument")} />
    </Fragment>
  );
}

export default Documents;
