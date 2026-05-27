import type {ImageSourcePropType} from 'react-native';

import type {RadienceffAncienttalesMythLocale} from './RadienceffAncienttalesStory';

export type RadienceffAncienttalesJokeEntry = {
  jokeKey: string;
  localeTag: RadienceffAncienttalesMythLocale;
  body: string;
};

export type RadienceffAncienttalesJokeCategory = {
  localeTag: RadienceffAncienttalesMythLocale;
  coverVisual: ImageSourcePropType;
  teaser: string;
  jokes: RadienceffAncienttalesJokeEntry[];
};

export type RadienceffAncienttalesSavedJokePayload = {
  jokeKey: string;
  storedAt: number;
};

export type RadienceffAncienttalesSavedJokeDisplay = RadienceffAncienttalesSavedJokePayload & {
  headline: string;
  localeTag: RadienceffAncienttalesMythLocale;
  body: string;
  coverVisual: ImageSourcePropType;
};
