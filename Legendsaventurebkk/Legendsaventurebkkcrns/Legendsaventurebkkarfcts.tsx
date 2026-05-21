import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {colors, gradients, gradientAxis} from '../themes';

import Legendsaventurebkklayout from '../Legendsaventurebkkcpnt/Legendsaventurebkklayout';
import {legendsaventurebkkArtifacts} from '../Legendsaventurebkkdata/legendsaventurebkkArtifactsData';
import type {LegendsaventurebkkArtifact} from '../types';
import {
  legendsaventurebkkCountLabel,
  legendsaventurebkkGetQuizPoints,
  legendsaventurebkkIsArtifactUnlocked,
} from '../utils';

const legendsaventurebkkCardWidth =
  (Dimensions.get('window').width - 48.2 - 12.3) / 2;

const LegendsaventurebkkUnlockedCard = ({
  legendsaventurebkkArtifact,
}: {
  legendsaventurebkkArtifact: LegendsaventurebkkArtifact;
}) => (
  <View
    style={[
      styles.legendsaventurebkkCard,
      {width: legendsaventurebkkCardWidth},
    ]}>
    <View style={styles.legendsaventurebkkUnlockedImageWrap}>
      <Image
        source={legendsaventurebkkArtifact.legendsaventurebkkImage}
        style={styles.legendsaventurebkkArtifactImage}
        resizeMode="contain"
      />
      <View style={styles.legendsaventurebkkBadge}>
        <Text style={styles.legendsaventurebkkBadgeText}>
          {legendsaventurebkkArtifact.legendsaventurebkkRegion}
        </Text>
      </View>
    </View>
    <View style={styles.legendsaventurebkkUnlockedBody}>
      <Text style={styles.legendsaventurebkkArtifactName}>
        {legendsaventurebkkArtifact.legendsaventurebkkName}
      </Text>
      <Text style={styles.legendsaventurebkkArtifactDesc}>
        {legendsaventurebkkArtifact.legendsaventurebkkDescription}
      </Text>
    </View>
  </View>
);

const LegendsaventurebkkLockedCard = ({
  legendsaventurebkkArtifact,
}: {
  legendsaventurebkkArtifact: LegendsaventurebkkArtifact;
}) => (
  <View
    style={[
      styles.legendsaventurebkkLockedCard,
      {width: legendsaventurebkkCardWidth},
    ]}>
    <View style={styles.legendsaventurebkkLockedImageWrap}>
      <Image
        source={legendsaventurebkkArtifact.legendsaventurebkkImage}
        style={styles.legendsaventurebkkLockedImage}
        resizeMode="cover"
      />
      <View style={styles.legendsaventurebkkLockedOverlay}>
        <Image source={require('../../assets/imgs/lockIcon.png')} />
      </View>
      <View style={styles.legendsaventurebkkLockedBadge}>
        <Text style={styles.legendsaventurebkkLockedBadgeText}>
          {legendsaventurebkkArtifact.legendsaventurebkkRegion}
        </Text>
      </View>
    </View>
    <View style={styles.legendsaventurebkkLockedBody}>
      <Text style={styles.legendsaventurebkkLockedName}>
        {legendsaventurebkkArtifact.legendsaventurebkkName}
      </Text>
      <Text style={styles.legendsaventurebkkLockedHint}>
        {legendsaventurebkkArtifact.legendsaventurebkkPointsRequired} points
        needed
      </Text>
    </View>
  </View>
);

const LegendsaventurebkkArtifactGrid = ({
  legendsaventurebkkItems,
  legendsaventurebkkLocked,
}: {
  legendsaventurebkkItems: LegendsaventurebkkArtifact[];
  legendsaventurebkkLocked?: boolean;
}) => (
  <View style={styles.legendsaventurebkkGrid}>
    {legendsaventurebkkItems.map(legendsaventurebkkArtifact =>
      legendsaventurebkkLocked ? (
        <LegendsaventurebkkLockedCard
          key={legendsaventurebkkArtifact.legendsaventurebkkId}
          legendsaventurebkkArtifact={legendsaventurebkkArtifact}
        />
      ) : (
        <LegendsaventurebkkUnlockedCard
          key={legendsaventurebkkArtifact.legendsaventurebkkId}
          legendsaventurebkkArtifact={legendsaventurebkkArtifact}
        />
      ),
    )}
  </View>
);

