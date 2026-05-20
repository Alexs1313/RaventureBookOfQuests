import AsyncStorage from '@react-native-async-storage/async-storage';

const raventreBookquesttsTalesReadKey = 'raventreBookquestts_tales_read';

export const raventreBookquesttsMarkTaleRead = async (
  raventreBookquesttsStoryId: string,
) => {
  const raventreBookquesttsRaw = await AsyncStorage.getItem(
    raventreBookquesttsTalesReadKey,
  );
  const raventreBookquesttsIds: string[] = raventreBookquesttsRaw
    ? JSON.parse(raventreBookquesttsRaw)
    : [];

  if (!raventreBookquesttsIds.includes(raventreBookquesttsStoryId)) {
    raventreBookquesttsIds.push(raventreBookquesttsStoryId);
    await AsyncStorage.setItem(
      raventreBookquesttsTalesReadKey,
      JSON.stringify(raventreBookquesttsIds),
    );
  }
};

export const raventreBookquesttsGetTalesReadCount = async () => {
  const raventreBookquesttsRaw = await AsyncStorage.getItem(
    raventreBookquesttsTalesReadKey,
  );
  const raventreBookquesttsIds: string[] = raventreBookquesttsRaw
    ? JSON.parse(raventreBookquesttsRaw)
    : [];
  return raventreBookquesttsIds.length;
};
