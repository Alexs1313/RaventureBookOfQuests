import AsyncStorage from '@react-native-async-storage/async-storage';

import {resolveChronicle} from '../../ExplorerMytthofData/ExplorerMytthofStories';
import type {BookmarkPayload} from '../../ExplorerMytthofTypes';
import {
  normalizeStoredTaleKeys,
  normalizeTaleEntryKey,
} from '../ExplorerMytthofEntryKeyAliases';

const explorerMytthofShelfIndexKey = '@myth_shelf_index';
const explorerMytthofShelfEntryPrefix = '@myth_shelf_entry_';

const explorerMytthofLegacyIndexKeys = ['@book_explorer_bookmark_index'];
const explorerMytthofLegacyEntryPrefixes = [
  '@book_explorer_bookmark_',
  'bookmark_legacy_v1_',
  ['raven', 'Quest', '_saved_'].join(''),
];

const explorerMytthofLegacyPayloadIdKey = ['raven', 'Quest', 'Id'].join('');
const explorerMytthofLegacyPayloadTrailKey = ['raven', 'Quest', 'History'].join('');
const explorerMytthofLegacyPayloadStoredKey = ['raven', 'Quest', 'SavedAt'].join('');

export const bookmarkStorageKey = (entryKey: string) =>
  `${explorerMytthofShelfEntryPrefix}${entryKey}`;

const explorerMytthofParseBookmarkIndex = (indexRaw: string | null): string[] => {
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

const explorerMytthofNormalizeBookmarkPayload = (
  entryKey: string,
  parsedPayload: Record<string, unknown>,
): BookmarkPayload | null => {
  const legacyId = parsedPayload[explorerMytthofLegacyPayloadIdKey];
  const resolvedKey = normalizeTaleEntryKey(
    typeof parsedPayload.entryKey === 'string'
      ? parsedPayload.entryKey
      : typeof legacyId === 'string'
      ? legacyId
      : entryKey,
  );

  const legacyTrail = parsedPayload[explorerMytthofLegacyPayloadTrailKey];
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

  const legacyStoredAt = parsedPayload[explorerMytthofLegacyPayloadStoredKey];
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

const explorerMytthofParseBookmarkPayload = (
  entryKey: string,
  rawPayload: string,
): BookmarkPayload | null => {
  if (rawPayload === '1') {
    const chronicle = resolveChronicle(entryKey);
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
    return explorerMytthofNormalizeBookmarkPayload(entryKey, parsedPayload);
  } catch {
    return null;
  }
};

const explorerMytthofResolveLegacyEntryKey = (storageKey: string): string | null => {
  if (storageKey.startsWith(explorerMytthofShelfEntryPrefix)) {
    return storageKey.slice(explorerMytthofShelfEntryPrefix.length);
  }
  for (const prefix of explorerMytthofLegacyEntryPrefixes) {
    if (storageKey.startsWith(prefix)) {
      return storageKey.slice(prefix.length);
    }
  }
  return null;
};

const explorerMytthofMigrateLegacyBookmarks = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  const migratedKeys: string[] = [];

  for (const storageKey of storageKeys) {
    const entryKey = explorerMytthofResolveLegacyEntryKey(storageKey);
    if (!entryKey || storageKey.startsWith(explorerMytthofShelfEntryPrefix)) {
      continue;
    }

    const rawPayload = await AsyncStorage.getItem(storageKey);
    if (!rawPayload) {
      continue;
    }

    const bookmarkPayload = explorerMytthofParseBookmarkPayload(entryKey, rawPayload);
    if (!bookmarkPayload) {
      continue;
    }

    await AsyncStorage.setItem(
      bookmarkStorageKey(bookmarkPayload.entryKey),
      JSON.stringify(bookmarkPayload),
    );
    await AsyncStorage.removeItem(storageKey);
    migratedKeys.push(entryKey);
  }

  for (const legacyIndexKey of explorerMytthofLegacyIndexKeys) {
    const indexRaw = await AsyncStorage.getItem(legacyIndexKey);
    if (indexRaw) {
      const legacyIndex = explorerMytthofParseBookmarkIndex(indexRaw);
      migratedKeys.push(...legacyIndex);
      await AsyncStorage.removeItem(legacyIndexKey);
    }
  }

  if (migratedKeys.length === 0) {
    return;
  }

  const uniqueKeys = normalizeStoredTaleKeys([...new Set(migratedKeys)]);
  const indexRaw = await AsyncStorage.getItem(explorerMytthofShelfIndexKey);
  const bookmarkIndex = normalizeStoredTaleKeys(
    explorerMytthofParseBookmarkIndex(indexRaw),
  );

  for (const entryKey of uniqueKeys) {
    if (!bookmarkIndex.includes(entryKey)) {
      bookmarkIndex.push(entryKey);
    }
  }

  await AsyncStorage.setItem(
    explorerMytthofShelfIndexKey,
    JSON.stringify(normalizeStoredTaleKeys(bookmarkIndex)),
  );
};

const explorerMytthofRebuildBookmarkIndex = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  return storageKeys
    .filter(key => key.startsWith(explorerMytthofShelfEntryPrefix))
    .map(key => key.slice(explorerMytthofShelfEntryPrefix.length));
};

