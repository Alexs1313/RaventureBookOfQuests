import React from 'react';
import {StyleSheet, Text, View, type StyleProp, type ViewStyle} from 'react-native';

import {radienceffAncienttalesColors, radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';

type RadienceffAncienttalesRegionBadgeProps = {
  region: string;
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
};

const RadienceffAncienttalesRegionBadge = ({region, muted, style}: RadienceffAncienttalesRegionBadgeProps) => (
  <View style={[muted ? radienceffAncienttalesStyles.radienceffAncienttalesMuted : radienceffAncienttalesStyles.radienceffAncienttalesBadge, style]}>
    <Text style={muted ? radienceffAncienttalesStyles.radienceffAncienttalesMutedText : radienceffAncienttalesStyles.radienceffAncienttalesText}>{region}</Text>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesBadge: {
    backgroundColor: radienceffAncienttalesColors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.2,
    borderRadius: 20.4,
  },
  radienceffAncienttalesMuted: {
    backgroundColor: radienceffAncienttalesColors.badgeMuted,
    paddingHorizontal: 12.4,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  radienceffAncienttalesText: radienceffAncienttalesTypography.regionBadge,
  radienceffAncienttalesMutedText: {
    ...radienceffAncienttalesTypography.regionBadge,
    color: radienceffAncienttalesColors.textMutedSoft,
  },
});

export default RadienceffAncienttalesRegionBadge;
