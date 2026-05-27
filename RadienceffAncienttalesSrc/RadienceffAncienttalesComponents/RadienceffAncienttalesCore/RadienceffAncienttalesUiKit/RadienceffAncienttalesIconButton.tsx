import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';

import {radienceffAncienttalesColors} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesIconButtonProps = {
  source: ImageSourcePropType;
  onPress: () => void;
  variant: 'delete' | 'share';
};

const RadienceffAncienttalesIconButton = ({source, onPress, variant}: RadienceffAncienttalesIconButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      variant === 'delete' ? radienceffAncienttalesStyles.radienceffAncienttalesDelete : radienceffAncienttalesStyles.radienceffAncienttalesShare,
      pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressed,
    ]}>
    <Image source={source} />
  </Pressable>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesDelete: {
    width: 48.2,
    height: 48.4,
    borderRadius: 20.3,
    backgroundColor: radienceffAncienttalesColors.dangerBg,
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesShare: {
    width: 48.1,
    height: 48.3,
    borderRadius: 20.5,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesPressed: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesIconButton;
