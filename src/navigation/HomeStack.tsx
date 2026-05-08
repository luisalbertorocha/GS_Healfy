import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdicionarRefeicaoScreen from "../screens/AdicionarRefeicao";
import HomeScreen from "../screens/Home";
import MetasDiariasScreen from "../screens/MetasDiarias";
import { HomeStackParamList } from "../types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MetasDiarias"
        component={MetasDiariasScreen}
        options={{ title: "Metas diárias" }}
      />
      <Stack.Screen
        name="AdicionarRefeicao"
        component={AdicionarRefeicaoScreen}
        options={{ title: "Adicionar refeição" }}
      />
    </Stack.Navigator>
  );
}
