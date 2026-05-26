import type {NavigatorScreenParams} from '@react-navigation/native';

import {Routes} from './ExplorerMytthofRoutes';

export type MainTabParamList = {
  [Routes.Tales]: undefined;
  [Routes.Saved]: undefined;
  [Routes.Quiz]: undefined;
  [Routes.Characters]: undefined;
  [Routes.Artifacts]: undefined;
  [Routes.Jokes]: undefined;
};

export type RootStackParamList = {
  [Routes.Loader]: undefined;
  [Routes.Onboarding]: undefined;
  [Routes.MainTabs]: NavigatorScreenParams<MainTabParamList>;
};