const Legendsaventurebkkarfcts = () => {
  const legendsaventurebkkNavigation = useNavigation();
  const [legendsaventurebkkPoints, setLegendsaventurebkkPoints] = useState(0);

  const legendsaventurebkkReload = useCallback(async () => {
    setLegendsaventurebkkPoints(await legendsaventurebkkGetQuizPoints());
  }, []);

  useFocusEffect(
    useCallback(() => {
      legendsaventurebkkReload();
    }, [legendsaventurebkkReload]),
  );

  const {legendsaventurebkkUnlocked, legendsaventurebkkLocked} = useMemo(() => {
    const legendsaventurebkkUnlockedList: LegendsaventurebkkArtifact[] = [];
    const legendsaventurebkkLockedList: LegendsaventurebkkArtifact[] = [];

    legendsaventurebkkArtifacts.forEach(legendsaventurebkkArtifact => {
      if (
        legendsaventurebkkIsArtifactUnlocked(
          legendsaventurebkkArtifact,
          legendsaventurebkkPoints,
        )
      ) {
        legendsaventurebkkUnlockedList.push(legendsaventurebkkArtifact);
      } else {
        legendsaventurebkkLockedList.push(legendsaventurebkkArtifact);
      }
    });

    return {
      legendsaventurebkkUnlocked: legendsaventurebkkUnlockedList,
      legendsaventurebkkLocked: legendsaventurebkkLockedList,
    };
  }, [legendsaventurebkkPoints]);

  const legendsaventurebkkPointsLabel = legendsaventurebkkCountLabel(
    legendsaventurebkkPoints,
    'Point Obtained',
    'Points Obtained',
  );

  return (
    <Legendsaventurebkklayout legendsaventurebkkTab>
      <Text style={styles.legendsaventurebkkTitle}>Artifacts</Text>
      <Text style={styles.legendsaventurebkkSubtitle}>
        Your collected treasures
      </Text>
      <Text style={styles.legendsaventurebkkProgress}>
        {legendsaventurebkkPointsLabel}
      </Text>

      {legendsaventurebkkUnlocked.length > 0 && (
        <View style={styles.legendsaventurebkkSection}>
          <Text style={styles.legendsaventurebkkSectionTitle}>Unlocked</Text>
          <LegendsaventurebkkArtifactGrid
            legendsaventurebkkItems={legendsaventurebkkUnlocked}
          />
        </View>
      )}

      {legendsaventurebkkLocked.length > 0 && (
        <View style={styles.legendsaventurebkkSection}>
          <Text style={styles.legendsaventurebkkSectionTitleLocked}>
            Locked
          </Text>
          <LegendsaventurebkkArtifactGrid
            legendsaventurebkkItems={legendsaventurebkkLocked}
            legendsaventurebkkLocked
          />
        </View>
      )}
    </Legendsaventurebkklayout>
  );
};

const styles = StyleSheet.create({
  legendsaventurebkkTitle: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  legendsaventurebkkSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 8.2,
  },
  legendsaventurebkkProgress: {
    color: colors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  legendsaventurebkkSection: {
    marginBottom: 24.1,
  },
  legendsaventurebkkSectionTitle: {
    color: colors.gold,
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
    marginBottom: 16.4,
  },
  legendsaventurebkkSectionTitleLocked: {
    color: colors.textMutedFaint,
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
    marginBottom: 16.2,
  },
  legendsaventurebkkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  legendsaventurebkkCard: {
    borderRadius: 20.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 4.1,
  },
  legendsaventurebkkUnlockedImageWrap: {
    height: 148.2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  legendsaventurebkkArtifactImage: {
    width: '72%',
    height: '88%',
    marginTop: 25.3,
  },
  legendsaventurebkkBadge: {
    position: 'absolute',
    top: 8.4,
    right: 8.5,
    backgroundColor: colors.badge,
    paddingHorizontal: 8.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
  },
  legendsaventurebkkBadgeText: {
    color: colors.textDark,
    fontSize: 12.4,
  },
  legendsaventurebkkUnlockedBody: {
    paddingHorizontal: 12.5,
    paddingBottom: 14.1,
    paddingTop: 10.2,
    gap: 6.3,
  },
  legendsaventurebkkArtifactName: {
    color: colors.gold,
    fontSize: 14.4,
    fontWeight: '500',
    lineHeight: 20.5,
  },
  legendsaventurebkkArtifactDesc: {
    color: colors.textMuted,
    fontSize: 10.1,
    lineHeight: 14.2,
  },
  legendsaventurebkkLockedCard: {
    borderRadius: 20.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 4.5,
  },
  legendsaventurebkkLockedImageWrap: {
    height: 128.1,
    position: 'relative',
  },
  legendsaventurebkkLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  legendsaventurebkkLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkLockIcon: {
    fontSize: 32.2,
  },
  legendsaventurebkkLockedBadge: {
    position: 'absolute',
    top: 8.3,
    right: 8.4,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 8.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  legendsaventurebkkLockedBadgeText: {
    color: colors.textMutedSoft,
    fontSize: 12.3,
  },
  legendsaventurebkkLockedBody: {
    paddingHorizontal: 12.4,
    paddingVertical: 12.5,
    gap: 4.1,
  },
  legendsaventurebkkLockedName: {
    color: colors.textMutedDim,
    fontSize: 14.2,
    fontWeight: '500',
    lineHeight: 20.3,
  },
  legendsaventurebkkLockedHint: {
    color: colors.textMutedDim,
    fontSize: 12.4,
    lineHeight: 16.5,
  },
  legendsaventurebkkQuizPress: {
    borderRadius: 20.1,
    overflow: 'hidden',
    marginTop: 8.2,
    marginBottom: 16.3,
  },
  legendsaventurebkkQuizBtn: {
    minHeight: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24.1,
  },
  legendsaventurebkkQuizText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
  },
  legendsaventurebkkPressed: {
    opacity: 0.85,
  },
});

export default Legendsaventurebkkarfcts;
