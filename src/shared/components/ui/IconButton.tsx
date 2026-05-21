import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';

import {colors} from '../../theme';

type IconButtonProps = {
  source: ImageSourcePropType;
  onPress: () => void;
  variant: 'delete' | 'share';
};

const IconButton = ({source, onPress, variant}: IconButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      variant === 'delete' ? styles.delete : styles.share,
      pressed && styles.pressed,
    ]}>
    <Image source={source} />
  </Pressable>
);

const styles = StyleSheet.create({
  delete: {
    width: 48.2,
    height: 48.4,
    borderRadius: 20.3,
    backgroundColor: colors.dangerBg,
    borderWidth: 1.2,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  share: {
    width: 48.1,
    height: 48.3,
    borderRadius: 20.5,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});

export default IconButton;
