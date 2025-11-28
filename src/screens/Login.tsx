import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { globalStyles } from "../styles/StyleSheet";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const validarLogin = () => {
    if (email !== "teste@teste.com" || senha !== "123") {
      return Alert.alert("Erro", "Email ou senha inválidos!");
    }
    navigation.replace("App");
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
        <Text style={[globalStyles.title, { marginBottom: 2, textAlign: "left" }]}>
          Entrar
        </Text>

        <Text style={[globalStyles.subtitle, { textAlign: "left", marginBottom: 18 }]}>
          Acesse para acompanhar sua saúde e bem-estar.
        </Text>

        <Text style={globalStyles.inputLabel}>Email</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={globalStyles.inputLabel}>Senha</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          onSubmitEditing={validarLogin}
        />

        <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 12 }}>
          <Text style={{ color: "#0EA5E9", fontSize: 13 }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.button} onPress={validarLogin}>
          <Text style={globalStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 14 }}>
          <Text style={{ fontSize: 13, color: "#64748B" }}>
            Não tem conta?
            <Text style={{ color: "#0EA5E9", fontWeight: "500" }}> Contate a equipe</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}