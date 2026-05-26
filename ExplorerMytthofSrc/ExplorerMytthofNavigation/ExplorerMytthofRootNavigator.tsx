import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import LoaderScreen from '../ExplorerMytthofScreens/ExplorerMytthofLoaderScreen';
import OnboardingScreen from '../ExplorerMytthofScreens/ExplorerMytthofOnboardingScreen';
import MainTabNavigator from './ExplorerMytthofMainTabNavigator';
import {Routes} from './ExplorerMytthofRoutes';
import {stackScreenOptions} from './ExplorerMytthofScreenTransitions';
import type {RootStackParamList} from './ExplorerMytthofTypes';

const Stack = createStackNavigator<RootStackParamList>();

const ExplorerMytthofRootNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name={Routes.Loader} component={LoaderScreen} />
    <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen} />
    <Stack.Screen name={Routes.MainTabs} component={MainTabNavigator} />
  </Stack.Navigator>
);

export default ExplorerMytthofRootNavigator;
