import type {ImageSourcePropType} from 'react-native';

import type {JokeCategory, MythLocale} from '../../ExplorerMytthofTypes';

const categoryVisuals: Record<MythLocale, ImageSourcePropType> = {
  Greece: require('../../../elements/images/stories/greeceDelphi.png'),
  Egypt: require('../../../elements/images/stories/egyptFalcon.png'),
  India: require('../../../elements/images/stories/indiaMoonRiver.png'),
  Aztecs: require('../../../elements/images/stories/aztecsRedSky.png'),
};

const jokeRegionCodes: Record<MythLocale, string> = {
  Greece: '01',
  Egypt: '02',
  India: '03',
  Aztecs: '04',
};

const buildCategory = (
  localeTag: MythLocale,
  teaser: string,
  bodies: string[],
): JokeCategory => ({
  localeTag,
  coverVisual: categoryVisuals[localeTag],
  teaser,
  jokes: bodies.map((body, index) => ({
    jokeKey: `joke-${jokeRegionCodes[localeTag]}-${String(index + 1).padStart(2, '0')}`,
    localeTag,
    body,
  })),
});

export const jokeCategories: JokeCategory[] = [
  buildCategory(
    'Greece',
    'Heroes, oracles, and quiz timers',
    [
      'Greek heroes fought monsters. I panic when a quiz timer appears.',
      'I asked the oracle for wisdom… she suggested reading the instructions first.',
      'Ancient Greeks invented philosophy because someone had to explain why Zeus kept causing problems.',
      'I entered a Greek labyrinth confidently and left emotionally lost.',
      'Spartan training looked difficult, but have they tried answering mythology quizzes without hints?',
    ],
  ),
  buildCategory(
    'Egypt',
    'Pyramids, mummies, and hieroglyphs',
    [
      'Egyptian pyramids are proof that ancient people never believed in “small projects.”',
      'I opened a sarcophagus expecting treasure… instead I found thousands of years of dust.',
      'Ancient Egyptians loved cats so much they probably invented the first pet influencers.',
      'A mummy chase sounds exciting until you remember they never stop walking toward you.',
      'I tried reading hieroglyphs and accidentally ordered imaginary bread.',
    ],
  ),
  buildCategory(
    'India',
    'Legends, gurus, and sacred temples',
    [
      'Ancient Indian legends always begin peacefully and somehow end with magical chaos.',
      'I searched for enlightenment but got distracted by shiny artifacts.',
      'Mythology quizzes about India are hard because every legendary weapon sounds incredibly powerful.',
      'I followed a wise guru through the mountains… mostly because he seemed to know where lunch was.',
      'Every ancient kingdom has sacred temples. I still can’t find the correct story path on the first try.',
    ],
  ),
  buildCategory(
    'Aztecs',
    'Temples, artifacts, and jungle quests',
    [
      'Aztec temples have so many stairs that reaching the top already feels legendary.',
      'I found an ancient Aztec artifact and immediately wondered if it was cursed.',
      'Aztec warriors trained for battle. I train for choosing the least dangerous dialogue option.',
      'Ancient explorers crossed jungles bravely while I complain about low phone battery.',
      'I survived hidden traps, ancient riddles, and mythology quizzes… then lost all my points on the final question.',
    ],
  ),
];

export const resolveJoke = (jokeKey: string) => {
  for (const category of jokeCategories) {
    const match = category.jokes.find(j => j.jokeKey === jokeKey);
    if (match) {
      return match;
    }
  }
  return undefined;
};

export const resolveJokeCategory = (localeTag: MythLocale) =>
  jokeCategories.find(c => c.localeTag === localeTag);
