import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import RadienceffAncienttalesLoaderScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesLoaderScreen';
import RadienceffAncienttalesOnboardingScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesOnboardingScreen';
import RadienceffAncienttalesMainTabNavigator from './RadienceffAncienttalesMainTabNavigator';
import {RadienceffAncienttalesRoutes} from './RadienceffAncienttalesRoutes';
import {radienceffAncienttalesStackScreenOptions} from './RadienceffAncienttalesScreenTransitions';
import type {RadienceffAncienttalesRootStackParamList} from './RadienceffAncienttalesTypes';

const Stack = createStackNavigator<RadienceffAncienttalesRootStackParamList>();

const RadienceffAncienttalesRootNavigator = () => (
  <Stack.Navigator screenOptions={radienceffAncienttalesStackScreenOptions}>
    <Stack.Screen name={RadienceffAncienttalesRoutes.Loader} component={RadienceffAncienttalesLoaderScreen} />
    <Stack.Screen name={RadienceffAncienttalesRoutes.Onboarding} component={RadienceffAncienttalesOnboardingScreen} />
    <Stack.Screen name={RadienceffAncienttalesRoutes.MainTabs} component={RadienceffAncienttalesMainTabNavigator} />
  </Stack.Navigator>
);

export default RadienceffAncienttalesRootNavigator;
