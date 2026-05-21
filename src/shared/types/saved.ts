export type LegendsaventurebkkSavedTale = {
  legendsaventurebkkId: string;
  legendsaventurebkkHistory: string[];
  legendsaventurebkkSavedAt: number;
};

export type LegendsaventurebkkSavedEntry = LegendsaventurebkkSavedTale & {
  legendsaventurebkkTitle: string;
  legendsaventurebkkRegion: string;
  legendsaventurebkkImage: import('react-native').ImageSourcePropType;
};
