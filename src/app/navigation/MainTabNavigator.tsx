import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, View, type ImageSourcePropType} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ArtifactsScreen from '../../features/artifacts/ArtifactsScreen';
import CharactersScreen from '../../features/characters/CharactersScreen';
import QuizScreen from '../../features/quiz/QuizScreen';
import SavedScreen from '../../features/saved/SavedScreen';
import TalesScreen from '../../features/tales/TalesScreen';
import {legendsaventurebkkAssets} from '../../shared/constants';
import {colors, spacing} from '../../shared/theme';

import {Routes} from './routes';
import type {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: ImageSourcePropType[] = [
  legendsaventurebkkAssets.tabs.tales,
  legendsaventurebkkAssets.tabs.saved,
  legendsaventurebkkAssets.tabs.quiz,
  legendsaventurebkkAssets.tabs.characters,
  legendsaventurebkkAssets.tabs.artifacts,
];

const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
    <Image
      source={source}
      resizeMode="contain"
      style={styles.iconImage}
      tintColor={focused ? colors.tabActive : colors.tabIdle}
    />
  </View>
);

const makeTabIcon =
  (index: number) =>
  ({focused}: {focused: boolean}) => (
    <TabIcon focused={focused} source={tabIcons[index]} />
  );

const TabBarBackground = () => <View style={styles.tabBarBg} />;

const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: Math.max(insets.bottom, spacing.tabBarMinInset),
          },
          {
            height:
              spacing.tabBarHeight +
              Math.max(insets.bottom, spacing.tabBarMinInset),
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: TabBarBackground,
      }}>
      <Tab.Screen
        name={Routes.Tales}
        component={TalesScreen}
        options={{tabBarIcon: makeTabIcon(0)}}
      />
      <Tab.Screen
        name={Routes.Saved}
        component={SavedScreen}
        options={{tabBarIcon: makeTabIcon(1)}}
      />
      <Tab.Screen
        name={Routes.Quiz}
        component={QuizScreen}
        options={{tabBarIcon: makeTabIcon(2)}}
      />
      <Tab.Screen
        name={Routes.Characters}
        component={CharactersScreen}
        options={{tabBarIcon: makeTabIcon(3)}}
      />
      <Tab.Screen
        name={Routes.Artifacts}
        component={ArtifactsScreen}
        options={{tabBarIcon: makeTabIcon(4)}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.tabBar,
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 1.2,
    borderTopColor: colors.tabBarBorder,
    backgroundColor: colors.transparent,
    paddingTop: spacing.tabBarPaddingTop,
    paddingHorizontal: spacing.tabBarPaddingX,
  },
  tabBarItem: {
    paddingVertical: 4.3,
  },
  iconWrap: {
    width: 48.1,
    height: 48.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20.5,
  },
  iconWrapActive: {
    backgroundColor: colors.accent,
  },
  iconImage: {
    width: 26.2,
    height: 26.4,
  },
});

export default MainTabNavigator;
