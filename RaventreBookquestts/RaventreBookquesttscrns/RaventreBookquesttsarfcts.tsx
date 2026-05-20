// Facts screen

import React, {useCallback, useMemo, useState} from 'react';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import RaventreBookqueslayout from '../RaventreBookquesttscpnt/RaventreBookqueslayout';
import {
  raventreBookquesttsArtifacts,
  raventreBookquesttsIsArtifactUnlocked,
  type RaventreBookquesttsArtifact,
} from '../RaventreBookquesttsdata/raventreBookquesttsArtifactsData';
import {raventreBookquesttsGetQuizPoints} from '../RaventreBookquesttsdata/raventreBookquesttsQuizPointsStorage';

const raventreBookquesttsCardWidth =
  (Dimensions.get('window').width - 48 - 12) / 2;

const RaventreBookquesttsUnlockedCard = ({
  raventreBookquesttsArtifact,
}: {
  raventreBookquesttsArtifact: RaventreBookquesttsArtifact;
}) => (
  <View
    style={[
      styles.raventreBookquesttsCard,
      {width: raventreBookquesttsCardWidth},
    ]}>
    <View style={styles.raventreBookquesttsUnlockedImageWrap}>
      <Image
        source={raventreBookquesttsArtifact.raventreBookquesttsImage}
        style={styles.raventreBookquesttsArtifactImage}
        resizeMode="contain"
      />
      <View style={styles.raventreBookquesttsBadge}>
        <Text style={styles.raventreBookquesttsBadgeText}>
          {raventreBookquesttsArtifact.raventreBookquesttsRegion}
        </Text>
      </View>
    </View>
    <View style={styles.raventreBookquesttsUnlockedBody}>
      <Text style={styles.raventreBookquesttsArtifactName}>
        {raventreBookquesttsArtifact.raventreBookquesttsName}
      </Text>
      <Text style={styles.raventreBookquesttsArtifactDesc}>
        {raventreBookquesttsArtifact.raventreBookquesttsDescription}
      </Text>
    </View>
  </View>
);

const RaventreBookquesttsLockedCard = ({
  raventreBookquesttsArtifact,
}: {
  raventreBookquesttsArtifact: RaventreBookquesttsArtifact;
}) => (
  <View
    style={[
      styles.raventreBookquesttsLockedCard,
      {width: raventreBookquesttsCardWidth},
    ]}>
    <View style={styles.raventreBookquesttsLockedImageWrap}>
      <Image
        source={raventreBookquesttsArtifact.raventreBookquesttsImage}
        style={styles.raventreBookquesttsLockedImage}
        resizeMode="cover"
      />
      <View style={styles.raventreBookquesttsLockedOverlay}>
        <Image source={require('../../assets/img/raventrebolarlock.png')} />
      </View>
      <View style={styles.raventreBookquesttsLockedBadge}>
        <Text style={styles.raventreBookquesttsLockedBadgeText}>
          {raventreBookquesttsArtifact.raventreBookquesttsRegion}
        </Text>
      </View>
    </View>
    <View style={styles.raventreBookquesttsLockedBody}>
      <Text style={styles.raventreBookquesttsLockedName}>
        {raventreBookquesttsArtifact.raventreBookquesttsName}
      </Text>
      <Text style={styles.raventreBookquesttsLockedHint}>
        {raventreBookquesttsArtifact.raventreBookquesttsPointsRequired} points
        needed
      </Text>
    </View>
  </View>
);

const RaventreBookquesttsArtifactGrid = ({
  raventreBookquesttsItems,
  raventreBookquesttsLocked,
}: {
  raventreBookquesttsItems: RaventreBookquesttsArtifact[];
  raventreBookquesttsLocked?: boolean;
}) => (
  <View style={styles.raventreBookquesttsGrid}>
    {raventreBookquesttsItems.map(raventreBookquesttsArtifact =>
      raventreBookquesttsLocked ? (
        <RaventreBookquesttsLockedCard
          key={raventreBookquesttsArtifact.raventreBookquesttsId}
          raventreBookquesttsArtifact={raventreBookquesttsArtifact}
        />
      ) : (
        <RaventreBookquesttsUnlockedCard
          key={raventreBookquesttsArtifact.raventreBookquesttsId}
          raventreBookquesttsArtifact={raventreBookquesttsArtifact}
        />
      ),
    )}
  </View>
);

