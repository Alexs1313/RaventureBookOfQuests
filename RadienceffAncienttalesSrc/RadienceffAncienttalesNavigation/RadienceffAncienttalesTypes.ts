import type {NavigatorScreenParams} from '@react-navigation/native';

import {RadienceffAncienttalesRoutes} from './RadienceffAncienttalesRoutes';

export type RadienceffAncienttalesMainTabParamList = {
  [RadienceffAncienttalesRoutes.Tales]: undefined;
  [RadienceffAncienttalesRoutes.Saved]: undefined;
  [RadienceffAncienttalesRoutes.Quiz]: undefined;
  [RadienceffAncienttalesRoutes.Characters]: undefined;
  [RadienceffAncienttalesRoutes.Artifacts]: undefined;
  [RadienceffAncienttalesRoutes.Jokes]: undefined;
};

export type RadienceffAncienttalesRootStackParamList = {
  [RadienceffAncienttalesRoutes.Loader]: undefined;
  [RadienceffAncienttalesRoutes.Onboarding]: undefined;
  [RadienceffAncienttalesRoutes.MainTabs]: NavigatorScreenParams<RadienceffAncienttalesMainTabParamList>;
};
