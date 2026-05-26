import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  normalizeStoredTaleKeys,
  normalizeTaleEntryKey,
} from '../ExplorerMytthofEntryKeyAliases';

const explorerMytthofChroniclesFinishedKey = '@myth_chronicles_consumed';
const explorerMytthofLegacyChroniclesFinishedKey = '@book_explorer_chronicles_finished';

const explorerMytthofMigrateChroniclesFinished = async () => {
  const legacyRaw = await AsyncStorage.getItem(explorerMytthofLegacyChroniclesFinishedKey);
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(explorerMytthofChroniclesFinishedKey);
  if (currentRaw == null) {
    await AsyncStorage.setItem(explorerMytthofChroniclesFinishedKey, legacyRaw);
  } else {
    try {
      const legacyKeys: string[] = JSON.parse(legacyRaw);
      const currentKeys: string[] = JSON.parse(currentRaw);
      const mergedKeys = normalizeStoredTaleKeys([
        ...new Set([...currentKeys, ...legacyKeys]),
      ]);
      await AsyncStorage.setItem(
        explorerMytthofChroniclesFinishedKey,
        JSON.stringify(mergedKeys),
      );
    } catch {
      await AsyncStorage.setItem(explorerMytthofChroniclesFinishedKey, legacyRaw);
    }
  }

  await AsyncStorage.removeItem(explorerMytthofLegacyChroniclesFinishedKey);
};

export const markChronicleConsumed = async (chronicleKey: string) => {
  const normalizedKey = normalizeTaleEntryKey(chronicleKey);
  await explorerMytthofMigrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(explorerMytthofChroniclesFinishedKey);
  const finishedKeys = normalizeStoredTaleKeys(
    rawPayload ? JSON.parse(rawPayload) : [],
  );

  if (!finishedKeys.includes(normalizedKey)) {
    finishedKeys.push(normalizedKey);
    await AsyncStorage.setItem(
      explorerMytthofChroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
};

export const fetchChroniclesConsumedCount = async () => {
  await explorerMytthofMigrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(explorerMytthofChroniclesFinishedKey);
  const finishedKeys = normalizeStoredTaleKeys(
    rawPayload ? JSON.parse(rawPayload) : [],
  );
  if (rawPayload) {
    await AsyncStorage.setItem(
      explorerMytthofChroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
  return finishedKeys.length;
};
