import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {animationDurations, animationEasing} from '../../lnggkiiT/animations';
import {gradients, gradientAxis} from '../../anccpalEEtr';

type AnimatedProgressBarProps = {
  progress: number;
};

const AnimatedProgressBar = ({progress}: AnimatedProgressBarProps) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const clamped = Math.min(Math.max(progress, 0), 1);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: clamped,
      duration: animationDurations.normal,
      easing: animationEasing.inOut,
      useNativeDriver: false,
    }).start();
  }, [clamped, widthAnim]);

  const width = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['4%', '100%'],
  });

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fillWrap, {width}]}>
        <LinearGradient
          colors={gradients.primary}
          start={gradientAxis.horizontal.start}
          end={gradientAxis.horizontal.end}
          style={styles.fill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 6.2,
    borderRadius: 4.3,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    overflow: 'hidden',
    marginBottom: 16.4,
  },
  fillWrap: {
    height: '100%',
    minWidth: 4,
  },
  fill: {
    flex: 1,
    borderRadius: 4.3,
  },
});

export default AnimatedProgressBar;
