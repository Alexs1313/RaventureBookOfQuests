import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesAssets';
import {radienceffAncienttalesColors} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesBackButtonProps = {
  onPress: () => void;
};

const RadienceffAncienttalesBackButton = ({onPress}: RadienceffAncienttalesBackButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [radienceffAncienttalesStyles.radienceffAncienttalesBtn, pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressed]}>
    <Image source={radienceffAncienttalesMediaRegistry.icons.back} />
  </Pressable>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesBtn: {
    width: 40.2,
    height: 40.4,
    borderRadius: 20.3,
    backgroundColor: radienceffAncienttalesColors.cardOverlay,
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesPressed: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesBackButton;
