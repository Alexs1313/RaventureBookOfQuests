import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {ravenQuestAssets} from '../../../shared/constants';
import type {RavenQuestArtifact} from '../../../shared/types';
import {colors} from '../../../shared/theme';
import RegionBadge from '../../../shared/components/ui/RegionBadge';

type LockedArtifactCardProps = {
  artifact: RavenQuestArtifact;
  width: number;
};

const LockedArtifactCard = ({artifact, width}: LockedArtifactCardProps) => (
  <View style={[styles.card, {width}]}>
    <View style={styles.imageWrap}>
      <Image
        source={artifact.ravenQuestImage}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Image source={ravenQuestAssets.icons.lock} />
      </View>
      <RegionBadge
        region={artifact.ravenQuestRegion}
        muted
        style={styles.badgePos}
      />
    </View>
    <View style={styles.body}>
      <Text style={styles.name}>{artifact.ravenQuestName}</Text>
      <Text style={styles.hint}>
        {artifact.ravenQuestPointsRequired} insights needed
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
