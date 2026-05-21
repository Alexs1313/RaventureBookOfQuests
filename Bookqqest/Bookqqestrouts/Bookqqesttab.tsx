// Tabs

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, StyleSheet, View, type ImageSourcePropType} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Bookqqeststrs from '../Bookqqestcrns/Bookqqeststrs';
import Bookqqestsaved from '../Bookqqestcrns/Bookqqestsaved';
import Bookqqestquiz from '../Bookqqestcrns/Bookqqestquiz';
import Bookqqestcharct from '../Bookqqestcrns/Bookqqestcharct';
import Bookqqestarfcts from '../Bookqqestcrns/Bookqqestarfcts';

const Tab = createBottomTabNavigator();

const bookqqestTabActiveIconColor = '#1A0F0A';
const bookqqestTabIdleIconColor = '#D4A57499';

const bookqqestTabIcons = [
  require('../../assets/img/bookqqestbooktab1.png'),
  require('../../assets/img/bookqqestbooktab2.png'),
  require('../../assets/img/bookqqestbooktab3.png'),
  require('../../assets/img/bookqqestbooktab4.png'),
  require('../../assets/img/bookqqestbooktab5.png'),
] as const;

const BookqqestTabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => {
  return (
    <View
      style={[
        styles.bookqqestTabIconWrap,
        focused && styles.bookqqestTabIconWrapActive,
      ]}>
      <Image
        source={source}
        resizeMode="contain"
        style={styles.bookqqestTabIconImage}
        tintColor={
          focused
            ? bookqqestTabActiveIconColor
            : bookqqestTabIdleIconColor
        }
      />
    </View>
  );
};

const bookqqestMakeTabIcon =
  (bookqqestIconIndex: number) =>
  ({focused}: {focused: boolean}) =>
    (
      <BookqqestTabIcon
        focused={focused}
        source={bookqqestTabIcons[bookqqestIconIndex]}
      />
    );

const BookqqestTabBarBackground = () => (
  <View style={styles.bookqqestTabBarBg} />
);

const Bookqqesttab = () => {
  const bookqqestInsets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.bookqqestTabBar,
          {paddingBottom: Math.max(bookqqestInsets.bottom, 12.3)},
          {height: 56.2 + Math.max(bookqqestInsets.bottom, 12.3)},
        ],
        tabBarItemStyle: styles.bookqqestTabBarItem,
        tabBarBackground: BookqqestTabBarBackground,
      }}>
      <Tab.Screen
        name="Bookqqeststrs"
        component={Bookqqeststrs}
        options={{tabBarIcon: bookqqestMakeTabIcon(0)}}
      />
      <Tab.Screen
        name="Bookqqestsaved"
        component={Bookqqestsaved}
        options={{tabBarIcon: bookqqestMakeTabIcon(1)}}
      />
      <Tab.Screen
        name="Bookqqestquiz"
        component={Bookqqestquiz}
        options={{tabBarIcon: bookqqestMakeTabIcon(2)}}
      />
      <Tab.Screen
        name="Bookqqestcharct"
        component={Bookqqestcharct}
        options={{tabBarIcon: bookqqestMakeTabIcon(3)}}
      />
      <Tab.Screen
        name="Bookqqestarfcts"
        component={Bookqqestarfcts}
        options={{tabBarIcon: bookqqestMakeTabIcon(4)}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bookqqestTabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3D2013',
  },
  bookqqestTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    borderTopWidth: 1.2,
    borderTopColor: '#D4763E33',
    backgroundColor: 'transparent',
    paddingTop: 10.4,
    paddingHorizontal: 8.2,
  },
  bookqqestTabBarItem: {
    paddingVertical: 4.3,
  },
  bookqqestTabIconWrap: {
    width: 48.1,
    height: 48.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20.5,
  },
  bookqqestTabIconWrapActive: {
    backgroundColor: '#D4763E',
  },
  bookqqestTabIconImage: {
    width: 26.2,
    height: 26.4,
  },
});

export default Bookqqesttab;
