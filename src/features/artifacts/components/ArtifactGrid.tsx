import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import type {LegendsaventurebkkArtifact} from '../../../shared/types';
import {typography} from '../../../shared/theme';
import ArtifactCard from './ArtifactCard';
import LockedArtifactCard from './LockedArtifactCard';

const legendsaventurebkkCardWidth =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

type ArtifactGridProps = {
  unlocked: LegendsaventurebkkArtifact[];
  locked: LegendsaventurebkkArtifact[];
};

const ArtifactGrid = ({unlocked, locked}: ArtifactGridProps) => (
  <>
    {unlocked.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unlocked</Text>
        <View style={styles.grid}>
          {unlocked.map(artifact => (
            <ArtifactCard
              key={artifact.legendsaventurebkkId}
              artifact={artifact}
              width={legendsaventurebkkCardWidth}
            />
          ))}
        </View>
      </View>
    )}
    {locked.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitleMuted}>Locked</Text>
        <View style={styles.grid}>
          {locked.map(artifact => (
            <LockedArtifactCard
              key={artifact.legendsaventurebkkId}
              artifact={artifact}
              width={legendsaventurebkkCardWidth}
            />
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
