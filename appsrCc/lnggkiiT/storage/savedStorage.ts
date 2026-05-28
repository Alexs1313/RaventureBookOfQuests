import AsyncStorage from '@react-native-async-storage/async-storage';

import {resolveChronicle} from '../../anccdatta/stories';
import type {BookmarkPayload} from '../../annccTyppes';

const shelfIndexKey = '@myth_shelf_index';
const shelfEntryPrefix = '@myth_shelf_entry_';

const legacyIndexKeys = ['@book_explorer_bookmark_index'];
const legacyEntryPrefixes = [
  '@book_explorer_bookmark_',
  'bookmark_legacy_v1_',
  ['raven', 'Quest', '_saved_'].join(''),
];

const legacyPayloadIdKey = ['raven', 'Quest', 'Id'].join('');
const legacyPayloadTrailKey = ['raven', 'Quest', 'History'].join('');
const legacyPayloadStoredKey = ['raven', 'Quest', 'SavedAt'].join('');

export const bookmarkStorageKey = (entryKey: string) =>
  `${shelfEntryPrefix}${entryKey}`;

const parseBookmarkIndex = (indexRaw: string | null): string[] => {
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

const normalizeBookmarkPayload = (
  entryKey: string,
  parsedPayload: Record<string, unknown>,
): BookmarkPayload | null => {
  const legacyId = parsedPayload[legacyPayloadIdKey];
  const resolvedKey =
    typeof parsedPayload.entryKey === 'string'
      ? parsedPayload.entryKey
      : typeof legacyId === 'string'
      ? legacyId
      : entryKey;

  const legacyTrail = parsedPayload[legacyPayloadTrailKey];
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

  const legacyStoredAt = parsedPayload[legacyPayloadStoredKey];
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

const parseBookmarkPayload = (
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
    return normalizeBookmarkPayload(entryKey, parsedPayload);
  } catch {
    return null;
  }
};

const resolveLegacyEntryKey = (storageKey: string): string | null => {
  if (storageKey.startsWith(shelfEntryPrefix)) {
    return storageKey.slice(shelfEntryPrefix.length);
  }
  for (const prefix of legacyEntryPrefixes) {
    if (storageKey.startsWith(prefix)) {
      return storageKey.slice(prefix.length);
    }
  }
  return null;
};

const migrateLegacyBookmarks = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  const migratedKeys: string[] = [];

  for (const storageKey of storageKeys) {
    const entryKey = resolveLegacyEntryKey(storageKey);
    if (!entryKey || storageKey.startsWith(shelfEntryPrefix)) {
      continue;
    }

    const rawPayload = await AsyncStorage.getItem(storageKey);
    if (!rawPayload) {
      continue;
    }

    const bookmarkPayload = parseBookmarkPayload(entryKey, rawPayload);
    if (!bookmarkPayload) {
      continue;
    }

    await AsyncStorage.setItem(
      bookmarkStorageKey(entryKey),
      JSON.stringify(bookmarkPayload),
    );
    await AsyncStorage.removeItem(storageKey);
    migratedKeys.push(entryKey);
  }

  for (const legacyIndexKey of legacyIndexKeys) {
    const indexRaw = await AsyncStorage.getItem(legacyIndexKey);
    if (indexRaw) {
      const legacyIndex = parseBookmarkIndex(indexRaw);
      migratedKeys.push(...legacyIndex);
      await AsyncStorage.removeItem(legacyIndexKey);
    }
  }

  if (migratedKeys.length === 0) {
    return;
  }

  const uniqueKeys = [...new Set(migratedKeys)];
  const indexRaw = await AsyncStorage.getItem(shelfIndexKey);
  const bookmarkIndex = parseBookmarkIndex(indexRaw);

  for (const entryKey of uniqueKeys) {
    if (!bookmarkIndex.includes(entryKey)) {
      bookmarkIndex.push(entryKey);
    }
  }

  await AsyncStorage.setItem(shelfIndexKey, JSON.stringify(bookmarkIndex));
};

const rebuildBookmarkIndex = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  return storageKeys
    .filter(key => key.startsWith(shelfEntryPrefix))
    .map(key => key.slice(shelfEntryPrefix.length));
};

export const bookmarkExists = async (entryKey: string) => {
  const rawPayload = await AsyncStorage.getItem(bookmarkStorageKey(entryKey));
  return rawPayload != null;
};

export const persistBookmark = async (bookmarkPayload: BookmarkPayload) => {
  const entryKey = bookmarkPayload.entryKey;
  await AsyncStorage.setItem(
    bookmarkStorageKey(entryKey),
    JSON.stringify(bookmarkPayload),
  );

  const indexRaw = await AsyncStorage.getItem(shelfIndexKey);
  const bookmarkIndex = parseBookmarkIndex(indexRaw);

  if (!bookmarkIndex.includes(entryKey)) {
    bookmarkIndex.push(entryKey);
    await AsyncStorage.setItem(shelfIndexKey, JSON.stringify(bookmarkIndex));
  }
};

export const loadShelfBookmarks = async () => {
  await migrateLegacyBookmarks();

  const indexRaw = await AsyncStorage.getItem(shelfIndexKey);
  let bookmarkIndex = parseBookmarkIndex(indexRaw);

  if (bookmarkIndex.length === 0) {
    bookmarkIndex = await rebuildBookmarkIndex();

    if (bookmarkIndex.length > 0) {
      await AsyncStorage.setItem(shelfIndexKey, JSON.stringify(bookmarkIndex));
    }
  }

  const storedPayloads = await Promise.all(
    bookmarkIndex.map(async entryKey => {
      const rawPayload = await AsyncStorage.getItem(
        bookmarkStorageKey(entryKey),
      );
      if (!rawPayload) {
        return null;
      }
      return parseBookmarkPayload(entryKey, rawPayload);
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
  await AsyncStorage.removeItem(bookmarkStorageKey(entryKey));

  const indexRaw = await AsyncStorage.getItem(shelfIndexKey);
  const bookmarkIndex = parseBookmarkIndex(indexRaw);

  await AsyncStorage.setItem(
    shelfIndexKey,
    JSON.stringify(bookmarkIndex.filter(id => id !== entryKey)),
  );
};
