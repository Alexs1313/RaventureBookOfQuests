import React, {useEffect, useRef} from 'react';
import {Animated, type StyleProp, type ViewStyle} from 'react-native';

import {radienceffAncienttalesAnimationDurations, radienceffAncienttalesAnimationEasing} from '../RadienceffAncienttalesLoungeKit/RadienceffAncienttalesAnimations';

type RadienceffAncienttalesFadeInViewProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  offsetY?: number;
  style?: StyleProp<ViewStyle>;

  triggerKey?: string | number;
};

const RadienceffAncienttalesFadeInView = ({
  children,
  delay = 0,
  duration = radienceffAncienttalesAnimationDurations.normal,
  offsetY = 14,
  style,
  triggerKey,
}: RadienceffAncienttalesFadeInViewProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(offsetY)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(offsetY);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: radienceffAncienttalesAnimationEasing.out,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        speed: 14,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, duration, offsetY, opacity, translateY, triggerKey]);

  return (
    <Animated.View style={[style, {opacity, transform: [{translateY}]}]}>
      {children}
    </Animated.View>
  );
};

export default RadienceffAncienttalesFadeInView;
