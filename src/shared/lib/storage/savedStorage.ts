import AsyncStorage from '@react-native-async-storage/async-storage';

import {ravenQuestGetStoryById} from '../../../../content/stories';
import type {RavenQuestSavedTale} from '../../types';

const ravenQuestSavedIndexKey =
  '@book_explorer_raventure/bookmark_index';

export const ravenQuestSavedKey = (ravenQuestId: string) =>
  `@book_explorer_raventure/bookmark_${ravenQuestId}`;

const ravenQuestParseSaved = (
  ravenQuestId: string,
  ravenQuestRaw: string,
): RavenQuestSavedTale | null => {
  if (ravenQuestRaw === '1') {
    const ravenQuestStory =
      ravenQuestGetStoryById(ravenQuestId);
    if (!ravenQuestStory) {
      return null;
    }
    return {
      ravenQuestId,
      ravenQuestHistory: [
        ravenQuestStory.ravenQuestIntro,
      ],
      ravenQuestSavedAt: 0,
    };
  }

  try {
    const ravenQuestParsed = JSON.parse(
      ravenQuestRaw,
    ) as RavenQuestSavedTale;
    if (
      ravenQuestParsed.ravenQuestId &&
      Array.isArray(ravenQuestParsed.ravenQuestHistory)
    ) {
      return ravenQuestParsed;
    }
  } catch {
    return null;
  }

  return null;
};

export const ravenQuestIsStorySaved = async (
  ravenQuestId: string,
) => {
  const ravenQuestRaw = await AsyncStorage.getItem(
    ravenQuestSavedKey(ravenQuestId),
  );
  return ravenQuestRaw != null;
};

export const ravenQuestSaveTale = async (
  ravenQuestTale: RavenQuestSavedTale,
) => {
  const ravenQuestId = ravenQuestTale.ravenQuestId;
  await AsyncStorage.setItem(
    ravenQuestSavedKey(ravenQuestId),
    JSON.stringify(ravenQuestTale),
  );

  const ravenQuestIndexRaw = await AsyncStorage.getItem(
    ravenQuestSavedIndexKey,
  );
  const ravenQuestIndex: string[] = ravenQuestIndexRaw
    ? JSON.parse(ravenQuestIndexRaw)
    : [];

  if (!ravenQuestIndex.includes(ravenQuestId)) {
    ravenQuestIndex.push(ravenQuestId);
    await AsyncStorage.setItem(
      ravenQuestSavedIndexKey,
      JSON.stringify(ravenQuestIndex),
    );
  }
};

export const ravenQuestLoadSavedTales = async () => {
  let ravenQuestIndexRaw = await AsyncStorage.getItem(
    ravenQuestSavedIndexKey,
  );
  let ravenQuestIndex: string[] = ravenQuestIndexRaw
    ? JSON.parse(ravenQuestIndexRaw)
    : [];

  if (ravenQuestIndex.length === 0) {
    const ravenQuestAllKeys = await AsyncStorage.getAllKeys();
    ravenQuestIndex = ravenQuestAllKeys
      .filter(
        key =>
          key.startsWith('ravenQuest_saved_') &&
          key !== ravenQuestSavedIndexKey,
      )
      .map(key => key.replace('ravenQuest_saved_', ''));

    if (ravenQuestIndex.length > 0) {
      await AsyncStorage.setItem(
        ravenQuestSavedIndexKey,
        JSON.stringify(ravenQuestIndex),
      );
    }
  }

  const ravenQuestTales = await Promise.all(
    ravenQuestIndex.map(async ravenQuestId => {
      const ravenQuestRaw = await AsyncStorage.getItem(
        ravenQuestSavedKey(ravenQuestId),
      );
      if (!ravenQuestRaw) {
        return null;
      }
      return ravenQuestParseSaved(
        ravenQuestId,
        ravenQuestRaw,
      );
    }),
  );

  return ravenQuestTales
    .filter(
      (ravenQuestTale): ravenQuestTale is RavenQuestSavedTale =>
        ravenQuestTale != null &&
        ravenQuestGetStoryById(
          ravenQuestTale.ravenQuestId,
        ) != null,
    )
    .sort(
      (a, b) =>
        b.ravenQuestSavedAt - a.ravenQuestSavedAt,
    );
};

export const ravenQuestRemoveSavedTale = async (
  ravenQuestId: string,
) => {
  await AsyncStorage.removeItem(ravenQuestSavedKey(ravenQuestId));

  const ravenQuestIndexRaw = await AsyncStorage.getItem(
    ravenQuestSavedIndexKey,
  );
  const ravenQuestIndex: string[] = ravenQuestIndexRaw
    ? JSON.parse(ravenQuestIndexRaw)
    : [];

  await AsyncStorage.setItem(
    ravenQuestSavedIndexKey,
    JSON.stringify(
      ravenQuestIndex.filter(
        id => id !== ravenQuestId,
      ),
    ),
  );
};
