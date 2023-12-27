import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";

import { APPRoutes } from "./app.routes";

export function Routes() {
  const { COLORS } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray_600 }}>
      <NavigationContainer>
        <APPRoutes />
      </NavigationContainer>
    </View>
  );
}
