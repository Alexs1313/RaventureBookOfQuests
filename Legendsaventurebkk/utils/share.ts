import type {LegendsaventurebkkCharacter} from '../types';

const legendsaventurebkkAppName = 'Raventure: Book of Quests';

export const legendsaventurebkkPreviewText = (
  legendsaventurebkkHistory: string[],
  legendsaventurebkkMax = 120,
) => {
  const legendsaventurebkkText =
    legendsaventurebkkHistory[legendsaventurebkkHistory.length - 1] ?? '';
  if (legendsaventurebkkText.length <= legendsaventurebkkMax) {
    return legendsaventurebkkText;
  }
  return `${legendsaventurebkkText.slice(0, legendsaventurebkkMax).trim()}...`;
};

export const legendsaventurebkkShareMessage = (
  legendsaventurebkkTitle: string,
  legendsaventurebkkHistory: string[],
) =>
  `${legendsaventurebkkTitle}\n\n${legendsaventurebkkHistory.join('\n\n')}\n\n— ${legendsaventurebkkAppName}`;

export const legendsaventurebkkCharacterShareMessage = (
  legendsaventurebkkCharacter: LegendsaventurebkkCharacter,
) =>
  `${legendsaventurebkkCharacter.legendsaventurebkkName} (${legendsaventurebkkCharacter.legendsaventurebkkRegion})\n\n${legendsaventurebkkCharacter.legendsaventurebkkDescription}\n\n— ${legendsaventurebkkAppName}`;
