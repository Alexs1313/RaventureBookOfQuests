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

const AnncintTlllsmythhhsAnimatedTabBarButton = ({
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
      style={[styles.button, style as StyleProp<ViewStyle>]}>
      <Animated.View style={[styles.content, {transform: [{scale}]}]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnncintTlllsmythhhsAnimatedTabBarButton;
