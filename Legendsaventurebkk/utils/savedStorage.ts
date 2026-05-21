import AsyncStorage from '@react-native-async-storage/async-storage';

import {legendsaventurebkkGetStoryById} from '../data/legendsaventurebkkStoriesData';
import type {LegendsaventurebkkSavedTale} from '../types';

const legendsaventurebkkSavedIndexKey = 'legendsaventurebkk_saved_index';

export const legendsaventurebkkSavedKey = (legendsaventurebkkId: string) =>
  `legendsaventurebkk_saved_${legendsaventurebkkId}`;

const legendsaventurebkkParseSaved = (
  legendsaventurebkkId: string,
  legendsaventurebkkRaw: string,
): LegendsaventurebkkSavedTale | null => {
  if (legendsaventurebkkRaw === '1') {
    const legendsaventurebkkStory =
      legendsaventurebkkGetStoryById(legendsaventurebkkId);
    if (!legendsaventurebkkStory) {
      return null;
    }
    return {
      legendsaventurebkkId,
      legendsaventurebkkHistory: [
        legendsaventurebkkStory.legendsaventurebkkIntro,
      ],
      legendsaventurebkkSavedAt: 0,
    };
  }

  try {
    const legendsaventurebkkParsed = JSON.parse(
      legendsaventurebkkRaw,
    ) as LegendsaventurebkkSavedTale;
    if (
      legendsaventurebkkParsed.legendsaventurebkkId &&
      Array.isArray(legendsaventurebkkParsed.legendsaventurebkkHistory)
    ) {
      return legendsaventurebkkParsed;
    }
  } catch {
    return null;
  }

  return null;
};

export const legendsaventurebkkIsStorySaved = async (
  legendsaventurebkkId: string,
) => {
  const legendsaventurebkkRaw = await AsyncStorage.getItem(
    legendsaventurebkkSavedKey(legendsaventurebkkId),
  );
  return legendsaventurebkkRaw != null;
};

export const legendsaventurebkkSaveTale = async (
  legendsaventurebkkTale: LegendsaventurebkkSavedTale,
) => {
  const legendsaventurebkkId = legendsaventurebkkTale.legendsaventurebkkId;
  await AsyncStorage.setItem(
    legendsaventurebkkSavedKey(legendsaventurebkkId),
    JSON.stringify(legendsaventurebkkTale),
  );

  const legendsaventurebkkIndexRaw = await AsyncStorage.getItem(
    legendsaventurebkkSavedIndexKey,
  );
  const legendsaventurebkkIndex: string[] = legendsaventurebkkIndexRaw
    ? JSON.parse(legendsaventurebkkIndexRaw)
    : [];

  if (!legendsaventurebkkIndex.includes(legendsaventurebkkId)) {
    legendsaventurebkkIndex.push(legendsaventurebkkId);
    await AsyncStorage.setItem(
      legendsaventurebkkSavedIndexKey,
      JSON.stringify(legendsaventurebkkIndex),
    );
  }
};

export const legendsaventurebkkLoadSavedTales = async () => {
  let legendsaventurebkkIndexRaw = await AsyncStorage.getItem(
    legendsaventurebkkSavedIndexKey,
  );
  let legendsaventurebkkIndex: string[] = legendsaventurebkkIndexRaw
    ? JSON.parse(legendsaventurebkkIndexRaw)
    : [];

  if (legendsaventurebkkIndex.length === 0) {
    const legendsaventurebkkAllKeys = await AsyncStorage.getAllKeys();
    legendsaventurebkkIndex = legendsaventurebkkAllKeys
      .filter(
        key =>
          key.startsWith('legendsaventurebkk_saved_') &&
          key !== legendsaventurebkkSavedIndexKey,
      )
      .map(key => key.replace('legendsaventurebkk_saved_', ''));

    if (legendsaventurebkkIndex.length > 0) {
      await AsyncStorage.setItem(
        legendsaventurebkkSavedIndexKey,
        JSON.stringify(legendsaventurebkkIndex),
      );
    }
  }

  const legendsaventurebkkTales = await Promise.all(
    legendsaventurebkkIndex.map(async legendsaventurebkkId => {
      const legendsaventurebkkRaw = await AsyncStorage.getItem(
        legendsaventurebkkSavedKey(legendsaventurebkkId),
      );
      if (!legendsaventurebkkRaw) {
        return null;
      }
      return legendsaventurebkkParseSaved(
        legendsaventurebkkId,
        legendsaventurebkkRaw,
      );
    }),
  );

  return legendsaventurebkkTales
    .filter(
      (legendsaventurebkkTale): legendsaventurebkkTale is LegendsaventurebkkSavedTale =>
        legendsaventurebkkTale != null &&
        legendsaventurebkkGetStoryById(
          legendsaventurebkkTale.legendsaventurebkkId,
        ) != null,
    )
    .sort(
      (a, b) =>
        b.legendsaventurebkkSavedAt - a.legendsaventurebkkSavedAt,
    );
};

export const legendsaventurebkkRemoveSavedTale = async (
  legendsaventurebkkId: string,
) => {
  await AsyncStorage.removeItem(legendsaventurebkkSavedKey(legendsaventurebkkId));

  const legendsaventurebkkIndexRaw = await AsyncStorage.getItem(
    legendsaventurebkkSavedIndexKey,
  );
  const legendsaventurebkkIndex: string[] = legendsaventurebkkIndexRaw
    ? JSON.parse(legendsaventurebkkIndexRaw)
    : [];

  await AsyncStorage.setItem(
    legendsaventurebkkSavedIndexKey,
    JSON.stringify(
      legendsaventurebkkIndex.filter(
        id => id !== legendsaventurebkkId,
      ),
    ),
  );
};
