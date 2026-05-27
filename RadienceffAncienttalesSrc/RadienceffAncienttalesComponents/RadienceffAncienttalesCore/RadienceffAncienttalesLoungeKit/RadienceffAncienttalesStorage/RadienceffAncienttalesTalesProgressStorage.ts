import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  radienceffAncienttalesNormalizeStoredTaleKeys,
  radienceffAncienttalesNormalizeTaleEntryKey,
} from '../RadienceffAncienttalesEntryKeyAliases';

const radienceffAncienttalesChroniclesFinishedKey = '@myth_chronicles_consumed';
const radienceffAncienttalesLegacyChroniclesFinishedKey = '@book_explorer_chronicles_finished';

const radienceffAncienttalesMigrateChroniclesFinished = async () => {
  const legacyRaw = await AsyncStorage.getItem(radienceffAncienttalesLegacyChroniclesFinishedKey);
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(radienceffAncienttalesChroniclesFinishedKey);
  if (currentRaw == null) {
    await AsyncStorage.setItem(radienceffAncienttalesChroniclesFinishedKey, legacyRaw);
  } else {
    try {
      const legacyKeys: string[] = JSON.parse(legacyRaw);
      const currentKeys: string[] = JSON.parse(currentRaw);
      const mergedKeys = radienceffAncienttalesNormalizeStoredTaleKeys([
        ...new Set([...currentKeys, ...legacyKeys]),
      ]);
      await AsyncStorage.setItem(
        radienceffAncienttalesChroniclesFinishedKey,
        JSON.stringify(mergedKeys),
      );
    } catch {
      await AsyncStorage.setItem(radienceffAncienttalesChroniclesFinishedKey, legacyRaw);
    }
  }

  await AsyncStorage.removeItem(radienceffAncienttalesLegacyChroniclesFinishedKey);
};

export const radienceffAncienttalesMarkChronicleConsumed = async (chronicleKey: string) => {
  const normalizedKey = radienceffAncienttalesNormalizeTaleEntryKey(chronicleKey);
  await radienceffAncienttalesMigrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(radienceffAncienttalesChroniclesFinishedKey);
  const finishedKeys = radienceffAncienttalesNormalizeStoredTaleKeys(
    rawPayload ? JSON.parse(rawPayload) : [],
  );

  if (!finishedKeys.includes(normalizedKey)) {
    finishedKeys.push(normalizedKey);
    await AsyncStorage.setItem(
      radienceffAncienttalesChroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
};

export const radienceffAncienttalesFetchChroniclesConsumedCount = async () => {
  await radienceffAncienttalesMigrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(radienceffAncienttalesChroniclesFinishedKey);
  const finishedKeys = radienceffAncienttalesNormalizeStoredTaleKeys(
    rawPayload ? JSON.parse(rawPayload) : [],
  );
  if (rawPayload) {
    await AsyncStorage.setItem(
      radienceffAncienttalesChroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
  return finishedKeys.length;
};
