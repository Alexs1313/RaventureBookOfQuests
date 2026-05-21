import AsyncStorage from '@react-native-async-storage/async-storage';

const legendsaventurebkkTalesReadKey = 'legendsaventurebkk_tales_read';

export const legendsaventurebkkMarkTaleRead = async (
  legendsaventurebkkStoryId: string,
) => {
  const legendsaventurebkkRaw = await AsyncStorage.getItem(
    legendsaventurebkkTalesReadKey,
  );
  const legendsaventurebkkIds: string[] = legendsaventurebkkRaw
    ? JSON.parse(legendsaventurebkkRaw)
    : [];

  if (!legendsaventurebkkIds.includes(legendsaventurebkkStoryId)) {
    legendsaventurebkkIds.push(legendsaventurebkkStoryId);
    await AsyncStorage.setItem(
      legendsaventurebkkTalesReadKey,
      JSON.stringify(legendsaventurebkkIds),
    );
  }
};

export const legendsaventurebkkGetTalesReadCount = async () => {
  const legendsaventurebkkRaw = await AsyncStorage.getItem(
    legendsaventurebkkTalesReadKey,
  );
  const legendsaventurebkkIds: string[] = legendsaventurebkkRaw
    ? JSON.parse(legendsaventurebkkRaw)
    : [];
  return legendsaventurebkkIds.length;
};
