import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import LoaderScreen from '../../features/loader/LoaderScreen';
import OnboardingScreen from '../../features/onboarding/OnboardingScreen';
import MainTabNavigator from './MainTabNavigator';
import {Routes} from './routes';
import type {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.Loader} component={LoaderScreen} />
    <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen} />
    <Stack.Screen name={Routes.MainTabs} component={MainTabNavigator} />
  </Stack.Navigator>
);

export default RootNavigator;
