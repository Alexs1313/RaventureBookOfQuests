import type {ImageSourcePropType} from 'react-native';

import type {RadienceffAncienttalesMythLocale} from './RadienceffAncienttalesStory';

export type RadienceffAncienttalesRelicProfile = {
  entryKey: string;
  localeTag: RadienceffAncienttalesMythLocale;
  displayName: string;
  synopsis: string;
  coverVisual: ImageSourcePropType;
  insightsThreshold: number;
};
