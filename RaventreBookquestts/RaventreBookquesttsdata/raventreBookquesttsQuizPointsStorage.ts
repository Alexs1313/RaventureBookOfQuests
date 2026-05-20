import AsyncStorage from '@react-native-async-storage/async-storage';

const raventreBookquesttsQuizPointsKey = 'raventreBookquestts_quiz_points';

export const raventreBookquesttsPointsPerCorrect = 50;

export const raventreBookquesttsGetQuizPoints = async () => {
  const raventreBookquesttsRaw = await AsyncStorage.getItem(
    raventreBookquesttsQuizPointsKey,
  );
  return raventreBookquesttsRaw ? parseInt(raventreBookquesttsRaw, 10) : 0;
};

export const raventreBookquesttsAddQuizPoints = async (
  raventreBookquesttsPoints: number,
) => {
  const raventreBookquesttsCurrent = await raventreBookquesttsGetQuizPoints();
  await AsyncStorage.setItem(
    raventreBookquesttsQuizPointsKey,
    String(raventreBookquesttsCurrent + raventreBookquesttsPoints),
  );
};
