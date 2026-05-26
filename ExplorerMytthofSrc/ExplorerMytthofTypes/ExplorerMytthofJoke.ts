import type {ImageSourcePropType} from 'react-native';

import type {MythLocale} from './ExplorerMytthofStory';

export type JokeEntry = {
  jokeKey: string;
  localeTag: MythLocale;
  body: string;
};

export type JokeCategory = {
  localeTag: MythLocale;
  coverVisual: ImageSourcePropType;
  teaser: string;
  jokes: JokeEntry[];
};

export type SavedJokePayload = {
  jokeKey: string;
  storedAt: number;
};

export type SavedJokeDisplay = SavedJokePayload & {
  headline: string;
  localeTag: MythLocale;
  body: string;
  coverVisual: ImageSourcePropType;
};
