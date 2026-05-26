import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from 'react-native';

import {colors} from '../ExplorerMytthofPalette';

type AnimatedTabIconProps = {
  focused: boolean;
  source: ImageSourcePropType;
};

const AnimatedTabIcon = ({focused, source}: AnimatedTabIconProps) => {
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
    <View style={explorerMytthofStyles.explorerMytthofWrap}>
      <Animated.View
        style={[explorerMytthofStyles.explorerMytthofIconBg, {opacity: bgOpacity}]}
        pointerEvents="none"
      />
      <Animated.View style={{transform: [{scale}]}}>
        <Image
          source={source}
          resizeMode="contain"
          style={explorerMytthofStyles.explorerMytthofIconImage}
          tintColor={focused ? colors.tabActive : colors.tabIdle}
        />
      </Animated.View>
    </View>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofWrap: {
    width: 48.1,
    height: 48.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20.5,
  },
  explorerMytthofIconBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20.5,
    backgroundColor: colors.accent,
  },
  explorerMytthofIconImage: {
    width: 26.2,
    height: 26.4,
  },
});

export default AnimatedTabIcon;
