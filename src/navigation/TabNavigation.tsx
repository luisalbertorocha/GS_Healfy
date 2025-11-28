import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdicionarRefeicaoScreen from "../screens/AdicionarRefeicao";
import MetasDiariasScreen from "../screens/MetasDiarias";
import { colors } from "../styles/StyleSheet";
import HomeStackNavigator from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundCard,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />

      <Tab.Screen
        name="Metas"
        component={MetasDiariasScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="target" color={color} size={size} />
          ),
          tabBarLabel: "Metas",
        }}
      />

      <Tab.Screen
        name="Adicionar"
        component={AdicionarRefeicaoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" color={color} size={size} />
          ),
          tabBarLabel: "Adicionar",
        }}
      />
    </Tab.Navigator>
  );
}
