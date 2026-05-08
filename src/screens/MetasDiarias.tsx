import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loadGoals, saveGoals } from "../services/storageService";
import { colors, globalStyles } from "../styles/StyleSheet";
import { AppStatus, DailyGoals } from "../types";

export default function MetasDiariasScreen() {
  const navigation = useNavigation();
  const [caloriasMeta, setCaloriasMeta] = useState("2000");
  const [aguaMeta, setAguaMeta] = useState("2000");
  const [refeicoesMeta, setRefeicoesMeta] = useState("4");
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  useEffect(() => {
    loadGoals().then((goals: DailyGoals) => {
      setCaloriasMeta(String(goals.caloriasMeta));
      setAguaMeta(String(goals.aguaMeta));
      setRefeicoesMeta(String(goals.refeicoesMeta));
    });
  }, []);

  const salvarMetas = async () => {
    if (!caloriasMeta || !aguaMeta || !refeicoesMeta) {
      return;
    }
    setStatus(AppStatus.LOADING);
    try {
      await saveGoals({
        caloriasMeta: Number(caloriasMeta),
        aguaMeta: Number(aguaMeta),
        refeicoesMeta: Number(refeicoesMeta),
      });
      setStatus(AppStatus.SUCCESS);
      setTimeout(() => {
        setStatus(AppStatus.IDLE);
        navigation.goBack?.();
      }, 1200);
    } catch {
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={globalStyles.title}>Metas diárias</Text>
        <Text style={globalStyles.subtitle}>
          Ajuste suas metas para acompanhar melhor sua rotina de saúde.
        </Text>

        <View style={[globalStyles.card, { marginTop: 8 }]}>
          <Text
            style={[globalStyles.text, { fontWeight: "600", marginBottom: 12 }]}
          >
            Alimentação
          </Text>

          <Text style={globalStyles.inputLabel}>
            Meta de calorias por dia (kcal)
          </Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="numeric"
            placeholder="Ex: 2000"
            placeholderTextColor={colors.textMuted}
            value={caloriasMeta}
            onChangeText={setCaloriasMeta}
          />

          <Text style={globalStyles.inputLabel}>Meta de refeições por dia</Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="numeric"
            placeholder="Ex: 4"
            placeholderTextColor={colors.textMuted}
            value={refeicoesMeta}
            onChangeText={setRefeicoesMeta}
          />
        </View>

        <View style={[globalStyles.card, { marginTop: 16 }]}>
          <Text
            style={[globalStyles.text, { fontWeight: "600", marginBottom: 12 }]}
          >
            Hidratação
          </Text>

          <Text style={globalStyles.inputLabel}>Meta de água por dia (ml)</Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="numeric"
            placeholder="Ex: 2000"
            placeholderTextColor={colors.textMuted}
            value={aguaMeta}
            onChangeText={setAguaMeta}
          />

          <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
            Dica: 30 a 35 ml por kg de peso corporal é uma boa referência geral.
          </Text>
        </View>

        {status === AppStatus.SUCCESS && (
          <View
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#DCFCE7",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              Metas salvas com sucesso!
            </Text>
          </View>
        )}

        {status === AppStatus.ERROR && (
          <View
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#FEE2E2",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.danger, fontWeight: "600" }}>
              Erro ao salvar. Tente novamente.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            globalStyles.button,
            { marginTop: 24 },
            status === AppStatus.LOADING && { opacity: 0.7 },
          ]}
          onPress={salvarMetas}
          disabled={status === AppStatus.LOADING}
        >
          {status === AppStatus.LOADING ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={globalStyles.buttonText}>Salvar metas</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
