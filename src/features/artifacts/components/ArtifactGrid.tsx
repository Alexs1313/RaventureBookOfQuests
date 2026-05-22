import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {StaggerItem} from '../../../shared/components/animation';
import type {RavenQuestArtifact} from '../../../shared/types';
import {typography} from '../../../shared/theme';
import ArtifactCard from './ArtifactCard';
import LockedArtifactCard from './LockedArtifactCard';

const ravenQuestCardWidth =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

type ArtifactGridProps = {
  unlocked: RavenQuestArtifact[];
  locked: RavenQuestArtifact[];
};

const ArtifactGrid = ({unlocked, locked}: ArtifactGridProps) => (
  <>
    {unlocked.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unlocked</Text>
        <View style={styles.grid}>
          {unlocked.map((artifact, index) => (
            <StaggerItem key={artifact.ravenQuestId} index={index}>
              <ArtifactCard
                artifact={artifact}
                width={ravenQuestCardWidth}
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
              key={artifact.ravenQuestId}
              index={unlocked.length + index}>
              <LockedArtifactCard
                artifact={artifact}
                width={ravenQuestCardWidth}
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
