import React from 'react';
import {
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

const GradientButton = ({
  label,
  onPress,
  style,
  disabled,
  icon,
  tall,
  flex,
}: GradientButtonProps) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({pressed}) => [
      styles.press,
      flex && styles.flex,
      disabled && styles.disabled,
      pressed && !disabled && styles.pressed,
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
  </Pressable>
);

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
  pressed: {
    opacity: 0.85,
  },
});

export default GradientButton;
