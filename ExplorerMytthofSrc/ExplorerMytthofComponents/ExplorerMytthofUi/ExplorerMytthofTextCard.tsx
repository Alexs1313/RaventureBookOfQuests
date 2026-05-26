import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {colors, typography} from '../../ExplorerMytthofPalette';

type TextCardProps = {
  children: string;
};

const TextCard = ({children}: TextCardProps) => (
  <View style={explorerMytthofStyles.explorerMytthofCard}>
    <Text style={explorerMytthofStyles.explorerMytthofBody}>{children}</Text>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCard: {
    borderRadius: 20.4,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  explorerMytthofBody: {
    ...typography.cardBody,
    color: colors.text,
  },
});

export default TextCard;
