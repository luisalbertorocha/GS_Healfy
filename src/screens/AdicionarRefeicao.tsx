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

export default function AdicionarRefeicaoScreen({ navigation }: any) {
  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [horario, setHorario] = useState("");
  const [calorias, setCalorias] = useState("");
  const [descricao, setDescricao] = useState("");

  const salvarRefeicao = () => {
    if (!nomeRefeicao || !horario || !calorias) {
      return Alert.alert(
        "Atenção",
        "Preencha pelo menos nome, horário e calorias da refeição."
      );
    }

    const novaRefeicao = {
      id: Date.now().toString(),
      name: nomeRefeicao,
      time: horario,
      calories: Number(calorias),
      details: descricao || "Refeição registrada",
    };

    Alert.alert("Refeição adicionada", "Sua refeição foi registrada com sucesso!");

    // Volta para a Home passando a nova refeição como parâmetro
    navigation.navigate("Home", { novaRefeicao });
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
            style={[
              globalStyles.input,
              { height: 90, textAlignVertical: "top" },
            ]}
            multiline
            placeholder="Ex: Omelete com 2 ovos, pão integral e café sem açúcar..."
            placeholderTextColor={colors.textMuted}
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <TouchableOpacity
          style={[globalStyles.button, { marginTop: 24 }]}
          onPress={salvarRefeicao}
        >
          <Text style={globalStyles.buttonText}>Salvar refeição</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}