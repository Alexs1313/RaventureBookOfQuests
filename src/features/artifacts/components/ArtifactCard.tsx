import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import type {LegendsaventurebkkArtifact} from '../../../shared/types';
import {colors, typography} from '../../../shared/theme';
import RegionBadge from '../../../shared/components/ui/RegionBadge';

type ArtifactCardProps = {
  artifact: LegendsaventurebkkArtifact;
  width: number;
};

const ArtifactCard = ({artifact, width}: ArtifactCardProps) => (
  <View style={[styles.card, {width}]}>
    <View style={styles.imageWrap}>
      <Image
        source={artifact.legendsaventurebkkImage}
        style={styles.image}
        resizeMode="contain"
      />
      <RegionBadge
        region={artifact.legendsaventurebkkRegion}
        style={styles.badgePos}
      />
    </View>
    <View style={styles.body}>
      <Text style={styles.name}>{artifact.legendsaventurebkkName}</Text>
      <Text style={styles.desc}>{artifact.legendsaventurebkkDescription}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 4.1,
  },
  imageWrap: {
    height: 148.2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '72%',
    height: '88%',
    marginTop: 25.3,
  },
  badgePos: {
    position: 'absolute',
    top: 8.4,
    right: 8.5,
  },
  body: {
    paddingHorizontal: 12.5,
    paddingBottom: 14.1,
    paddingTop: 10.2,
    gap: 6.3,
  },
  name: {
    color: colors.gold,
    fontSize: 14.4,
    fontWeight: '500',
    lineHeight: 20.5,
  },
  desc: {
    color: colors.textMuted,
    fontSize: 10.1,
    lineHeight: 14.2,
  },
});

export default ArtifactCard;
