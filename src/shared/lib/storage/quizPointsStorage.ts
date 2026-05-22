import AsyncStorage from '@react-native-async-storage/async-storage';

const ravenQuestQuizPointsKey =
  '@book_explorer_raventure/insight_ledger';

export const ravenQuestPointsPerCorrect = 50;

export const ravenQuestGetQuizPoints = async () => {
  const ravenQuestRaw = await AsyncStorage.getItem(
    ravenQuestQuizPointsKey,
  );
  return ravenQuestRaw ? parseInt(ravenQuestRaw, 10) : 0;
};

export const ravenQuestAddQuizPoints = async (
  ravenQuestPoints: number,
) => {
  const ravenQuestCurrent = await ravenQuestGetQuizPoints();
  await AsyncStorage.setItem(
    ravenQuestQuizPointsKey,
    String(ravenQuestCurrent + ravenQuestPoints),
  );
};
