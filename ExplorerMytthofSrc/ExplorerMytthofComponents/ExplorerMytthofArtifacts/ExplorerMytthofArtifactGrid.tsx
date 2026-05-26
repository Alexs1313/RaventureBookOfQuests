import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {StaggerItem} from '../ExplorerMytthofAnimation';
import type {RelicProfile} from '../../ExplorerMytthofTypes';
import {typography} from '../../ExplorerMytthofPalette';
import ArtifactCard from './ExplorerMytthofArtifactCard';
import LockedArtifactCard from './ExplorerMytthofLockedArtifactCard';

const tileSpan =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

type ArtifactGridProps = {
  unlocked: RelicProfile[];
  locked: RelicProfile[];
};

const ArtifactGrid = ({unlocked, locked}: ArtifactGridProps) => (
  <>
    {unlocked.length > 0 && (
      <View style={explorerMytthofStyles.explorerMytthofSection}>
        <Text style={explorerMytthofStyles.explorerMytthofSectionTitle}>Unlocked</Text>
        <View style={explorerMytthofStyles.explorerMytthofGrid}>
          {unlocked.map((artifact, index) => (
            <StaggerItem key={artifact.entryKey} index={index}>
              <ArtifactCard
                artifact={artifact}
                width={tileSpan}
              />
            </StaggerItem>
          ))}
        </View>
      </View>
    )}
    {locked.length > 0 && (
      <View style={explorerMytthofStyles.explorerMytthofSection}>
        <Text style={explorerMytthofStyles.explorerMytthofSectionTitleMuted}>Locked</Text>
        <View style={explorerMytthofStyles.explorerMytthofGrid}>
          {locked.map((artifact, index) => (
            <StaggerItem
              key={artifact.entryKey}
              index={unlocked.length + index}>
              <LockedArtifactCard
                artifact={artifact}
                width={tileSpan}
              />
            </StaggerItem>
          ))}
        </View>
      </View>
    )}
  </>
);

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofSection: {
    marginBottom: 24.1,
  },
  explorerMytthofSectionTitle: typography.sectionTitle,
  explorerMytthofSectionTitleMuted: typography.sectionTitleMuted,
  explorerMytthofGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default ArtifactGrid;
