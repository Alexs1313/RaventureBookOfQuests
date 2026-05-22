export const Routes = {
  Loader: 'RavenQuestBoot',
  Onboarding: 'RavenQuestWelcome',
  MainTabs: 'RavenQuestHub',
  Tales: 'RavenQuestChronicles',
  Saved: 'RavenQuestBookmarks',
  Quiz: 'RavenQuestTrials',
  Characters: 'RavenQuestFigures',
  Artifacts: 'RavenQuestRelics',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
