import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import LoaderScreen from '../screens/LoaderScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const StackkNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Legendsaventurebkkload" component={LoaderScreen} />
    <Stack.Screen name="Legendsaventurebkkon" component={OnboardingScreen} />
    <Stack.Screen name="Legendsaventurebkktab" component={MainTabNavigator} />
  </Stack.Navigator>
);

export default StackkNavigator;
