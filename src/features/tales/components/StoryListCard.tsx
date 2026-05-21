import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {LegendsaventurebkkStory} from '../../../shared/types';
import {colors, gradients, typography} from '../../../shared/theme';
import GradientButton from '../../../shared/components/ui/GradientButton';
import RegionBadge from '../../../shared/components/ui/RegionBadge';

type StoryListCardProps = {
  story: LegendsaventurebkkStory;
  onOpen: () => void;
};

const StoryListCard = ({story, onOpen}: StoryListCardProps) => (
  <View style={styles.card}>
    <View style={styles.imageWrap}>
      <ImageBackground
        source={story.legendsaventurebkkImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <RegionBadge region={story.legendsaventurebkkRegion} style={styles.badgePos} />
    </View>
    <View style={styles.body}>
      <Text style={styles.title}>{story.legendsaventurebkkTitle}</Text>
      <Text style={styles.desc}>{story.legendsaventurebkkDescription}</Text>
      <GradientButton label="Open" onPress={onOpen} flex />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 16.4,
  },
  imageWrap: {
    height: 192.3,
    position: 'relative',
  },
  badgePos: {
    position: 'absolute',
    top: 16.2,
    right: 16.4,
  },
  body: {
    padding: 24.4,
    gap: 12.3,
  },
  title: typography.cardTitle,
  desc: {
    ...typography.cardBody,
    marginBottom: 4.2,
  },
});

export default StoryListCard;
