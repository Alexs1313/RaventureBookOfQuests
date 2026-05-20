import AsyncStorage from '@react-native-async-storage/async-storage';

import {raventreBookquesttsGetStoryById} from './raventreBookquesttsStoriesData';

export type RaventreBookquesttsSavedTale = {
  raventreBookquesttsId: string;
  raventreBookquesttsHistory: string[];
  raventreBookquesttsSavedAt: number;
};

const raventreBookquesttsSavedIndexKey = 'raventreBookquestts_saved_index';

export const raventreBookquesttsSavedKey = (raventreBookquesttsId: string) =>
  `raventreBookquestts_saved_${raventreBookquesttsId}`;

const raventreBookquesttsParseSaved = (
  raventreBookquesttsId: string,
  raventreBookquesttsRaw: string,
): RaventreBookquesttsSavedTale | null => {
  if (raventreBookquesttsRaw === '1') {
    const raventreBookquesttsStory =
      raventreBookquesttsGetStoryById(raventreBookquesttsId);
    if (!raventreBookquesttsStory) {
      return null;
    }
    return {
      raventreBookquesttsId,
      raventreBookquesttsHistory: [
        raventreBookquesttsStory.raventreBookquesttsIntro,
      ],
      raventreBookquesttsSavedAt: 0,
    };
  }

  try {
    const raventreBookquesttsParsed = JSON.parse(
      raventreBookquesttsRaw,
    ) as RaventreBookquesttsSavedTale;
    if (
      raventreBookquesttsParsed.raventreBookquesttsId &&
      Array.isArray(raventreBookquesttsParsed.raventreBookquesttsHistory)
    ) {
      return raventreBookquesttsParsed;
    }
  } catch {
    return null;
  }

  return null;
};

export const raventreBookquesttsIsStorySaved = async (
  raventreBookquesttsId: string,
) => {
  const raventreBookquesttsRaw = await AsyncStorage.getItem(
    raventreBookquesttsSavedKey(raventreBookquesttsId),
  );
  return raventreBookquesttsRaw != null;
};

export const raventreBookquesttsSaveTale = async (
  raventreBookquesttsTale: RaventreBookquesttsSavedTale,
) => {
  const raventreBookquesttsId = raventreBookquesttsTale.raventreBookquesttsId;
  await AsyncStorage.setItem(
    raventreBookquesttsSavedKey(raventreBookquesttsId),
    JSON.stringify(raventreBookquesttsTale),
  );

  const raventreBookquesttsIndexRaw = await AsyncStorage.getItem(
    raventreBookquesttsSavedIndexKey,
  );
  const raventreBookquesttsIndex: string[] = raventreBookquesttsIndexRaw
    ? JSON.parse(raventreBookquesttsIndexRaw)
    : [];

  if (!raventreBookquesttsIndex.includes(raventreBookquesttsId)) {
    raventreBookquesttsIndex.push(raventreBookquesttsId);
    await AsyncStorage.setItem(
      raventreBookquesttsSavedIndexKey,
      JSON.stringify(raventreBookquesttsIndex),
    );
  }
};

export const raventreBookquesttsLoadSavedTales = async () => {
  let raventreBookquesttsIndexRaw = await AsyncStorage.getItem(
    raventreBookquesttsSavedIndexKey,
  );
  let raventreBookquesttsIndex: string[] = raventreBookquesttsIndexRaw
    ? JSON.parse(raventreBookquesttsIndexRaw)
    : [];

  if (raventreBookquesttsIndex.length === 0) {
    const raventreBookquesttsAllKeys = await AsyncStorage.getAllKeys();
    raventreBookquesttsIndex = raventreBookquesttsAllKeys
      .filter(
        key =>
          key.startsWith('raventreBookquestts_saved_') &&
          key !== raventreBookquesttsSavedIndexKey,
      )
      .map(key => key.replace('raventreBookquestts_saved_', ''));

    if (raventreBookquesttsIndex.length > 0) {
      await AsyncStorage.setItem(
        raventreBookquesttsSavedIndexKey,
        JSON.stringify(raventreBookquesttsIndex),
      );
    }
  }

  const raventreBookquesttsTales = await Promise.all(
    raventreBookquesttsIndex.map(async raventreBookquesttsId => {
      const raventreBookquesttsRaw = await AsyncStorage.getItem(
        raventreBookquesttsSavedKey(raventreBookquesttsId),
      );
      if (!raventreBookquesttsRaw) {
        return null;
      }
      return raventreBookquesttsParseSaved(
        raventreBookquesttsId,
        raventreBookquesttsRaw,
      );
    }),
  );

  return raventreBookquesttsTales
    .filter(
      (raventreBookquesttsTale): raventreBookquesttsTale is RaventreBookquesttsSavedTale =>
        raventreBookquesttsTale != null &&
        raventreBookquesttsGetStoryById(
          raventreBookquesttsTale.raventreBookquesttsId,
        ) != null,
    )
    .sort(
      (a, b) =>
        b.raventreBookquesttsSavedAt - a.raventreBookquesttsSavedAt,
    );
};

export const raventreBookquesttsRemoveSavedTale = async (
  raventreBookquesttsId: string,
) => {
  await AsyncStorage.removeItem(raventreBookquesttsSavedKey(raventreBookquesttsId));

  const raventreBookquesttsIndexRaw = await AsyncStorage.getItem(
    raventreBookquesttsSavedIndexKey,
  );
  const raventreBookquesttsIndex: string[] = raventreBookquesttsIndexRaw
    ? JSON.parse(raventreBookquesttsIndexRaw)
    : [];

  await AsyncStorage.setItem(
    raventreBookquesttsSavedIndexKey,
    JSON.stringify(
      raventreBookquesttsIndex.filter(
        id => id !== raventreBookquesttsId,
      ),
    ),
  );
};

export const raventreBookquesttsPreviewText = (
  raventreBookquesttsHistory: string[],
  raventreBookquesttsMax = 120,
) => {
  const raventreBookquesttsText =
    raventreBookquesttsHistory[raventreBookquesttsHistory.length - 1] ?? '';
  if (raventreBookquesttsText.length <= raventreBookquesttsMax) {
    return raventreBookquesttsText;
  }
  return `${raventreBookquesttsText.slice(0, raventreBookquesttsMax).trim()}...`;
};

export const raventreBookquesttsShareMessage = (
  raventreBookquesttsTitle: string,
  raventreBookquesttsHistory: string[],
) =>
  `${raventreBookquesttsTitle}\n\n${raventreBookquesttsHistory.join('\n\n')}\n\n— Raventure: Book of Quests`;
