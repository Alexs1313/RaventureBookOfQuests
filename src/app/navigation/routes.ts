export const Routes = {
  Loader: 'Legendsaventurebkkload',
  Onboarding: 'Legendsaventurebkkon',
  MainTabs: 'Legendsaventurebkktab',
  Tales: 'Legendsaventurebkkstrs',
  Saved: 'Legendsaventurebkksaved',
  Quiz: 'Legendsaventurebkkquiz',
  Characters: 'Legendsaventurebkkcharct',
  Artifacts: 'Legendsaventurebkkarfcts',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
