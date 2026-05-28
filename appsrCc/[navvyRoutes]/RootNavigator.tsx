import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import LoaderScreen from '../ancpaggEs/LoaderScreen';
import OnboardingScreen from '../ancpaggEs/OnboardingScreen';
import MainTabNavigator from './MainTabNavigator';
import {Routes} from './routes';
import {stackScreenOptions} from './screenTransitions';
import type {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const StakkNavyy = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name={Routes.Loader} component={LoaderScren} />
    <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen} />
    <Stack.Screen name={Routes.MainTabs} component={MainTabNavigator} />
  </Stack.Navigator>
);

export default StakkNavyy;
