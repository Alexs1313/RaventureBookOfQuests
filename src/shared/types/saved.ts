export type RavenQuestSavedTale = {
  ravenQuestId: string;
  ravenQuestHistory: string[];
  ravenQuestSavedAt: number;
};

export type RavenQuestSavedEntry = RavenQuestSavedTale & {
  ravenQuestTitle: string;
  ravenQuestRegion: string;
  ravenQuestImage: import('react-native').ImageSourcePropType;
};
