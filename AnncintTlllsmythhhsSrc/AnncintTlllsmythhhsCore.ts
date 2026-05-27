import AsyncStorage from '@react-native-async-storage/async-storage';

import {Easing} from 'react-native';

import type {ImageSourcePropType} from 'react-native';

export const anncintTlllsmythhhsColors = {
  gold: '#DAA520',
  accent: '#D4763E',
  accentLight: '#FF9F40',
  accentAlt: '#F39340',
  text: '#D4A574',
  textDark: '#0F0804',
  textMuted: 'rgba(212, 165, 116, 0.7)',
  textMutedLight: 'rgba(212, 165, 116, 0.8)',
  textMutedSoft: 'rgba(212, 165, 116, 0.6)',
  textMutedFaint: 'rgba(212, 165, 116, 0.5)',
  textMutedDim: 'rgba(212, 165, 116, 0.4)',
  textOnboarding: 'rgba(212, 165, 116, 0.9)',
  background: '#0A0A0A',
  surface: '#2A1810',
  tabBar: '#3D2013',
  tabBarBorder: '#D4763E33',
  card: 'rgba(90, 58, 36, 0.21)',
  cardMedium: 'rgba(90, 58, 36, 0.3)',
  cardStrong: 'rgba(90, 58, 36, 0.4)',
  cardOverlay: 'rgba(90, 58, 36, 0.5)',
  cardLocked: 'rgba(90, 58, 36, 0.2)',
  cardCharacter: 'rgba(90, 58, 36, 0.31)',
  border: 'rgba(212, 118, 62, 0.2)',
  borderMedium: 'rgba(212, 118, 62, 0.3)',
  borderStrong: 'rgba(212, 118, 62, 0.1)',
  borderLight: 'rgba(212, 117, 62, 0.12)',
  badge: 'rgba(212, 118, 62, 0.9)',
  badgeMuted: 'rgba(212, 165, 116, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayDark: 'rgba(0, 0, 0, 0.5)',
  overlayModal: 'rgba(26, 15, 10, 0.6)',
  overlayModalDark: 'rgba(26, 15, 10, 0.7)',
  journey: 'rgba(218, 165, 32, 0.15)',
  journeyBorder: 'rgba(218, 165, 32, 0.3)',
  tabActive: '#1A0F0A',
  tabIdle: '#D4A57499',
  success: '#15FF00',
  error: '#FF0000',
  danger: '#8B1A1A',
  dangerBg: 'rgba(139, 26, 26, 0.3)',
  dangerBorder: 'rgba(139, 26, 26, 0.4)',
  shareBorder: '#FA9A40',
  brown: '#5A3A24',
  brownMuted: '#5A3A2480',
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const anncintTlllsmythhhsGradients = {
  primary: [
    anncintTlllsmythhhsColors.accent,
    anncintTlllsmythhhsColors.accentLight,
  ],
  primaryAlt: [
    anncintTlllsmythhhsColors.accent,
    anncintTlllsmythhhsColors.accentAlt,
  ],
  danger: [anncintTlllsmythhhsColors.danger, 'rgba(139,26,26,0.8)'],
  storyCard: ['rgba(0,0,0,0)', 'rgba(23,11,6,0.71)', 'rgba(42,24,16,1)'],
  storyHero: ['rgba(0,0,0,0)', 'rgba(32,17,11,0.86)', 'rgba(42,24,16,1)'],
  savedCard: ['rgba(0,0,0,0)', 'rgba(32,17,11,0.86)', 'rgba(42,24,16,1)'],
  onboarding: ['rgba(0, 0, 0, 0)', 'rgba(42, 24, 16, 0.6)', '#1A0F0A'],
};

export const anncintTlllsmythhhsGradientAxis = {
  horizontal: {start: {x: 0, y: 0.5}, end: {x: 1, y: 0.5}},
} as const;

export const anncintTlllsmythhhsSpacing = {
  layoutPaddingX: 24.1,
  layoutPaddingTop: 70.2,
  layoutPaddingBottom: 32.3,
  tabPaddingTop: 32.5,
  tabPaddingBottom: 100.1,
  tabBarPaddingTop: 10.4,
  tabBarPaddingX: 8.2,
  tabBarHeight: 56.2,
  tabBarMinInset: 12.3,
  gridGap: 12.3,
  cardPadding: 24.4,
} as const;

export const anncintTlllsmythhhsTypography = {
  screenTitle: {
    color: anncintTlllsmythhhsColors.gold,
    fontSize: 48.1,
    fontWeight: '500' as const,
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  screenTitleCompact: {
    color: anncintTlllsmythhhsColors.gold,
    fontSize: 46.2,
    fontWeight: '500' as const,
    lineHeight: 48.3,
    marginBottom: 8.1,
    marginTop: 25.5,
  },
  screenSubtitle: {
    color: anncintTlllsmythhhsColors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  screenProgress: {
    color: anncintTlllsmythhhsColors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  sectionTitle: {
    color: anncintTlllsmythhhsColors.gold,
    fontSize: 24.2,
    fontWeight: '500' as const,
    lineHeight: 32.3,
    marginBottom: 16.4,
  },
  sectionTitleMuted: {
    color: anncintTlllsmythhhsColors.textMutedFaint,
    fontSize: 24.5,
    fontWeight: '500' as const,
    lineHeight: 32.1,
    marginBottom: 16.2,
  },
  regionBadge: {
    color: anncintTlllsmythhhsColors.textDark,
    fontSize: 14.4,
  },
  cardTitle: {
    color: anncintTlllsmythhhsColors.gold,
    fontSize: 20.3,
    fontWeight: '500' as const,
    lineHeight: 28.4,
  },
  cardBody: {
    color: anncintTlllsmythhhsColors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
};

export type AnncintTlllsmythhhsRelicProfile = {
  entryKey: string;
  localeTag: AnncintTlllsmythhhsMythLocale;
  displayName: string;
  synopsis: string;
  coverVisual: ImageSourcePropType;
  insightsThreshold: number;
};

export type AnncintTlllsmythhhsFigureProfile = {
  entryKey: string;
  localeTag: AnncintTlllsmythhhsMythLocale;
  displayName: string;
  synopsis: string;
  coverVisual: ImageSourcePropType;
  chroniclesThreshold: number;
};

export type AnncintTlllsmythhhsJokeEntry = {
  jokeKey: string;
  localeTag: AnncintTlllsmythhhsMythLocale;
  body: string;
};

export type AnncintTlllsmythhhsJokeCategory = {
  localeTag: AnncintTlllsmythhhsMythLocale;
  coverVisual: ImageSourcePropType;
  teaser: string;
  jokes: AnncintTlllsmythhhsJokeEntry[];
};

export type AnncintTlllsmythhhsSavedJokePayload = {
  jokeKey: string;
  storedAt: number;
};

export type AnncintTlllsmythhhsSavedJokeDisplay =
  AnncintTlllsmythhhsSavedJokePayload & {
    headline: string;
    localeTag: AnncintTlllsmythhhsMythLocale;
    body: string;
    coverVisual: ImageSourcePropType;
  };

export type AnncintTlllsmythhhsTrialPrompt = {
  entryKey: string;
  promptStem: string;
  responseChoices: string[];
  keyedResponse: string;
  coverVisual: ImageSourcePropType;
};

export type AnncintTlllsmythhhsBookmarkPayload = {
  entryKey: string;
  passageTrail: string[];
  storedAt: number;
};

export type AnncintTlllsmythhhsBookmarkDisplay =
  AnncintTlllsmythhhsBookmarkPayload & {
    headline: string;
    localeTag: string;
    coverVisual: import('react-native').ImageSourcePropType;
  };

export type AnncintTlllsmythhhsMythLocale =
  | 'Greece'
  | 'Egypt'
  | 'India'
  | 'Aztecs';

export type AnncintTlllsmythhhsBranchOption = {
  optionCaption: string;
  onwardKey: string;
};

export type AnncintTlllsmythhhsPassageNode = {
  insertedPassage?: string;
  promptStem?: string;
  branchOptions?: AnncintTlllsmythhhsBranchOption[];
  closesPassage?: boolean;
};

export type AnncintTlllsmythhhsChronicleEntry = {
  entryKey: string;
  localeTag: AnncintTlllsmythhhsMythLocale;
  headline: string;
  synopsis: string;
  openingPassage: string;
  coverVisual: ImageSourcePropType;
  passageMap: Record<string, AnncintTlllsmythhhsPassageNode>;
};

export type AnncintTlllsmythhhsBranchScript = {
  forkCaption: string;
  interludePassage: string;
  secondForkA: string;
  secondForkB: string;
  finalePassageA: string;
  finalePassageB: string;
};

export type AnncintTlllsmythhhsTrialPhase = 'intro' | 'active' | 'finished';

export type AnncintTlllsmythhhsChroniclePhase = 'catalog' | 'reading';

export type AnncintTlllsmythhhsHeritageSite = {
  siteKey: string;
  siteName: string;
  localeTag: AnncintTlllsmythhhsMythLocale;
  synopsis: string;
  entryKey: string;
  latitude: number;
  longitude: number;
};

export type AnncintTlllsmythhhsBookmarkPhase = 'shelf' | 'passage' | 'joke';

export type AnncintTlllsmythhhsJokesPhase = 'catalog' | 'detail';

export const anncintTlllsmythhhsFormatUnitLabel = (
  unitCount: number,
  singularUnit: string,
  pluralUnit: string,
) => (unitCount === 1 ? `1 ${singularUnit}` : `${unitCount} ${pluralUnit}`);

const anncintTlllsmythhhsShareAppTitle = 'Radience of Ancient Tales';

export const anncintTlllsmythhhsExcerptFromTrail = (
  passageTrail: string[],
  excerptLimit = 120,
) => {
  const trailingPassage = passageTrail[passageTrail.length - 1] ?? '';
  if (trailingPassage.length <= excerptLimit) {
    return trailingPassage;
  }
  return `${trailingPassage.slice(0, excerptLimit).trim()}...`;
};

export const anncintTlllsmythhhsComposeBookmarkShare = (
  headline: string,
  passageTrail: string[],
) =>
  `${headline}\n\n${passageTrail.join(
    '\n\n',
  )}\n\n— ${anncintTlllsmythhhsShareAppTitle}`;

export const anncintTlllsmythhhsComposeFigureShare = (
  figure: AnncintTlllsmythhhsFigureProfile,
) =>
  `${figure.displayName} (${figure.localeTag})\n\n${figure.synopsis}\n\n— ${anncintTlllsmythhhsShareAppTitle}`;

export const anncintTlllsmythhhsComposeJokeShare = (
  localeTag: string,
  body: string,
) => `${localeTag} Joke\n\n${body}\n\n— ${anncintTlllsmythhhsShareAppTitle}`;

export const anncintTlllsmythhhsExcerptFromJoke = (
  body: string,
  excerptLimit = 120,
) => {
  if (body.length <= excerptLimit) {
    return body;
  }
  return `${body.slice(0, excerptLimit).trim()}...`;
};

export const anncintTlllsmythhhsRelicIsAccessible = (
  relicProfile: AnncintTlllsmythhhsRelicProfile,
  insightBalance: number,
) => insightBalance >= relicProfile.insightsThreshold;

export const anncintTlllsmythhhsFigureIsAccessible = (
  figure: AnncintTlllsmythhhsFigureProfile,
  chroniclesConsumed: number,
) => chroniclesConsumed >= figure.chroniclesThreshold;

export const anncintTlllsmythhhsSeededReorder = <T>(poolItems: T[]): T[] => {
  const poolCopy = [...poolItems];
  let mixSeed = Date.now();

  const rollUnit = () => {
    mixSeed = (mixSeed * 1103515245 + 12345) & 0x7fffffff;
    return mixSeed / 0x7fffffff;
  };

  for (
    let cursorIndex = poolCopy.length - 1;
    cursorIndex > 0;
    cursorIndex -= 1
  ) {
    const pickIndex = Math.floor(rollUnit() * (cursorIndex + 1));
    [poolCopy[cursorIndex], poolCopy[pickIndex]] = [
      poolCopy[pickIndex],
      poolCopy[cursorIndex],
    ];
  }

  return poolCopy;
};

const taleEntryKeyAliases: Record<string, string> = {
  'greece-delphi': 'tale-01',
  'egypt-falcon': 'tale-02',
  'india-moon-river': 'tale-03',
  'aztecs-red-sky': 'tale-04',
  'greece-shipwreck': 'tale-05',
  'egypt-obsidian-gate': 'tale-06',
  'india-tiger-temple': 'tale-07',
  'aztecs-underground-city': 'tale-08',
  'greece-silver-harp': 'tale-09',
  'egypt-moon-tomb': 'tale-10',
  'india-emerald-palace': 'tale-11',
  'aztecs-golden-eclipse': 'tale-12',
};

const figureEntryKeyAliases: Record<string, string> = {
  athena: 'figure-01',
  poseidon: 'figure-02',
  anubis: 'figure-03',
  isis: 'figure-04',
  shiva: 'figure-05',
  hanuman: 'figure-06',
  quetzalcoatl: 'figure-07',
  tezcatlipoca: 'figure-08',
};

const relicEntryKeyAliases: Record<string, string> = {
  'solar-guardian-wings': 'relic-01',
  'scarab-eternal-sands': 'relic-02',
  'circle-of-shiva': 'relic-03',
  'guardian-ganesha': 'relic-04',
  'owl-of-athena': 'relic-05',
  'spartan-war-helm': 'relic-06',
  'sun-calendar-disc': 'relic-07',
  'serpent-of-eclipse': 'relic-08',
};

const jokeKeyAliases: Record<string, string> = {
  'greece-1': 'joke-01-01',
  'greece-2': 'joke-01-02',
  'greece-3': 'joke-01-03',
  'greece-4': 'joke-01-04',
  'greece-5': 'joke-01-05',
  'egypt-1': 'joke-02-01',
  'egypt-2': 'joke-02-02',
  'egypt-3': 'joke-02-03',
  'egypt-4': 'joke-02-04',
  'egypt-5': 'joke-02-05',
  'india-1': 'joke-03-01',
  'india-2': 'joke-03-02',
  'india-3': 'joke-03-03',
  'india-4': 'joke-03-04',
  'india-5': 'joke-03-05',
  'aztecs-1': 'joke-04-01',
  'aztecs-2': 'joke-04-02',
  'aztecs-3': 'joke-04-03',
  'aztecs-4': 'joke-04-04',
  'aztecs-5': 'joke-04-05',
};

const promptEntryKeyAliases: Record<string, string> = {
  'delphi-1': 'prompt-001',
  'delphi-2': 'prompt-002',
  'delphi-3': 'prompt-003',
  'delphi-4': 'prompt-004',
  'falcon-1': 'prompt-005',
  'falcon-2': 'prompt-006',
  'falcon-3': 'prompt-007',
  'falcon-4': 'prompt-008',
  'moon-river-1': 'prompt-009',
  'moon-river-2': 'prompt-010',
  'moon-river-3': 'prompt-011',
  'moon-river-4': 'prompt-012',
  'red-sky-1': 'prompt-013',
  'red-sky-2': 'prompt-014',
  'red-sky-3': 'prompt-015',
  'red-sky-4': 'prompt-016',
  'poseidon-1': 'prompt-017',
  'poseidon-2': 'prompt-018',
  'poseidon-3': 'prompt-019',
  'poseidon-4': 'prompt-020',
  'obsidian-1': 'prompt-021',
  'obsidian-2': 'prompt-022',
  'obsidian-3': 'prompt-023',
  'obsidian-4': 'prompt-024',
  'tiger-1': 'prompt-025',
  'tiger-2': 'prompt-026',
  'tiger-3': 'prompt-027',
  'tiger-4': 'prompt-028',
  'jungle-1': 'prompt-029',
  'jungle-2': 'prompt-030',
  'jungle-3': 'prompt-031',
  'jungle-4': 'prompt-032',
  'harp-1': 'prompt-033',
  'harp-2': 'prompt-034',
  'harp-3': 'prompt-035',
  'harp-4': 'prompt-036',
  'alexandria-1': 'prompt-037',
  'alexandria-2': 'prompt-038',
  'alexandria-3': 'prompt-039',
  'alexandria-4': 'prompt-040',
  'elephant-1': 'prompt-041',
  'elephant-2': 'prompt-042',
  'elephant-3': 'prompt-043',
  'elephant-4': 'prompt-044',
  'eclipse-1': 'prompt-045',
  'eclipse-2': 'prompt-046',
  'eclipse-3': 'prompt-047',
  'eclipse-4': 'prompt-048',
};

const resolveAlias = (key: string, aliases: Record<string, string>) =>
  aliases[key] ?? key;

export const anncintTlllsmythhhsNormalizeTaleEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, taleEntryKeyAliases);

export const anncintTlllsmythhhsNormalizeFigureEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, figureEntryKeyAliases);

export const anncintTlllsmythhhsNormalizeRelicEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, relicEntryKeyAliases);

export const anncintTlllsmythhhsNormalizeJokeKey = (jokeKey: string) =>
  resolveAlias(jokeKey, jokeKeyAliases);

export const anncintTlllsmythhhsNormalizePromptEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, promptEntryKeyAliases);

export const anncintTlllsmythhhsNormalizeStoredTaleKeys = (
  entryKeys: string[],
) => [...new Set(entryKeys.map(anncintTlllsmythhhsNormalizeTaleEntryKey))];

export const anncintTlllsmythhhsAnimationDurations = {
  fast: 200,
  normal: 350,
  slow: 500,
} as const;

export const anncintTlllsmythhhsAnimationDelays = {
  stagger: 70,
  short: 40,
} as const;

export const anncintTlllsmythhhsAnimationEasing = {
  out: Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
} as const;

export const anncintTlllsmythhhsStaggerDelay = (
  index: number,
  step = anncintTlllsmythhhsAnimationDelays.stagger,
) => index * step;

export const anncintTlllsmythhhsMediaRegistry = {
  backgrounds: {
    app: require('../elements/images/anncintTlllsmythhhs_app_main_background.png'),
    loader: require('../elements/images/anncintTlllsmythhhs_boot_screen_background.png'),
  },
  icons: {
    back: require('../elements/images/anncintTlllsmythhhs_nav_back_arrow.png'),
    share: require('../elements/images/anncintTlllsmythhhs_action_share_glyph.png'),
    shareButton: require('../elements/images/anncintTlllsmythhhs_share_action_button.png'),
    delete: require('../elements/images/anncintTlllsmythhhs_action_remove_glyph.png'),
    close: require('../elements/images/anncintTlllsmythhhs_nav_close_glyph.png'),
    lock: require('../elements/images/anncintTlllsmythhhs_ui_sealed_glyph.png'),
  },
  tabs: {
    tales: require('../elements/images/anncintTlllsmythhhs_tab_chronicles_icon.png'),
    map: require('../elements/images/anncintTlllsmythhhs_tab_figures_icon.png'),
    saved: require('../elements/images/anncintTlllsmythhhs_tab_bookmarks_icon.png'),
    quiz: require('../elements/images/anncintTlllsmythhhs_tab_study_icon.png'),
    artifacts: require('../elements/images/anncintTlllsmythhhs_tab_relics_icon.png'),
    jokes: require('../elements/images/anncintTlllsmythhhs_tab_study_icon.png'),
  },
  saved: {
    empty: require('../elements/images/anncintTlllsmythhhs_bookmark_empty_state.png'),
  },
  quiz: {
    complete: require('../elements/images/anncintTlllsmythhhs_study_finished_banner.png'),
    hero: require('../elements/images/anncintTlllsmythhhs_study_intro_scene.png'),
  },
} as const;

export const anncintTlllsmythhhsRelicCatalog: AnncintTlllsmythhhsRelicProfile[] =
  [
    {
      entryKey: 'relic-01',
      localeTag: 'Egypt',
      displayName: 'Solar Guardian Wings',
      synopsis:
        'An ancient ceremonial statue symbolizing protection and solar power. Priests believed its wings guided lost travelers through sacred desert temples.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_egypt_solar_wings.png'),
      insightsThreshold: 0,
    },
    {
      entryKey: 'relic-02',
      localeTag: 'Egypt',
      displayName: 'Scarab of Eternal Sands',
      synopsis:
        'A mystical scarab amulet connected to rebirth and ancient knowledge. According to legends, it revealed forgotten paths beneath buried ruins.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_egypt_scarab_relic.png'),
      insightsThreshold: 10,
    },
    {
      entryKey: 'relic-03',
      localeTag: 'India',
      displayName: 'Circle of Shiva',
      synopsis:
        'A sacred artifact representing cosmic balance and eternal movement. Ancient dancers once performed rituals around this symbol during lunar celebrations.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_india_shiva_wheel.png'),
      insightsThreshold: 0,
    },
    {
      entryKey: 'relic-04',
      localeTag: 'India',
      displayName: 'Guardian Ganesha',
      synopsis:
        'A stone figure believed to remove obstacles from dangerous journeys. Travelers carried similar statues for wisdom and protection during long expeditions.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_india_ganesha_statue.png'),
      insightsThreshold: 20,
    },
    {
      entryKey: 'relic-05',
      localeTag: 'Greece',
      displayName: 'Owl of Athena',
      synopsis:
        'A symbol of wisdom and strategy connected to the goddess Athena. Scholars believed the owl protected forgotten libraries and buried scrolls.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_greece_wisdom_owl.png'),
      insightsThreshold: 0,
    },
    {
      entryKey: 'relic-06',
      localeTag: 'Greece',
      displayName: 'Spartan War Helm',
      synopsis:
        'An ancient battle helmet inspired by legendary Greek warriors. It became a symbol of courage, discipline, and survival during great battles.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_greece_bronze_helm.png'),
      insightsThreshold: 10,
    },
    {
      entryKey: 'relic-07',
      localeTag: 'Aztecs',
      displayName: 'Sun Calendar Disc',
      synopsis:
        'A ceremonial stone disc used to track celestial cycles and sacred rituals. Priests studied its symbols to predict important seasonal events.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_mesoamerica_solar_disc.png'),
      insightsThreshold: 0,
    },
    {
      entryKey: 'relic-08',
      localeTag: 'Aztecs',
      displayName: 'Serpent of the Eclipse',
      synopsis:
        'A powerful serpent artifact connected to eclipses and divine transformation. Ancient legends described it as a guardian between the worlds of gods and mortals.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_mesoamerica_eclipse_serpent.png'),
      insightsThreshold: 20,
    },
  ];

