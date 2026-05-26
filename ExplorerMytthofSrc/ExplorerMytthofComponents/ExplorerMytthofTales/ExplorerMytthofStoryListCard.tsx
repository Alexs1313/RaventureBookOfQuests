import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {ChronicleEntry} from '../../ExplorerMytthofTypes';
import {colors, gradients, typography} from '../../ExplorerMytthofPalette';
import GradientButton from '../ExplorerMytthofUi/ExplorerMytthofGradientButton';
import RegionBadge from '../ExplorerMytthofUi/ExplorerMytthofRegionBadge';

type StoryListCardProps = {
  story: ChronicleEntry;
  onOpen: () => void;
};

const StoryListCard = ({story, onOpen}: StoryListCardProps) => (
  <View style={explorerMytthofStyles.explorerMytthofCard}>
    <View style={explorerMytthofStyles.explorerMytthofImageWrap}>
      <ImageBackground
        source={story.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <RegionBadge region={story.localeTag} style={explorerMytthofStyles.explorerMytthofBadgePos} />
    </View>
    <View style={explorerMytthofStyles.explorerMytthofBody}>
      <Text style={explorerMytthofStyles.explorerMytthofTitle}>{story.headline}</Text>
      <Text style={explorerMytthofStyles.explorerMytthofDesc}>{story.synopsis}</Text>
      <GradientButton label="Open" onPress={onOpen} flex />
    </View>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 16.4,
  },
  explorerMytthofImageWrap: {
    height: 192.3,
    position: 'relative',
  },
  explorerMytthofBadgePos: {
    position: 'absolute',
    top: 16.2,
    right: 16.4,
  },
  explorerMytthofBody: {
    padding: 24.4,
    gap: 12.3,
  },
  explorerMytthofTitle: typography.cardTitle,
  explorerMytthofDesc: {
    ...typography.cardBody,
    marginBottom: 4.2,
  },
});

export default StoryListCard;
