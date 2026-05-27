export const RadienceffAncienttalesRoutes = {
  Loader: 'BootGate',
  Onboarding: 'WelcomeGate',
  MainTabs: 'MainHub',
  Tales: 'ChroniclesTab',
  Saved: 'BookmarksTab',
  Quiz: 'TrialsTab',
  Characters: 'FiguresTab',
  Artifacts: 'RelicsTab',
  Jokes: 'JestsTab',
} as const;

export type RadienceffAncienttalesRouteName = (typeof RadienceffAncienttalesRoutes)[keyof typeof RadienceffAncienttalesRoutes];
