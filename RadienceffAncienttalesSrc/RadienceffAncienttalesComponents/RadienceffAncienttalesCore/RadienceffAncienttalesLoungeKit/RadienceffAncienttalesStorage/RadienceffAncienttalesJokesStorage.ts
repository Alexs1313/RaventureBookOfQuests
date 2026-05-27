import AsyncStorage from '@react-native-async-storage/async-storage';

import {radienceffAncienttalesResolveJoke, radienceffAncienttalesResolveJokeCategory} from '../../RadienceffAncienttalesData/RadienceffAncienttalesJokes';
import type {RadienceffAncienttalesSavedJokeDisplay, RadienceffAncienttalesSavedJokePayload} from '../../RadienceffAncienttalesTypes';
import {radienceffAncienttalesNormalizeJokeKey} from '../RadienceffAncienttalesEntryKeyAliases';

const radienceffAncienttalesJokesIndexKey = '@myth_jokes_index';
const radienceffAncienttalesJokesEntryPrefix = '@myth_jokes_entry_';

export const radienceffAncienttalesJokeStorageKey = (jokeKey: string) =>
  `${radienceffAncienttalesJokesEntryPrefix}${jokeKey}`;

const radienceffAncienttalesParseJokeIndex = (indexRaw: string | null): string[] => {
  if (!indexRaw) {
    return [];
  }
  try {
    const parsedPayload = JSON.parse(indexRaw);
    if (!Array.isArray(parsedPayload)) {
      return [];
    }
    return parsedPayload.filter(
      (jokeKey): jokeKey is string =>
        typeof jokeKey === 'string' && jokeKey.length > 0,
    );
  } catch {
    return [];
  }
};

const radienceffAncienttalesParseJokePayload = (
  jokeKey: string,
  rawPayload: string,
): RadienceffAncienttalesSavedJokePayload | null => {
  try {
    const parsedPayload = JSON.parse(rawPayload) as Record<string, unknown>;
    const radienceffAncienttalesResolvedKey = radienceffAncienttalesNormalizeJokeKey(
      typeof parsedPayload.jokeKey === 'string'
        ? parsedPayload.jokeKey
        : jokeKey,
    );
    const storedAt =
      typeof parsedPayload.storedAt === 'number' ? parsedPayload.storedAt : 0;
    return {jokeKey: radienceffAncienttalesResolvedKey, storedAt};
  } catch {
    return null;
  }
};

const radienceffAncienttalesReadJokeRaw = async (jokeKey: string) => {
  const normalizedKey = radienceffAncienttalesNormalizeJokeKey(jokeKey);
  const normalizedRaw = await AsyncStorage.getItem(radienceffAncienttalesJokeStorageKey(normalizedKey));
  if (normalizedRaw != null || normalizedKey === jokeKey) {
    return {jokeKey: normalizedKey, rawPayload: normalizedRaw};
  }
  return {
    jokeKey,
    rawPayload: await AsyncStorage.getItem(radienceffAncienttalesJokeStorageKey(jokeKey)),
  };
};

export const radienceffAncienttalesJokeIsSaved = async (jokeKey: string) => {
  const {rawPayload} = await radienceffAncienttalesReadJokeRaw(jokeKey);
  return rawPayload != null;
};

export const radienceffAncienttalesPersistJoke = async (jokeKey: string) => {
  const normalizedKey = radienceffAncienttalesNormalizeJokeKey(jokeKey);
  const payload: RadienceffAncienttalesSavedJokePayload = {
    jokeKey: normalizedKey,
    storedAt: Date.now(),
  };
  await AsyncStorage.setItem(
    radienceffAncienttalesJokeStorageKey(normalizedKey),
    JSON.stringify(payload),
  );

  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesJokesIndexKey);
  const radienceffAncienttalesJokeIndex = radienceffAncienttalesParseJokeIndex(indexRaw).map(
    radienceffAncienttalesNormalizeJokeKey,
  );

  if (!radienceffAncienttalesJokeIndex.includes(normalizedKey)) {
    radienceffAncienttalesJokeIndex.push(normalizedKey);
    await AsyncStorage.setItem(radienceffAncienttalesJokesIndexKey, JSON.stringify(radienceffAncienttalesJokeIndex));
  }
};

export const radienceffAncienttalesDiscardJoke = async (jokeKey: string) => {
  const normalizedKey = radienceffAncienttalesNormalizeJokeKey(jokeKey);
  await AsyncStorage.removeItem(radienceffAncienttalesJokeStorageKey(normalizedKey));
  if (normalizedKey !== jokeKey) {
    await AsyncStorage.removeItem(radienceffAncienttalesJokeStorageKey(jokeKey));
  }

  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesJokesIndexKey);
  const radienceffAncienttalesJokeIndex = radienceffAncienttalesParseJokeIndex(indexRaw).map(
    radienceffAncienttalesNormalizeJokeKey,
  );

  await AsyncStorage.setItem(
    radienceffAncienttalesJokesIndexKey,
    JSON.stringify(
      radienceffAncienttalesJokeIndex.filter(
        id => id !== normalizedKey && id !== jokeKey,
      ),
    ),
  );
};

export const radienceffAncienttalesLoadSavedJokes = async (): Promise<RadienceffAncienttalesSavedJokeDisplay[]> => {
  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesJokesIndexKey);
  const radienceffAncienttalesJokeIndex = [
    ...new Set(radienceffAncienttalesParseJokeIndex(indexRaw).map(radienceffAncienttalesNormalizeJokeKey)),
  ];

  if (indexRaw) {
    await AsyncStorage.setItem(
      radienceffAncienttalesJokesIndexKey,
      JSON.stringify(radienceffAncienttalesJokeIndex),
    );
  }

  const radienceffAncienttalesStoredJokes = await Promise.all(
    radienceffAncienttalesJokeIndex.map(async jokeKey => {
      const {jokeKey: storageKey, rawPayload} =
        await radienceffAncienttalesReadJokeRaw(jokeKey);
      if (!rawPayload) {
        return null;
      }
      const payload = radienceffAncienttalesParseJokePayload(storageKey, rawPayload);
      if (!payload) {
        return null;
      }
      const joke = radienceffAncienttalesResolveJoke(payload.jokeKey);
      if (!joke) {
        return null;
      }
      const category = radienceffAncienttalesResolveJokeCategory(joke.localeTag);
      if (!category) {
        return null;
      }
      return {
        ...payload,
        headline: `${joke.localeTag} Joke`,
        localeTag: joke.localeTag,
        body: joke.body,
        coverVisual: category.coverVisual,
      } as RadienceffAncienttalesSavedJokeDisplay;
    }),
  );

  return radienceffAncienttalesStoredJokes
    .filter(
      (savedJoke): savedJoke is RadienceffAncienttalesSavedJokeDisplay => savedJoke != null,
    )
    .sort((a, b) => b.storedAt - a.storedAt);
};

export const radienceffAncienttalesLoadSavedJokeKeys = async (): Promise<string[]> => {
  const radienceffAncienttalesSavedJokes = await radienceffAncienttalesLoadSavedJokes();
  return radienceffAncienttalesSavedJokes.map(savedJoke => savedJoke.jokeKey);
};
