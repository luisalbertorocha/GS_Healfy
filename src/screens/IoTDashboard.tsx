import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { socketService, SensorData } from "../services/socketService";
import { colors, globalStyles, spacing } from "../styles/StyleSheet";

function PulsingHeart({ bpm }: { bpm: number }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = Math.max(300, Math.floor(60000 / bpm));
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.25,
          duration: interval * 0.4,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: interval * 0.6,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [bpm]);

  const color =
    bpm < 60 ? colors.accent : bpm > 100 ? colors.danger : colors.primary;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Feather name="heart" size={32} color={color} />
    </Animated.View>
  );
}

function SensorCard({
  icon,
  label,
  value,
  unit,
  color,
  subtitle,
}: {
  icon: string;
  label: string;
  value: string | number;
  unit: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <View
      style={[
        globalStyles.card,
        { flex: 1, margin: 4, alignItems: "center", paddingVertical: 20 },
      ]}
    >
      <View
        style={{
          backgroundColor: `${color}20`,
          borderRadius: 12,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Feather name={icon as any} size={22} color={color} />
      </View>
      <Text style={{ fontSize: 22, fontWeight: "700", color }}>
        {value}
      </Text>
      <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
        {unit}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: colors.text,
          fontWeight: "600",
          marginTop: 6,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
      {subtitle && (
        <Text style={{ fontSize: 10, color: colors.textMuted, marginTop: 2, textAlign: "center" }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View
      style={{
        height: 8,
        backgroundColor: colors.inputBackground,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${pct}%`,
          backgroundColor: color,
          borderRadius: 4,
        }}
      />
    </View>
  );
}

export default function IoTDashboardScreen() {
  const [data, setData] = useState<SensorData | null>(null);
  const [connected, setConnected] = useState(false);
  const [clients, setClients] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      socketService.connect();

      const statusInterval = setInterval(() => {
        setConnected(socketService.isConnected());
      }, 1000);

      const unsubSensor = socketService.onSensorData((incoming) => {
        setData(incoming);
        setConnected(true);
        setUpdateCount((n) => n + 1);
        const d = new Date(incoming.timestamp);
        setLastUpdate(
          `${d.getHours().toString().padStart(2, "0")}:${d
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`
        );
      });

      const unsubClients = socketService.onConnectedClients(setClients);

      return () => {
        clearInterval(statusInterval);
        unsubSensor();
        unsubClients();
      };
    }, [])
  );

  const heartStatus = (bpm: number) => {
    if (bpm < 60) return { label: "Bradicardia", color: colors.accent };
    if (bpm > 100) return { label: "Taquicardia", color: colors.danger };
    return { label: "Normal", color: colors.primary };
  };

  const tempColor = (t: number) =>
    t > 37.5 ? colors.danger : t < 36.0 ? colors.accent : colors.primary;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={[globalStyles.title, { textAlign: "left", marginBottom: 4 }]}>
        Monitor IoT
      </Text>
      <Text
        style={[globalStyles.subtitle, { textAlign: "left", marginBottom: spacing.lg }]}
      >
        Dados em tempo real do dispositivo de saúde simulado via MQTT.
      </Text>

      {/* Connection status */}
      <View
        style={[
          globalStyles.card,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.md,
            marginBottom: spacing.sm,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: connected ? colors.primary : colors.danger,
            }}
          />
          <Text style={{ fontSize: 13, fontWeight: "600", color: colors.text }}>
            Socket.IO: {connected ? "Conectado" : "Desconectado"}
          </Text>
        </View>
        <Text style={{ fontSize: 11, color: colors.textMuted }}>
          {clients} app(s) online
        </Text>
      </View>

      {/* MQTT info */}
      <View
        style={[
          globalStyles.card,
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            padding: spacing.md,
            marginBottom: spacing.md,
          },
        ]}
      >
        <Feather
          name="wifi"
          size={14}
          color={data?.mqttConnected ? colors.primary : colors.textMuted}
        />
        <Text style={{ fontSize: 11, color: colors.textMuted, flex: 1 }}>
          MQTT: broker.hivemq.com{"\n"}
          Tópico: healfy/gs2025/sensors/health
          {lastUpdate ? `   |   Última leitura: ${lastUpdate}` : ""}
          {updateCount > 0 ? `   |   ${updateCount} atualizações` : ""}
        </Text>
      </View>

      {/* Empty state */}
      {!data ? (
        <View
          style={[
            globalStyles.card,
            { alignItems: "center", paddingVertical: 48, marginTop: 16 },
          ]}
        >
          <Feather name="activity" size={40} color={colors.textMuted} />
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 14,
              marginTop: 16,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Aguardando dados do sensor...{"\n"}Certifique-se que o servidor está rodando:{"\n"}
            <Text style={{ fontWeight: "600" }}>cd server && npm start</Text>
          </Text>
        </View>
      ) : (
        <>
          {/* Heart Rate */}
          <View style={[globalStyles.card, { marginBottom: spacing.md }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 13, color: colors.textMuted, marginBottom: 6 }}
                >
                  Frequência Cardíaca
                </Text>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: "700",
                    color: heartStatus(data.heartRate).color,
                    lineHeight: 44,
                  }}
                >
                  {data.heartRate}
                  <Text style={{ fontSize: 18, fontWeight: "400" }}> BPM</Text>
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: heartStatus(data.heartRate).color,
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  {heartStatus(data.heartRate).label}
                </Text>
              </View>
              <PulsingHeart bpm={data.heartRate} />
            </View>
          </View>

          {/* Steps + Temperature */}
          <View
            style={{ flexDirection: "row", marginBottom: spacing.md }}
          >
            <SensorCard
              icon="trending-up"
              label="Passos"
              value={data.steps.toLocaleString("pt-BR")}
              unit="passos hoje"
              color={colors.accent}
              subtitle="Meta: 10.000"
            />
            <SensorCard
              icon="thermometer"
              label="Temperatura"
              value={data.temperature.toFixed(1)}
              unit="°C"
              color={tempColor(data.temperature)}
              subtitle={
                data.temperature > 37.5
                  ? "Febre"
                  : data.temperature < 36.0
                  ? "Hipotermia"
                  : "Normal"
              }
            />
          </View>

          {/* Water intake */}
          <View style={[globalStyles.card, { marginBottom: spacing.md }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 13, color: colors.textMuted, marginBottom: 4 }}
                >
                  Hidratação detectada pelo sensor
                </Text>
                <Text
                  style={{ fontSize: 28, fontWeight: "700", color: colors.accent }}
                >
                  {data.waterIntake} ml
                </Text>
              </View>
              <Feather name="droplet" size={28} color={colors.accent} />
            </View>
            <ProgressBar
              value={data.waterIntake}
              max={2000}
              color={colors.accent}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 6,
              }}
            >
              <Text style={{ fontSize: 11, color: colors.textMuted }}>
                {Math.round((data.waterIntake / 2000) * 100)}% da meta
              </Text>
              <Text style={{ fontSize: 11, color: colors.textMuted }}>
                Meta: 2.000 ml
              </Text>
            </View>
          </View>

          {/* Steps progress */}
          <View style={[globalStyles.card]}>
            <Text
              style={{ fontSize: 13, color: colors.textMuted, marginBottom: 4 }}
            >
              Progresso de passos
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "700", color: colors.accent, marginBottom: 10 }}
            >
              {data.steps.toLocaleString("pt-BR")} / 10.000
            </Text>
            <ProgressBar value={data.steps} max={10000} color={colors.accent} />
            <Text
              style={{ fontSize: 11, color: colors.textMuted, marginTop: 6 }}
            >
              {Math.round((data.steps / 10000) * 100)}% da meta diária atingida
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}
