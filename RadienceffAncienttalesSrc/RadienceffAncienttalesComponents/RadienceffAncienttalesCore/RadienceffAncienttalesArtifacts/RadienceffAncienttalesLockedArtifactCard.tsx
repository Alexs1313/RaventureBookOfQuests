import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesAssets';
import type {RadienceffAncienttalesRelicProfile} from '../RadienceffAncienttalesTypes';
import {radienceffAncienttalesColors} from '../RadienceffAncienttalesPalette';
import RadienceffAncienttalesRegionBadge from '../RadienceffAncienttalesUiKit/RadienceffAncienttalesRegionBadge';

type RadienceffAncienttalesLockedArtifactCardProps = {
  artifact: RadienceffAncienttalesRelicProfile;
  width: number;
};

const RadienceffAncienttalesLockedArtifactCard = ({artifact, width}: RadienceffAncienttalesLockedArtifactCardProps) => (
  <View style={[radienceffAncienttalesStyles.radienceffAncienttalesCard, {width}]}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesImageWrap}>
      <Image
        source={artifact.coverVisual}
        style={radienceffAncienttalesStyles.radienceffAncienttalesImage}
        resizeMode="cover"
      />
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesOverlay}>
        <Image source={radienceffAncienttalesMediaRegistry.icons.lock} />
      </View>
      <RadienceffAncienttalesRegionBadge
        region={artifact.localeTag}
        muted
        style={radienceffAncienttalesStyles.radienceffAncienttalesBadgePos}
      />
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesName}>{artifact.displayName}</Text>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesHint}>
        {artifact.insightsThreshold} more progress needed
      </Text>
    </View>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesCard: {
    borderRadius: 20.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.borderStrong,
    backgroundColor: radienceffAncienttalesColors.cardLocked,
    opacity: 0.6,
    marginBottom: 4.5,
  },
  radienceffAncienttalesImageWrap: {
    height: 128.1,
    position: 'relative',
  },
  radienceffAncienttalesImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  radienceffAncienttalesOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: radienceffAncienttalesColors.overlayModal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesBadgePos: {
    position: 'absolute',
    top: 8.3,
    right: 8.4,
  },
  radienceffAncienttalesBody: {
    paddingHorizontal: 12.4,
    paddingVertical: 12.5,
    gap: 4.1,
  },
  radienceffAncienttalesName: {
    color: radienceffAncienttalesColors.textMutedDim,
    fontSize: 14.2,
    fontWeight: '500',
    lineHeight: 20.3,
  },
  radienceffAncienttalesHint: {
    color: radienceffAncienttalesColors.textMutedDim,
    fontSize: 12.4,
    lineHeight: 16.5,
  },
});

export default RadienceffAncienttalesLockedArtifactCard;
