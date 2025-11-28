import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, globalStyles } from "../styles/StyleSheet";

export default function HomeScreen({ navigation, route }: any) {
  const [refeicoes, setRefeicoes] = useState([
    {
      id: "1",
      name: "Café da manhã",
      time: "08:15",
      calories: 320,
      details: "Iogurte, frutas e aveia",
    },
    {
      id: "2",
      name: "Almoço",
      time: "12:45",
      calories: 540,
      details: "Arroz, feijão, frango grelhado e salada",
    },
    {
      id: "3",
      name: "Lanche da tarde",
      time: "16:20",
      calories: 180,
      details: "Castanhas e uma maçã",
    },
  ]);

  useEffect(() => {
    const novaRefeicao = route?.params?.novaRefeicao;
    if (novaRefeicao) {
      setRefeicoes((prev) => [...prev, novaRefeicao]);

      navigation.setParams({ novaRefeicao: undefined });
    }
  }, [route?.params?.novaRefeicao]);

  const totalCalories = refeicoes.reduce((acc, meal) => acc + meal.calories, 0);

  return (
    <View style={globalStyles.screenContainer}>
      <View style={{ alignItems: "center", marginBottom: 12 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 120,
            height: 120,
            marginBottom: 4,
          }}
          resizeMode="contain"
        />
        <Text style={[globalStyles.title, { marginBottom: 4 }]}>Olá!</Text>
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
          style={{
            fontSize: 13,
            color: colors.textMuted,
            marginBottom: 12,
          }}
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

      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: colors.text,
          marginBottom: 8,
        }}
      >
        Refeições de hoje
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {refeicoes.length === 0 ? (
          <View
            style={[
              globalStyles.card,
              { alignItems: "center", paddingVertical: 24 },
            ]}
          >
            <Text style={{ color: colors.textMuted, fontSize: 14 }}>
              Você ainda não adicionou nenhuma refeição hoje.
            </Text>
          </View>
        ) : (
          refeicoes.map((refeicao) => (
            <View
              key={refeicao.id}
              style={[
                globalStyles.card,
                {
                  marginBottom: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {refeicao.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {refeicao.details}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", marginLeft: 8 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.textMuted,
                      marginBottom: 2,
                    }}
                  >
                    {refeicao.time}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: colors.primary,
                    }}
                  >
                    {refeicao.calories} kcal
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          style={[
            globalStyles.button,
            {
              marginTop: 12,
              marginBottom: 8,
              backgroundColor: colors.primary,
            },
          ]}
          onPress={() =>
            navigation.navigate("AdicionarRefeicao", {
              adicionarRefeicao: (novaRefeicao: any) => {
                setRefeicoes((prev) => [...prev, novaRefeicao]);
              },
            })
          }
        >
          <Text style={globalStyles.buttonText}>Adicionar refeição</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
