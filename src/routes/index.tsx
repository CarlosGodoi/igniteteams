import { NavigationContainer } from "@react-navigation/native";
import { APPRoutes } from "./app.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <APPRoutes />
    </NavigationContainer>
  );
}
