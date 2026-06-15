import { io, Socket } from 'socket.io-client';
import { SERVER_URL } from '../config';
import { Meal } from '../types';

export interface SensorData {
  heartRate: number;
  steps: number;
  temperature: number;
  waterIntake: number;
  timestamp: string;
  mqttConnected: boolean;
}

type Unsubscribe = () => void;

class SocketService {
  private socket: Socket | null = null;

  connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(SERVER_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    this.socket.on('connect', () =>
      console.log('[Socket] Conectado:', this.socket?.id)
    );
    this.socket.on('connect_error', (err) =>
      console.log('[Socket] Erro de conexão:', err.message)
    );
    this.socket.on('disconnect', (reason) =>
      console.log('[Socket] Desconectado:', reason)
    );
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  emitMealAdded(meal: Meal): void {
    this.socket?.emit('meal-added', meal);
  }

  onSensorData(callback: (data: SensorData) => void): Unsubscribe {
    this.socket?.on('sensor-data', callback);
    return () => this.socket?.off('sensor-data', callback);
  }

  onMealAdded(callback: (meal: Meal) => void): Unsubscribe {
    this.socket?.on('meal-added', callback);
    return () => this.socket?.off('meal-added', callback);
  }

  onConnectedClients(callback: (count: number) => void): Unsubscribe {
    this.socket?.on('connected-clients', callback);
    return () => this.socket?.off('connected-clients', callback);
  }
}

export const socketService = new SocketService();
