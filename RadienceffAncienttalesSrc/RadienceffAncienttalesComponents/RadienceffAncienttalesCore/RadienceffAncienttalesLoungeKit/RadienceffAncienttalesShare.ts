import type {RadienceffAncienttalesFigureProfile} from '../RadienceffAncienttalesTypes';

const radienceffAncienttalesShareAppTitle = 'Radience of Ancient Tales';

export const radienceffAncienttalesExcerptFromTrail = (
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

export const radienceffAncienttalesComposeBookmarkShare = (
  headline: string,
  passageTrail: string[],
) =>
  `${headline}\n\n${passageTrail.join('\n\n')}\n\n— ${radienceffAncienttalesShareAppTitle}`;

export const radienceffAncienttalesComposeFigureShare = (
  figure: RadienceffAncienttalesFigureProfile,
) =>
  `${figure.displayName} (${figure.localeTag})\n\n${figure.synopsis}\n\n— ${radienceffAncienttalesShareAppTitle}`;

export const radienceffAncienttalesComposeJokeShare = (
  localeTag: string,
  body: string,
) => `${localeTag} Joke\n\n${body}\n\n— ${radienceffAncienttalesShareAppTitle}`;

export const radienceffAncienttalesExcerptFromJoke = (body: string, excerptLimit = 120) => {
  if (body.length <= excerptLimit) {
    return body;
  }
  return `${body.slice(0, excerptLimit).trim()}...`;
};
