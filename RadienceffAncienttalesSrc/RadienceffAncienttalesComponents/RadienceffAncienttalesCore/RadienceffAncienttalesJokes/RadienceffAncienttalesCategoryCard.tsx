import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {RadienceffAncienttalesJokeCategory} from '../RadienceffAncienttalesTypes';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';
import RadienceffAncienttalesGradientButton from '../RadienceffAncienttalesUiKit/RadienceffAncienttalesGradientButton';
import RadienceffAncienttalesRegionBadge from '../RadienceffAncienttalesUiKit/RadienceffAncienttalesRegionBadge';

type RadienceffAncienttalesCategoryCardProps = {
  category: RadienceffAncienttalesJokeCategory;
  onOpen: () => void;
};

const RadienceffAncienttalesCategoryCard = ({category, onOpen}: RadienceffAncienttalesCategoryCardProps) => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesCard}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesImageWrap}>
      <ImageBackground
        source={category.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={radienceffAncienttalesGradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <RadienceffAncienttalesRegionBadge
        region={category.localeTag}
        style={radienceffAncienttalesStyles.radienceffAncienttalesBadgePos}
      />
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesTitle}>
        {category.localeTag}
      </Text>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDesc}>
        {category.teaser}
      </Text>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesCount}>
        {category.jokes.length} jokes
      </Text>
      <RadienceffAncienttalesGradientButton label="Open" onPress={onOpen} flex />
    </View>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardStrong,
    marginBottom: 16.4,
  },
  radienceffAncienttalesImageWrap: {
    height: 192.3,
    position: 'relative',
  },
  radienceffAncienttalesBadgePos: {
    position: 'absolute',
    top: 16.2,
    right: 16.4,
  },
  radienceffAncienttalesBody: {
    padding: 24.4,
    gap: 8.3,
  },
  radienceffAncienttalesTitle: radienceffAncienttalesTypography.cardTitle,
  radienceffAncienttalesDesc: radienceffAncienttalesTypography.cardBody,
  radienceffAncienttalesCount: {
    ...radienceffAncienttalesTypography.cardBody,
    color: radienceffAncienttalesColors.textMuted,
    marginBottom: 4.2,
  },
});

export default RadienceffAncienttalesCategoryCard;
