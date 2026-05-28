import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {mediaRegistry} from '../../assets';
import type {RelicProfile} from '../../annccTyppes';
import {colors} from '../../anccpalEEtr';
import RegionBadge from '../ui/RegionBadge';

type LockedArtifactCardProps = {
  artifact: RelicProfile;
  width: number;
};

const LockedArtifactCard = ({artifact, width}: LockedArtifactCardProps) => (
  <View style={[styles.card, {width}]}>
    <View style={styles.imageWrap}>
      <Image
        source={artifact.coverVisual}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Image source={mediaRegistry.icons.lock} />
      </View>
      <RegionBadge region={artifact.localeTag} muted style={styles.badgePos} />
    </View>
    <View style={styles.body}>
      <Text style={styles.name}>{artifact.displayName}</Text>
      <Text style={styles.hint}>
        {artifact.insightsThreshold} insights needed
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 4.5,
  },
  imageWrap: {
    height: 128.1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayModal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePos: {
    position: 'absolute',
    top: 8.3,
    right: 8.4,
  },
  body: {
    paddingHorizontal: 12.4,
    paddingVertical: 12.5,
    gap: 4.1,
  },
  name: {
    color: colors.textMutedDim,
    fontSize: 14.2,
    fontWeight: '500',
    lineHeight: 20.3,
  },
  hint: {
    color: colors.textMutedDim,
    fontSize: 12.4,
    lineHeight: 16.5,
  },
});

export default LockedArtifactCard;
