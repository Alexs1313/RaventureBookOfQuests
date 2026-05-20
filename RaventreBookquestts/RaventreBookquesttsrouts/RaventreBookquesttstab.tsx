// Tabs

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, StyleSheet, View, type ImageSourcePropType} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import RaventreBookquesttsstrs from '../RaventreBookquesttscrns/RaventreBookquesttsstrs';
import RaventreBookquesttssaved from '../RaventreBookquesttscrns/RaventreBookquesttssaved';
import RaventreBookquesttsquiz from '../RaventreBookquesttscrns/RaventreBookquesttsquiz';
import RaventreBookquesttscharct from '../RaventreBookquesttscrns/RaventreBookquesttscharct';
import RaventreBookquesttsarfcts from '../RaventreBookquesttscrns/RaventreBookquesttsarfcts';

const Tab = createBottomTabNavigator();

const raventreBookquesttsTabActiveIconColor = '#1A0F0A';
const raventreBookquesttsTabIdleIconColor = '#D4A57499';

const raventreBookquesttsTabIcons = [
  require('../../assets/img/raventrebooktab1.png'),
  require('../../assets/img/raventrebooktab2.png'),
  require('../../assets/img/raventrebooktab3.png'),
  require('../../assets/img/raventrebooktab4.png'),
  require('../../assets/img/raventrebooktab5.png'),
] as const;

const RaventreBookquesttsTabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => {
  return (
    <View
      style={[
        styles.raventreBookquesttsTabIconWrap,
        focused && styles.raventreBookquesttsTabIconWrapActive,
      ]}>
      <Image
        source={source}
        resizeMode="contain"
        style={styles.raventreBookquesttsTabIconImage}
        tintColor={
          focused
            ? raventreBookquesttsTabActiveIconColor
            : raventreBookquesttsTabIdleIconColor
        }
      />
    </View>
  );
};

const raventreBookquesttsMakeTabIcon =
  (raventreBookquesttsIconIndex: number) =>
  ({focused}: {focused: boolean}) =>
    (
      <RaventreBookquesttsTabIcon
        focused={focused}
        source={raventreBookquesttsTabIcons[raventreBookquesttsIconIndex]}
      />
    );

const RaventreBookquesttsTabBarBackground = () => (
  <View style={styles.raventreBookquesttsTabBarBg} />
);

const RaventreBookquesttstab = () => {
  const raventreBookquesttsInsets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.raventreBookquesttsTabBar,
          {paddingBottom: Math.max(raventreBookquesttsInsets.bottom, 12)},
          {height: 56 + Math.max(raventreBookquesttsInsets.bottom, 12)},
        ],
        tabBarItemStyle: styles.raventreBookquesttsTabBarItem,
        tabBarBackground: RaventreBookquesttsTabBarBackground,
      }}>
      <Tab.Screen
        name="RaventreBookquesttsstrs"
        component={RaventreBookquesttsstrs}
        options={{tabBarIcon: raventreBookquesttsMakeTabIcon(0)}}
      />
      <Tab.Screen
        name="RaventreBookquesttssaved"
        component={RaventreBookquesttssaved}
        options={{tabBarIcon: raventreBookquesttsMakeTabIcon(1)}}
      />
      <Tab.Screen
        name="RaventreBookquesttsquiz"
        component={RaventreBookquesttsquiz}
        options={{tabBarIcon: raventreBookquesttsMakeTabIcon(2)}}
      />
      <Tab.Screen
        name="RaventreBookquesttscharct"
        component={RaventreBookquesttscharct}
        options={{tabBarIcon: raventreBookquesttsMakeTabIcon(3)}}
      />
      <Tab.Screen
        name="RaventreBookquesttsarfcts"
        component={RaventreBookquesttsarfcts}
        options={{tabBarIcon: raventreBookquesttsMakeTabIcon(4)}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  raventreBookquesttsTabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3D2013',
  },
  raventreBookquesttsTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 1,
    borderTopColor: '#D4763E33',
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  raventreBookquesttsTabBarItem: {
    paddingVertical: 4,
  },
  raventreBookquesttsTabIconWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  raventreBookquesttsTabIconWrapActive: {
    backgroundColor: '#D4763E',
  },
  raventreBookquesttsTabIconImage: {
    width: 26,
    height: 26,
  },
});

export default RaventreBookquesttstab;
