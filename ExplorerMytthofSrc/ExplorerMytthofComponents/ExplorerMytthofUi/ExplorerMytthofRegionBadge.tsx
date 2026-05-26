import React from 'react';
import {StyleSheet, Text, View, type StyleProp, type ViewStyle} from 'react-native';

import {colors, typography} from '../../ExplorerMytthofPalette';

type RegionBadgeProps = {
  region: string;
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
};

const RegionBadge = ({region, muted, style}: RegionBadgeProps) => (
  <View style={[muted ? explorerMytthofStyles.explorerMytthofMuted : explorerMytthofStyles.explorerMytthofBadge, style]}>
    <Text style={muted ? explorerMytthofStyles.explorerMytthofMutedText : explorerMytthofStyles.explorerMytthofText}>{region}</Text>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofBadge: {
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.2,
    borderRadius: 20.4,
  },
  explorerMytthofMuted: {
    backgroundColor: colors.badgeMuted,
    paddingHorizontal: 12.4,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  explorerMytthofText: typography.regionBadge,
  explorerMytthofMutedText: {
    ...typography.regionBadge,
    color: colors.textMutedSoft,
  },
});

export default RegionBadge;
