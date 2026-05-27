import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
} from 'react-native';

import {radienceffAncienttalesColors} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

type RadienceffAncienttalesAnimatedTabIconProps = {
  focused: boolean;
  source: ImageSourcePropType;
};

const RadienceffAncienttalesAnimatedTabIcon = ({focused, source}: RadienceffAncienttalesAnimatedTabIconProps) => {
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
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesWrap}>
      <Animated.View
        style={[radienceffAncienttalesStyles.radienceffAncienttalesIconBg, {opacity: bgOpacity}]}
        pointerEvents="none"
      />
      <Animated.View style={{transform: [{scale}]}}>
        <Image
          source={source}
          resizeMode="contain"
          style={radienceffAncienttalesStyles.radienceffAncienttalesIconImage}
          tintColor={focused ? radienceffAncienttalesColors.tabActive : radienceffAncienttalesColors.tabIdle}
        />
      </Animated.View>
    </View>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesWrap: {
    width: 48.1,
    height: 48.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20.5,
  },
  radienceffAncienttalesIconBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20.5,
    backgroundColor: radienceffAncienttalesColors.accent,
  },
  radienceffAncienttalesIconImage: {
    width: 26.2,
    height: 26.4,
  },
});

export default RadienceffAncienttalesAnimatedTabIcon;
