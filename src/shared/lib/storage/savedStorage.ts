import AsyncStorage from '@react-native-async-storage/async-storage';

import {ravenQuestGetStoryById} from '../../../../content/stories';
import type {RavenQuestSavedTale} from '../../types';

const ravenQuestSavedIndexKey =
  '@book_explorer_raventure/bookmark_index';

const ravenQuestBookmarkKeyPrefix =
  '@book_explorer_raventure/bookmark_';

const ravenQuestLegacySavedPrefix = 'ravenQuest_saved_';

export const ravenQuestSavedKey = (ravenQuestId: string) =>
  `${ravenQuestBookmarkKeyPrefix}${ravenQuestId}`;

const ravenQuestParseIndex = (
  ravenQuestIndexRaw: string | null,
): string[] => {
  if (!ravenQuestIndexRaw) {
    return [];
  }
  try {
    const ravenQuestParsed = JSON.parse(ravenQuestIndexRaw);
    if (!Array.isArray(ravenQuestParsed)) {
      return [];
    }
    return ravenQuestParsed.filter(
      (ravenQuestId): ravenQuestId is string =>
        typeof ravenQuestId === 'string' && ravenQuestId.length > 0,
    );
  } catch {
    return [];
  }
};

const ravenQuestRebuildIndexFromKeys = async () => {
  const ravenQuestAllKeys = await AsyncStorage.getAllKeys();
  return ravenQuestAllKeys
    .filter(key => {
      if (key === ravenQuestSavedIndexKey) {
        return false;
      }
      return (
        key.startsWith(ravenQuestBookmarkKeyPrefix) ||
        key.startsWith(ravenQuestLegacySavedPrefix)
      );
    })
    .map(key => {
      if (key.startsWith(ravenQuestBookmarkKeyPrefix)) {
        return key.slice(ravenQuestBookmarkKeyPrefix.length);
      }
      return key.slice(ravenQuestLegacySavedPrefix.length);
    });
};

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
  const ravenQuestIndex = ravenQuestParseIndex(
    ravenQuestIndexRaw,
  );

  if (!ravenQuestIndex.includes(ravenQuestId)) {
    ravenQuestIndex.push(ravenQuestId);
    await AsyncStorage.setItem(
      ravenQuestSavedIndexKey,
      JSON.stringify(ravenQuestIndex),
    );
  }
};

export const ravenQuestLoadSavedTales = async () => {
  const ravenQuestIndexRaw = await AsyncStorage.getItem(
    ravenQuestSavedIndexKey,
  );
  let ravenQuestIndex = ravenQuestParseIndex(
    ravenQuestIndexRaw,
  );

  if (ravenQuestIndex.length === 0) {
    ravenQuestIndex = await ravenQuestRebuildIndexFromKeys();

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
  const ravenQuestIndex = ravenQuestParseIndex(
    ravenQuestIndexRaw,
  );

  await AsyncStorage.setItem(
    ravenQuestSavedIndexKey,
    JSON.stringify(
      ravenQuestIndex.filter(
        id => id !== ravenQuestId,
      ),
    ),
  );
};
