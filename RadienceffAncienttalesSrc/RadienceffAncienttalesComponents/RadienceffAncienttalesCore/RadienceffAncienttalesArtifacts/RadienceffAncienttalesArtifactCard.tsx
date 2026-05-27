import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import type {RadienceffAncienttalesRelicProfile} from '../RadienceffAncienttalesTypes';
import {radienceffAncienttalesColors, radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';
import RadienceffAncienttalesRegionBadge from '../RadienceffAncienttalesUiKit/RadienceffAncienttalesRegionBadge';

type RadienceffAncienttalesArtifactCardProps = {
  artifact: RadienceffAncienttalesRelicProfile;
  width: number;
};

const RadienceffAncienttalesArtifactCard = ({artifact, width}: RadienceffAncienttalesArtifactCardProps) => (
  <View style={[radienceffAncienttalesStyles.radienceffAncienttalesCard, {width}]}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesImageWrap}>
      <Image
        source={artifact.coverVisual}
        style={radienceffAncienttalesStyles.radienceffAncienttalesImage}
        resizeMode="contain"
      />
      <RadienceffAncienttalesRegionBadge
        region={artifact.localeTag}
        style={radienceffAncienttalesStyles.radienceffAncienttalesBadgePos}
      />
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesBody}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesName}>{artifact.displayName}</Text>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDesc}>{artifact.synopsis}</Text>
    </View>
  </View>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesCard: {
    borderRadius: 20.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardStrong,
    marginBottom: 4.1,
  },
  radienceffAncienttalesImageWrap: {
    height: 148.2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  radienceffAncienttalesImage: {
    width: '72%',
    height: '88%',
    marginTop: 25.3,
  },
  radienceffAncienttalesBadgePos: {
    position: 'absolute',
    top: 8.4,
    right: 8.5,
  },
  radienceffAncienttalesBody: {
    paddingHorizontal: 12.5,
    paddingBottom: 14.1,
    paddingTop: 10.2,
    gap: 6.3,
  },
  radienceffAncienttalesName: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 14.4,
    fontWeight: '500',
    lineHeight: 20.5,
  },
  radienceffAncienttalesDesc: {
    color: radienceffAncienttalesColors.textMuted,
    fontSize: 10.1,
    lineHeight: 14.2,
  },
});

export default RadienceffAncienttalesArtifactCard;
