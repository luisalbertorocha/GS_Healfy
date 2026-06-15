const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mqtt = require('mqtt');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(express.json());

// ─── MQTT ────────────────────────────────────────────────────────────────────
const MQTT_BROKER = 'mqtt://broker.hivemq.com';
const TOPIC_HEALTH = 'healfy/gs2025/sensors/health';
const TOPIC_CMDS   = 'healfy/gs2025/commands';

let sensorData = {
  heartRate: 72,
  steps: 1247,
  temperature: 36.5,
  waterIntake: 600,
  timestamp: new Date().toISOString(),
  mqttConnected: false,
};

let connectedClients = 0;

const mqttClient = mqtt.connect(MQTT_BROKER, {
  clientId: `healfy_server_${Math.random().toString(16).slice(2, 8)}`,
  clean: true,
  connectTimeout: 10000,
  reconnectPeriod: 5000,
});

mqttClient.on('connect', () => {
  console.log('[MQTT] Conectado ao broker:', MQTT_BROKER);
  sensorData.mqttConnected = true;

  mqttClient.subscribe([TOPIC_HEALTH, TOPIC_CMDS], (err) => {
    if (!err) console.log('[MQTT] Inscrito nos tópicos');
  });
});

mqttClient.on('error', (err) => {
  console.error('[MQTT] Erro:', err.message);
  sensorData.mqttConnected = false;
});

mqttClient.on('offline', () => {
  sensorData.mqttConnected = false;
});

mqttClient.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    if (topic === TOPIC_HEALTH) {
      sensorData = { ...sensorData, ...data, timestamp: new Date().toISOString() };
      io.emit('sensor-data', sensorData);
    }
    if (topic === TOPIC_CMDS) {
      io.emit('command', data);
    }
  } catch (e) {
    console.error('[MQTT] Erro ao parsear mensagem:', e.message);
  }
});

// ─── Simulação IoT (publica a cada 5s) ───────────────────────────────────────
setInterval(() => {
  const vary = (base, delta) =>
    parseFloat((base + (Math.random() - 0.5) * delta).toFixed(1));

  sensorData = {
    heartRate: Math.floor(60 + Math.random() * 35),
    steps: sensorData.steps + Math.floor(Math.random() * 80 + 10),
    temperature: vary(36.5, 0.8),
    waterIntake:
      sensorData.waterIntake +
      (Math.random() > 0.6 ? Math.floor(Math.random() * 150 + 50) : 0),
    timestamp: new Date().toISOString(),
    mqttConnected: sensorData.mqttConnected,
  };

  if (mqttClient.connected) {
    mqttClient.publish(TOPIC_HEALTH, JSON.stringify(sensorData), { qos: 0, retain: false });
  }

  io.emit('sensor-data', sensorData);
}, 5000);

// ─── Socket.IO ───────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  connectedClients++;
  console.log(`[Socket] Cliente conectado: ${socket.id} (total: ${connectedClients})`);

  socket.emit('sensor-data', sensorData);
  io.emit('connected-clients', connectedClients);

  socket.on('meal-added', (meal) => {
    console.log(`[Socket] Refeição adicionada: ${meal.name} (${meal.calories} kcal)`);
    socket.broadcast.emit('meal-added', meal);
  });

  socket.on('disconnect', () => {
    connectedClients = Math.max(0, connectedClients - 1);
    console.log(`[Socket] Cliente desconectado: ${socket.id} (total: ${connectedClients})`);
    io.emit('connected-clients', connectedClients);
  });
});

// ─── REST ────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', sensorData, connectedClients })
);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🟢 Healfy server rodando em http://0.0.0.0:${PORT}`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   MQTT broker: ${MQTT_BROKER}\n`);
});
