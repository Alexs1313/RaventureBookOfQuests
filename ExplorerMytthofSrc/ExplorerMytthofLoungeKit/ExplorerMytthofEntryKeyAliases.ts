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

export const normalizeTaleEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, taleEntryKeyAliases);

export const normalizeFigureEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, figureEntryKeyAliases);

export const normalizeRelicEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, relicEntryKeyAliases);

export const normalizeJokeKey = (jokeKey: string) =>
  resolveAlias(jokeKey, jokeKeyAliases);

export const normalizePromptEntryKey = (entryKey: string) =>
  resolveAlias(entryKey, promptEntryKeyAliases);

export const normalizeStoredTaleKeys = (entryKeys: string[]) => [
  ...new Set(entryKeys.map(normalizeTaleEntryKey)),
];
