import type {ImageSourcePropType} from 'react-native';

import type {LegendsaventurebkkRegion} from './story';

export type LegendsaventurebkkArtifact = {
  legendsaventurebkkId: string;
  legendsaventurebkkRegion: LegendsaventurebkkRegion;
  legendsaventurebkkName: string;
  legendsaventurebkkDescription: string;
  legendsaventurebkkImage: ImageSourcePropType;
  legendsaventurebkkPointsRequired: number;
};
