import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';

import {radienceffAncienttalesColors} from '../RadienceffAncienttalesPalette';

const PAGE_COUNT = 5;

const RadienceffAncienttalesBookPageLoader = () => {
  const flip = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(flip, {
        toValue: PAGE_COUNT,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [flip]);

  return (
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesWrap}>
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesBook}>
        {Array.from({length: PAGE_COUNT}, (_, index) => {
          const inputRange = [index - 1, index, index + 1];
          const rotateY = flip.interpolate({
            inputRange,
            outputRange: ['0deg', '-72deg', '-72deg'],
            extrapolate: 'clamp',
          });
          const opacity = flip.interpolate({
            inputRange,
            outputRange: [1, 0.35, 0.35],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                radienceffAncienttalesStyles.radienceffAncienttalesPage,
                {
                  zIndex: PAGE_COUNT - index,
                  opacity,
                  transform: [
                    {perspective: 800},
                    {rotateY},
                    {translateX: index * 2},
                  ],
                },
              ]}
            />
          );
        })}
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesSpine} />
      </View>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesCaption}>Opening the book…</Text>
    </View>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  radienceffAncienttalesBook: {
    width: 112,
    height: 84,
    borderRadius: 10,
    backgroundColor: radienceffAncienttalesColors.accent,
    overflow: 'hidden',
    shadowColor: radienceffAncienttalesColors.brown,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  radienceffAncienttalesPage: {
    position: 'absolute',
    left: 8,
    top: 6,
    width: 88,
    height: 72,
    borderRadius: 4,
    backgroundColor: radienceffAncienttalesColors.surface,
    borderWidth: 1,
    borderColor: radienceffAncienttalesColors.border,
    transformOrigin: 'left center',
  },
  radienceffAncienttalesSpine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: radienceffAncienttalesColors.brown,
    opacity: 0.85,
  },
  radienceffAncienttalesCaption: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: '600',
    color: radienceffAncienttalesColors.textMuted,
    letterSpacing: 0.3,
  },
});

export default RadienceffAncienttalesBookPageLoader;
