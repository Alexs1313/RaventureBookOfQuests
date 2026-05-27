import AsyncStorage from '@react-native-async-storage/async-storage';

import {radienceffAncienttalesResolveChronicle} from '../../RadienceffAncienttalesData/RadienceffAncienttalesStories';
import type {RadienceffAncienttalesBookmarkPayload} from '../../RadienceffAncienttalesTypes';
import {
  radienceffAncienttalesNormalizeStoredTaleKeys,
  radienceffAncienttalesNormalizeTaleEntryKey,
} from '../RadienceffAncienttalesEntryKeyAliases';

const radienceffAncienttalesShelfIndexKey = '@myth_shelf_index';
const radienceffAncienttalesShelfEntryPrefix = '@myth_shelf_entry_';

const radienceffAncienttalesLegacyIndexKeys = ['@book_explorer_bookmark_index'];
const radienceffAncienttalesLegacyEntryPrefixes = [
  '@book_explorer_bookmark_',
  'bookmark_legacy_v1_',
  ['raven', 'Quest', '_saved_'].join(''),
];

const radienceffAncienttalesLegacyPayloadIdKey = ['raven', 'Quest', 'Id'].join('');
const radienceffAncienttalesLegacyPayloadTrailKey = ['raven', 'Quest', 'History'].join('');
const radienceffAncienttalesLegacyPayloadStoredKey = ['raven', 'Quest', 'SavedAt'].join('');

export const radienceffAncienttalesBookmarkStorageKey = (entryKey: string) =>
  `${radienceffAncienttalesShelfEntryPrefix}${entryKey}`;

const radienceffAncienttalesParseBookmarkIndex = (indexRaw: string | null): string[] => {
  if (!indexRaw) {
    return [];
  }
  try {
    const parsedPayload = JSON.parse(indexRaw);
    if (!Array.isArray(parsedPayload)) {
      return [];
    }
    return parsedPayload.filter(
      (entryKey): entryKey is string =>
        typeof entryKey === 'string' && entryKey.length > 0,
    );
  } catch {
    return [];
  }
};

const radienceffAncienttalesNormalizeBookmarkPayload = (
  entryKey: string,
  parsedPayload: Record<string, unknown>,
): RadienceffAncienttalesBookmarkPayload | null => {
  const legacyId = parsedPayload[radienceffAncienttalesLegacyPayloadIdKey];
  const resolvedKey = radienceffAncienttalesNormalizeTaleEntryKey(
    typeof parsedPayload.entryKey === 'string'
      ? parsedPayload.entryKey
      : typeof legacyId === 'string'
      ? legacyId
      : entryKey,
  );

  const legacyTrail = parsedPayload[radienceffAncienttalesLegacyPayloadTrailKey];
  const passageTrail: unknown[] | null = Array.isArray(
    parsedPayload.passageTrail,
  )
    ? parsedPayload.passageTrail
    : Array.isArray(legacyTrail)
    ? legacyTrail
    : null;

  if (!passageTrail) {
    return null;
  }

  const legacyStoredAt = parsedPayload[radienceffAncienttalesLegacyPayloadStoredKey];
  const storedAt =
    typeof parsedPayload.storedAt === 'number'
      ? parsedPayload.storedAt
      : typeof legacyStoredAt === 'number'
      ? legacyStoredAt
      : 0;

  return {
    entryKey: resolvedKey,
    passageTrail: passageTrail.filter(
      (block): block is string => typeof block === 'string',
    ),
    storedAt,
  };
};

const radienceffAncienttalesParseBookmarkPayload = (
  entryKey: string,
  rawPayload: string,
): RadienceffAncienttalesBookmarkPayload | null => {
  if (rawPayload === '1') {
    const chronicle = radienceffAncienttalesResolveChronicle(entryKey);
    if (!chronicle) {
      return null;
    }
    return {
      entryKey,
      passageTrail: [chronicle.openingPassage],
      storedAt: 0,
    };
  }

  try {
    const parsedPayload = JSON.parse(rawPayload) as Record<string, unknown>;
    return radienceffAncienttalesNormalizeBookmarkPayload(entryKey, parsedPayload);
  } catch {
    return null;
  }
};

const radienceffAncienttalesResolveLegacyEntryKey = (storageKey: string): string | null => {
  if (storageKey.startsWith(radienceffAncienttalesShelfEntryPrefix)) {
    return storageKey.slice(radienceffAncienttalesShelfEntryPrefix.length);
  }
  for (const prefix of radienceffAncienttalesLegacyEntryPrefixes) {
    if (storageKey.startsWith(prefix)) {
      return storageKey.slice(prefix.length);
    }
  }
  return null;
};

const radienceffAncienttalesMigrateLegacyBookmarks = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  const migratedKeys: string[] = [];

  for (const storageKey of storageKeys) {
    const entryKey = radienceffAncienttalesResolveLegacyEntryKey(storageKey);
    if (!entryKey || storageKey.startsWith(radienceffAncienttalesShelfEntryPrefix)) {
      continue;
    }

    const rawPayload = await AsyncStorage.getItem(storageKey);
    if (!rawPayload) {
      continue;
    }

    const bookmarkPayload = radienceffAncienttalesParseBookmarkPayload(entryKey, rawPayload);
    if (!bookmarkPayload) {
      continue;
    }

    await AsyncStorage.setItem(
      radienceffAncienttalesBookmarkStorageKey(bookmarkPayload.entryKey),
      JSON.stringify(bookmarkPayload),
    );
    await AsyncStorage.removeItem(storageKey);
    migratedKeys.push(entryKey);
  }

  for (const legacyIndexKey of radienceffAncienttalesLegacyIndexKeys) {
    const indexRaw = await AsyncStorage.getItem(legacyIndexKey);
    if (indexRaw) {
      const legacyIndex = radienceffAncienttalesParseBookmarkIndex(indexRaw);
      migratedKeys.push(...legacyIndex);
      await AsyncStorage.removeItem(legacyIndexKey);
    }
  }

  if (migratedKeys.length === 0) {
    return;
  }

  const uniqueKeys = radienceffAncienttalesNormalizeStoredTaleKeys([...new Set(migratedKeys)]);
  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesShelfIndexKey);
  const bookmarkIndex = radienceffAncienttalesNormalizeStoredTaleKeys(
    radienceffAncienttalesParseBookmarkIndex(indexRaw),
  );

  for (const entryKey of uniqueKeys) {
    if (!bookmarkIndex.includes(entryKey)) {
      bookmarkIndex.push(entryKey);
    }
  }

  await AsyncStorage.setItem(
    radienceffAncienttalesShelfIndexKey,
    JSON.stringify(radienceffAncienttalesNormalizeStoredTaleKeys(bookmarkIndex)),
  );
};

