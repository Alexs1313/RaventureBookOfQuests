import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {anncintTlllsmythhhsSpacing} from '../AnncintTlllsmythhhsCore';
import AnncintTlllsmythhhsTalesScreen from '../AnncintTlllsmythhhsTalesScreen';
import AnncintTlllsmythhhsMapScreen from '../AnncintTlllsmythhhsMapScreen';
import AnncintTlllsmythhhsJokesScreen from '../AnncintTlllsmythhhsJokesScreen';
import AnncintTlllsmythhhsQuizScreen from '../AnncintTlllsmythhhsQuizScreen';
import AnncintTlllsmythhhsSavedScreen from '../AnncintTlllsmythhhsSavedScreen';
import AnncintTlllsmythhhsArtifactsScreen from '../AnncintTlllsmythhhsArtifactsScreen';
import AnncintTlllsmythhhsAnimatedTabBarButton from './AnncintTlllsmythhhsAnimatedTabBarButton';
import {
  AnncintTlllsmythhhsRoutes,
  type AnncintTlllsmythhhsMainTabParamList,
} from './AnncintTlllsmythhhsRoutes';

const Tab = createBottomTabNavigator<AnncintTlllsmythhhsMainTabParamList>();

const tabEmojis = ['📖', '🗺️', '😄', '🧩', '🔖', '🏺'] as const;

const AnncintTlllsmythhhsTabEmoji = ({
  emoji,
  focused,
}: {
  emoji: string;
  focused: boolean;
}) => (
  <View style={styles.emojiWrap}>
    {focused ? <View style={styles.emojiBg} pointerEvents="none" /> : null}
    <Text style={[styles.emoji, focused && styles.emojiActive]}>{emoji}</Text>
  </View>
);

const makeTabIcon =
  (index: number) =>
  ({focused}: {focused: boolean}) =>
    <AnncintTlllsmythhhsTabEmoji emoji={tabEmojis[index]} focused={focused} />;

const TabBarBackground = () => <View style={styles.tabBarBg} />;

const AnncintTlllsmythhhsTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, anncintTlllsmythhhsSpacing.tabBarMinInset);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: props => <AnncintTlllsmythhhsAnimatedTabBarButton {...props} />,
        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: bottomInset,
            height: anncintTlllsmythhhsSpacing.tabBarHeight + bottomInset,
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarBackground: TabBarBackground,
      }}>
      <Tab.Screen
        name={AnncintTlllsmythhhsRoutes.Tales}
        component={AnncintTlllsmythhhsTalesScreen}
        options={{tabBarIcon: makeTabIcon(0)}}
      />
      <Tab.Screen
        name={AnncintTlllsmythhhsRoutes.Map}
        component={AnncintTlllsmythhhsMapScreen}
        options={{tabBarIcon: makeTabIcon(1)}}
      />
      <Tab.Screen
        name={AnncintTlllsmythhhsRoutes.Jokes}
        component={AnncintTlllsmythhhsJokesScreen}
        options={{tabBarIcon: makeTabIcon(2)}}
      />
      <Tab.Screen
        name={AnncintTlllsmythhhsRoutes.Quiz}
        component={AnncintTlllsmythhhsQuizScreen}
        options={{tabBarIcon: makeTabIcon(3)}}
      />
      <Tab.Screen
        name={AnncintTlllsmythhhsRoutes.Saved}
        component={AnncintTlllsmythhhsSavedScreen}
        options={{tabBarIcon: makeTabIcon(4)}}
      />
      <Tab.Screen
        name={AnncintTlllsmythhhsRoutes.Artifacts}
        component={AnncintTlllsmythhhsArtifactsScreen}
        options={{tabBarIcon: makeTabIcon(5)}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3D2013',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 0,
    borderTopColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  emojiWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
  },
  emojiBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 21,
    backgroundColor: '#D4763E',
  },
  emoji: {
    fontSize: 26,
    opacity: 0.55,
  },
  emojiActive: {
    opacity: 1,
  },
});

export default AnncintTlllsmythhhsTabNavigator;
