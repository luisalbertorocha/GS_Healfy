import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('healfy', {
      name: 'Healfy',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#16A34A',
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyMealReminders(): Promise<void> {
  const granted = await requestNotificationPermissions();
  if (!granted) return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const reminders = [
    { hour: 8, minute: 0, meal: 'café da manhã' },
    { hour: 12, minute: 30, meal: 'almoço' },
    { hour: 15, minute: 30, meal: 'lanche da tarde' },
    { hour: 19, minute: 0, meal: 'jantar' },
  ];

  for (const r of reminders) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de registrar sua refeição!',
        body: `Não esqueça de registrar o ${r.meal} no Healfy.`,
        sound: true,
        channelId: 'healfy',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: r.hour,
        minute: r.minute,
      },
    });
  }
}

export async function notifyMealSaved(mealName: string, calories: number): Promise<void> {
  const granted = await requestNotificationPermissions();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Refeição registrada!',
      body: `${mealName} (${calories} kcal) adicionado ao seu diário.`,
      sound: true,
      channelId: 'healfy',
    },
    trigger: null,
  });
}

export async function notifyCalorieGoalReached(goal: number): Promise<void> {
  const granted = await requestNotificationPermissions();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Meta de calorias atingida!',
      body: `Você atingiu sua meta de ${goal} kcal hoje. Parabéns!`,
      sound: true,
      channelId: 'healfy',
    },
    trigger: null,
  });
}
