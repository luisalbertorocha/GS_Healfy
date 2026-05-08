import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loadMeals, saveMeals } from "../services/storageService";
import { colors, globalStyles } from "../styles/StyleSheet";
import { AppStatus, Meal } from "../types";

export default function AdicionarRefeicaoScreen() {
  const navigation = useNavigation();
  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [horario, setHorario] = useState("");
  const [calorias, setCalorias] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  const salvarRefeicao = async () => {
    if (!nomeRefeicao || !horario || !calorias) {
      return Alert.alert(
        "Atenção",
        "Preencha pelo menos nome, horário e calorias da refeição."
      );
    }

    const novaRefeicao: Meal = {
      id: Date.now().toString(),
      name: nomeRefeicao,
      time: horario,
      calories: Number(calorias),
      details: descricao || "Refeição registrada",
    };

    setStatus(AppStatus.LOADING);
    try {
      const existentes = await loadMeals();
      await saveMeals([...existentes, novaRefeicao]);
      setStatus(AppStatus.SUCCESS);

      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate("HomeTab" as never);
        }
      }, 800);
    } catch {
      setStatus(AppStatus.ERROR);
      Alert.alert("Erro", "Não foi possível salvar a refeição.");
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
        <Text style={globalStyles.title}>Adicionar refeição</Text>
        <Text style={globalStyles.subtitle}>
          Registre o que você comeu para acompanhar sua alimentação diária.
        </Text>

        <View style={[globalStyles.card, { marginTop: 8 }]}>
          <Text style={globalStyles.inputLabel}>Nome da refeição</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Café da manhã, Almoço..."
            placeholderTextColor={colors.textMuted}
            value={nomeRefeicao}
            onChangeText={setNomeRefeicao}
          />

          <Text style={globalStyles.inputLabel}>Horário</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: 08:30"
            placeholderTextColor={colors.textMuted}
            value={horario}
            onChangeText={setHorario}
          />

          <Text style={globalStyles.inputLabel}>Calorias (kcal)</Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="numeric"
            placeholder="Ex: 320"
            placeholderTextColor={colors.textMuted}
            value={calorias}
            onChangeText={setCalorias}
          />

          <Text style={globalStyles.inputLabel}>Descrição (opcional)</Text>
          <TextInput
            style={[globalStyles.input, { height: 90, textAlignVertical: "top" }]}
            multiline
            placeholder="Ex: Omelete com 2 ovos, pão integral e café sem açúcar..."
            placeholderTextColor={colors.textMuted}
            value={descricao}
            onChangeText={setDescricao}
          />
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
              Refeição salva com sucesso!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            globalStyles.button,
            { marginTop: 24 },
            status === AppStatus.LOADING && { opacity: 0.7 },
          ]}
          onPress={salvarRefeicao}
          disabled={status === AppStatus.LOADING || status === AppStatus.SUCCESS}
        >
          {status === AppStatus.LOADING ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={globalStyles.buttonText}>Salvar refeição</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
