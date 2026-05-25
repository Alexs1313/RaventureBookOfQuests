import type {FigureProfile} from '../types';

const shareAppTitle = 'Raventure: Book of Quests';

export const excerptFromTrail = (
  passageTrail: string[],
  excerptLimit = 120,
) => {
  const trailingPassage =
    passageTrail[passageTrail.length - 1] ?? '';
  if (trailingPassage.length <= excerptLimit) {
    return trailingPassage;
  }
  return `${trailingPassage.slice(0, excerptLimit).trim()}...`;
};

export const composeBookmarkShare = (
  headline: string,
  passageTrail: string[],
) =>
  `${headline}\n\n${passageTrail.join('\n\n')}\n\n— ${shareAppTitle}`;

export const composeFigureShare = (
  figure: FigureProfile,
) =>
  `${figure.displayName} (${figure.localeTag})\n\n${figure.synopsis}\n\n— ${shareAppTitle}`;
