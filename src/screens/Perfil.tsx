import { Feather } from "@expo/vector-icons";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { colors, globalStyles, radius, spacing } from "../styles/StyleSheet";

export default function PerfilScreen() {
  const { user, signOut } = useAuth();

  const username = user?.email.split("@")[0] ?? "Usuário";
  const initial = username.charAt(0).toUpperCase();

  function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: signOut },
    ]);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={[globalStyles.title, { marginBottom: 4 }]}>{username}</Text>
        <Text style={globalStyles.subtitle}>{user?.email}</Text>
      </View>

      <View style={[globalStyles.card, { marginBottom: spacing.lg }]}>
        <Text style={styles.sectionTitle}>Informações da conta</Text>

        <View style={styles.infoRow}>
          <Feather name="mail" size={16} color={colors.textMuted} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Feather name="shield" size={16} color={colors.textMuted} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Conta</Text>
            <Text style={styles.infoValue}>Ativa</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: colors.danger,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm + 3,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
