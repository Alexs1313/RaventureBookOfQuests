import type {ImageSourcePropType} from 'react-native';

import type {RadienceffAncienttalesMythLocale} from './RadienceffAncienttalesStory';

export type RadienceffAncienttalesFigureProfile = {
  entryKey: string;
  localeTag: RadienceffAncienttalesMythLocale;
  displayName: string;
  synopsis: string;
  coverVisual: ImageSourcePropType;
  chroniclesThreshold: number;
};
