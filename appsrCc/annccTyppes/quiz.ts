import type {ImageSourcePropType} from 'react-native';

export type TrialPrompt = {
  entryKey: string;
  promptStem: string;
  responseChoices: string[];
  keyedResponse: string;
  coverVisual: ImageSourcePropType;
};
