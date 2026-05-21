import React from 'react';
import {Pressable, StyleSheet, Text, type StyleProp, type ViewStyle} from 'react-native';

import {colors} from '../../theme';

type OutlineButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const OutlineButton = ({label, onPress, style}: OutlineButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.btn, style, pressed && styles.pressed]}>
    <Text style={styles.text}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
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
  text: {
    color: colors.text,
    fontSize: 16.3,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.85,
  },
});

export default OutlineButton;
