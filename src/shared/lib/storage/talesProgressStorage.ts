import AsyncStorage from '@react-native-async-storage/async-storage';

const ravenQuestTalesReadKey =
  '@book_explorer_raventure/chronicles_finished';

export const ravenQuestMarkTaleRead = async (
  ravenQuestStoryId: string,
) => {
  const ravenQuestRaw = await AsyncStorage.getItem(
    ravenQuestTalesReadKey,
  );
  const ravenQuestIds: string[] = ravenQuestRaw
    ? JSON.parse(ravenQuestRaw)
    : [];

  if (!ravenQuestIds.includes(ravenQuestStoryId)) {
    ravenQuestIds.push(ravenQuestStoryId);
    await AsyncStorage.setItem(
      ravenQuestTalesReadKey,
      JSON.stringify(ravenQuestIds),
    );
  }
};

export const ravenQuestGetTalesReadCount = async () => {
  const ravenQuestRaw = await AsyncStorage.getItem(
    ravenQuestTalesReadKey,
  );
  const ravenQuestIds: string[] = ravenQuestRaw
    ? JSON.parse(ravenQuestRaw)
    : [];
  return ravenQuestIds.length;
};
