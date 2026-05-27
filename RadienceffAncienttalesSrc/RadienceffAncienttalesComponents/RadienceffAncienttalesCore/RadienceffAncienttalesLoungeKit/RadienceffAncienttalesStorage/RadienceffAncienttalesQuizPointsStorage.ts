import AsyncStorage from '@react-native-async-storage/async-storage';

const radienceffAncienttalesInsightLedgerKey = '@myth_insight_ledger';
const radienceffAncienttalesLegacyInsightLedgerKey = 'insight_ledger';

export const radienceffAncienttalesInsightPerSuccess = 50;

const radienceffAncienttalesMigrateInsightLedger = async () => {
  const legacyRaw = await AsyncStorage.getItem(radienceffAncienttalesLegacyInsightLedgerKey);
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(radienceffAncienttalesInsightLedgerKey);
  if (currentRaw == null) {
    await AsyncStorage.setItem(radienceffAncienttalesInsightLedgerKey, legacyRaw);
  }

  await AsyncStorage.removeItem(radienceffAncienttalesLegacyInsightLedgerKey);
};

export const radienceffAncienttalesFetchInsightBalance = async () => {
  await radienceffAncienttalesMigrateInsightLedger();
  const rawPayload = await AsyncStorage.getItem(radienceffAncienttalesInsightLedgerKey);
  return rawPayload ? parseInt(rawPayload, 10) : 0;
};

export const radienceffAncienttalesCreditInsightBalance = async (points: number) => {
  const currentBalance = await radienceffAncienttalesFetchInsightBalance();
  await AsyncStorage.setItem(radienceffAncienttalesInsightLedgerKey, String(currentBalance + points));
};
