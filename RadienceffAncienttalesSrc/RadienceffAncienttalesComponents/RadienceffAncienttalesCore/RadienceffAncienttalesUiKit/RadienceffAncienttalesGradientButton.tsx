import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesGradientButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  tall?: boolean;
  flex?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RadienceffAncienttalesGradientButton = ({
  label,
  onPress,
  style,
  disabled,
  icon,
  tall,
  flex,
}: RadienceffAncienttalesGradientButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 28,
      bounciness: value < 1 ? 0 : 6,
    }).start();
  };

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => !disabled && animateTo(0.96)}
      onPressOut={() => animateTo(1)}
      style={[
        radienceffAncienttalesStyles.radienceffAncienttalesPress,
        flex && radienceffAncienttalesStyles.radienceffAncienttalesFlex,
        disabled && radienceffAncienttalesStyles.radienceffAncienttalesDisabled,
        {transform: [{scale}]},
      ]}>
      <LinearGradient
        colors={radienceffAncienttalesGradients.primary}
        start={radienceffAncienttalesGradientAxis.horizontal.start}
        end={radienceffAncienttalesGradientAxis.horizontal.end}
        style={[radienceffAncienttalesStyles.radienceffAncienttalesBtn, tall && radienceffAncienttalesStyles.radienceffAncienttalesTall, style]}>
        {icon ? (
          <View style={radienceffAncienttalesStyles.radienceffAncienttalesIconRow}>
            <Image source={icon} />
            <Text style={radienceffAncienttalesStyles.radienceffAncienttalesText}>{label}</Text>
          </View>
        ) : (
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesText}>{label}</Text>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesPress: {
    borderRadius: 20.4,
    overflow: 'hidden',
  },
  radienceffAncienttalesFlex: {
    flex: 1,
  },
  radienceffAncienttalesBtn: {
    minHeight: 48.3,
    borderRadius: 20.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesTall: {
    minHeight: 80.2,
  },
  radienceffAncienttalesIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.3,
  },
  radienceffAncienttalesText: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesDisabled: {
    opacity: 0.45,
  },
});

export default RadienceffAncienttalesGradientButton;
