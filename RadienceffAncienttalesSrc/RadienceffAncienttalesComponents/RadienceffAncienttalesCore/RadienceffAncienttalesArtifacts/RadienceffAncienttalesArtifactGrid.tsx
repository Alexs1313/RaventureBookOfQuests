import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {RadienceffAncienttalesStaggerItem} from '../RadienceffAncienttalesAnimation';
import type {RadienceffAncienttalesRelicProfile} from '../RadienceffAncienttalesTypes';
import {radienceffAncienttalesTypography} from '../RadienceffAncienttalesPalette';
import RadienceffAncienttalesArtifactCard from './RadienceffAncienttalesArtifactCard';
import RadienceffAncienttalesLockedArtifactCard from './RadienceffAncienttalesLockedArtifactCard';

const tileSpan =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

type RadienceffAncienttalesArtifactGridProps = {
  unlocked: RadienceffAncienttalesRelicProfile[];
  locked: RadienceffAncienttalesRelicProfile[];
};

const RadienceffAncienttalesArtifactGrid = ({unlocked, locked}: RadienceffAncienttalesArtifactGridProps) => (
  <>
    {unlocked.length > 0 && (
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesSection}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSectionTitle}>Unlocked</Text>
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesGrid}>
          {unlocked.map((artifact, index) => (
            <RadienceffAncienttalesStaggerItem key={artifact.entryKey} index={index}>
              <RadienceffAncienttalesArtifactCard
                artifact={artifact}
                width={tileSpan}
              />
            </RadienceffAncienttalesStaggerItem>
          ))}
        </View>
      </View>
    )}
    {locked.length > 0 && (
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesSection}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesSectionTitleMuted}>Locked</Text>
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesGrid}>
          {locked.map((artifact, index) => (
            <RadienceffAncienttalesStaggerItem
              key={artifact.entryKey}
              index={unlocked.length + index}>
              <RadienceffAncienttalesLockedArtifactCard
                artifact={artifact}
                width={tileSpan}
              />
            </RadienceffAncienttalesStaggerItem>
          ))}
        </View>
      </View>
    )}
  </>
);

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesSection: {
    marginBottom: 24.1,
  },
  radienceffAncienttalesSectionTitle: radienceffAncienttalesTypography.sectionTitle,
  radienceffAncienttalesSectionTitleMuted: radienceffAncienttalesTypography.sectionTitleMuted,
  radienceffAncienttalesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default RadienceffAncienttalesArtifactGrid;
