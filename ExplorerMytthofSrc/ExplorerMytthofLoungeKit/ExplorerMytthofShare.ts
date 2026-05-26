import type {FigureProfile} from '../ExplorerMytthofTypes';

const explorerMytthofShareAppTitle = 'Book of Explorer Myths';

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
  `${headline}\n\n${passageTrail.join('\n\n')}\n\n— ${explorerMytthofShareAppTitle}`;

export const composeFigureShare = (
  figure: FigureProfile,
) =>
  `${figure.displayName} (${figure.localeTag})\n\n${figure.synopsis}\n\n— ${explorerMytthofShareAppTitle}`;

export const composeJokeShare = (
  localeTag: string,
  body: string,
) => `${localeTag} Joke\n\n${body}\n\n— ${explorerMytthofShareAppTitle}`;

export const excerptFromJoke = (body: string, excerptLimit = 120) => {
  if (body.length <= excerptLimit) {
    return body;
  }
  return `${body.slice(0, excerptLimit).trim()}...`;
};
