import AsyncStorage from '@react-native-async-storage/async-storage';

import {bookqqestGetStoryById} from './bookqqestStoriesData';

export type BookqqestSavedTale = {
  bookqqestId: string;
  bookqqestHistory: string[];
  bookqqestSavedAt: number;
};

const bookqqestSavedIndexKey = 'bookqqest_saved_index';

export const bookqqestSavedKey = (bookqqestId: string) =>
  `bookqqest_saved_${bookqqestId}`;

const bookqqestParseSaved = (
  bookqqestId: string,
  bookqqestRaw: string,
): BookqqestSavedTale | null => {
  if (bookqqestRaw === '1') {
    const bookqqestStory =
      bookqqestGetStoryById(bookqqestId);
    if (!bookqqestStory) {
      return null;
    }
    return {
      bookqqestId,
      bookqqestHistory: [
        bookqqestStory.bookqqestIntro,
      ],
      bookqqestSavedAt: 0,
    };
  }

  try {
    const bookqqestParsed = JSON.parse(
      bookqqestRaw,
    ) as BookqqestSavedTale;
    if (
      bookqqestParsed.bookqqestId &&
      Array.isArray(bookqqestParsed.bookqqestHistory)
    ) {
      return bookqqestParsed;
    }
  } catch {
    return null;
  }

  return null;
};

export const bookqqestIsStorySaved = async (
  bookqqestId: string,
) => {
  const bookqqestRaw = await AsyncStorage.getItem(
    bookqqestSavedKey(bookqqestId),
  );
  return bookqqestRaw != null;
};

export const bookqqestSaveTale = async (
  bookqqestTale: BookqqestSavedTale,
) => {
  const bookqqestId = bookqqestTale.bookqqestId;
  await AsyncStorage.setItem(
    bookqqestSavedKey(bookqqestId),
    JSON.stringify(bookqqestTale),
  );

  const bookqqestIndexRaw = await AsyncStorage.getItem(
    bookqqestSavedIndexKey,
  );
  const bookqqestIndex: string[] = bookqqestIndexRaw
    ? JSON.parse(bookqqestIndexRaw)
    : [];

  if (!bookqqestIndex.includes(bookqqestId)) {
    bookqqestIndex.push(bookqqestId);
    await AsyncStorage.setItem(
      bookqqestSavedIndexKey,
      JSON.stringify(bookqqestIndex),
    );
  }
};

export const bookqqestLoadSavedTales = async () => {
  let bookqqestIndexRaw = await AsyncStorage.getItem(
    bookqqestSavedIndexKey,
  );
  let bookqqestIndex: string[] = bookqqestIndexRaw
    ? JSON.parse(bookqqestIndexRaw)
    : [];

  if (bookqqestIndex.length === 0) {
    const bookqqestAllKeys = await AsyncStorage.getAllKeys();
    bookqqestIndex = bookqqestAllKeys
      .filter(
        key =>
          key.startsWith('bookqqest_saved_') &&
          key !== bookqqestSavedIndexKey,
      )
      .map(key => key.replace('bookqqest_saved_', ''));

    if (bookqqestIndex.length > 0) {
      await AsyncStorage.setItem(
        bookqqestSavedIndexKey,
        JSON.stringify(bookqqestIndex),
      );
    }
  }

  const bookqqestTales = await Promise.all(
    bookqqestIndex.map(async bookqqestId => {
      const bookqqestRaw = await AsyncStorage.getItem(
        bookqqestSavedKey(bookqqestId),
      );
      if (!bookqqestRaw) {
        return null;
      }
      return bookqqestParseSaved(
        bookqqestId,
        bookqqestRaw,
      );
    }),
  );

  return bookqqestTales
    .filter(
      (bookqqestTale): bookqqestTale is BookqqestSavedTale =>
        bookqqestTale != null &&
        bookqqestGetStoryById(
          bookqqestTale.bookqqestId,
        ) != null,
    )
    .sort(
      (a, b) =>
        b.bookqqestSavedAt - a.bookqqestSavedAt,
    );
};

export const bookqqestRemoveSavedTale = async (
  bookqqestId: string,
) => {
  await AsyncStorage.removeItem(bookqqestSavedKey(bookqqestId));

  const bookqqestIndexRaw = await AsyncStorage.getItem(
    bookqqestSavedIndexKey,
  );
  const bookqqestIndex: string[] = bookqqestIndexRaw
    ? JSON.parse(bookqqestIndexRaw)
    : [];

  await AsyncStorage.setItem(
    bookqqestSavedIndexKey,
    JSON.stringify(
      bookqqestIndex.filter(
        id => id !== bookqqestId,
      ),
    ),
  );
};

export const bookqqestPreviewText = (
  bookqqestHistory: string[],
  bookqqestMax = 120,
) => {
  const bookqqestText =
    bookqqestHistory[bookqqestHistory.length - 1] ?? '';
  if (bookqqestText.length <= bookqqestMax) {
    return bookqqestText;
  }
  return `${bookqqestText.slice(0, bookqqestMax).trim()}...`;
};

export const bookqqestShareMessage = (
  bookqqestTitle: string,
  bookqqestHistory: string[],
) =>
  `${bookqqestTitle}\n\n${bookqqestHistory.join('\n\n')}\n\n— Raventure: Book of Quests`;
