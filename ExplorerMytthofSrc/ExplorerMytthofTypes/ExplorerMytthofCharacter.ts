import type {ImageSourcePropType} from 'react-native';

import type {MythLocale} from './ExplorerMytthofStory';

export type FigureProfile = {
  entryKey: string;
  localeTag: MythLocale;
  displayName: string;
  synopsis: string;
  coverVisual: ImageSourcePropType;
  chroniclesThreshold: number;
};
