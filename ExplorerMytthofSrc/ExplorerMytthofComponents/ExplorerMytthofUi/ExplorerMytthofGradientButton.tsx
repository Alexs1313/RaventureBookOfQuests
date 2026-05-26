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

import {colors, gradients, gradientAxis} from '../../ExplorerMytthofPalette';

type GradientButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  tall?: boolean;
  flex?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GradientButton = ({
  label,
  onPress,
  style,
  disabled,
  icon,
  tall,
  flex,
}: GradientButtonProps) => {
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
        explorerMytthofStyles.explorerMytthofPress,
        flex && explorerMytthofStyles.explorerMytthofFlex,
        disabled && explorerMytthofStyles.explorerMytthofDisabled,
        {transform: [{scale}]},
      ]}>
      <LinearGradient
        colors={gradients.primary}
        start={gradientAxis.horizontal.start}
        end={gradientAxis.horizontal.end}
        style={[explorerMytthofStyles.explorerMytthofBtn, tall && explorerMytthofStyles.explorerMytthofTall, style]}>
        {icon ? (
          <View style={explorerMytthofStyles.explorerMytthofIconRow}>
            <Image source={icon} />
            <Text style={explorerMytthofStyles.explorerMytthofText}>{label}</Text>
          </View>
        ) : (
          <Text style={explorerMytthofStyles.explorerMytthofText}>{label}</Text>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofPress: {
    borderRadius: 20.4,
    overflow: 'hidden',
  },
  explorerMytthofFlex: {
    flex: 1,
  },
  explorerMytthofBtn: {
    minHeight: 48.3,
    borderRadius: 20.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofTall: {
    minHeight: 80.2,
  },
  explorerMytthofIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.3,
  },
  explorerMytthofText: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofDisabled: {
    opacity: 0.45,
  },
});

export default GradientButton;
