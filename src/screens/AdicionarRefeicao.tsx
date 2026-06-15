import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { notifyMealSaved } from "../services/notificationService";
import { socketService } from "../services/socketService";
import { loadMeals, saveMeals } from "../services/storageService";
import { colors, globalStyles, spacing } from "../styles/StyleSheet";
import { AppStatus, Meal } from "../types";

async function pickImage(fromCamera: boolean): Promise<string | null> {
  if (fromCamera) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para fotografar suas refeições.",
        [{ text: "OK" }]
      );
      return null;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    return result.canceled ? null : result.assets[0].uri;
  } else {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para escolher fotos das refeições.",
        [{ text: "OK" }]
      );
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    return result.canceled ? null : result.assets[0].uri;
  }
}

export default function AdicionarRefeicaoScreen() {
  const navigation = useNavigation();
  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [horario, setHorario] = useState("");
  const [calorias, setCalorias] = useState("");
  const [descricao, setDescricao] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  function handleAddPhoto() {
    Alert.alert("Adicionar foto", "Escolha a origem da imagem", [
      {
        text: "Câmera",
        onPress: async () => {
          const uri = await pickImage(true);
          if (uri) setPhoto(uri);
        },
      },
      {
        text: "Galeria",
        onPress: async () => {
          const uri = await pickImage(false);
          if (uri) setPhoto(uri);
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

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
      photo: photo ?? undefined,
    };

    setStatus(AppStatus.LOADING);
    try {
      const existentes = await loadMeals();
      await saveMeals([...existentes, novaRefeicao]);

      // Comunicação em tempo real: emite para outros dispositivos
      socketService.connect();
      socketService.emitMealAdded(novaRefeicao);

      // Notificação push nativa
      await notifyMealSaved(novaRefeicao.name, novaRefeicao.calories);

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

        {/* Foto da refeição */}
        <TouchableOpacity
          onPress={handleAddPhoto}
          style={{
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: photo ? colors.primary : colors.border,
            borderRadius: 12,
            height: 160,
            marginBottom: spacing.md,
            overflow: "hidden",
            backgroundColor: colors.inputBackground,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.7}
        >
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ alignItems: "center", gap: 8 }}>
              <Feather name="camera" size={32} color={colors.textMuted} />
              <Text style={{ fontSize: 13, color: colors.textMuted, fontWeight: "500" }}>
                Toque para adicionar foto
              </Text>
              <Text style={{ fontSize: 11, color: colors.textMuted }}>
                Câmera ou galeria
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity
            onPress={() => setPhoto(null)}
            style={{ alignItems: "center", marginBottom: spacing.md }}
          >
            <Text style={{ fontSize: 13, color: colors.danger }}>
              Remover foto
            </Text>
          </TouchableOpacity>
        )}

        <View style={[globalStyles.card, { marginTop: 4 }]}>
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
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Feather name="check-circle" size={16} color={colors.primary} />
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              Refeição salva com sucesso!
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
              Não foi possível salvar a refeição. Tente novamente.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            globalStyles.button,
            { marginTop: 24 },
            (status === AppStatus.LOADING || status === AppStatus.SUCCESS) && {
              opacity: 0.7,
            },
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