export const anncintTlllsmythhhsFigureCatalog: AnncintTlllsmythhhsFigureProfile[] =
  [
    {
      entryKey: 'figure-01',
      localeTag: 'Greece',
      displayName: 'Athena',
      synopsis:
        'Greek goddess of wisdom, strategy, and heroic thinking. Ancient warriors and explorers believed Athena guided them during dangerous journeys and important decisions.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_greece_athena_figure.png'),
      chroniclesThreshold: 0,
    },
    {
      entryKey: 'figure-02',
      localeTag: 'Greece',
      displayName: 'Poseidon',
      synopsis:
        'Ruler of the seas and storms in Greek mythology. Sailors feared and respected Poseidon, believing he controlled the oceans and powerful waves.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_greece_sea_lord.png'),
      chroniclesThreshold: 3,
    },
    {
      entryKey: 'figure-03',
      localeTag: 'Egypt',
      displayName: 'Anubis',
      synopsis:
        'Guardian of tombs and guide of lost souls in ancient Egyptian mythology. Anubis was believed to protect sacred chambers and safely lead spirits through the afterlife.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_egypt_anubis_figure.png'),
      chroniclesThreshold: 0,
    },
    {
      entryKey: 'figure-04',
      localeTag: 'Egypt',
      displayName: 'Isis',
      synopsis:
        'A powerful goddess connected to healing, wisdom, and protection. Legends describe Isis as a guardian of ancient knowledge and sacred lore.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_egypt_isis_figure.png'),
      chroniclesThreshold: 5,
    },
    {
      entryKey: 'figure-05',
      localeTag: 'India',
      displayName: 'Shiva',
      synopsis:
        'One of the most important figures in Indian mythology, symbolizing transformation and balance. Shiva is often associated with cosmic energy, meditation, and spiritual power.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_india_shiva_figure.png'),
      chroniclesThreshold: 7,
    },
    {
      entryKey: 'figure-06',
      localeTag: 'India',
      displayName: 'Hanuman',
      synopsis:
        'A legendary warrior known for loyalty, courage, and incredible strength. Stories describe Hanuman traveling across kingdoms to protect allies and overcome impossible challenges.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_india_hanuman_figure.png'),
      chroniclesThreshold: 0,
    },
    {
      entryKey: 'figure-07',
      localeTag: 'Aztecs',
      displayName: 'Quetzalcoatl',
      synopsis:
        'The feathered serpent deity connected to wisdom, creation, and knowledge. Ancient stories describe Quetzalcoatl as a bringer of learning and civilization.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_mesoamerica_feather_serpent.png'),
      chroniclesThreshold: 0,
    },
    {
      entryKey: 'figure-08',
      localeTag: 'Aztecs',
      displayName: 'Tezcatlipoca',
      synopsis:
        'A mysterious and powerful figure associated with destiny, night, and unspoken truths. Legends say he could see into the hearts of warriors and rulers alike.',
      coverVisual: require('../elements/images/anncintTlllsmythhhs_mesoamerica_night_sky.png'),
      chroniclesThreshold: 9,
    },
  ];

