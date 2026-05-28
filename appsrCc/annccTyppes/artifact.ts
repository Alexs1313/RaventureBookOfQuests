import type {ImageSourcePropType} from 'react-native';

import type {MythLocale} from './story';

export type RelicProfile = {
  entryKey: string;
  localeTag: MythLocale;
  displayName: string;
  synopsis: string;
  coverVisual: ImageSourcePropType;
  insightsThreshold: number;
};
