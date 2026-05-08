import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyGoals, Meal, StorageKey, User } from '../types';

const DEFAULT_GOALS: DailyGoals = {
  caloriasMeta: 2000,
  aguaMeta: 2000,
  refeicoesMeta: 4,
};

export async function saveSession(user: User): Promise<void> {
  await AsyncStorage.setItem(StorageKey.SESSION, JSON.stringify(user));
}

export async function loadSession(): Promise<User | null> {
  const data = await AsyncStorage.getItem(StorageKey.SESSION);
  return data ? (JSON.parse(data) as User) : null;
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(StorageKey.SESSION);
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
