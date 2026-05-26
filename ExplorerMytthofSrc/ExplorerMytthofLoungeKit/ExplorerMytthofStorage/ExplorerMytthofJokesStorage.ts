import AsyncStorage from '@react-native-async-storage/async-storage';

import {resolveJoke, resolveJokeCategory} from '../../ExplorerMytthofData/ExplorerMytthofJokes';
import type {SavedJokeDisplay, SavedJokePayload} from '../../ExplorerMytthofTypes';
import {normalizeJokeKey} from '../ExplorerMytthofEntryKeyAliases';

const explorerMytthofJokesIndexKey = '@myth_jokes_index';
const explorerMytthofJokesEntryPrefix = '@myth_jokes_entry_';

export const jokeStorageKey = (jokeKey: string) =>
  `${explorerMytthofJokesEntryPrefix}${jokeKey}`;

const explorerMytthofParseJokeIndex = (indexRaw: string | null): string[] => {
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

const explorerMytthofParseJokePayload = (
  jokeKey: string,
  rawPayload: string,
): SavedJokePayload | null => {
  try {
    const parsedPayload = JSON.parse(rawPayload) as Record<string, unknown>;
    const explorerMytthofResolvedKey = normalizeJokeKey(
      typeof parsedPayload.jokeKey === 'string'
        ? parsedPayload.jokeKey
        : jokeKey,
    );
    const storedAt =
      typeof parsedPayload.storedAt === 'number' ? parsedPayload.storedAt : 0;
    return {jokeKey: explorerMytthofResolvedKey, storedAt};
  } catch {
    return null;
  }
};

const explorerMytthofReadJokeRaw = async (jokeKey: string) => {
  const normalizedKey = normalizeJokeKey(jokeKey);
  const normalizedRaw = await AsyncStorage.getItem(jokeStorageKey(normalizedKey));
  if (normalizedRaw != null || normalizedKey === jokeKey) {
    return {jokeKey: normalizedKey, rawPayload: normalizedRaw};
  }
  return {
    jokeKey,
    rawPayload: await AsyncStorage.getItem(jokeStorageKey(jokeKey)),
  };
};

export const jokeIsSaved = async (jokeKey: string) => {
  const {rawPayload} = await explorerMytthofReadJokeRaw(jokeKey);
  return rawPayload != null;
};

export const persistJoke = async (jokeKey: string) => {
  const normalizedKey = normalizeJokeKey(jokeKey);
  const payload: SavedJokePayload = {
    jokeKey: normalizedKey,
    storedAt: Date.now(),
  };
  await AsyncStorage.setItem(
    jokeStorageKey(normalizedKey),
    JSON.stringify(payload),
  );

  const indexRaw = await AsyncStorage.getItem(explorerMytthofJokesIndexKey);
  const explorerMytthofJokeIndex = explorerMytthofParseJokeIndex(indexRaw).map(
    normalizeJokeKey,
  );

  if (!explorerMytthofJokeIndex.includes(normalizedKey)) {
    explorerMytthofJokeIndex.push(normalizedKey);
    await AsyncStorage.setItem(explorerMytthofJokesIndexKey, JSON.stringify(explorerMytthofJokeIndex));
  }
};

export const discardJoke = async (jokeKey: string) => {
  const normalizedKey = normalizeJokeKey(jokeKey);
  await AsyncStorage.removeItem(jokeStorageKey(normalizedKey));
  if (normalizedKey !== jokeKey) {
    await AsyncStorage.removeItem(jokeStorageKey(jokeKey));
  }

  const indexRaw = await AsyncStorage.getItem(explorerMytthofJokesIndexKey);
  const explorerMytthofJokeIndex = explorerMytthofParseJokeIndex(indexRaw).map(
    normalizeJokeKey,
  );

  await AsyncStorage.setItem(
    explorerMytthofJokesIndexKey,
    JSON.stringify(
      explorerMytthofJokeIndex.filter(
        id => id !== normalizedKey && id !== jokeKey,
      ),
    ),
  );
};

export const loadSavedJokes = async (): Promise<SavedJokeDisplay[]> => {
  const indexRaw = await AsyncStorage.getItem(explorerMytthofJokesIndexKey);
  const explorerMytthofJokeIndex = [
    ...new Set(explorerMytthofParseJokeIndex(indexRaw).map(normalizeJokeKey)),
  ];

  if (indexRaw) {
    await AsyncStorage.setItem(
      explorerMytthofJokesIndexKey,
      JSON.stringify(explorerMytthofJokeIndex),
    );
  }

  const explorerMytthofStoredJokes = await Promise.all(
    explorerMytthofJokeIndex.map(async jokeKey => {
      const {jokeKey: storageKey, rawPayload} =
        await explorerMytthofReadJokeRaw(jokeKey);
      if (!rawPayload) {
        return null;
      }
      const payload = explorerMytthofParseJokePayload(storageKey, rawPayload);
      if (!payload) {
        return null;
      }
      const joke = resolveJoke(payload.jokeKey);
      if (!joke) {
        return null;
      }
      const category = resolveJokeCategory(joke.localeTag);
      if (!category) {
        return null;
      }
      return {
        ...payload,
        headline: `${joke.localeTag} Joke`,
        localeTag: joke.localeTag,
        body: joke.body,
        coverVisual: category.coverVisual,
      } as SavedJokeDisplay;
    }),
  );

  return explorerMytthofStoredJokes
    .filter(
      (savedJoke): savedJoke is SavedJokeDisplay => savedJoke != null,
    )
    .sort((a, b) => b.storedAt - a.storedAt);
};

export const loadSavedJokeKeys = async (): Promise<string[]> => {
  const explorerMytthofSavedJokes = await loadSavedJokes();
  return explorerMytthofSavedJokes.map(savedJoke => savedJoke.jokeKey);
};
