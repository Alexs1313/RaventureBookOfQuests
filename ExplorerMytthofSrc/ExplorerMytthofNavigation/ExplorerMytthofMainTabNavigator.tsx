import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View, type ImageSourcePropType} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ArtifactsScreen from '../ExplorerMytthofScreens/ExplorerMytthofArtifactsScreen';
import CharactersScreen from '../ExplorerMytthofScreens/ExplorerMytthofCharactersScreen';
import QuizScreen from '../ExplorerMytthofScreens/ExplorerMytthofQuizScreen';
import SavedScreen from '../ExplorerMytthofScreens/ExplorerMytthofSavedScreen';
import JokesScreen from '../ExplorerMytthofScreens/ExplorerMytthofJokesScreen';
import TalesScreen from '../ExplorerMytthofScreens/ExplorerMytthofTalesScreen';
import {mediaRegistry} from '../ExplorerMytthofAssets';
import {colors, spacing} from '../ExplorerMytthofPalette';

import AnimatedTabBarButton from './ExplorerMytthofAnimatedTabBarButton';
import AnimatedTabIcon from './ExplorerMytthofAnimatedTabIcon';
import {Routes} from './ExplorerMytthofRoutes';
import type {MainTabParamList} from './ExplorerMytthofTypes';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: ImageSourcePropType[] = [
  mediaRegistry.tabs.tales,
  mediaRegistry.tabs.jokes,
  mediaRegistry.tabs.quiz,
  mediaRegistry.tabs.saved,
  mediaRegistry.tabs.artifacts,
  mediaRegistry.tabs.characters,
];

const makeTabIcon =
  (index: number) =>
  ({focused}: {focused: boolean}) =>
    <AnimatedTabIcon focused={focused} source={tabIcons[index]} />;

const TabBarBackground = () => <View style={explorerMytthofStyles.explorerMytthofTabBarBg} />;

const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: props => <AnimatedTabBarButton {...props} />,
        tabBarStyle: [
          explorerMytthofStyles.explorerMytthofTabBar,
          {
            paddingBottom: Math.max(insets.bottom, spacing.tabBarMinInset),
          },
          {
            height:
              spacing.tabBarHeight +
              Math.max(insets.bottom, spacing.tabBarMinInset),
          },
        ],
        tabBarItemStyle: explorerMytthofStyles.explorerMytthofTabBarItem,
        tabBarBackground: TabBarBackground,
      }}>
      <Tab.Screen
        name={Routes.Tales}
        component={TalesScreen}
        options={{tabBarIcon: makeTabIcon(0)}}
      />
      <Tab.Screen
        name={Routes.Jokes}
        component={JokesScreen}
        options={{tabBarIcon: makeTabIcon(1)}}
      />
      <Tab.Screen
        name={Routes.Quiz}
        component={QuizScreen}
        options={{tabBarIcon: makeTabIcon(2)}}
      />
      <Tab.Screen
        name={Routes.Saved}
        component={SavedScreen}
        options={{tabBarIcon: makeTabIcon(3)}}
      />
      <Tab.Screen
        name={Routes.Artifacts}
        component={ArtifactsScreen}
        options={{tabBarIcon: makeTabIcon(4)}}
      />
      <Tab.Screen
        name={Routes.Characters}
        component={CharactersScreen}
        options={{tabBarIcon: makeTabIcon(5)}}
      />
    </Tab.Navigator>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofTabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.tabBar,
  },
  explorerMytthofTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 0,
    borderTopColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: colors.transparent,
    paddingTop: spacing.tabBarPaddingTop,
    paddingHorizontal: spacing.tabBarPaddingX,
  },
  explorerMytthofTabBarItem: {
    paddingVertical: 4.3,
  },
});

export default MainTabNavigator;
