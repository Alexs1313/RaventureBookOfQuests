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

import {colors, gradients, gradientAxis} from '../../theme';

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
        styles.press,
        flex && styles.flex,
        disabled && styles.disabled,
        {transform: [{scale}]},
      ]}>
      <LinearGradient
        colors={gradients.primary}
        start={gradientAxis.horizontal.start}
        end={gradientAxis.horizontal.end}
        style={[styles.btn, tall && styles.tall, style]}>
        {icon ? (
          <View style={styles.iconRow}>
            <Image source={icon} />
            <Text style={styles.text}>{label}</Text>
          </View>
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  press: {
    borderRadius: 20.4,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  btn: {
    minHeight: 48.3,
    borderRadius: 20.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tall: {
    minHeight: 80.2,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.3,
  },
  text: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
});

export default GradientButton;
