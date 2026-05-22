import type {ImageSourcePropType} from 'react-native';

export type RavenQuestRegion =
  | 'Greece'
  | 'Egypt'
  | 'India'
  | 'Aztecs';

export type RavenQuestStoryChoice = {
  ravenQuestLabel: string;
  ravenQuestNext: string;
};

export type RavenQuestStoryNode = {
  ravenQuestAddText?: string;
  ravenQuestQuestion?: string;
  ravenQuestChoices?: RavenQuestStoryChoice[];
  ravenQuestEnding?: boolean;
};

export type RavenQuestStory = {
  ravenQuestId: string;
  ravenQuestRegion: RavenQuestRegion;
  ravenQuestTitle: string;
  ravenQuestDescription: string;
  ravenQuestIntro: string;
  ravenQuestImage: ImageSourcePropType;
  ravenQuestNodes: Record<string, RavenQuestStoryNode>;
};

export type RavenQuestStoryBranch = {
  ravenQuestChoice1: string;
  ravenQuestBridge: string;
  ravenQuestChoice2A: string;
  ravenQuestChoice2B: string;
  ravenQuestEndingA: string;
  ravenQuestEndingB: string;
};
