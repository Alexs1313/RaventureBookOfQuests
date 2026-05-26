import AsyncStorage from '@react-native-async-storage/async-storage';

const explorerMytthofInsightLedgerKey = '@myth_insight_ledger';
const explorerMytthofLegacyInsightLedgerKey = 'insight_ledger';

export const insightPerSuccess = 50;

const explorerMytthofMigrateInsightLedger = async () => {
  const legacyRaw = await AsyncStorage.getItem(explorerMytthofLegacyInsightLedgerKey);
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(explorerMytthofInsightLedgerKey);
  if (currentRaw == null) {
    await AsyncStorage.setItem(explorerMytthofInsightLedgerKey, legacyRaw);
  }

  await AsyncStorage.removeItem(explorerMytthofLegacyInsightLedgerKey);
};

export const fetchInsightBalance = async () => {
  await explorerMytthofMigrateInsightLedger();
  const rawPayload = await AsyncStorage.getItem(explorerMytthofInsightLedgerKey);
  return rawPayload ? parseInt(rawPayload, 10) : 0;
};

export const creditInsightBalance = async (points: number) => {
  const currentBalance = await fetchInsightBalance();
  await AsyncStorage.setItem(explorerMytthofInsightLedgerKey, String(currentBalance + points));
};
