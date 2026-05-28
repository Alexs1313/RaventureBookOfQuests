import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {colors, typography} from '../../anccpalEEtr';

type RegionBadgeProps = {
  region: string;
  muted?: boolean;
  style?: StyleProp<ViewStyle>;
};

const RegionBadge = ({region, muted, style}: RegionBadgeProps) => (
  <View style={[muted ? styles.muted : styles.badge, style]}>
    <Text style={muted ? styles.mutedText : styles.text}>{region}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.2,
    borderRadius: 20.4,
  },
  muted: {
    backgroundColor: colors.badgeMuted,
    paddingHorizontal: 12.4,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  text: typography.regionBadge,
  mutedText: {
    ...typography.regionBadge,
    color: colors.textMutedSoft,
  },
});

export default RegionBadge;
