import React, {useEffect, useRef} from 'react';
import {Animated, type StyleProp, type ViewStyle} from 'react-native';

import {animationDurations, animationEasing} from '../../loungeKit/animations';

type FadeInViewProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  offsetY?: number;
  style?: StyleProp<ViewStyle>;

  triggerKey?: string | number;
};

const FadeInView = ({
  children,
  delay = 0,
  duration = animationDurations.normal,
  offsetY = 14,
  style,
  triggerKey,
}: FadeInViewProps) => {
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
        easing: animationEasing.out,
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

export default FadeInView;