const categoryVisuals: Record<
  AnncintTlllsmythhhsMythLocale,
  ImageSourcePropType
> = {
  Greece: require('../elements/images/anncintTlllsmythhhs_greece_oracle_temple.png'),
  Egypt: require('../elements/images/anncintTlllsmythhhs_egypt_falcon_shrine.png'),
  India: require('../elements/images/anncintTlllsmythhhs_india_moonlit_river.png'),
  Aztecs: require('../elements/images/anncintTlllsmythhhs_mesoamerica_crimson_dusk.png'),
};

const jokeRegionCodes: Record<AnncintTlllsmythhhsMythLocale, string> = {
  Greece: '01',
  Egypt: '02',
  India: '03',
  Aztecs: '04',
};

const buildCategory = (
  localeTag: AnncintTlllsmythhhsMythLocale,
  teaser: string,
  bodies: string[],
): AnncintTlllsmythhhsJokeCategory => ({
  localeTag,
  coverVisual: categoryVisuals[localeTag],
  teaser,
  jokes: bodies.map((body, index) => ({
    jokeKey: `joke-${jokeRegionCodes[localeTag]}-${String(index + 1).padStart(
      2,
      '0',
    )}`,
    localeTag,
    body,
  })),
});

export const anncintTlllsmythhhsJokeCategories: AnncintTlllsmythhhsJokeCategory[] =
  [
    buildCategory('Greece', 'Heroes, oracles, and quiz timers', [
      'Greek heroes fought monsters. I panic when a quiz timer appears.',
      'I asked the oracle for wisdom… she suggested reading the instructions first.',
      'Ancient Greeks invented philosophy because someone had to explain why Zeus kept causing problems.',
      'I entered a Greek labyrinth confidently and left emotionally lost.',
      'Spartan training looked difficult, but have they tried answering mythology quizzes without hints?',
    ]),
    buildCategory('Egypt', 'Pyramids, mummies, and hieroglyphs', [
      'Egyptian pyramids are proof that ancient people never believed in “small projects.”',
      'I opened a sarcophagus expecting treasure… instead I found thousands of years of dust.',
      'Ancient Egyptians loved cats so much they probably invented the first pet influencers.',
      'A mummy chase sounds exciting until you remember they never stop walking toward you.',
      'I tried reading hieroglyphs and accidentally ordered imaginary bread.',
    ]),
    buildCategory('India', 'Legends, gurus, and sacred temples', [
      'Ancient Indian legends always begin peacefully and somehow end with magical chaos.',
      'I searched for enlightenment but got distracted by shiny artifacts.',
      'Mythology quizzes about India are hard because every legendary weapon sounds incredibly powerful.',
      'I followed a wise guru through the mountains… mostly because he seemed to know where lunch was.',
      'Every ancient kingdom has sacred temples. I still can’t find the correct story path on the first try.',
    ]),
    buildCategory('Aztecs', 'Temples, artifacts, and jungle quests', [
      'Aztec temples have so many stairs that reaching the top already feels legendary.',
      'I found an ancient Aztec artifact and immediately wondered if it was cursed.',
      'Aztec warriors trained for battle. I train for choosing the least dangerous dialogue option.',
      'Ancient explorers crossed jungles bravely while I complain about low phone battery.',
      'I survived hidden traps, ancient riddles, and mythology quizzes… then missed the last quiz question.',
    ]),
  ];

export const anncintTlllsmythhhsResolveJoke = (jokeKey: string) => {
  for (const category of anncintTlllsmythhhsJokeCategories) {
    const match = category.jokes.find(j => j.jokeKey === jokeKey);
    if (match) {
      return match;
    }
  }
  return undefined;
};

export const anncintTlllsmythhhsResolveJokeCategory = (
  localeTag: AnncintTlllsmythhhsMythLocale,
) => anncintTlllsmythhhsJokeCategories.find(c => c.localeTag === localeTag);

export const anncintTlllsmythhhsTrialRoundCount = 10;

const trialVisuals: ImageSourcePropType[] = [
  require('../elements/images/anncintTlllsmythhhs_greece_oracle_temple.png'),
  require('../elements/images/anncintTlllsmythhhs_egypt_falcon_shrine.png'),
  require('../elements/images/anncintTlllsmythhhs_india_moonlit_river.png'),
  require('../elements/images/anncintTlllsmythhhs_mesoamerica_crimson_dusk.png'),
  require('../elements/images/anncintTlllsmythhhs_greece_coastal_wreck.png'),
  require('../elements/images/anncintTlllsmythhhs_egypt_obsidian_arch.png'),
  require('../elements/images/anncintTlllsmythhhs_india_temple_grove.png'),
  require('../elements/images/anncintTlllsmythhhs_mesoamerica_underground_city.png'),
  require('../elements/images/anncintTlllsmythhhs_greece_silver_lyre.png'),
  require('../elements/images/anncintTlllsmythhhs_egypt_moon_chamber.png'),
  require('../elements/images/anncintTlllsmythhhs_india_emerald_court.png'),
  require('../elements/images/anncintTlllsmythhhs_mesoamerica_amber_eclipse.png'),
];

const assembleTrialPrompt = (
  entryKey: string,
  visualIndex: number,
  promptStem: string,
  responseChoices: string[],
  keyedResponse: string,
): AnncintTlllsmythhhsTrialPrompt => ({
  entryKey,
  promptStem,
  responseChoices,
  keyedResponse,
  coverVisual: trialVisuals[visualIndex],
});

