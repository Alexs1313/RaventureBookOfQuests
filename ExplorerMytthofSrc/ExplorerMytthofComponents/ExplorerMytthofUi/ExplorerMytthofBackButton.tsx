import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

import {mediaRegistry} from '../../ExplorerMytthofAssets';
import {colors} from '../../ExplorerMytthofPalette';

type BackButtonProps = {
  onPress: () => void;
};

const BackButton = ({onPress}: BackButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [explorerMytthofStyles.explorerMytthofBtn, pressed && explorerMytthofStyles.explorerMytthofPressed]}>
    <Image source={mediaRegistry.icons.back} />
  </Pressable>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofBtn: {
    width: 40.2,
    height: 40.4,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofPressed: {
    opacity: 0.85,
  },
});

export default BackButton;
