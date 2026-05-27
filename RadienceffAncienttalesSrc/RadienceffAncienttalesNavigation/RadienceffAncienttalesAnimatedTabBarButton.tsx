import type {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  type StyleProp,
  type View,
  type ViewStyle,
} from 'react-native';

const RadienceffAncienttalesAnimatedTabBarButton = ({
  children,
  style,
  onPressIn,
  onPressOut,
  ref: tabRef,
  ...rest
}: BottomTabBarButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn: BottomTabBarButtonProps['onPressIn'] = event => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 48,
      bounciness: 0,
    }).start();
    onPressIn?.(event);
  };

  const handlePressOut: BottomTabBarButtonProps['onPressOut'] = event => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 7,
    }).start();
    onPressOut?.(event);
  };

  return (
    <Pressable
      {...rest}
      ref={tabRef as React.RefObject<View> | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[radienceffAncienttalesStyles.radienceffAncienttalesButton, style as StyleProp<ViewStyle>]}>
      <Animated.View style={[radienceffAncienttalesStyles.radienceffAncienttalesContent, {transform: [{scale}]}]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadienceffAncienttalesAnimatedTabBarButton;
