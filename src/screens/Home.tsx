import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MealCard from "../components/MealCard";
import { useAuth } from "../contexts/AuthContext";
import { loadMeals } from "../services/storageService";
import { colors, globalStyles } from "../styles/StyleSheet";
import { HomeStackParamList, Meal } from "../types";

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { user } = useAuth();
  const [refeicoes, setRefeicoes] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setIsLoading(true);
      loadMeals().then((meals) => {
        if (active) {
          setRefeicoes(meals);
          setIsLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const totalCalories = refeicoes.reduce((acc, meal) => acc + meal.calories, 0);

  const ListHeader = () => (
    <>
      <View style={{ alignItems: "center", marginBottom: 12 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 120, height: 120, marginBottom: 4 }}
          resizeMode="contain"
        />
        <Text style={[globalStyles.title, { marginBottom: 4 }]}>
          Olá, {user?.email.split("@")[0]}!
        </Text>
        <Text style={[globalStyles.subtitle, { marginBottom: 0 }]}>
          Acompanhe sua alimentação de hoje com a Helfy.
        </Text>
      </View>

      <View style={[globalStyles.card, { marginTop: 16, marginBottom: 16 }]}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
            marginBottom: 8,
          }}
        >
          Resumo de hoje
        </Text>
        <Text
          style={{ fontSize: 13, color: colors.textMuted, marginBottom: 12 }}
        >
          Veja como está sua alimentação ao longo do dia.
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={{ fontSize: 13, color: colors.textMuted }}>
              Calorias consumidas
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: colors.primary,
                marginTop: 4,
              }}
            >
              {totalCalories} kcal
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ fontSize: 13, color: colors.textMuted }}>
              Refeições registradas
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: colors.text,
                marginTop: 4,
              }}
            >
              {refeicoes.length}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            globalStyles.button,
            { marginTop: 12, backgroundColor: colors.primary },
          ]}
          onPress={() => navigation.navigate("MetasDiarias")}
        >
          <Text style={globalStyles.buttonText}>Ver metas diárias</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
          Refeições de hoje
        </Text>
      </View>
    </>
  );

  const ListEmpty = () => (
    <View
      style={[
        globalStyles.card,
        { alignItems: "center", paddingVertical: 24 },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <Text style={{ color: colors.textMuted, fontSize: 14 }}>
          Você ainda não adicionou nenhuma refeição hoje.
        </Text>
      )}
    </View>
  );

  const ListFooter = () => (
    <TouchableOpacity
      style={[
        globalStyles.button,
        { marginTop: 12, marginBottom: 8, backgroundColor: colors.primary },
      ]}
      onPress={() => navigation.navigate("AdicionarRefeicao")}
    >
      <Text style={globalStyles.buttonText}>+ Adicionar refeição</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList<Meal>
        data={refeicoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MealCard meal={item} />}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={<ListEmpty />}
        ListFooterComponent={<ListFooter />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
