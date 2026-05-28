export const Routes = {
  Loader: 'BootGate',
  Onboarding: 'WelcomeGate',
  MainTabs: 'MainHub',
  Tales: 'ChroniclesTab',
  Saved: 'BookmarksTab',
  Quiz: 'TrialsTab',
  Characters: 'FiguresTab',
  Artifacts: 'RelicsTab',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