const RaventreBookquesttsarfcts = () => {
  const raventreBookquesttsNavigation = useNavigation();
  const [raventreBookquesttsPoints, setRaventreBookquesttsPoints] = useState(0);

  const raventreBookquesttsReload = useCallback(async () => {
    setRaventreBookquesttsPoints(await raventreBookquesttsGetQuizPoints());
  }, []);

  useFocusEffect(
    useCallback(() => {
      raventreBookquesttsReload();
    }, [raventreBookquesttsReload]),
  );

  const {raventreBookquesttsUnlocked, raventreBookquesttsLocked} =
    useMemo(() => {
      const raventreBookquesttsUnlockedList: RaventreBookquesttsArtifact[] = [];
      const raventreBookquesttsLockedList: RaventreBookquesttsArtifact[] = [];

      raventreBookquesttsArtifacts.forEach(raventreBookquesttsArtifact => {
        if (
          raventreBookquesttsIsArtifactUnlocked(
            raventreBookquesttsArtifact,
            raventreBookquesttsPoints,
          )
        ) {
          raventreBookquesttsUnlockedList.push(raventreBookquesttsArtifact);
        } else {
          raventreBookquesttsLockedList.push(raventreBookquesttsArtifact);
        }
      });

      return {
        raventreBookquesttsUnlocked: raventreBookquesttsUnlockedList,
        raventreBookquesttsLocked: raventreBookquesttsLockedList,
      };
    }, [raventreBookquesttsPoints]);

  const raventreBookquesttsPointsLabel =
    raventreBookquesttsPoints === 1
      ? '1 Point Obtained'
      : `${raventreBookquesttsPoints} Points Obtained`;

  return (
    <RaventreBookqueslayout raventreBookquesttsTab>
      <Text style={styles.raventreBookquesttsTitle}>Artifacts</Text>
      <Text style={styles.raventreBookquesttsSubtitle}>
        Your collected treasures
      </Text>
      <Text style={styles.raventreBookquesttsProgress}>
        {raventreBookquesttsPointsLabel}
      </Text>

      {raventreBookquesttsUnlocked.length > 0 && (
        <View style={styles.raventreBookquesttsSection}>
          <Text style={styles.raventreBookquesttsSectionTitle}>Unlocked</Text>
          <RaventreBookquesttsArtifactGrid
            raventreBookquesttsItems={raventreBookquesttsUnlocked}
          />
        </View>
      )}

      {raventreBookquesttsLocked.length > 0 && (
        <View style={styles.raventreBookquesttsSection}>
          <Text style={styles.raventreBookquesttsSectionTitleLocked}>
            Locked
          </Text>
          <RaventreBookquesttsArtifactGrid
            raventreBookquesttsItems={raventreBookquesttsLocked}
            raventreBookquesttsLocked
          />
        </View>
      )}
    </RaventreBookqueslayout>
  );
};

const styles = StyleSheet.create({
  raventreBookquesttsTitle: {
    color: '#DAA520',
    fontSize: 48,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  raventreBookquesttsSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  raventreBookquesttsProgress: {
    color: '#D4763E',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  raventreBookquesttsSection: {
    marginBottom: 24,
  },
  raventreBookquesttsSectionTitle: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 16,
  },
  raventreBookquesttsSectionTitleLocked: {
    color: 'rgba(212, 165, 116, 0.5)',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 16,
  },
  raventreBookquesttsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  raventreBookquesttsCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 4,
  },
  raventreBookquesttsUnlockedImageWrap: {
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  raventreBookquesttsArtifactImage: {
    width: '72%',
    height: '88%',
    marginTop: 25,
  },
  raventreBookquesttsBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  raventreBookquesttsBadgeText: {
    color: '#0F0804',
    fontSize: 12,
  },
  raventreBookquesttsUnlockedBody: {
    paddingHorizontal: 12,
    paddingBottom: 14,
    paddingTop: 10,
    gap: 6,
  },
  raventreBookquesttsArtifactName: {
    color: '#DAA520',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  raventreBookquesttsArtifactDesc: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 10,
    lineHeight: 14,
  },
  raventreBookquesttsLockedCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.2)',
    opacity: 0.6,
    marginBottom: 4,
  },
  raventreBookquesttsLockedImageWrap: {
    height: 128,
    position: 'relative',
  },
  raventreBookquesttsLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  raventreBookquesttsLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsLockIcon: {
    fontSize: 32,
  },
  raventreBookquesttsLockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  raventreBookquesttsLockedBadgeText: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 12,
  },
  raventreBookquesttsLockedBody: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
  },
  raventreBookquesttsLockedName: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  raventreBookquesttsLockedHint: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 12,
    lineHeight: 16,
  },
  raventreBookquesttsQuizPress: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 16,
  },
  raventreBookquesttsQuizBtn: {
    minHeight: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  raventreBookquesttsQuizText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
  },
  raventreBookquesttsPressed: {
    opacity: 0.85,
  },
});

export default RaventreBookquesttsarfcts;
