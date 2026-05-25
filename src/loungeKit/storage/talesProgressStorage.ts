import AsyncStorage from '@react-native-async-storage/async-storage';

const chroniclesFinishedKey = '@myth_chronicles_consumed';
const legacyChroniclesFinishedKey = '@book_explorer_chronicles_finished';

const migrateChroniclesFinished = async () => {
  const legacyRaw = await AsyncStorage.getItem(legacyChroniclesFinishedKey);
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(chroniclesFinishedKey);
  if (currentRaw == null) {
    await AsyncStorage.setItem(chroniclesFinishedKey, legacyRaw);
  } else {
    try {
      const legacyKeys: string[] = JSON.parse(legacyRaw);
      const currentKeys: string[] = JSON.parse(currentRaw);
      const mergedKeys = [...new Set([...currentKeys, ...legacyKeys])];
      await AsyncStorage.setItem(
        chroniclesFinishedKey,
        JSON.stringify(mergedKeys),
      );
    } catch {
      await AsyncStorage.setItem(chroniclesFinishedKey, legacyRaw);
    }
  }

  await AsyncStorage.removeItem(legacyChroniclesFinishedKey);
};

export const markChronicleConsumed = async (chronicleKey: string) => {
  await migrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(chroniclesFinishedKey);
  const finishedKeys: string[] = rawPayload ? JSON.parse(rawPayload) : [];

  if (!finishedKeys.includes(chronicleKey)) {
    finishedKeys.push(chronicleKey);
    await AsyncStorage.setItem(
      chroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
};

export const fetchChroniclesConsumedCount = async () => {
  await migrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(chroniclesFinishedKey);
  const finishedKeys: string[] = rawPayload ? JSON.parse(rawPayload) : [];
  return finishedKeys.length;
};
