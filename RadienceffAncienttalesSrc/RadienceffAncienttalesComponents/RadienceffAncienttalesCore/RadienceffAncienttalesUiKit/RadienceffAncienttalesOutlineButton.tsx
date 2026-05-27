import React, {useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {radienceffAncienttalesColors} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesOutlineButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RadienceffAncienttalesOutlineButton = ({label, onPress, style}: RadienceffAncienttalesOutlineButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scale, {
          toValue: 0.97,
          useNativeDriver: true,
          speed: 28,
          bounciness: 0,
        }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 6,
        }).start()
      }
      style={[radienceffAncienttalesStyles.radienceffAncienttalesBtn, style, {transform: [{scale}]}]}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesText}>{label}</Text>
    </AnimatedPressable>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesBtn: {
    width: '100%',
    minHeight: 56.4,
    borderRadius: 20.5,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14.2,
  },
  radienceffAncienttalesText: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.3,
    fontWeight: '500',
  },
});

export default RadienceffAncienttalesOutlineButton;