const radienceffAncienttalesRebuildBookmarkIndex = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  return storageKeys
    .filter(key => key.startsWith(radienceffAncienttalesShelfEntryPrefix))
    .map(key => key.slice(radienceffAncienttalesShelfEntryPrefix.length));
};

const radienceffAncienttalesReadBookmarkRaw = async (entryKey: string) => {
  const normalizedKey = radienceffAncienttalesNormalizeTaleEntryKey(entryKey);
  const normalizedRaw = await AsyncStorage.getItem(
    radienceffAncienttalesBookmarkStorageKey(normalizedKey),
  );
  if (normalizedRaw != null || normalizedKey === entryKey) {
    return {entryKey: normalizedKey, rawPayload: normalizedRaw};
  }
  return {entryKey, rawPayload: await AsyncStorage.getItem(radienceffAncienttalesBookmarkStorageKey(entryKey))};
};

export const radienceffAncienttalesBookmarkExists = async (entryKey: string) => {
  const {rawPayload} = await radienceffAncienttalesReadBookmarkRaw(entryKey);
  return rawPayload != null;
};

export const radienceffAncienttalesPersistBookmark = async (bookmarkPayload: RadienceffAncienttalesBookmarkPayload) => {
  const entryKey = radienceffAncienttalesNormalizeTaleEntryKey(bookmarkPayload.entryKey);
  const normalizedPayload = {...bookmarkPayload, entryKey};
  await AsyncStorage.setItem(
    radienceffAncienttalesBookmarkStorageKey(entryKey),
    JSON.stringify(normalizedPayload),
  );

  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesShelfIndexKey);
  const bookmarkIndex = radienceffAncienttalesNormalizeStoredTaleKeys(
    radienceffAncienttalesParseBookmarkIndex(indexRaw),
  );

  if (!bookmarkIndex.includes(entryKey)) {
    bookmarkIndex.push(entryKey);
    await AsyncStorage.setItem(
      radienceffAncienttalesShelfIndexKey,
      JSON.stringify(bookmarkIndex),
    );
  }
};

export const radienceffAncienttalesLoadShelfBookmarks = async () => {
  await radienceffAncienttalesMigrateLegacyBookmarks();

  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesShelfIndexKey);
  let bookmarkIndex = radienceffAncienttalesNormalizeStoredTaleKeys(
    radienceffAncienttalesParseBookmarkIndex(indexRaw),
  );

  if (bookmarkIndex.length === 0) {
    bookmarkIndex = radienceffAncienttalesNormalizeStoredTaleKeys(
      await radienceffAncienttalesRebuildBookmarkIndex(),
    );

    if (bookmarkIndex.length > 0) {
      await AsyncStorage.setItem(
        radienceffAncienttalesShelfIndexKey,
        JSON.stringify(bookmarkIndex),
      );
    }
  } else if (bookmarkIndex.length > 0) {
    await AsyncStorage.setItem(
      radienceffAncienttalesShelfIndexKey,
      JSON.stringify(bookmarkIndex),
    );
  }

  const storedPayloads = await Promise.all(
    bookmarkIndex.map(async entryKey => {
      const {entryKey: storageKey, rawPayload} =
        await radienceffAncienttalesReadBookmarkRaw(entryKey);
      if (!rawPayload) {
        return null;
      }
      return radienceffAncienttalesParseBookmarkPayload(storageKey, rawPayload);
    }),
  );

  return storedPayloads
    .filter(
      (bookmarkPayload): bookmarkPayload is RadienceffAncienttalesBookmarkPayload =>
        bookmarkPayload != null &&
        radienceffAncienttalesResolveChronicle(bookmarkPayload.entryKey) != null,
    )
    .sort((a, b) => b.storedAt - a.storedAt);
};

export const radienceffAncienttalesDiscardBookmark = async (entryKey: string) => {
  const normalizedKey = radienceffAncienttalesNormalizeTaleEntryKey(entryKey);
  await AsyncStorage.removeItem(radienceffAncienttalesBookmarkStorageKey(normalizedKey));
  if (normalizedKey !== entryKey) {
    await AsyncStorage.removeItem(radienceffAncienttalesBookmarkStorageKey(entryKey));
  }

  const indexRaw = await AsyncStorage.getItem(radienceffAncienttalesShelfIndexKey);
  const bookmarkIndex = radienceffAncienttalesNormalizeStoredTaleKeys(
    radienceffAncienttalesParseBookmarkIndex(indexRaw),
  );

  await AsyncStorage.setItem(
    radienceffAncienttalesShelfIndexKey,
    JSON.stringify(
      bookmarkIndex.filter(id => id !== normalizedKey && id !== entryKey),
    ),
  );
};
