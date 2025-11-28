import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles, colors } from "../styles/StyleSheet";

export default function MetasDiariasScreen({ navigation }: any) {
  const [caloriasMeta, setCaloriasMeta] = useState("2000");
  const [aguaMeta, setAguaMeta] = useState("2000");
  const [refeicoesMeta, setRefeicoesMeta] = useState("4");

  const salvarMetas = () => {
    if (!caloriasMeta || !aguaMeta || !refeicoesMeta) {
      return Alert.alert("Atenção", "Preencha todas as metas antes de salvar.");
    }

    Alert.alert("Metas salvas", "Suas metas diárias foram atualizadas com sucesso!");
    navigation.goBack?.();
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
          <Text style={[globalStyles.text, { fontWeight: "600", marginBottom: 12 }]}>
            Alimentação
          </Text>

          <Text style={globalStyles.inputLabel}>Meta de calorias por dia (kcal)</Text>
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
          <Text style={[globalStyles.text, { fontWeight: "600", marginBottom: 12 }]}>
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

          <Text
            style={{
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 4,
            }}
          >
            Dica: 30 a 35 ml por kg de peso corporal é uma boa referência geral.
          </Text>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, { marginTop: 24 }]}
          onPress={salvarMetas}
        >
          <Text style={globalStyles.buttonText}>Salvar metas</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}