const explorerMytthofReadBookmarkRaw = async (entryKey: string) => {
  const normalizedKey = normalizeTaleEntryKey(entryKey);
  const normalizedRaw = await AsyncStorage.getItem(
    bookmarkStorageKey(normalizedKey),
  );
  if (normalizedRaw != null || normalizedKey === entryKey) {
    return {entryKey: normalizedKey, rawPayload: normalizedRaw};
  }
  return {entryKey, rawPayload: await AsyncStorage.getItem(bookmarkStorageKey(entryKey))};
};

export const bookmarkExists = async (entryKey: string) => {
  const {rawPayload} = await explorerMytthofReadBookmarkRaw(entryKey);
  return rawPayload != null;
};

export const persistBookmark = async (bookmarkPayload: BookmarkPayload) => {
  const entryKey = normalizeTaleEntryKey(bookmarkPayload.entryKey);
  const normalizedPayload = {...bookmarkPayload, entryKey};
  await AsyncStorage.setItem(
    bookmarkStorageKey(entryKey),
    JSON.stringify(normalizedPayload),
  );

  const indexRaw = await AsyncStorage.getItem(explorerMytthofShelfIndexKey);
  const bookmarkIndex = normalizeStoredTaleKeys(
    explorerMytthofParseBookmarkIndex(indexRaw),
  );

  if (!bookmarkIndex.includes(entryKey)) {
    bookmarkIndex.push(entryKey);
    await AsyncStorage.setItem(
      explorerMytthofShelfIndexKey,
      JSON.stringify(bookmarkIndex),
    );
  }
};

export const loadShelfBookmarks = async () => {
  await explorerMytthofMigrateLegacyBookmarks();

  const indexRaw = await AsyncStorage.getItem(explorerMytthofShelfIndexKey);
  let bookmarkIndex = normalizeStoredTaleKeys(
    explorerMytthofParseBookmarkIndex(indexRaw),
  );

  if (bookmarkIndex.length === 0) {
    bookmarkIndex = normalizeStoredTaleKeys(
      await explorerMytthofRebuildBookmarkIndex(),
    );

    if (bookmarkIndex.length > 0) {
      await AsyncStorage.setItem(
        explorerMytthofShelfIndexKey,
        JSON.stringify(bookmarkIndex),
      );
    }
  } else if (bookmarkIndex.length > 0) {
    await AsyncStorage.setItem(
      explorerMytthofShelfIndexKey,
      JSON.stringify(bookmarkIndex),
    );
  }

  const storedPayloads = await Promise.all(
    bookmarkIndex.map(async entryKey => {
      const {entryKey: storageKey, rawPayload} =
        await explorerMytthofReadBookmarkRaw(entryKey);
      if (!rawPayload) {
        return null;
      }
      return explorerMytthofParseBookmarkPayload(storageKey, rawPayload);
    }),
  );

  return storedPayloads
    .filter(
      (bookmarkPayload): bookmarkPayload is BookmarkPayload =>
        bookmarkPayload != null &&
        resolveChronicle(bookmarkPayload.entryKey) != null,
    )
    .sort((a, b) => b.storedAt - a.storedAt);
};

export const discardBookmark = async (entryKey: string) => {
  const normalizedKey = normalizeTaleEntryKey(entryKey);
  await AsyncStorage.removeItem(bookmarkStorageKey(normalizedKey));
  if (normalizedKey !== entryKey) {
    await AsyncStorage.removeItem(bookmarkStorageKey(entryKey));
  }

  const indexRaw = await AsyncStorage.getItem(explorerMytthofShelfIndexKey);
  const bookmarkIndex = normalizeStoredTaleKeys(
    explorerMytthofParseBookmarkIndex(indexRaw),
  );

  await AsyncStorage.setItem(
    explorerMytthofShelfIndexKey,
    JSON.stringify(
      bookmarkIndex.filter(id => id !== normalizedKey && id !== entryKey),
    ),
  );
};
