import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AnncintTlllsmythhhsLoaderScreen from '../AnncintTlllsmythhhsLoaderScreen';
import AnncintTlllsmythhhsOnboardingScreen from '../AnncintTlllsmythhhsOnboardingScreen';
import AnncintTlllsmythhhsTabNavigator from './AnncintTlllsmythhhsTabNavigator';
import {
  AnncintTlllsmythhhsRoutes,
  type AnncintTlllsmythhhsRootStackParamList,
} from './AnncintTlllsmythhhsRoutes';

const Stack = createStackNavigator<AnncintTlllsmythhhsRootStackParamList>();

const AnncintTlllsmythhhsRootNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={AnncintTlllsmythhhsRoutes.Loader} component={AnncintTlllsmythhhsLoaderScreen} />
    <Stack.Screen name={AnncintTlllsmythhhsRoutes.Onboarding} component={AnncintTlllsmythhhsOnboardingScreen} />
    <Stack.Screen name={AnncintTlllsmythhhsRoutes.MainTabs} component={AnncintTlllsmythhhsTabNavigator} />
  </Stack.Navigator>
);

export default AnncintTlllsmythhhsRootNavigator;
