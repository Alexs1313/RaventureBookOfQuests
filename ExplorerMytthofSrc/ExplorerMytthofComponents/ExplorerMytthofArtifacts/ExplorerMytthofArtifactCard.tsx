import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import type {RelicProfile} from '../../ExplorerMytthofTypes';
import {colors, typography} from '../../ExplorerMytthofPalette';
import RegionBadge from '../ExplorerMytthofUi/ExplorerMytthofRegionBadge';

type ArtifactCardProps = {
  artifact: RelicProfile;
  width: number;
};

const ArtifactCard = ({artifact, width}: ArtifactCardProps) => (
  <View style={[explorerMytthofStyles.explorerMytthofCard, {width}]}>
    <View style={explorerMytthofStyles.explorerMytthofImageWrap}>
      <Image
        source={artifact.coverVisual}
        style={explorerMytthofStyles.explorerMytthofImage}
        resizeMode="contain"
      />
      <RegionBadge
        region={artifact.localeTag}
        style={explorerMytthofStyles.explorerMytthofBadgePos}
      />
    </View>
    <View style={explorerMytthofStyles.explorerMytthofBody}>
      <Text style={explorerMytthofStyles.explorerMytthofName}>{artifact.displayName}</Text>
      <Text style={explorerMytthofStyles.explorerMytthofDesc}>{artifact.synopsis}</Text>
    </View>
  </View>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCard: {
    borderRadius: 20.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 4.1,
  },
  explorerMytthofImageWrap: {
    height: 148.2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  explorerMytthofImage: {
    width: '72%',
    height: '88%',
    marginTop: 25.3,
  },
  explorerMytthofBadgePos: {
    position: 'absolute',
    top: 8.4,
    right: 8.5,
  },
  explorerMytthofBody: {
    paddingHorizontal: 12.5,
    paddingBottom: 14.1,
    paddingTop: 10.2,
    gap: 6.3,
  },
  explorerMytthofName: {
    color: colors.gold,
    fontSize: 14.4,
    fontWeight: '500',
    lineHeight: 20.5,
  },
  explorerMytthofDesc: {
    color: colors.textMuted,
    fontSize: 10.1,
    lineHeight: 14.2,
  },
});

export default ArtifactCard;
