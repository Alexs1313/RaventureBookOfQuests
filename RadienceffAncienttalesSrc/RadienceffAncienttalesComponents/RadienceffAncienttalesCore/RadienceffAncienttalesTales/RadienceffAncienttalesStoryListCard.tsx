import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {RadienceffAncienttalesChronicleEntry} from '../RadienceffAncienttalesTypes';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';
import RadienceffAncienttalesGradientButton from '../RadienceffAncienttalesUiKit/RadienceffAncienttalesGradientButton';
import RadienceffAncienttalesRegionBadge from '../RadienceffAncienttalesUiKit/RadienceffAncienttalesRegionBadge';

type RadienceffAncienttalesStoryListCardProps = {
  story: RadienceffAncienttalesChronicleEntry;
  onOpen: () => void;
};

const RadienceffAncienttalesStoryListCard = ({story, onOpen}: RadienceffAncienttalesStoryListCardProps) => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesCard}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesImageWrap}>
      <ImageBackground
        source={story.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={radienceffAncienttalesGradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <RadienceffAncienttalesRegionBadge region={story.localeTag} style={radienceffAncienttalesStyles.radienceffAncienttalesBadgePos} />
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesTitle}>{story.headline}</Text>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDesc}>{story.synopsis}</Text>
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
    gap: 12.3,
  },
  radienceffAncienttalesTitle: radienceffAncienttalesTypography.cardTitle,
  radienceffAncienttalesDesc: {
    ...radienceffAncienttalesTypography.cardBody,
    marginBottom: 4.2,
  },
});

export default RadienceffAncienttalesStoryListCard;
