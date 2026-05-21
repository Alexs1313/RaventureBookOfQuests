import AsyncStorage from '@react-native-async-storage/async-storage';

const bookqqestQuizPointsKey = 'bookqqest_quiz_points';

export const bookqqestPointsPerCorrect = 50;

export const bookqqestGetQuizPoints = async () => {
  const bookqqestRaw = await AsyncStorage.getItem(
    bookqqestQuizPointsKey,
  );
  return bookqqestRaw ? parseInt(bookqqestRaw, 10) : 0;
};

export const bookqqestAddQuizPoints = async (
  bookqqestPoints: number,
) => {
  const bookqqestCurrent = await bookqqestGetQuizPoints();
  await AsyncStorage.setItem(
    bookqqestQuizPointsKey,
    String(bookqqestCurrent + bookqqestPoints),
  );
};