const trialPromptPool: AnncintTlllsmythhhsTrialPrompt[] = [
  assembleTrialPrompt(
    'prompt-001',
    0,
    'Which civilization is connected to the Temple Beneath Delphi?',
    ['Greece', 'Egypt', 'India', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-002',
    0,
    'Which culture used the oracle temples from the story?',
    ['Greece', 'India', 'Egypt', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-003',
    0,
    'Which civilization inspired the underground library beneath the mountain?',
    ['Greece', 'Aztecs', 'Egypt', 'India'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-004',
    0,
    'Which culture is connected to the laurel crown artifact?',
    ['Greece', 'Egypt', 'India', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-005',
    1,
    'Which civilization appears in Chamber of the Sun Falcon?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-006',
    1,
    'Which culture built chambers beneath desert sands?',
    ['Egypt', 'India', 'Greece', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-007',
    1,
    'Which civilization used falcon symbolism in the story?',
    ['Egypt', 'Aztecs', 'Greece', 'India'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-008',
    1,
    'Which culture inspired the royal burial chamber?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-009',
    2,
    'Which civilization appears in Palace of the Moon River?',
    ['India', 'Greece', 'Egypt', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-010',
    2,
    'Which culture inspired the glowing jungle palace?',
    ['India', 'Egypt', 'Greece', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-011',
    2,
    'Which civilization is connected to sacred rivers and moon ceremonies?',
    ['India', 'Aztecs', 'Greece', 'Egypt'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-012',
    2,
    'Which culture inspired the submerged temple behind waterfalls?',
    ['India', 'Egypt', 'Greece', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-013',
    3,
    'Which civilization built the Pyramid of the Red Sky?',
    ['Aztecs', 'Greece', 'Egypt', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-014',
    3,
    'Which culture inspired the giant calendar stone?',
    ['Aztecs', 'India', 'Greece', 'Egypt'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-015',
    3,
    'Which civilization appears in the jungle pyramid story?',
    ['Aztecs', 'Egypt', 'Greece', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-016',
    3,
    'Which culture is connected to the crimson sky prophecy?',
    ['Aztecs', 'Greece', 'Egypt', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-017',
    4,
    'Which mythology inspired Shipwreck of Poseidon?',
    ['Greece', 'Egypt', 'India', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-018',
    4,
    'Which civilization is connected to Poseidon?',
    ['Greece', 'Aztecs', 'India', 'Egypt'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-019',
    4,
    'Which culture inspired the sea cave ruins?',
    ['Greece', 'Egypt', 'India', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-020',
    4,
    'Which civilization used trident symbolism in the story?',
    ['Greece', 'India', 'Egypt', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-021',
    5,
    'Which civilization appears in Obsidian Gate?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-022',
    5,
    'Which culture inspired the buried desert city?',
    ['Egypt', 'India', 'Greece', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-023',
    5,
    'Which civilization used giant stone tomb entrances in the story?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-024',
    5,
    'Which culture inspired the underground oasis temples?',
    ['Egypt', 'Aztecs', 'Greece', 'India'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-025',
    6,
    'Which civilization inspired Tiger Temple of Jaipur?',
    ['India', 'Egypt', 'Greece', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-026',
    6,
    'Which culture is connected to tiger guardian legends?',
    ['India', 'Greece', 'Egypt', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-027',
    6,
    'Which civilization appears in the desert temple story?',
    ['India', 'Egypt', 'Greece', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-028',
    6,
    'Which culture inspired the royal festival murals?',
    ['India', 'Greece', 'Egypt', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-029',
    7,
    'Which civilization appears in City Beneath the Jungle?',
    ['Aztecs', 'Greece', 'Egypt', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-030',
    7,
    'Which culture inspired the underground jungle city?',
    ['Aztecs', 'Egypt', 'Greece', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-031',
    7,
    'Which civilization used giant ceremonial sun discs in the story?',
    ['Aztecs', 'Greece', 'India', 'Egypt'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-032',
    7,
    'Which culture inspired the buried jungle arena?',
    ['Aztecs', 'Egypt', 'Greece', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-033',
    8,
    'Which mythology inspired Cave of the Silver Harp?',
    ['Greece', 'Egypt', 'India', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-034',
    8,
    'Which civilization appears in the island cave story?',
    ['Greece', 'Aztecs', 'India', 'Egypt'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-035',
    8,
    'Which culture inspired the underground musical chamber?',
    ['Greece', 'India', 'Egypt', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-036',
    8,
    'Which civilization is connected to the silver harp artifact?',
    ['Greece', 'Egypt', 'India', 'Aztecs'],
    'Greece',
  ),
  assembleTrialPrompt(
    'prompt-037',
    9,
    'Which civilization appears in Moon Tomb of Alexandria?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-038',
    9,
    'Which culture inspired the moon observatory beneath the ruins?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-039',
    9,
    'Which civilization used star and moon symbolism in the story?',
    ['Egypt', 'India', 'Greece', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-040',
    9,
    'Which culture inspired the underground harbor tunnels?',
    ['Egypt', 'Greece', 'India', 'Aztecs'],
    'Egypt',
  ),
  assembleTrialPrompt(
    'prompt-041',
    10,
    'Which civilization inspired Emerald Elephant Palace?',
    ['India', 'Greece', 'Egypt', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-042',
    10,
    'Which culture is connected to giant elephant statues?',
    ['India', 'Egypt', 'Greece', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-043',
    10,
    'Which civilization appears in the flooded palace story?',
    ['India', 'Aztecs', 'Egypt', 'Greece'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-044',
    10,
    'Which culture inspired the buried jungle sanctuary?',
    ['India', 'Greece', 'Egypt', 'Aztecs'],
    'India',
  ),
  assembleTrialPrompt(
    'prompt-045',
    11,
    'Which civilization inspired Temple of the Golden Eclipse?',
    ['Aztecs', 'Greece', 'Egypt', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-046',
    11,
    'Which culture appears in the mountain eclipse temple story?',
    ['Aztecs', 'Egypt', 'Greece', 'India'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-047',
    11,
    'Which civilization used giant eclipse symbols in the story?',
    ['Aztecs', 'Greece', 'India', 'Egypt'],
    'Aztecs',
  ),
  assembleTrialPrompt(
    'prompt-048',
    11,
    'Which culture inspired the buried observatory chamber?',
    ['Aztecs', 'Egypt', 'Greece', 'India'],
    'Aztecs',
  ),
];

export const anncintTlllsmythhhsSampleTrialPrompts = () =>
  anncintTlllsmythhhsSeededReorder(trialPromptPool).slice(
    0,
    anncintTlllsmythhhsTrialRoundCount,
  );

const chronicleVisuals: Record<string, ImageSourcePropType> = {
  'tale-01': require('../elements/images/anncintTlllsmythhhs_greece_oracle_temple.png'),
  'tale-02': require('../elements/images/anncintTlllsmythhhs_egypt_falcon_shrine.png'),
  'tale-03': require('../elements/images/anncintTlllsmythhhs_india_moonlit_river.png'),
  'tale-04': require('../elements/images/anncintTlllsmythhhs_mesoamerica_crimson_dusk.png'),
  'tale-05': require('../elements/images/anncintTlllsmythhhs_greece_coastal_wreck.png'),
  'tale-06': require('../elements/images/anncintTlllsmythhhs_egypt_obsidian_arch.png'),
  'tale-07': require('../elements/images/anncintTlllsmythhhs_india_temple_grove.png'),
  'tale-08': require('../elements/images/anncintTlllsmythhhs_mesoamerica_underground_city.png'),
  'tale-09': require('../elements/images/anncintTlllsmythhhs_greece_silver_lyre.png'),
  'tale-10': require('../elements/images/anncintTlllsmythhhs_egypt_moon_chamber.png'),
  'tale-11': require('../elements/images/anncintTlllsmythhhs_india_emerald_court.png'),
  'tale-12': require('../elements/images/anncintTlllsmythhhs_mesoamerica_amber_eclipse.png'),
};

const assembleChronicle = (
  meta: {
    entryKey: string;
    localeTag: AnncintTlllsmythhhsMythLocale;
    headline: string;
    synopsis: string;
    openingPassage: string;
  },
  forkCaptionA: string,
  forkCaptionB: string,
  branchScriptA: AnncintTlllsmythhhsBranchScript,
  branchScriptB: AnncintTlllsmythhhsBranchScript,
): Omit<AnncintTlllsmythhhsChronicleEntry, 'coverVisual'> => ({
  ...meta,
  passageMap: {
    start: {
      promptStem: 'What will you do?',
      branchOptions: [
        {
          optionCaption: forkCaptionA,
          onwardKey: 'a',
        },
        {
          optionCaption: forkCaptionB,
          onwardKey: 'b',
        },
      ],
    },
    a: {
      insertedPassage: branchScriptA.interludePassage,
      promptStem: 'What will you do?',
      branchOptions: [
        {
          optionCaption: branchScriptA.secondForkA,
          onwardKey: 'a-end1',
        },
        {
          optionCaption: branchScriptA.secondForkB,
          onwardKey: 'a-end2',
        },
      ],
    },
    'a-end1': {
      insertedPassage: branchScriptA.finalePassageA,
      closesPassage: true,
    },
    'a-end2': {
      insertedPassage: branchScriptA.finalePassageB,
      closesPassage: true,
    },
    b: {
      insertedPassage: branchScriptB.interludePassage,
      promptStem: 'What will you do?',
      branchOptions: [
        {
          optionCaption: branchScriptB.secondForkA,
          onwardKey: 'b-end1',
        },
        {
          optionCaption: branchScriptB.secondForkB,
          onwardKey: 'b-end2',
        },
      ],
    },
    'b-end1': {
      insertedPassage: branchScriptB.finalePassageA,
      closesPassage: true,
    },
    'b-end2': {
      insertedPassage: branchScriptB.finalePassageB,
      closesPassage: true,
    },
  },
});

const chronicleDrafts: Omit<
  AnncintTlllsmythhhsChronicleEntry,
  'coverVisual'
>[] = [
  assembleChronicle(
    {
      entryKey: 'tale-01',
      localeTag: 'Greece',
      headline: 'The Temple Beneath Delphi',
      synopsis:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      openingPassage:
        'During a violent storm near Delphi, the explorer discovers a collapsed staircase buried beneath the ruins of an abandoned temple. Rainwater flows through cracked marble pillars while faded symbols shimmer strangely under the torchlight. Deep below the mountain, a metallic echo repeats through the darkness as if something ancient has awakened.',
    },
    'Follow the metallic sound deeper underground',
    'Examine the glowing wall symbols first',
    {
      forkCaption: '',
      interludePassage:
        'The tunnel becomes narrower and colder as the explorer descends deeper into the ruins. At the end of the corridor stands a massive bronze mechanism shaped like a coiled serpent wrapped around a sealed stone gate. Fresh footprints in the dust suggest someone else entered recently.',
      secondForkA: 'Activate the serpent mechanism',
      secondForkB: 'Follow the mysterious footprints',
      finalePassageA:
        'The serpent mechanism slowly unlocks the buried chamber behind the gate. Inside rests a golden laurel crown once worn by a forgotten oracle, surrounded by ancient ceremonial treasures and untouched scrolls.',
      finalePassageB:
        'The footprints lead to another treasure hunter trapped inside the ruins. Together, they uncover a sealed archive buried beneath Delphi before escaping the collapsing tunnels.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The glowing markings describe an ancient warning about “the voice beneath the mountain.” As the explorer studies the symbols more carefully, part of the wall shifts aside and reveals a buried staircase descending into darkness.',
      secondForkA: 'Descend the buried staircase',
      secondForkB: 'Ignore the warning and continue forward',
      finalePassageA:
        'The staircase leads to a forgotten underground library filled with sealed scrolls, maps, and celestial charts untouched for centuries beneath the mountain.',
      finalePassageB:
        'Ignoring the warning triggers an ancient floor trap. The explorer barely escapes the collapsing chamber but manages to recover a strange bronze key covered in mysterious symbols.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-02',
      localeTag: 'Egypt',
      headline: 'The Chamber of the Sun Falcon',
      synopsis:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar mysteries.',
      openingPassage:
        'Near the Valley of the Kings, the explorer uncovers a buried chamber buried beneath drifting desert sands. Giant falcon statues covered in golden dust stand silently beside black stone walls carved with solar markings. A single beam of sunlight passes through the ceiling and illuminates an ancient altar at the center of the room.',
    },
    'Touch the black stone altar',
    'Search the surrounding chamber walls',
    {
      forkCaption: '',
      interludePassage:
        'The chamber begins trembling softly as buried gears move somewhere behind the walls. Slowly, sealed doors open between the giant falcon statues, revealing a passage descending deeper underground.',
      secondForkA: 'Enter the newly opened passage',
      secondForkB: 'Stay and study the altar symbols',
      finalePassageA:
        'The underground passage reveals a lost royal burial chamber filled with crystal jars, ceremonial jewelry, and treasures untouched for generations.',
      finalePassageB:
        'The symbols on the altar form an ancient solar calendar predicting rare celestial events once used by Egyptian priests and astronomers.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Behind layers of dust, the explorer discovers painted maps showing buried tunnels beneath the desert dunes. The drawings seem to point toward an underground route connecting several forgotten tombs.',
      secondForkA: 'Follow the underground route',
      secondForkB: 'Take one of the golden relics first',
      finalePassageA:
        'The underground tunnels lead to a buried library buried beneath the sands, containing preserved scrolls and astronomical records.',
      finalePassageB:
        'Removing the relic activates ancient defense mechanisms. The explorer escapes through collapsing corridors while giant stone doors crash shut behind them.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-03',
      localeTag: 'India',
      headline: 'The Palace of the Moon River',
      synopsis:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      openingPassage:
        'Deep inside the jungle, the explorer discovers an abandoned riverside palace illuminated by silver moonlight. Soft music echoes through the trees while old lanterns suddenly begin glowing along the stone pathways. Beside the palace gates, a calm river reflects thousands of floating blue lights.',
    },
    'Enter the palace courtyard',
    'Follow the glowing riverbank',
    {
      forkCaption: '',
      interludePassage:
        'Inside the palace stands a massive mirror decorated with sapphire patterns and ancient carvings. The surface reflects the room strangely, almost as if another buried chamber exists beyond the glass.',
      secondForkA: 'Touch the mirror',
      secondForkB: 'Read the carved writings carefully',
      finalePassageA:
        'The mirror slowly reveals a buried ceremonial chamber containing royal masks, silver instruments, and forgotten treasures from the river kingdom.',
      finalePassageB:
        'The writings uncover the story of a queen who protected the sacred river and disappeared during a legendary lunar eclipse.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The explorer discovers buried wooden boats tied beneath hanging gardens filled with glowing blue flowers. Fireflies drift through the air while waterfalls echo somewhere deeper within the jungle.',
      secondForkA: 'Take a boat downstream',
      secondForkB: 'Explore the hanging gardens first',
      finalePassageA:
        'The river leads toward a submerged temple buried behind giant waterfalls, where ancient statues rise from the water beneath the moonlight.',
      finalePassageB:
        'Inside the gardens, the explorer discovers rare glowing flowers once used in royal ceremonies and sacred rituals.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-04',
      localeTag: 'Aztecs',
      headline: 'The Pyramid of the Red Sky',
      synopsis:
        'Climb an Aztec pyramid as the sky turns crimson and ancient drums echo through the ruins.',
      openingPassage:
        'As sunset covers the jungle, the explorer climbs an enormous Aztec pyramid rising above the trees. Suddenly, the sky turns deep crimson while distant drums echo across the ancient city ruins. Without warning, part of the stone staircase begins shifting slowly beneath the explorer’s feet.',
    },
    'Continue climbing toward the summit',
    'Enter a side chamber below the pyramid',
    {
      forkCaption: '',
      interludePassage:
        'At the summit of the pyramid stands a giant calendar stone glowing with fiery symbols. Warm wind circles the peak while the symbols pulse brighter as darkness approaches.',
      secondForkA: 'Rotate the calendar stone',
      secondForkB: 'Study the glowing symbols first',
      finalePassageA:
        'Rotating the stone opens a buried observatory above the clouds, revealing ancient instruments used to study the stars.',
      finalePassageB:
        'The glowing symbols reveal a forgotten prophecy describing a celestial event feared by the ancient priests.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The underground chamber walls are covered with paintings of warriors carrying crystal masks through burning cities. Strange echoes travel through buried tunnels beneath the pyramid.',
      secondForkA: 'Take one of the crystal masks',
      secondForkB: 'Search behind the painted walls',
      finalePassageA:
        'A buried tunnel behind the paintings leads toward underground chambers buried beneath the ancient city.',
      finalePassageB:
        'The crystal mask unlocks access to a ceremonial hall guarded by enormous stone statues covered in gold markings.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-05',
      localeTag: 'Greece',
      headline: 'The Shipwreck of Poseidon',
      synopsis:
        'Find an ancient shipwreck inside a sea cave after a violent storm near a rocky Greek island.',
      openingPassage:
        'After a violent storm near a rocky Greek island, the explorer discovers an ancient shipwreck buried inside a sea cave. Blue reflections shimmer across the cave walls while broken marble statues lie partially submerged beneath the water. Waves crash loudly outside as cold sea air fills the darkness.',
    },
    'Explore the captain’s cabin',
    'Dive deeper into the flooded ruins',
    {
      forkCaption: '',
      interludePassage:
        'Inside the ruined cabin rests an old navigation map marked with symbols of Poseidon and buried sea routes. Beside it stands a locked silver chest covered in salt and coral.',
      secondForkA: 'Open the silver chest',
      secondForkB: 'Follow the map directions instead',
      finalePassageA:
        'Inside the chest lies a ceremonial trident decorated with glowing blue gems once carried by ancient sea priests.',
      finalePassageB:
        'The map leads to a forgotten harbor buried between cliffs where ancient travelers once worshipped Poseidon.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Beneath the water, the explorer discovers underwater ruins illuminated by strange glowing fish swimming through broken columns. Ancient carvings cover the submerged walls deep inside the cave.',
      secondForkA: 'Swim toward the glowing ruins',
      secondForkB: 'Return later with equipment',
      finalePassageA:
        'The underwater ruins reveal a buried shrine dedicated to sailors lost at sea centuries ago.',
      finalePassageB:
        'Returning during moonlight reveals ancient symbols visible only when the tides rise beneath the cave entrance.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-06',
      localeTag: 'Egypt',
      headline: 'The Obsidian Gate',
      synopsis:
        'Face a gigantic black gate buried in the desert where whispers ride the warm wind.',
      openingPassage:
        'Far beyond the pyramids, the explorer discovers a gigantic black gate buried halfway beneath the desert sands. The surface reflects sunlight like dark glass while warm wind carries strange whispers through the abandoned ruins nearby. Ancient torches surround the entrance even though no one has visited the place for centuries.',
    },
    'Push the obsidian gate open',
    'Search the nearby ruins first',
    {
      forkCaption: '',
      interludePassage:
        'The heavy gate slowly moves aside, revealing a staircase descending into darkness beneath the desert. As the explorer walks downward, blue torches suddenly ignite along the underground walls.',
      secondForkA: 'Continue deeper underground',
      secondForkB: 'Study the glowing torch symbols',
      finalePassageA:
        'The underground halls contain enormous statues of forgotten desert kings surrounded by buried ceremonial chambers.',
      finalePassageB:
        'The torch symbols reveal an ancient map leading toward oasis temples buried beneath the sands.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Scattered among the ruins, the explorer discovers broken obsidian tablets describing a legendary “city beneath the desert.” Strange markings suggest the city may still exist underground.',
      secondForkA: 'Reassemble the obsidian tablets',
      secondForkB: 'Ignore them and enter the gate immediately',
      finalePassageA:
        'Reassembling the tablets reveals the location of a massive underground palace buried beneath the dunes.',
      finalePassageB:
        'Entering the gate too quickly activates ancient sand traps, forcing the explorer to escape collapsing corridors deep underground.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-07',
      localeTag: 'India',
      headline: 'The Tiger Temple of Jaipur',
      synopsis:
        'Find an abandoned temple behind giant stone tiger statues near the deserts of Jaipur.',
      openingPassage:
        'While traveling through the deserts near Jaipur, the explorer discovers an abandoned temple buried behind giant stone tiger statues. Warm wind carries the scent of incense through the empty halls while orange lanterns flicker softly inside the ruins. Strange claw marks carved into the floor seem to lead deeper underground.',
    },
    'Follow the claw marks into the temple',
    'Climb the upper balcony overlooking the ruins',
    {
      forkCaption: '',
      interludePassage:
        'The underground corridors are lined with golden tiger carvings and faded royal banners. Deep inside the chamber, the explorer discovers a circular room with a massive stone throne surrounded by burning candles.',
      secondForkA: 'Sit on the stone throne',
      secondForkB: 'Examine the candles and symbols first',
      finalePassageA:
        'The throne activates a buried mechanism that opens a sealed treasury filled with ancient jewels and ceremonial weapons.',
      finalePassageB:
        'The symbols reveal the story of a legendary tiger guardian believed to protect the kingdom during war.',
    },
    {
      forkCaption: '',
      interludePassage:
        'From above, the explorer notices buried ropes connected to giant bells hanging over the courtyard. Beyond the balcony, moonlight reveals another sealed section of the temple.',
      secondForkA: 'Ring the ancient bells',
      secondForkB: 'Enter the sealed section quietly',
      finalePassageA:
        'The bells trigger buried doors throughout the temple, revealing forgotten royal chambers.',
      finalePassageB:
        'Inside the sealed wing, the explorer discovers murals describing an ancient tiger festival lost to history.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-08',
      localeTag: 'Aztecs',
      headline: 'The City Beneath the Jungle',
      synopsis:
        'Descend into a forgotten city revealed when the jungle floor collapses beneath ancient ruins.',
      openingPassage:
        'Deep within the jungle, the explorer discovers stone ruins completely covered by vines and giant trees. As thunder rolls above the forest, part of the ground collapses and reveals a staircase descending into darkness beneath the ancient city.',
    },
    'Descend into the underground city',
    'Explore the surface ruins first',
    {
      forkCaption: '',
      interludePassage:
        'The buried city contains massive halls illuminated by glowing crystals embedded in the walls. Ancient murals depict priests carrying golden discs beneath a blood-red moon.',
      secondForkA: 'Follow the glowing crystal corridor',
      secondForkB: 'Study the murals carefully',
      finalePassageA:
        'The crystal corridor leads to a buried chamber containing a giant golden sun disc once used in sacred ceremonies.',
      finalePassageB:
        'The murals reveal the location of a forgotten ceremonial arena buried beneath the jungle.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Among the broken temples, the explorer discovers abandoned market streets filled with shattered pottery and stone statues. A faint drumbeat echoes somewhere deeper in the jungle.',
      secondForkA: 'Follow the mysterious drum sounds',
      secondForkB: 'Search inside the largest temple nearby',
      finalePassageA:
        'The drum sounds lead to an underground gathering hall buried beneath the forest floor.',
      finalePassageB:
        'Inside the temple rests a giant obsidian throne decorated with symbols of ancient rulers.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-09',
      localeTag: 'Greece',
      headline: 'The Cave of the Silver Harp',
      synopsis:
        'Follow music echoing from sea cliffs to a cave where silver light dances on underground pools.',
      openingPassage:
        'While sailing near a remote Greek island, the explorer hears music echoing from sea cliffs during the night. Following the sound leads to a buried cave where silver reflections shimmer across underground water pools.',
    },
    'Follow the music deeper into the cave',
    'Explore the underground lake first',
    {
      forkCaption: '',
      interludePassage:
        'Inside the cave stands an ancient silver harp resting beside broken marble columns. The air vibrates softly every time the explorer approaches the instrument.',
      secondForkA: 'Strum the silver harp',
      secondForkB: 'Inspect the nearby ruins first',
      finalePassageA:
        "The silver harp's melody reveals a buried passage leading toward a sealed temple beneath the island cliffs.",
      finalePassageB:
        'The nearby ruins contain scroll fragments describing musicians who once performed for ancient kings.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The underground lake glows faintly blue beneath the cave ceiling. Half-submerged statues stand silently in the water beside a narrow stone bridge.',
      secondForkA: 'Cross the stone bridge',
      secondForkB: 'Dive beneath the water surface',
      finalePassageA:
        'Across the bridge lies a buried chamber filled with silver ceremonial masks and musical instruments.',
      finalePassageB:
        'Beneath the water, the explorer discovers underwater carvings telling the story of a forgotten sea festival.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-10',
      localeTag: 'Egypt',
      headline: 'The Moon Tomb of Alexandria',
      synopsis:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      openingPassage:
        'Near the ancient ruins of Alexandria, the explorer discovers a buried tomb entrance revealed only during a full moon. Pale silver light reflects across the stone walls while cold air rises from beneath the underground staircase.',
    },
    'Enter the moonlit tomb immediately',
    'Search the outer ruins first',
    {
      forkCaption: '',
      interludePassage:
        'The underground chambers are covered in silver-painted stars and moon symbols unlike traditional Egyptian tombs. In the center of the room stands a giant circular mirror framed with black stone.',
      secondForkA: 'Touch the mirror surface',
      secondForkB: 'Search behind the mirror',
      finalePassageA:
        'The mirror reveals a buried observatory used by ancient astronomers to study eclipses and constellations.',
      finalePassageB:
        'Behind the mirror lies a sealed chamber containing lunar maps and crystal navigation tools.',
    },
    {
      forkCaption: '',
      interludePassage:
        'Among the collapsed columns, the explorer discovers broken statues carrying moon-shaped necklaces and ancient scroll cases.',
      secondForkA: 'Open the scroll cases',
      secondForkB: 'Follow a buried corridor beneath the ruins',
      finalePassageA:
        'The scrolls describe a forgotten society that studied the stars beneath Alexandria centuries ago.',
      finalePassageB:
        'The buried corridor leads toward underground docks once connected to the ancient harbor.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-11',
      localeTag: 'India',
      headline: 'The Emerald Elephant Palace',
      synopsis:
        'Discover an abandoned palace of emerald elephant statues deep inside tropical forests.',
      openingPassage:
        'Buried deep inside tropical forests, the explorer discovers an abandoned palace decorated with giant emerald elephant statues. Rain falls softly through broken rooftops while green reflections shimmer across flooded marble floors.',
    },
    'Enter the royal throne hall',
    'Explore the flooded lower chambers',
    {
      forkCaption: '',
      interludePassage:
        'At the center of the hall stands a golden throne surrounded by hanging lanterns and giant silk banners. Behind the throne, a massive carved elephant door remains tightly sealed.',
      secondForkA: 'Attempt to open the elephant door',
      secondForkB: 'Examine the silk banners first',
      finalePassageA:
        'The elephant door opens into a buried treasury filled with ceremonial crowns and emerald carvings.',
      finalePassageB:
        'The banners reveal the forgotten story of a royal expedition lost in the jungle centuries ago.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The flooded corridors contain floating candles and ancient stone bridges partially submerged beneath dark water. Soft chanting echoes from somewhere below the palace.',
      secondForkA: 'Follow the chanting sounds',
      secondForkB: 'Search the flooded rooms carefully',
      finalePassageA:
        'The chanting leads toward a buried underground sanctuary illuminated by glowing green crystals.',
      finalePassageB:
        'Inside the flooded chambers, the explorer discovers ceremonial boats once used during royal festivals.',
    },
  ),
  assembleChronicle(
    {
      entryKey: 'tale-12',
      localeTag: 'Aztecs',
      headline: 'The Temple of the Golden Eclipse',
      synopsis:
        'Reach a mountain temple as a rare solar eclipse makes golden symbols glow in the darkened sky.',
      openingPassage:
        'During a rare solar eclipse, the explorer arrives at a forgotten Aztec temple buried high within the mountains. Shadows move strangely across the stone walls while giant golden symbols begin glowing beneath the darkened sky.',
    },
    'Climb toward the eclipse altar',
    'Enter the underground temple tunnels',
    {
      forkCaption: '',
      interludePassage:
        'At the summit stands a massive golden disc reflecting the eclipse above the mountains. Ancient wind whistles through the ruins while buried mechanisms begin moving beneath the stone floor.',
      secondForkA: 'Rotate the golden disc',
      secondForkB: 'Study the surrounding carvings first',
      finalePassageA:
        'Rotating the disc reveals a buried observatory chamber filled with celestial maps and crystal instruments.',
      finalePassageB:
        'The carvings uncover an ancient prophecy connected to the return of a legendary ruler.',
    },
    {
      forkCaption: '',
      interludePassage:
        'The underground tunnels contain glowing torches and giant warrior statues covered in obsidian armor. Strange echoes travel through the darkness beneath the mountain temple.',
      secondForkA: 'Follow the echoing sounds',
      secondForkB: 'Search behind the warrior statues',
      finalePassageA:
        'The echoes lead toward a ceremonial chamber where ancient priests once observed eclipses in silence.',
      finalePassageB:
        'Behind the statues, the explorer discovers buried passages leading toward treasure rooms beneath the mountain.',
    },
  ),
];

export const anncintTlllsmythhhsChronicleCatalog: AnncintTlllsmythhhsChronicleEntry[] =
  chronicleDrafts.map(chronicle => ({
    ...chronicle,
    coverVisual: chronicleVisuals[chronicle.entryKey],
  }));

export const anncintTlllsmythhhsMythLocaleSequence: AnncintTlllsmythhhsMythLocale[] =
  ['Greece', 'Egypt', 'India', 'Aztecs'];

export const anncintTlllsmythhhsResolveChronicle = (entryKey: string) =>
  anncintTlllsmythhhsChronicleCatalog.find(s => s.entryKey === entryKey);

export const anncintTlllsmythhhsChroniclesGroupedByLocale =
  anncintTlllsmythhhsMythLocaleSequence.map(localeTag => ({
    localeTag,
    groupedEntries: anncintTlllsmythhhsChronicleCatalog.filter(
      s => s.localeTag === localeTag,
    ),
  }));

const anncintTlllsmythhhsJokesIndexKey = '@myth_jokes_index';
const anncintTlllsmythhhsJokesEntryPrefix = '@myth_jokes_entry_';

export const anncintTlllsmythhhsJokeStorageKey = (jokeKey: string) =>
  `${anncintTlllsmythhhsJokesEntryPrefix}${jokeKey}`;

const anncintTlllsmythhhsParseJokeIndex = (
  indexRaw: string | null,
): string[] => {
  if (!indexRaw) {
    return [];
  }
  try {
    const parsedPayload = JSON.parse(indexRaw);
    if (!Array.isArray(parsedPayload)) {
      return [];
    }
    return parsedPayload.filter(
      (jokeKey): jokeKey is string =>
        typeof jokeKey === 'string' && jokeKey.length > 0,
    );
  } catch {
    return [];
  }
};

const anncintTlllsmythhhsParseJokePayload = (
  jokeKey: string,
  rawPayload: string,
): AnncintTlllsmythhhsSavedJokePayload | null => {
  try {
    const parsedPayload = JSON.parse(rawPayload) as Record<string, unknown>;
    const anncintTlllsmythhhsResolvedKey = anncintTlllsmythhhsNormalizeJokeKey(
      typeof parsedPayload.jokeKey === 'string'
        ? parsedPayload.jokeKey
        : jokeKey,
    );
    const storedAt =
      typeof parsedPayload.storedAt === 'number' ? parsedPayload.storedAt : 0;
    return {jokeKey: anncintTlllsmythhhsResolvedKey, storedAt};
  } catch {
    return null;
  }
};

const anncintTlllsmythhhsReadJokeRaw = async (jokeKey: string) => {
  const normalizedKey = anncintTlllsmythhhsNormalizeJokeKey(jokeKey);
  const normalizedRaw = await AsyncStorage.getItem(
    anncintTlllsmythhhsJokeStorageKey(normalizedKey),
  );
  if (normalizedRaw != null || normalizedKey === jokeKey) {
    return {jokeKey: normalizedKey, rawPayload: normalizedRaw};
  }
  return {
    jokeKey,
    rawPayload: await AsyncStorage.getItem(
      anncintTlllsmythhhsJokeStorageKey(jokeKey),
    ),
  };
};

export const anncintTlllsmythhhsJokeIsSaved = async (jokeKey: string) => {
  const {rawPayload} = await anncintTlllsmythhhsReadJokeRaw(jokeKey);
  return rawPayload != null;
};

export const anncintTlllsmythhhsPersistJoke = async (jokeKey: string) => {
  const normalizedKey = anncintTlllsmythhhsNormalizeJokeKey(jokeKey);
  const payload: AnncintTlllsmythhhsSavedJokePayload = {
    jokeKey: normalizedKey,
    storedAt: Date.now(),
  };
  await AsyncStorage.setItem(
    anncintTlllsmythhhsJokeStorageKey(normalizedKey),
    JSON.stringify(payload),
  );

  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsJokesIndexKey);
  const anncintTlllsmythhhsJokeIndex = anncintTlllsmythhhsParseJokeIndex(
    indexRaw,
  ).map(anncintTlllsmythhhsNormalizeJokeKey);

  if (!anncintTlllsmythhhsJokeIndex.includes(normalizedKey)) {
    anncintTlllsmythhhsJokeIndex.push(normalizedKey);
    await AsyncStorage.setItem(
      anncintTlllsmythhhsJokesIndexKey,
      JSON.stringify(anncintTlllsmythhhsJokeIndex),
    );
  }
};

export const anncintTlllsmythhhsDiscardJoke = async (jokeKey: string) => {
  const normalizedKey = anncintTlllsmythhhsNormalizeJokeKey(jokeKey);
  await AsyncStorage.removeItem(
    anncintTlllsmythhhsJokeStorageKey(normalizedKey),
  );
  if (normalizedKey !== jokeKey) {
    await AsyncStorage.removeItem(anncintTlllsmythhhsJokeStorageKey(jokeKey));
  }

  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsJokesIndexKey);
  const anncintTlllsmythhhsJokeIndex = anncintTlllsmythhhsParseJokeIndex(
    indexRaw,
  ).map(anncintTlllsmythhhsNormalizeJokeKey);

  await AsyncStorage.setItem(
    anncintTlllsmythhhsJokesIndexKey,
    JSON.stringify(
      anncintTlllsmythhhsJokeIndex.filter(
        id => id !== normalizedKey && id !== jokeKey,
      ),
    ),
  );
};

export const anncintTlllsmythhhsLoadSavedJokes = async (): Promise<
  AnncintTlllsmythhhsSavedJokeDisplay[]
> => {
  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsJokesIndexKey);
  const anncintTlllsmythhhsJokeIndex = [
    ...new Set(
      anncintTlllsmythhhsParseJokeIndex(indexRaw).map(
        anncintTlllsmythhhsNormalizeJokeKey,
      ),
    ),
  ];

  if (indexRaw) {
    await AsyncStorage.setItem(
      anncintTlllsmythhhsJokesIndexKey,
      JSON.stringify(anncintTlllsmythhhsJokeIndex),
    );
  }

  const anncintTlllsmythhhsStoredJokes = await Promise.all(
    anncintTlllsmythhhsJokeIndex.map(async jokeKey => {
      const {jokeKey: storageKey, rawPayload} =
        await anncintTlllsmythhhsReadJokeRaw(jokeKey);
      if (!rawPayload) {
        return null;
      }
      const payload = anncintTlllsmythhhsParseJokePayload(
        storageKey,
        rawPayload,
      );
      if (!payload) {
        return null;
      }
      const joke = anncintTlllsmythhhsResolveJoke(payload.jokeKey);
      if (!joke) {
        return null;
      }
      const category = anncintTlllsmythhhsResolveJokeCategory(joke.localeTag);
      if (!category) {
        return null;
      }
      return {
        ...payload,
        headline: `${joke.localeTag} Joke`,
        localeTag: joke.localeTag,
        body: joke.body,
        coverVisual: category.coverVisual,
      } as AnncintTlllsmythhhsSavedJokeDisplay;
    }),
  );

  return anncintTlllsmythhhsStoredJokes
    .filter(
      (savedJoke): savedJoke is AnncintTlllsmythhhsSavedJokeDisplay =>
        savedJoke != null,
    )
    .sort((a, b) => b.storedAt - a.storedAt);
};

export const anncintTlllsmythhhsLoadSavedJokeKeys = async (): Promise<
  string[]
> => {
  const anncintTlllsmythhhsSavedJokes =
    await anncintTlllsmythhhsLoadSavedJokes();
  return anncintTlllsmythhhsSavedJokes.map(savedJoke => savedJoke.jokeKey);
};

const anncintTlllsmythhhsInsightLedgerKey = '@myth_insight_ledger';
const anncintTlllsmythhhsLegacyInsightLedgerKey = 'insight_ledger';

export const anncintTlllsmythhhsInsightPerSuccess = 50;

const anncintTlllsmythhhsMigrateInsightLedger = async () => {
  const legacyRaw = await AsyncStorage.getItem(
    anncintTlllsmythhhsLegacyInsightLedgerKey,
  );
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(
    anncintTlllsmythhhsInsightLedgerKey,
  );
  if (currentRaw == null) {
    await AsyncStorage.setItem(anncintTlllsmythhhsInsightLedgerKey, legacyRaw);
  }

  await AsyncStorage.removeItem(anncintTlllsmythhhsLegacyInsightLedgerKey);
};

export const anncintTlllsmythhhsFetchInsightBalance = async () => {
  await anncintTlllsmythhhsMigrateInsightLedger();
  const rawPayload = await AsyncStorage.getItem(
    anncintTlllsmythhhsInsightLedgerKey,
  );
  return rawPayload ? parseInt(rawPayload, 10) : 0;
};

export const anncintTlllsmythhhsCreditInsightBalance = async (
  points: number,
) => {
  const currentBalance = await anncintTlllsmythhhsFetchInsightBalance();
  await AsyncStorage.setItem(
    anncintTlllsmythhhsInsightLedgerKey,
    String(currentBalance + points),
  );
};

const anncintTlllsmythhhsShelfIndexKey = '@myth_shelf_index';
const anncintTlllsmythhhsShelfEntryPrefix = '@myth_shelf_entry_';

const anncintTlllsmythhhsLegacyIndexKeys = ['@book_explorer_bookmark_index'];
const anncintTlllsmythhhsLegacyEntryPrefixes = [
  '@book_explorer_bookmark_',
  'bookmark_legacy_v1_',
  ['raven', 'Quest', '_saved_'].join(''),
];

const anncintTlllsmythhhsLegacyPayloadIdKey = ['raven', 'Quest', 'Id'].join('');
const anncintTlllsmythhhsLegacyPayloadTrailKey = [
  'raven',
  'Quest',
  'History',
].join('');
const anncintTlllsmythhhsLegacyPayloadStoredKey = [
  'raven',
  'Quest',
  'SavedAt',
].join('');

export const anncintTlllsmythhhsBookmarkStorageKey = (entryKey: string) =>
  `${anncintTlllsmythhhsShelfEntryPrefix}${entryKey}`;

const anncintTlllsmythhhsParseBookmarkIndex = (
  indexRaw: string | null,
): string[] => {
  if (!indexRaw) {
    return [];
  }
  try {
    const parsedPayload = JSON.parse(indexRaw);
    if (!Array.isArray(parsedPayload)) {
      return [];
    }
    return parsedPayload.filter(
      (entryKey): entryKey is string =>
        typeof entryKey === 'string' && entryKey.length > 0,
    );
  } catch {
    return [];
  }
};

const anncintTlllsmythhhsNormalizeBookmarkPayload = (
  entryKey: string,
  parsedPayload: Record<string, unknown>,
): AnncintTlllsmythhhsBookmarkPayload | null => {
  const legacyId = parsedPayload[anncintTlllsmythhhsLegacyPayloadIdKey];
  const resolvedKey = anncintTlllsmythhhsNormalizeTaleEntryKey(
    typeof parsedPayload.entryKey === 'string'
      ? parsedPayload.entryKey
      : typeof legacyId === 'string'
      ? legacyId
      : entryKey,
  );

  const legacyTrail = parsedPayload[anncintTlllsmythhhsLegacyPayloadTrailKey];
  const passageTrail: unknown[] | null = Array.isArray(
    parsedPayload.passageTrail,
  )
    ? parsedPayload.passageTrail
    : Array.isArray(legacyTrail)
    ? legacyTrail
    : null;

  if (!passageTrail) {
    return null;
  }

  const legacyStoredAt =
    parsedPayload[anncintTlllsmythhhsLegacyPayloadStoredKey];
  const storedAt =
    typeof parsedPayload.storedAt === 'number'
      ? parsedPayload.storedAt
      : typeof legacyStoredAt === 'number'
      ? legacyStoredAt
      : 0;

  return {
    entryKey: resolvedKey,
    passageTrail: passageTrail.filter(
      (block): block is string => typeof block === 'string',
    ),
    storedAt,
  };
};

const anncintTlllsmythhhsParseBookmarkPayload = (
  entryKey: string,
  rawPayload: string,
): AnncintTlllsmythhhsBookmarkPayload | null => {
  if (rawPayload === '1') {
    const chronicle = anncintTlllsmythhhsResolveChronicle(entryKey);
    if (!chronicle) {
      return null;
    }
    return {
      entryKey,
      passageTrail: [chronicle.openingPassage],
      storedAt: 0,
    };
  }

  try {
    const parsedPayload = JSON.parse(rawPayload) as Record<string, unknown>;
    return anncintTlllsmythhhsNormalizeBookmarkPayload(entryKey, parsedPayload);
  } catch {
    return null;
  }
};

const anncintTlllsmythhhsResolveLegacyEntryKey = (
  storageKey: string,
): string | null => {
  if (storageKey.startsWith(anncintTlllsmythhhsShelfEntryPrefix)) {
    return storageKey.slice(anncintTlllsmythhhsShelfEntryPrefix.length);
  }
  for (const prefix of anncintTlllsmythhhsLegacyEntryPrefixes) {
    if (storageKey.startsWith(prefix)) {
      return storageKey.slice(prefix.length);
    }
  }
  return null;
};

const anncintTlllsmythhhsMigrateLegacyBookmarks = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  const migratedKeys: string[] = [];

  for (const storageKey of storageKeys) {
    const entryKey = anncintTlllsmythhhsResolveLegacyEntryKey(storageKey);
    if (
      !entryKey ||
      storageKey.startsWith(anncintTlllsmythhhsShelfEntryPrefix)
    ) {
      continue;
    }

    const rawPayload = await AsyncStorage.getItem(storageKey);
    if (!rawPayload) {
      continue;
    }

    const bookmarkPayload = anncintTlllsmythhhsParseBookmarkPayload(
      entryKey,
      rawPayload,
    );
    if (!bookmarkPayload) {
      continue;
    }

    await AsyncStorage.setItem(
      anncintTlllsmythhhsBookmarkStorageKey(bookmarkPayload.entryKey),
      JSON.stringify(bookmarkPayload),
    );
    await AsyncStorage.removeItem(storageKey);
    migratedKeys.push(entryKey);
  }

  for (const legacyIndexKey of anncintTlllsmythhhsLegacyIndexKeys) {
    const indexRaw = await AsyncStorage.getItem(legacyIndexKey);
    if (indexRaw) {
      const legacyIndex = anncintTlllsmythhhsParseBookmarkIndex(indexRaw);
      migratedKeys.push(...legacyIndex);
      await AsyncStorage.removeItem(legacyIndexKey);
    }
  }

  if (migratedKeys.length === 0) {
    return;
  }

  const uniqueKeys = anncintTlllsmythhhsNormalizeStoredTaleKeys([
    ...new Set(migratedKeys),
  ]);
  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsShelfIndexKey);
  const bookmarkIndex = anncintTlllsmythhhsNormalizeStoredTaleKeys(
    anncintTlllsmythhhsParseBookmarkIndex(indexRaw),
  );

  for (const entryKey of uniqueKeys) {
    if (!bookmarkIndex.includes(entryKey)) {
      bookmarkIndex.push(entryKey);
    }
  }

  await AsyncStorage.setItem(
    anncintTlllsmythhhsShelfIndexKey,
    JSON.stringify(anncintTlllsmythhhsNormalizeStoredTaleKeys(bookmarkIndex)),
  );
};

const anncintTlllsmythhhsRebuildBookmarkIndex = async () => {
  const storageKeys = await AsyncStorage.getAllKeys();
  return storageKeys
    .filter(key => key.startsWith(anncintTlllsmythhhsShelfEntryPrefix))
    .map(key => key.slice(anncintTlllsmythhhsShelfEntryPrefix.length));
};

const anncintTlllsmythhhsReadBookmarkRaw = async (entryKey: string) => {
  const normalizedKey = anncintTlllsmythhhsNormalizeTaleEntryKey(entryKey);
  const normalizedRaw = await AsyncStorage.getItem(
    anncintTlllsmythhhsBookmarkStorageKey(normalizedKey),
  );
  if (normalizedRaw != null || normalizedKey === entryKey) {
    return {entryKey: normalizedKey, rawPayload: normalizedRaw};
  }
  return {
    entryKey,
    rawPayload: await AsyncStorage.getItem(
      anncintTlllsmythhhsBookmarkStorageKey(entryKey),
    ),
  };
};

export const anncintTlllsmythhhsBookmarkExists = async (entryKey: string) => {
  const {rawPayload} = await anncintTlllsmythhhsReadBookmarkRaw(entryKey);
  return rawPayload != null;
};

export const anncintTlllsmythhhsPersistBookmark = async (
  bookmarkPayload: AnncintTlllsmythhhsBookmarkPayload,
) => {
  const entryKey = anncintTlllsmythhhsNormalizeTaleEntryKey(
    bookmarkPayload.entryKey,
  );
  const normalizedPayload = {...bookmarkPayload, entryKey};
  await AsyncStorage.setItem(
    anncintTlllsmythhhsBookmarkStorageKey(entryKey),
    JSON.stringify(normalizedPayload),
  );

  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsShelfIndexKey);
  const bookmarkIndex = anncintTlllsmythhhsNormalizeStoredTaleKeys(
    anncintTlllsmythhhsParseBookmarkIndex(indexRaw),
  );

  if (!bookmarkIndex.includes(entryKey)) {
    bookmarkIndex.push(entryKey);
    await AsyncStorage.setItem(
      anncintTlllsmythhhsShelfIndexKey,
      JSON.stringify(bookmarkIndex),
    );
  }
};

export const anncintTlllsmythhhsLoadShelfBookmarks = async () => {
  await anncintTlllsmythhhsMigrateLegacyBookmarks();

  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsShelfIndexKey);
  let bookmarkIndex = anncintTlllsmythhhsNormalizeStoredTaleKeys(
    anncintTlllsmythhhsParseBookmarkIndex(indexRaw),
  );

  if (bookmarkIndex.length === 0) {
    bookmarkIndex = anncintTlllsmythhhsNormalizeStoredTaleKeys(
      await anncintTlllsmythhhsRebuildBookmarkIndex(),
    );

    if (bookmarkIndex.length > 0) {
      await AsyncStorage.setItem(
        anncintTlllsmythhhsShelfIndexKey,
        JSON.stringify(bookmarkIndex),
      );
    }
  } else if (bookmarkIndex.length > 0) {
    await AsyncStorage.setItem(
      anncintTlllsmythhhsShelfIndexKey,
      JSON.stringify(bookmarkIndex),
    );
  }

  const storedPayloads = await Promise.all(
    bookmarkIndex.map(async entryKey => {
      const {entryKey: storageKey, rawPayload} =
        await anncintTlllsmythhhsReadBookmarkRaw(entryKey);
      if (!rawPayload) {
        return null;
      }
      return anncintTlllsmythhhsParseBookmarkPayload(storageKey, rawPayload);
    }),
  );

  return storedPayloads
    .filter(
      (
        bookmarkPayload,
      ): bookmarkPayload is AnncintTlllsmythhhsBookmarkPayload =>
        bookmarkPayload != null &&
        anncintTlllsmythhhsResolveChronicle(bookmarkPayload.entryKey) != null,
    )
    .sort((a, b) => b.storedAt - a.storedAt);
};

export const anncintTlllsmythhhsDiscardBookmark = async (entryKey: string) => {
  const normalizedKey = anncintTlllsmythhhsNormalizeTaleEntryKey(entryKey);
  await AsyncStorage.removeItem(
    anncintTlllsmythhhsBookmarkStorageKey(normalizedKey),
  );
  if (normalizedKey !== entryKey) {
    await AsyncStorage.removeItem(
      anncintTlllsmythhhsBookmarkStorageKey(entryKey),
    );
  }

  const indexRaw = await AsyncStorage.getItem(anncintTlllsmythhhsShelfIndexKey);
  const bookmarkIndex = anncintTlllsmythhhsNormalizeStoredTaleKeys(
    anncintTlllsmythhhsParseBookmarkIndex(indexRaw),
  );

  await AsyncStorage.setItem(
    anncintTlllsmythhhsShelfIndexKey,
    JSON.stringify(
      bookmarkIndex.filter(id => id !== normalizedKey && id !== entryKey),
    ),
  );
};

const anncintTlllsmythhhsChroniclesFinishedKey = '@myth_chronicles_consumed';
const anncintTlllsmythhhsLegacyChroniclesFinishedKey =
  '@book_explorer_chronicles_finished';

const anncintTlllsmythhhsMigrateChroniclesFinished = async () => {
  const legacyRaw = await AsyncStorage.getItem(
    anncintTlllsmythhhsLegacyChroniclesFinishedKey,
  );
  if (legacyRaw == null) {
    return;
  }

  const currentRaw = await AsyncStorage.getItem(
    anncintTlllsmythhhsChroniclesFinishedKey,
  );
  if (currentRaw == null) {
    await AsyncStorage.setItem(
      anncintTlllsmythhhsChroniclesFinishedKey,
      legacyRaw,
    );
  } else {
    try {
      const legacyKeys: string[] = JSON.parse(legacyRaw);
      const currentKeys: string[] = JSON.parse(currentRaw);
      const mergedKeys = anncintTlllsmythhhsNormalizeStoredTaleKeys([
        ...new Set([...currentKeys, ...legacyKeys]),
      ]);
      await AsyncStorage.setItem(
        anncintTlllsmythhhsChroniclesFinishedKey,
        JSON.stringify(mergedKeys),
      );
    } catch {
      await AsyncStorage.setItem(
        anncintTlllsmythhhsChroniclesFinishedKey,
        legacyRaw,
      );
    }
  }

  await AsyncStorage.removeItem(anncintTlllsmythhhsLegacyChroniclesFinishedKey);
};

export const anncintTlllsmythhhsMarkChronicleConsumed = async (
  chronicleKey: string,
) => {
  const normalizedKey = anncintTlllsmythhhsNormalizeTaleEntryKey(chronicleKey);
  await anncintTlllsmythhhsMigrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(
    anncintTlllsmythhhsChroniclesFinishedKey,
  );
  const finishedKeys = anncintTlllsmythhhsNormalizeStoredTaleKeys(
    rawPayload ? JSON.parse(rawPayload) : [],
  );

  if (!finishedKeys.includes(normalizedKey)) {
    finishedKeys.push(normalizedKey);
    await AsyncStorage.setItem(
      anncintTlllsmythhhsChroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
};

export const anncintTlllsmythhhsFetchChroniclesConsumedCount = async () => {
  const finishedKeys = await anncintTlllsmythhhsFetchChroniclesConsumedKeys();
  return finishedKeys.length;
};

export const anncintTlllsmythhhsWelcomeFrames = [
  {
    backdropVisual: require('../elements/images/anncintTlllsmythhhs_welcome_four_regions.png'),
    headline: 'Four Regions',
    bodyCopy:
      'Content is grouped into Greece, Egypt, India, and Mesoamerica. Each region includes branching tales, map sites, artifacts, and jokes.',
  },
  {
    backdropVisual: require('../elements/images/anncintTlllsmythhhs_welcome_branching_tales.png'),
    headline: 'Branching Tales',
    bodyCopy:
      'Open a story, read a passage, and choose one of two options to continue. Different choices lead to different endings.',
  },
  {
    backdropVisual: require('../elements/images/anncintTlllsmythhhs_welcome_relic_gallery.png'),
    headline: 'Artifact Notes',
    bodyCopy:
      'View illustrated items by region with short descriptions. Some entries unlock as you make progress in the quiz.',
  },
  {
    backdropVisual: require('../elements/images/anncintTlllsmythhhs_welcome_figure_gallery.png'),
    headline: 'Heritage Atlas Map',
    bodyCopy:
      'Open the Map tab to explore cultural sites across all four regions. Tap a location to see its details and open the tale linked to that place.',
  },
  {
    backdropVisual: require('../elements/images/anncintTlllsmythhhs_welcome_four_regions.png'),
    headline: 'Quiz & Jokes',
    bodyCopy:
      'Answer short questions in the Quiz tab to unlock more content. Read jokes by region, save favorites, and share them when you like.',
  },
] as const;

export const anncintTlllsmythhhsFetchChroniclesConsumedKeys = async () => {
  await anncintTlllsmythhhsMigrateChroniclesFinished();
  const rawPayload = await AsyncStorage.getItem(
    anncintTlllsmythhhsChroniclesFinishedKey,
  );
  const finishedKeys = anncintTlllsmythhhsNormalizeStoredTaleKeys(
    rawPayload ? JSON.parse(rawPayload) : [],
  );
  if (rawPayload) {
    await AsyncStorage.setItem(
      anncintTlllsmythhhsChroniclesFinishedKey,
      JSON.stringify(finishedKeys),
    );
  }
  return finishedKeys;
};

export const anncintTlllsmythhhsHeritageSites: AnncintTlllsmythhhsHeritageSite[] =
  [
    {
      siteKey: 'site-01',
      siteName: 'Delphi Oracle Grounds',
      localeTag: 'Greece',
      synopsis:
        'Discover a collapsed staircase beneath Delphi and uncover what awakens below the mountain.',
      entryKey: 'tale-01',
      latitude: 38.4823,
      longitude: 22.501,
    },
    {
      siteKey: 'site-02',
      siteName: 'Valley of the Kings',
      localeTag: 'Egypt',
      synopsis:
        'Uncover a buried chamber near the Valley of the Kings where falcon statues guard solar mysteries.',
      entryKey: 'tale-02',
      latitude: 25.6994,
      longitude: 32.6392,
    },
    {
      siteKey: 'site-03',
      siteName: 'Moon River Palace',
      localeTag: 'India',
      synopsis:
        'Explore an abandoned riverside palace where lanterns glow and blue lights drift on the water.',
      entryKey: 'tale-03',
      latitude: 24.5854,
      longitude: 73.7125,
    },
    {
      siteKey: 'site-04',
      siteName: 'Crimson Sky Pyramid',
      localeTag: 'Aztecs',
      synopsis:
        'Climb a pyramid where the sky turns red at dusk and ancient drums echo from the stones.',
      entryKey: 'tale-04',
      latitude: 19.6925,
      longitude: -98.8438,
    },
    {
      siteKey: 'site-05',
      siteName: 'Aegean Shipwreck Shore',
      localeTag: 'Greece',
      synopsis:
        'Follow a storm-battered coast where a legendary shipwreck still holds its cargo of secrets.',
      entryKey: 'tale-05',
      latitude: 35.3387,
      longitude: 25.1442,
    },
    {
      siteKey: 'site-06',
      siteName: 'Obsidian Gate Ruins',
      localeTag: 'Egypt',
      synopsis:
        'Find a black stone gate sealed for centuries beneath desert sands and temple ruins.',
      entryKey: 'tale-06',
      latitude: 25.7186,
      longitude: 32.6573,
    },
    {
      siteKey: 'site-07',
      siteName: 'Tiger Temple Grove',
      localeTag: 'India',
      synopsis:
        'Enter a hill temple where carved tigers seem to watch every step through the mist.',
      entryKey: 'tale-07',
      latitude: 26.9124,
      longitude: 75.7873,
    },
    {
      siteKey: 'site-08',
      siteName: 'Underground Stone City',
      localeTag: 'Aztecs',
      synopsis:
        'Descend into a buried city hidden beneath jungle roots and crumbling stone plazas.',
      entryKey: 'tale-08',
      latitude: 17.4833,
      longitude: -92.046,
    },
    {
      siteKey: 'site-09',
      siteName: 'Silver Harp Caves',
      localeTag: 'Greece',
      synopsis:
        'Search cliffside caves where the sound of a silver harp still drifts through the dark.',
      entryKey: 'tale-09',
      latitude: 39.7217,
      longitude: 21.6306,
    },
    {
      siteKey: 'site-10',
      siteName: 'Alexandria Moon Tomb',
      localeTag: 'Egypt',
      synopsis:
        'Enter a tomb near Alexandria revealed only when the full moon lights the stone walls.',
      entryKey: 'tale-10',
      latitude: 31.2001,
      longitude: 29.9187,
    },
    {
      siteKey: 'site-11',
      siteName: 'Emerald Court',
      localeTag: 'India',
      synopsis:
        'Walk the halls of a palace where emerald light spills from carved elephant gates.',
      entryKey: 'tale-11',
      latitude: 12.3052,
      longitude: 76.6552,
    },
    {
      siteKey: 'site-12',
      siteName: 'Solar Eclipse Temple',
      localeTag: 'Aztecs',
      synopsis:
        'Stand on temple steps aligned with a rare eclipse that once marked a golden ritual.',
      entryKey: 'tale-12',
      latitude: 20.6843,
      longitude: -88.5678,
    },
  ];
