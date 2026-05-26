import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {JokeCategory} from '../../ExplorerMytthofTypes';
import {colors, gradients, typography} from '../../ExplorerMytthofPalette';
import GradientButton from '../ExplorerMytthofUi/ExplorerMytthofGradientButton';
import RegionBadge from '../ExplorerMytthofUi/ExplorerMytthofRegionBadge';

type CategoryCardProps = {
  category: JokeCategory;
  onOpen: () => void;
};

const CategoryCard = ({category, onOpen}: CategoryCardProps) => (
  <View style={explorerMytthofStyles.explorerMytthofCard}>
    <View style={explorerMytthofStyles.explorerMytthofImageWrap}>
      <ImageBackground
        source={category.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradients.storyCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <RegionBadge
        region={category.localeTag}
        style={explorerMytthofStyles.explorerMytthofBadgePos}
      />
    </View>
    <View style={explorerMytthofStyles.explorerMytthofBody}>
      <Text style={explorerMytthofStyles.explorerMytthofTitle}>
        {category.localeTag}
      </Text>
      <Text style={explorerMytthofStyles.explorerMytthofDesc}>
        {category.teaser}
      </Text>
      <Text style={explorerMytthofStyles.explorerMytthofCount}>
        {category.jokes.length} jokes
      </Text>
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
    gap: 8.3,
  },
  explorerMytthofTitle: typography.cardTitle,
  explorerMytthofDesc: typography.cardBody,
  explorerMytthofCount: {
    ...typography.cardBody,
    color: colors.textMuted,
    marginBottom: 4.2,
  },
});

export default CategoryCard;
