import { StyleSheet } from "react-native";

export const colors = {
  background: "#F5FBFF",    
  backgroundCard: "#FFFFFF",
  primary: "#16A34A",       
  primaryDark: "#15803D",   
  accent: "#0EA5E9",        
  text: "#0F172A",          
  textMuted: "#64748B",     
  inputBackground: "#F1F5F9",
  border: "#E2E8F0",        
  danger: "#EF4444",       
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  centeredContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },

  card: {
    width: "100%",
    backgroundColor: colors.backgroundCard,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },


  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginBottom: spacing.md,
    textAlign: "center",
  },

  text: {
    fontSize: 14,
    color: colors.text,
  },

  input: {
    width: "100%",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    color: colors.text,
    fontSize: 16,
  },

  inputError: {
    borderWidth: 1,
    borderColor: colors.danger,
  },

  inputLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 3,
    borderRadius: 999, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: spacing.sm + 2,
  },

  buttonSecondaryText: {
    color: colors.accent,
    fontWeight: "500",
  },
});