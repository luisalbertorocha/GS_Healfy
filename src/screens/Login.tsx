import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { colors, globalStyles } from "../styles/StyleSheet";
import { AppStatus } from "../types";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  const validarLogin = async () => {
    if (!email || !senha) {
      return Alert.alert("Atenção", "Preencha email e senha.");
    }
    setStatus(AppStatus.LOADING);
    try {
      await signIn(email, senha);
    } catch (e) {
      setStatus(AppStatus.ERROR);
      Alert.alert(
        "Erro",
        e instanceof Error ? e.message : "Erro ao fazer login."
      );
    }
  };

  const handleChange = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setStatus(AppStatus.IDLE);
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.centeredContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ marginBottom: 28, alignItems: "center" }}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "#22C55E20",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#22C55E40",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "700", color: "#16A34A" }}>
            H
          </Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: "700", color: "#0F172A" }}>
          Helfy
        </Text>
        <Text style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
          Seu bem-estar em primeiro lugar
        </Text>
      </View>

      <View style={globalStyles.card}>
        <Text
          style={[globalStyles.title, { marginBottom: 2, textAlign: "left" }]}
        >
          Entrar
        </Text>
        <Text
          style={[
            globalStyles.subtitle,
            { textAlign: "left", marginBottom: 18 },
          ]}
        >
          Acesse para acompanhar sua saúde e bem-estar.
        </Text>

        <Text style={globalStyles.inputLabel}>Email</Text>
        <TextInput
          style={[
            globalStyles.input,
            status === AppStatus.ERROR && globalStyles.inputError,
          ]}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleChange(setEmail)}
        />

        <Text style={globalStyles.inputLabel}>Senha</Text>
        <TextInput
          style={[
            globalStyles.input,
            status === AppStatus.ERROR && globalStyles.inputError,
          ]}
          placeholder="Digite sua senha"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={senha}
          onChangeText={handleChange(setSenha)}
          onSubmitEditing={validarLogin}
        />

        <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 12 }}>
          <Text style={{ color: colors.accent, fontSize: 13 }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            globalStyles.button,
            status === AppStatus.LOADING && { opacity: 0.7 },
          ]}
          onPress={validarLogin}
          disabled={status === AppStatus.LOADING}
        >
          {status === AppStatus.LOADING ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={globalStyles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 14 }}>
          <Text style={{ fontSize: 13, color: "#64748B" }}>
            Não tem conta?
            <Text style={{ color: colors.accent, fontWeight: "500" }}>
              {" "}
              Contate a equipe
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
