import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from 'react-native';

type AnncintTlllsmythhhsAnimatedTabIconProps = {
  focused: boolean;
  source: ImageSourcePropType;
};

const AnncintTlllsmythhhsAnimatedTabIcon = ({
  focused,
  source,
}: AnncintTlllsmythhhsAnimatedTabIconProps) => {
  const scale = useRef(new Animated.Value(focused ? 1 : 0.92)).current;
  const bgOpacity = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1 : 0.92,
        useNativeDriver: true,
        speed: 22,
        bounciness: focused ? 6 : 0,
      }),
      Animated.timing(bgOpacity, {
        toValue: focused ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bgOpacity, focused, scale]);

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[styles.iconBg, {opacity: bgOpacity}]}
        pointerEvents="none"
      />
      <Animated.View style={{transform: [{scale}]}}>
        <Image
          source={source}
          resizeMode="contain"
          style={styles.iconImage}
          tintColor={focused ? '#1A0F0A' : '#D4A57499'}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
  },
  iconBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 21,
    backgroundColor: '#D4763E',
  },
  iconImage: {
    width: 26,
    height: 26,
  },
});

export default AnncintTlllsmythhhsAnimatedTabIcon;
