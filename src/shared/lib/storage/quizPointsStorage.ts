import AsyncStorage from '@react-native-async-storage/async-storage';

const legendsaventurebkkQuizPointsKey = 'legendsaventurebkk_quiz_points';

export const legendsaventurebkkPointsPerCorrect = 50;

export const legendsaventurebkkGetQuizPoints = async () => {
  const legendsaventurebkkRaw = await AsyncStorage.getItem(
    legendsaventurebkkQuizPointsKey,
  );
  return legendsaventurebkkRaw ? parseInt(legendsaventurebkkRaw, 10) : 0;
};

export const legendsaventurebkkAddQuizPoints = async (
  legendsaventurebkkPoints: number,
) => {
  const legendsaventurebkkCurrent = await legendsaventurebkkGetQuizPoints();
  await AsyncStorage.setItem(
    legendsaventurebkkQuizPointsKey,
    String(legendsaventurebkkCurrent + legendsaventurebkkPoints),
  );
};
