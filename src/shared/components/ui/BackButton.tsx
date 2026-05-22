import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

import {ravenQuestAssets} from '../../constants';
import {colors} from '../../theme';

type BackButtonProps = {
  onPress: () => void;
};

const BackButton = ({onPress}: BackButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.btn, pressed && styles.pressed]}>
    <Image source={ravenQuestAssets.icons.back} />
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    width: 40.2,
    height: 40.4,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});

export default BackButton;
