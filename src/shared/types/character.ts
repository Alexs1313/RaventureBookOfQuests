import type {ImageSourcePropType} from 'react-native';

import type {LegendsaventurebkkRegion} from './story';

export type LegendsaventurebkkCharacter = {
  legendsaventurebkkId: string;
  legendsaventurebkkRegion: LegendsaventurebkkRegion;
  legendsaventurebkkName: string;
  legendsaventurebkkDescription: string;
  legendsaventurebkkImage: ImageSourcePropType;
  legendsaventurebkkTalesRequired: number;
};
