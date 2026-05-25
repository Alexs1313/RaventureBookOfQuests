import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {StaggerItem} from '../animation';
import type {RelicProfile} from '../../types';
import {typography} from '../../palette';
import ArtifactCard from './ArtifactCard';
import LockedArtifactCard from './LockedArtifactCard';

const tileSpan =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

type ArtifactGridProps = {
  unlocked: RelicProfile[];
  locked: RelicProfile[];
};

const ArtifactGrid = ({unlocked, locked}: ArtifactGridProps) => (
  <>
    {unlocked.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unlocked</Text>
        <View style={styles.grid}>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitleMuted}>Locked</Text>
        <View style={styles.grid}>
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

const styles = StyleSheet.create({
  section: {
    marginBottom: 24.1,
  },
  sectionTitle: typography.sectionTitle,
  sectionTitleMuted: typography.sectionTitleMuted,
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default ArtifactGrid;
