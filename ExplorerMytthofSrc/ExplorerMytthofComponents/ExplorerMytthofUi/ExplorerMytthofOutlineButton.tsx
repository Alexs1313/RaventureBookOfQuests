import React, {useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {colors} from '../../ExplorerMytthofPalette';

type OutlineButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OutlineButton = ({label, onPress, style}: OutlineButtonProps) => {
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
      style={[explorerMytthofStyles.explorerMytthofBtn, style, {transform: [{scale}]}]}>
      <Text style={explorerMytthofStyles.explorerMytthofText}>{label}</Text>
    </AnimatedPressable>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofBtn: {
    width: '100%',
    minHeight: 56.4,
    borderRadius: 20.5,
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14.2,
  },
  explorerMytthofText: {
    color: colors.text,
    fontSize: 16.3,
    fontWeight: '500',
  },
});

export default OutlineButton;
