// Characters screen
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AppLayout, FadeInView, StaggerItem} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

import {ravenQuestCharacters} from '../../../content/characters';
import type {RavenQuestCharacter} from '../../shared/types';
import {
  ravenQuestCharacterShareMessage,
  ravenQuestCountLabel,
  ravenQuestGetTalesReadCount,
  ravenQuestIsCharacterUnlocked,
} from '../../shared/lib';

const RavenQuestShareBtn = ({
  ravenQuestOnPress,
}: {
  ravenQuestOnPress: () => void;
}) => (
  <Pressable
    onPress={ravenQuestOnPress}
    style={({pressed}) => [
      styles.ravenQuestSharePress,
      pressed && styles.ravenQuestPressed,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={styles.ravenQuestShareBtn}>
      <Image
        source={require('../../../assets/imgs/icons/shareIcon.png')}
        style={styles.ravenQuestShareIcon}
        resizeMode="contain"
      />
      <Text style={styles.ravenQuestShareText}>Share</Text>
    </LinearGradient>
  </Pressable>
);

const RavenQuestUnlockedCard = ({
  ravenQuestCharacter,
  ravenQuestOnShare,
}: {
  ravenQuestCharacter: RavenQuestCharacter;
  ravenQuestOnShare: () => void;
}) => (
  <View style={styles.ravenQuestUnlockedCard}>
    <View style={styles.ravenQuestCardImageWrap}>
      <Image
        source={ravenQuestCharacter.ravenQuestImage}
        style={styles.ravenQuestCardImage}
      />
      <View style={styles.ravenQuestBadge}>
        <Text style={styles.ravenQuestBadgeText}>
          {ravenQuestCharacter.ravenQuestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.ravenQuestCardBody}>
      <Text style={styles.ravenQuestCardName}>
        {ravenQuestCharacter.ravenQuestName}
      </Text>
      <Text style={styles.ravenQuestCardDesc}>
        {ravenQuestCharacter.ravenQuestDescription}
      </Text>
      <RavenQuestShareBtn
        ravenQuestOnPress={ravenQuestOnShare}
      />
    </View>
  </View>
);

const RavenQuestLockedCard = ({
  ravenQuestCharacter,
}: {
  ravenQuestCharacter: RavenQuestCharacter;
}) => (
  <View style={styles.ravenQuestLockedCard}>
    <View style={styles.ravenQuestLockedImageWrap}>
      <Image
        source={ravenQuestCharacter.ravenQuestImage}
        style={styles.ravenQuestLockedImage}
        resizeMode="cover"
      />
      <View style={styles.ravenQuestLockedOverlay}>
        <Image source={require('../../../assets/imgs/icons/lockIcon.png')} />
        <Text style={styles.ravenQuestLockHint}>
          Read {ravenQuestCharacter.ravenQuestTalesRequired}{' '}
          tales to unlock
        </Text>
      </View>
      <View style={styles.ravenQuestLockedBadge}>
        <Text style={styles.ravenQuestLockedBadgeText}>
          {ravenQuestCharacter.ravenQuestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.ravenQuestLockedNameWrap}>
      <Text style={styles.ravenQuestLockedName}>???</Text>
    </View>
  </View>
);

const CharactersScreen = () => {
  const [ravenQuestTalesRead, setRavenQuestTalesRead] =
    useState(0);

  const ravenQuestReload = useCallback(async () => {
    setRavenQuestTalesRead(await ravenQuestGetTalesReadCount());
  }, []);

  useFocusEffect(
    useCallback(() => {
      ravenQuestReload();
    }, [ravenQuestReload]),
  );

  const {ravenQuestUnlocked, ravenQuestLocked} = useMemo(() => {
    const ravenQuestUnlockedList: RavenQuestCharacter[] = [];
    const ravenQuestLockedList: RavenQuestCharacter[] = [];

    ravenQuestCharacters.forEach(ravenQuestCharacter => {
      if (
        ravenQuestIsCharacterUnlocked(
          ravenQuestCharacter,
          ravenQuestTalesRead,
        )
      ) {
        ravenQuestUnlockedList.push(ravenQuestCharacter);
      } else {
        ravenQuestLockedList.push(ravenQuestCharacter);
      }
    });

    return {
      ravenQuestUnlocked: ravenQuestUnlockedList,
      ravenQuestLocked: ravenQuestLockedList,
    };
  }, [ravenQuestTalesRead]);

  const ravenQuestTalesLabel = ravenQuestCountLabel(
    ravenQuestTalesRead,
    'Tale Read',
    'Tales Read',
  );

  return (
    <AppLayout tab>
      <FadeInView>
        <Text style={styles.ravenQuestTitle}>Characters</Text>
        <Text style={styles.ravenQuestSubtitle}>
          Mythology heroes and gods
        </Text>
        <Text style={styles.ravenQuestProgress}>
          {ravenQuestTalesLabel}
        </Text>
      </FadeInView>

      {ravenQuestUnlocked.length > 0 && (
        <View style={styles.ravenQuestSection}>
          {ravenQuestUnlocked.map((ravenQuestCharacter, index) => (
            <StaggerItem
              key={ravenQuestCharacter.ravenQuestId}
              index={index}>
              <RavenQuestUnlockedCard
                ravenQuestCharacter={ravenQuestCharacter}
                ravenQuestOnShare={() =>
                  Share.share({
                    message: ravenQuestCharacterShareMessage(
                      ravenQuestCharacter,
                    ),
                  })
                }
              />
            </StaggerItem>
          ))}
        </View>
      )}

      {ravenQuestLocked.length > 0 && (
        <View style={styles.ravenQuestSection}>
          <Text style={styles.ravenQuestSectionTitleLocked}>
            Locked
          </Text>
          {ravenQuestLocked.map((ravenQuestCharacter, index) => (
            <StaggerItem
              key={ravenQuestCharacter.ravenQuestId}
              index={ravenQuestUnlocked.length + index}>
              <RavenQuestLockedCard
                ravenQuestCharacter={ravenQuestCharacter}
              />
            </StaggerItem>
          ))}
        </View>
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  ravenQuestTitle: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  ravenQuestSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 8.2,
  },
  ravenQuestProgress: {
    color: colors.accent,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  ravenQuestSection: {
    gap: 16.1,
    marginBottom: 24.2,
  },
  ravenQuestSectionTitle: {
    color: colors.gold,
    fontSize: 24.3,
    fontWeight: '500',
    lineHeight: 32.4,
    marginBottom: 4.5,
  },
  ravenQuestSectionTitleLocked: {
    color: colors.textMutedFaint,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
    marginBottom: 4.3,
  },
  ravenQuestUnlockedCard: {
    borderRadius: 16.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16.1,
  },
  ravenQuestCardImageWrap: {
    position: 'relative',
    marginTop: 20.2,
  },
  ravenQuestCardImage: {
    alignSelf: 'center',
  },
  ravenQuestBadge: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  ravenQuestBadgeText: {
    color: colors.textDark,
    fontSize: 14.3,
  },
  ravenQuestCardBody: {
    padding: 24.4,
    gap: 12.5,
  },
  ravenQuestCardName: {
    color: colors.gold,
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
  },
  ravenQuestCardDesc: {
    color: colors.textMutedLight,
    fontSize: 16.3,
    lineHeight: 26.4,
  },
  ravenQuestSharePress: {
    borderRadius: 20.5,
    overflow: 'hidden',
    marginTop: 4.1,
  },
  ravenQuestShareBtn: {
    minHeight: 48.2,
    borderRadius: 20.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
  },
  ravenQuestShareIcon: {
    width: 20.5,
    height: 20.1,
  },
  ravenQuestShareText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
  },
  ravenQuestLockedCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardLocked,
    opacity: 0.6,
    marginBottom: 16.5,
  },
  ravenQuestLockedImageWrap: {
    height: 192.1,
    position: 'relative',
  },
  ravenQuestLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  ravenQuestLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.2,
    paddingHorizontal: 24.3,
  },
  ravenQuestLockIcon: {
    fontSize: 40.4,
  },
  ravenQuestLockHint: {
    color: colors.textMutedSoft,
    fontSize: 14.5,
    lineHeight: 20.1,
    textAlign: 'center',
  },
  ravenQuestLockedBadge: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12.4,
    paddingVertical: 4.5,
    borderRadius: 20.1,
  },
  ravenQuestLockedBadgeText: {
    color: colors.textMutedSoft,
    fontSize: 14.2,
  },
  ravenQuestLockedNameWrap: {
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  ravenQuestLockedName: {
    color: colors.textMutedDim,
    fontSize: 20.5,
    fontWeight: '500',
    lineHeight: 28.1,
  },
  ravenQuestPressed: {
    opacity: 0.85,
  },
});

export default CharactersScreen;
