import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { DailyGoals, Meal, StorageKey, User } from '../types';

const DEFAULT_GOALS: DailyGoals = {
  caloriasMeta: 2000,
  aguaMeta: 2000,
  refeicoesMeta: 4,
};

// Armazena dados sensíveis de forma segura (Keychain/Keystore no mobile, localStorage na web)
async function setSecure(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getSecure(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

async function deleteSecure(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function saveSession(user: User): Promise<void> {
  await setSecure(StorageKey.SESSION, JSON.stringify(user));
}

export async function loadSession(): Promise<User | null> {
  const data = await getSecure(StorageKey.SESSION);
  return data ? (JSON.parse(data) as User) : null;
}

export async function clearSession(): Promise<void> {
  await deleteSecure(StorageKey.SESSION);
}

export async function saveMeals(meals: Meal[]): Promise<void> {
  await AsyncStorage.setItem(StorageKey.MEALS, JSON.stringify(meals));
}

export async function loadMeals(): Promise<Meal[]> {
  const data = await AsyncStorage.getItem(StorageKey.MEALS);
  return data ? (JSON.parse(data) as Meal[]) : [];
}

export async function saveGoals(goals: DailyGoals): Promise<void> {
  await AsyncStorage.setItem(StorageKey.GOALS, JSON.stringify(goals));
}

export async function loadGoals(): Promise<DailyGoals> {
  const data = await AsyncStorage.getItem(StorageKey.GOALS);
  return data ? (JSON.parse(data) as DailyGoals) : DEFAULT_GOALS;
}
