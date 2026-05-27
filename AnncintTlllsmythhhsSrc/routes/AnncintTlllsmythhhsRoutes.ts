import type {NavigatorScreenParams} from '@react-navigation/native';

export const AnncintTlllsmythhhsRoutes = {
  Loader: 'BootGate',
  Onboarding: 'WelcomeGate',
  MainTabs: 'MainHub',
  Tales: 'ChroniclesTab',
  Map: 'AtlasTab',
  Saved: 'BookmarksTab',
  Quiz: 'TrialsTab',
  Artifacts: 'RelicsTab',
  Jokes: 'JestsTab',
} as const;

export type AnncintTlllsmythhhsRouteName =
  (typeof AnncintTlllsmythhhsRoutes)[keyof typeof AnncintTlllsmythhhsRoutes];

export type AnncintTlllsmythhhsMainTabParamList = {
  [AnncintTlllsmythhhsRoutes.Tales]: {entryKey?: string} | undefined;
  [AnncintTlllsmythhhsRoutes.Map]: undefined;
  [AnncintTlllsmythhhsRoutes.Jokes]: undefined;
  [AnncintTlllsmythhhsRoutes.Quiz]: undefined;
  [AnncintTlllsmythhhsRoutes.Saved]: undefined;
  [AnncintTlllsmythhhsRoutes.Artifacts]: undefined;
};

export type AnncintTlllsmythhhsRootStackParamList = {
  [AnncintTlllsmythhhsRoutes.Loader]: undefined;
  [AnncintTlllsmythhhsRoutes.Onboarding]: undefined;
  [AnncintTlllsmythhhsRoutes.MainTabs]: NavigatorScreenParams<AnncintTlllsmythhhsMainTabParamList>;
};
