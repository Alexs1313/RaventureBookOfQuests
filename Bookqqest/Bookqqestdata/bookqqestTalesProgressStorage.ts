import AsyncStorage from '@react-native-async-storage/async-storage';

const bookqqestTalesReadKey = 'bookqqest_tales_read';

export const bookqqestMarkTaleRead = async (
  bookqqestStoryId: string,
) => {
  const bookqqestRaw = await AsyncStorage.getItem(
    bookqqestTalesReadKey,
  );
  const bookqqestIds: string[] = bookqqestRaw
    ? JSON.parse(bookqqestRaw)
    : [];

  if (!bookqqestIds.includes(bookqqestStoryId)) {
    bookqqestIds.push(bookqqestStoryId);
    await AsyncStorage.setItem(
      bookqqestTalesReadKey,
      JSON.stringify(bookqqestIds),
    );
  }
};

export const bookqqestGetTalesReadCount = async () => {
  const bookqqestRaw = await AsyncStorage.getItem(
    bookqqestTalesReadKey,
  );
  const bookqqestIds: string[] = bookqqestRaw
    ? JSON.parse(bookqqestRaw)
    : [];
  return bookqqestIds.length;
};
