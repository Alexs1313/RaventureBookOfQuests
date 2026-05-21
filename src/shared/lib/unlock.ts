import type {
  LegendsaventurebkkArtifact,
  LegendsaventurebkkCharacter,
} from '../types';

export const legendsaventurebkkIsArtifactUnlocked = (
  legendsaventurebkkArtifact: LegendsaventurebkkArtifact,
  legendsaventurebkkPoints: number,
) =>
  legendsaventurebkkPoints >=
  legendsaventurebkkArtifact.legendsaventurebkkPointsRequired;

export const legendsaventurebkkIsCharacterUnlocked = (
  legendsaventurebkkCharacter: LegendsaventurebkkCharacter,
  legendsaventurebkkTalesRead: number,
) =>
  legendsaventurebkkTalesRead >=
  legendsaventurebkkCharacter.legendsaventurebkkTalesRequired;
