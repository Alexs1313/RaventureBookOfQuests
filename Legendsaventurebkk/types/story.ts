import type {ImageSourcePropType} from 'react-native';

export type LegendsaventurebkkRegion =
  | 'Greece'
  | 'Egypt'
  | 'India'
  | 'Aztecs';

export type LegendsaventurebkkStoryChoice = {
  legendsaventurebkkLabel: string;
  legendsaventurebkkNext: string;
};

export type LegendsaventurebkkStoryNode = {
  legendsaventurebkkAddText?: string;
  legendsaventurebkkQuestion?: string;
  legendsaventurebkkChoices?: LegendsaventurebkkStoryChoice[];
  legendsaventurebkkEnding?: boolean;
};

export type LegendsaventurebkkStory = {
  legendsaventurebkkId: string;
  legendsaventurebkkRegion: LegendsaventurebkkRegion;
  legendsaventurebkkTitle: string;
  legendsaventurebkkDescription: string;
  legendsaventurebkkIntro: string;
  legendsaventurebkkImage: ImageSourcePropType;
  legendsaventurebkkNodes: Record<string, LegendsaventurebkkStoryNode>;
};

export type LegendsaventurebkkStoryBranch = {
  legendsaventurebkkChoice1: string;
  legendsaventurebkkBridge: string;
  legendsaventurebkkChoice2A: string;
  legendsaventurebkkChoice2B: string;
  legendsaventurebkkEndingA: string;
  legendsaventurebkkEndingB: string;
};
