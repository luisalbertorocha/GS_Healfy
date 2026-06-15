export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  details: string;
  photo?: string;
}

export interface DailyGoals {
  caloriasMeta: number;
  aguaMeta: number;
  refeicoesMeta: number;
}

export interface User {
  email: string;
}

export enum AppStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum StorageKey {
  SESSION = 'healfy_session',
  MEALS = '@healfy:meals',
  GOALS = '@healfy:goals',
}

export type RootStackParamList = {
  Login: undefined;
  App: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  MetasDiarias: undefined;
  AdicionarRefeicao: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  Metas: undefined;
  Adicionar: undefined;
  IoT: undefined;
  Perfil: undefined;
};
