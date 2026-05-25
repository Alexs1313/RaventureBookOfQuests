import AsyncStorage from '@react-native-async-storage/async-storage';

const insightLedgerKey = '@myth_insight_ledger';
const legacyInsightLedgerKey = 'insight_ledger';

export const insightPerSuccess = 50;

const migrateInsightLedger = async () => {
  const legacyRaw = await AsyncStorage.getItem(legacyInsightLedgerKey);
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(insightLedgerKey);
  if (currentRaw == null) {
    await AsyncStorage.setItem(insightLedgerKey, legacyRaw);
  }

  await AsyncStorage.removeItem(legacyInsightLedgerKey);
};

export const fetchInsightBalance = async () => {
  await migrateInsightLedger();
  const rawPayload = await AsyncStorage.getItem(insightLedgerKey);
  return rawPayload ? parseInt(rawPayload, 10) : 0;
};

export const creditInsightBalance = async (points: number) => {
  const currentBalance = await fetchInsightBalance();
  await AsyncStorage.setItem(insightLedgerKey, String(currentBalance + points));
};
