import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "../navigation/TabNavigation";
import Login from "../screens/Login";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="App"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
