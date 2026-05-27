import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {radienceffAncienttalesAnimationDurations, radienceffAncienttalesAnimationEasing} from '../RadienceffAncienttalesLoungeKit/RadienceffAncienttalesAnimations';
import {radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesAnimatedProgressBarProps = {
  progress: number;
};

const RadienceffAncienttalesAnimatedProgressBar = ({progress}: RadienceffAncienttalesAnimatedProgressBarProps) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const clamped = Math.min(Math.max(progress, 0), 1);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: clamped,
      duration: radienceffAncienttalesAnimationDurations.normal,
      easing: radienceffAncienttalesAnimationEasing.inOut,
      useNativeDriver: false,
    }).start();
  }, [clamped, widthAnim]);

  const width = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['4%', '100%'],
  });

  return (
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesTrack}>
      <Animated.View style={[radienceffAncienttalesStyles.radienceffAncienttalesFillWrap, {width}]}>
        <LinearGradient
          colors={radienceffAncienttalesGradients.primary}
          start={radienceffAncienttalesGradientAxis.horizontal.start}
          end={radienceffAncienttalesGradientAxis.horizontal.end}
          style={radienceffAncienttalesStyles.radienceffAncienttalesFill}
        />
      </Animated.View>
    </View>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesTrack: {
    height: 6.2,
    borderRadius: 4.3,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    overflow: 'hidden',
    marginBottom: 16.4,
  },
  radienceffAncienttalesFillWrap: {
    height: '100%',
    minWidth: 4,
  },
  radienceffAncienttalesFill: {
    flex: 1,
    borderRadius: 4.3,
  },
});

export default RadienceffAncienttalesAnimatedProgressBar;
