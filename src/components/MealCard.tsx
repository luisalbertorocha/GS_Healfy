import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors, globalStyles } from '../styles/StyleSheet';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <View
      style={[
        globalStyles.card,
        { marginBottom: 12, paddingVertical: 12, paddingHorizontal: 14 },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>
            {meal.name}
          </Text>
          <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
            {meal.details}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end', marginLeft: 8, flexDirection: 'row', gap: 10 }}>
          {meal.photo && (
            <Image
              source={{ uri: meal.photo }}
              style={{ width: 44, height: 44, borderRadius: 8 }}
              resizeMode="cover"
            />
          )}
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 13, color: colors.textMuted, marginBottom: 2 }}>
              {meal.time}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>
              {meal.calories} kcal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
