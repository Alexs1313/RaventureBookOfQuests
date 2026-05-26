import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {mediaRegistry} from '../../ExplorerMytthofAssets';
import type {RelicProfile} from '../../ExplorerMytthofTypes';
import {colors} from '../../ExplorerMytthofPalette';
import RegionBadge from '../ExplorerMytthofUi/ExplorerMytthofRegionBadge';

type LockedArtifactCardProps = {
  artifact: RelicProfile;
  width: number;
};

const LockedArtifactCard = ({artifact, width}: LockedArtifactCardProps) => (
  <View style={[explorerMytthofStyles.explorerMytthofCard, {width}]}>
    <View style={explorerMytthofStyles.explorerMytthofImageWrap}>
      <Image
        source={artifact.coverVisual}
        style={explorerMytthofStyles.explorerMytthofImage}
        resizeMode="cover"
      />
      <View style={explorerMytthofStyles.explorerMytthofOverlay}>
        <Image source={mediaRegistry.icons.lock} />
      </View>
      <RegionBadge
        region={artifact.localeTag}
        muted
        style={explorerMytthofStyles.explorerMytthofBadgePos}
      />
    </View>
    <View style={explorerMytthofStyles.explorerMytthofBody}>
      <Text style={explorerMytthofStyles.explorerMytthofName}>{artifact.displayName}</Text>
      <Text style={explorerMytthofStyles.explorerMytthofHint}>
        {artifact.insightsThreshold} insights needed
      </Text>
    </View>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCard: {
    borderRadius: 20.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 4.5,
  },
  explorerMytthofImageWrap: {
    height: 128.1,
    position: 'relative',
  },
  explorerMytthofImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  explorerMytthofOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayModal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofBadgePos: {
    position: 'absolute',
    top: 8.3,
    right: 8.4,
  },
  explorerMytthofBody: {
    paddingHorizontal: 12.4,
    paddingVertical: 12.5,
    gap: 4.1,
  },
  explorerMytthofName: {
    color: colors.textMutedDim,
    fontSize: 14.2,
    fontWeight: '500',
    lineHeight: 20.3,
  },
  explorerMytthofHint: {
    color: colors.textMutedDim,
    fontSize: 12.4,
    lineHeight: 16.5,
  },
});

export default LockedArtifactCard;
