import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View, type ImageSourcePropType} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import RadienceffAncienttalesArtifactsScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesArtifactsScreen';
import RadienceffAncienttalesCharactersScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesCharactersScreen';
import RadienceffAncienttalesQuizScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesQuizScreen';
import RadienceffAncienttalesSavedScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesSavedScreen';
import RadienceffAncienttalesJokesScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesJokesScreen';
import RadienceffAncienttalesTalesScreen from '../RadienceffAncienttalesScreens/RadienceffAncienttalesTalesScreen';
import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesAssets';
import {radienceffAncienttalesColors, radienceffAncienttalesSpacing} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

import RadienceffAncienttalesAnimatedTabBarButton from './RadienceffAncienttalesAnimatedTabBarButton';
import RadienceffAncienttalesAnimatedTabIcon from './RadienceffAncienttalesAnimatedTabIcon';
import {RadienceffAncienttalesRoutes} from './RadienceffAncienttalesRoutes';
import type {RadienceffAncienttalesMainTabParamList} from './RadienceffAncienttalesTypes';

const Tab = createBottomTabNavigator<RadienceffAncienttalesMainTabParamList>();

const tabIcons: ImageSourcePropType[] = [
  radienceffAncienttalesMediaRegistry.tabs.tales,
  radienceffAncienttalesMediaRegistry.tabs.jokes,
  radienceffAncienttalesMediaRegistry.tabs.quiz,
  radienceffAncienttalesMediaRegistry.tabs.saved,
  radienceffAncienttalesMediaRegistry.tabs.artifacts,
  radienceffAncienttalesMediaRegistry.tabs.characters,
];

const makeTabIcon =
  (index: number) =>
  ({focused}: {focused: boolean}) =>
    <RadienceffAncienttalesAnimatedTabIcon focused={focused} source={tabIcons[index]} />;

const TabBarBackground = () => <View style={radienceffAncienttalesStyles.radienceffAncienttalesTabBarBg} />;

const RadienceffAncienttalesMainTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: props => <RadienceffAncienttalesAnimatedTabBarButton {...props} />,
        tabBarStyle: [
          radienceffAncienttalesStyles.radienceffAncienttalesTabBar,
          {
            paddingBottom: Math.max(insets.bottom, radienceffAncienttalesSpacing.tabBarMinInset),
          },
          {
            height:
              radienceffAncienttalesSpacing.tabBarHeight +
              Math.max(insets.bottom, radienceffAncienttalesSpacing.tabBarMinInset),
          },
        ],
        tabBarItemStyle: radienceffAncienttalesStyles.radienceffAncienttalesTabBarItem,
        tabBarBackground: TabBarBackground,
      }}>
      <Tab.Screen
        name={RadienceffAncienttalesRoutes.Tales}
        component={RadienceffAncienttalesTalesScreen}
        options={{tabBarIcon: makeTabIcon(0)}}
      />
      <Tab.Screen
        name={RadienceffAncienttalesRoutes.Jokes}
        component={RadienceffAncienttalesJokesScreen}
        options={{tabBarIcon: makeTabIcon(1)}}
      />
      <Tab.Screen
        name={RadienceffAncienttalesRoutes.Quiz}
        component={RadienceffAncienttalesQuizScreen}
        options={{tabBarIcon: makeTabIcon(2)}}
      />
      <Tab.Screen
        name={RadienceffAncienttalesRoutes.Saved}
        component={RadienceffAncienttalesSavedScreen}
        options={{tabBarIcon: makeTabIcon(3)}}
      />
      <Tab.Screen
        name={RadienceffAncienttalesRoutes.Artifacts}
        component={RadienceffAncienttalesArtifactsScreen}
        options={{tabBarIcon: makeTabIcon(4)}}
      />
      <Tab.Screen
        name={RadienceffAncienttalesRoutes.Characters}
        component={RadienceffAncienttalesCharactersScreen}
        options={{tabBarIcon: makeTabIcon(5)}}
      />
    </Tab.Navigator>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesTabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: radienceffAncienttalesColors.tabBar,
  },
  radienceffAncienttalesTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 0,
    borderTopColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: radienceffAncienttalesColors.transparent,
    paddingTop: radienceffAncienttalesSpacing.tabBarPaddingTop,
    paddingHorizontal: radienceffAncienttalesSpacing.tabBarPaddingX,
  },
  radienceffAncienttalesTabBarItem: {
    paddingVertical: 4.3,
  },
});

export default RadienceffAncienttalesMainTabNavigator;
