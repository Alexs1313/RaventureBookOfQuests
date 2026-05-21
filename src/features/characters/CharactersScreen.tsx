// Characters screen
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AppLayout} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

import {legendsaventurebkkCharacters} from '../../content/characters';
import type {LegendsaventurebkkCharacter} from '../../shared/types';
import {
  legendsaventurebkkCharacterShareMessage,
  legendsaventurebkkCountLabel,
  legendsaventurebkkGetTalesReadCount,
  legendsaventurebkkIsCharacterUnlocked,
} from '../../shared/lib';

const LegendsaventurebkkShareBtn = ({
  legendsaventurebkkOnPress,
}: {
  legendsaventurebkkOnPress: () => void;
}) => (
  <Pressable
    onPress={legendsaventurebkkOnPress}
    style={({pressed}) => [
      styles.legendsaventurebkkSharePress,
      pressed && styles.legendsaventurebkkPressed,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={styles.legendsaventurebkkShareBtn}>
      <Image
        source={require('../../../assets/imgs/icons/shareIcon.png')}
        style={styles.legendsaventurebkkShareIcon}
        resizeMode="contain"
      />
      <Text style={styles.legendsaventurebkkShareText}>Share</Text>
    </LinearGradient>
  </Pressable>
);

const LegendsaventurebkkUnlockedCard = ({
  legendsaventurebkkCharacter,
  legendsaventurebkkOnShare,
}: {
  legendsaventurebkkCharacter: LegendsaventurebkkCharacter;
  legendsaventurebkkOnShare: () => void;
}) => (
  <View style={styles.legendsaventurebkkUnlockedCard}>
    <View style={styles.legendsaventurebkkCardImageWrap}>
      <Image
        source={legendsaventurebkkCharacter.legendsaventurebkkImage}
        style={styles.legendsaventurebkkCardImage}
      />
      <View style={styles.legendsaventurebkkBadge}>
        <Text style={styles.legendsaventurebkkBadgeText}>
          {legendsaventurebkkCharacter.legendsaventurebkkRegion}
        </Text>
      </View>
    </View>
    <View style={styles.legendsaventurebkkCardBody}>
      <Text style={styles.legendsaventurebkkCardName}>
        {legendsaventurebkkCharacter.legendsaventurebkkName}
      </Text>
      <Text style={styles.legendsaventurebkkCardDesc}>
        {legendsaventurebkkCharacter.legendsaventurebkkDescription}
      </Text>
      <LegendsaventurebkkShareBtn
        legendsaventurebkkOnPress={legendsaventurebkkOnShare}
      />
    </View>
  </View>
);

const LegendsaventurebkkLockedCard = ({
  legendsaventurebkkCharacter,
}: {
  legendsaventurebkkCharacter: LegendsaventurebkkCharacter;
}) => (
  <View style={styles.legendsaventurebkkLockedCard}>
    <View style={styles.legendsaventurebkkLockedImageWrap}>
      <Image
        source={legendsaventurebkkCharacter.legendsaventurebkkImage}
        style={styles.legendsaventurebkkLockedImage}
        resizeMode="cover"
      />
      <View style={styles.legendsaventurebkkLockedOverlay}>
        <Image source={require('../../../assets/imgs/icons/lockIcon.png')} />
        <Text style={styles.legendsaventurebkkLockHint}>
          Read {legendsaventurebkkCharacter.legendsaventurebkkTalesRequired}{' '}
          tales to unlock
        </Text>
      </View>
      <View style={styles.legendsaventurebkkLockedBadge}>
        <Text style={styles.legendsaventurebkkLockedBadgeText}>
          {legendsaventurebkkCharacter.legendsaventurebkkRegion}
        </Text>
      </View>
    </View>
    <View style={styles.legendsaventurebkkLockedNameWrap}>
      <Text style={styles.legendsaventurebkkLockedName}>???</Text>
    </View>
  </View>
);

const CharactersScreen = () => {
  const [legendsaventurebkkTalesRead, setLegendsaventurebkkTalesRead] =
    useState(0);

  const legendsaventurebkkReload = useCallback(async () => {
    setLegendsaventurebkkTalesRead(await legendsaventurebkkGetTalesReadCount());
  }, []);

  useFocusEffect(
    useCallback(() => {
      legendsaventurebkkReload();
    }, [legendsaventurebkkReload]),
  );

  const {legendsaventurebkkUnlocked, legendsaventurebkkLocked} = useMemo(() => {
    const legendsaventurebkkUnlockedList: LegendsaventurebkkCharacter[] = [];
    const legendsaventurebkkLockedList: LegendsaventurebkkCharacter[] = [];

    legendsaventurebkkCharacters.forEach(legendsaventurebkkCharacter => {
      if (
        legendsaventurebkkIsCharacterUnlocked(
          legendsaventurebkkCharacter,
          legendsaventurebkkTalesRead,
        )
      ) {
        legendsaventurebkkUnlockedList.push(legendsaventurebkkCharacter);
      } else {
        legendsaventurebkkLockedList.push(legendsaventurebkkCharacter);
      }
    });

    return {
      legendsaventurebkkUnlocked: legendsaventurebkkUnlockedList,
      legendsaventurebkkLocked: legendsaventurebkkLockedList,
    };
  }, [legendsaventurebkkTalesRead]);

  const legendsaventurebkkTalesLabel = legendsaventurebkkCountLabel(
    legendsaventurebkkTalesRead,
    'Tale Read',
    'Tales Read',
  );

  return (
    <AppLayout tab>
      <Text style={styles.legendsaventurebkkTitle}>Characters</Text>
      <Text style={styles.legendsaventurebkkSubtitle}>
        Mythology heroes and gods
      </Text>
      <Text style={styles.legendsaventurebkkProgress}>
        {legendsaventurebkkTalesLabel}
      </Text>

      {legendsaventurebkkUnlocked.length > 0 && (
        <View style={styles.legendsaventurebkkSection}>
          {legendsaventurebkkUnlocked.map(legendsaventurebkkCharacter => (
            <LegendsaventurebkkUnlockedCard
              key={legendsaventurebkkCharacter.legendsaventurebkkId}
              legendsaventurebkkCharacter={legendsaventurebkkCharacter}
              legendsaventurebkkOnShare={() =>
                Share.share({
                  message: legendsaventurebkkCharacterShareMessage(
                    legendsaventurebkkCharacter,
                  ),
                })
              }
            />
          ))}
        </View>
      )}

      {legendsaventurebkkLocked.length > 0 && (
        <View style={styles.legendsaventurebkkSection}>
          <Text style={styles.legendsaventurebkkSectionTitleLocked}>
            Locked
          </Text>
          {legendsaventurebkkLocked.map(legendsaventurebkkCharacter => (
            <LegendsaventurebkkLockedCard
              key={legendsaventurebkkCharacter.legendsaventurebkkId}
              legendsaventurebkkCharacter={legendsaventurebkkCharacter}
            />
          ))}
        </View>
      )}
    </AppLayout>
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
    gap: 16.1,
    marginBottom: 24.2,
  },
  legendsaventurebkkSectionTitle: {
    color: colors.gold,
    fontSize: 24.3,
    fontWeight: '500',
    lineHeight: 32.4,
    marginBottom: 4.5,
  },
  legendsaventurebkkSectionTitleLocked: {
    color: colors.textMutedFaint,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
    marginBottom: 4.3,
  },
  legendsaventurebkkUnlockedCard: {
    borderRadius: 16.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16.1,
  },
  legendsaventurebkkCardImageWrap: {
    position: 'relative',
    marginTop: 20.2,
  },
  legendsaventurebkkCardImage: {
    alignSelf: 'center',
  },
  legendsaventurebkkBadge: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  legendsaventurebkkBadgeText: {
    color: colors.textDark,
    fontSize: 14.3,
  },
  legendsaventurebkkCardBody: {
    padding: 24.4,
    gap: 12.5,
  },
  legendsaventurebkkCardName: {
    color: colors.gold,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
  },
  legendsaventurebkkCardDesc: {
    color: colors.textMutedLight,
    fontSize: 16.3,
    lineHeight: 26.4,
  },
  legendsaventurebkkSharePress: {
    borderRadius: 20.5,
    overflow: 'hidden',
    marginTop: 4.1,
  },
  legendsaventurebkkShareBtn: {
    minHeight: 48.2,
    borderRadius: 20.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
  },
  legendsaventurebkkShareIcon: {
    width: 20.5,
    height: 20.1,
  },
  legendsaventurebkkShareText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
  },
  legendsaventurebkkLockedCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 16.5,
  },
  legendsaventurebkkLockedImageWrap: {
    height: 192.1,
    position: 'relative',
  },
  legendsaventurebkkLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  legendsaventurebkkLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.2,
    paddingHorizontal: 24.3,
  },
  legendsaventurebkkLockIcon: {
    fontSize: 40.4,
  },
  legendsaventurebkkLockHint: {
    color: colors.textMutedSoft,
    fontSize: 14.5,
    lineHeight: 20.1,
    textAlign: 'center',
  },
  legendsaventurebkkLockedBadge: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12.4,
    paddingVertical: 4.5,
    borderRadius: 20.1,
  },
  legendsaventurebkkLockedBadgeText: {
    color: colors.textMutedSoft,
    fontSize: 14.2,
  },
  legendsaventurebkkLockedNameWrap: {
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  legendsaventurebkkLockedName: {
    color: colors.textMutedDim,
    fontSize: 20.5,
    fontWeight: '500',
    lineHeight: 28.1,
  },
  legendsaventurebkkPressed: {
    opacity: 0.85,
  },
});

export default CharactersScreen;
