// Characters screen
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import RaventreBookqueslayout from '../RaventreBookquesttscpnt/RaventreBookqueslayout';
import {
  raventreBookquesttsCharacterShareMessage,
  raventreBookquesttsCharacters,
  raventreBookquesttsIsCharacterUnlocked,
  type RaventreBookquesttsCharacter,
} from '../RaventreBookquesttsdata/raventreBookquesttsCharactersData';
import {raventreBookquesttsGetTalesReadCount} from '../RaventreBookquesttsdata/raventreBookquesttsTalesProgressStorage';

const RaventreBookquesttsShareBtn = ({
  raventreBookquesttsOnPress,
}: {
  raventreBookquesttsOnPress: () => void;
}) => (
  <Pressable
    onPress={raventreBookquesttsOnPress}
    style={({pressed}) => [
      styles.raventreBookquesttsSharePress,
      pressed && styles.raventreBookquesttsPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.raventreBookquesttsShareBtn}>
      <Image
        source={require('../../assets/img/raventrebolshare.png')}
        style={styles.raventreBookquesttsShareIcon}
        resizeMode="contain"
      />
      <Text style={styles.raventreBookquesttsShareText}>Share</Text>
    </LinearGradient>
  </Pressable>
);

const RaventreBookquesttsUnlockedCard = ({
  raventreBookquesttsCharacter,
  raventreBookquesttsOnShare,
}: {
  raventreBookquesttsCharacter: RaventreBookquesttsCharacter;
  raventreBookquesttsOnShare: () => void;
}) => (
  <View style={styles.raventreBookquesttsUnlockedCard}>
    <View style={styles.raventreBookquesttsCardImageWrap}>
      <Image
        source={raventreBookquesttsCharacter.raventreBookquesttsImage}
        style={styles.raventreBookquesttsCardImage}
      />
      <View style={styles.raventreBookquesttsBadge}>
        <Text style={styles.raventreBookquesttsBadgeText}>
          {raventreBookquesttsCharacter.raventreBookquesttsRegion}
        </Text>
      </View>
    </View>
    <View style={styles.raventreBookquesttsCardBody}>
      <Text style={styles.raventreBookquesttsCardName}>
        {raventreBookquesttsCharacter.raventreBookquesttsName}
      </Text>
      <Text style={styles.raventreBookquesttsCardDesc}>
        {raventreBookquesttsCharacter.raventreBookquesttsDescription}
      </Text>
      <RaventreBookquesttsShareBtn
        raventreBookquesttsOnPress={raventreBookquesttsOnShare}
      />
    </View>
  </View>
);

const RaventreBookquesttsLockedCard = ({
  raventreBookquesttsCharacter,
}: {
  raventreBookquesttsCharacter: RaventreBookquesttsCharacter;
}) => (
  <View style={styles.raventreBookquesttsLockedCard}>
    <View style={styles.raventreBookquesttsLockedImageWrap}>
      <Image
        source={raventreBookquesttsCharacter.raventreBookquesttsImage}
        style={styles.raventreBookquesttsLockedImage}
        resizeMode="cover"
      />
      <View style={styles.raventreBookquesttsLockedOverlay}>
        <Image source={require('../../assets/img/raventrebolarlock.png')} />
        <Text style={styles.raventreBookquesttsLockHint}>
          Read {raventreBookquesttsCharacter.raventreBookquesttsTalesRequired}{' '}
          tales to unlock
        </Text>
      </View>
      <View style={styles.raventreBookquesttsLockedBadge}>
        <Text style={styles.raventreBookquesttsLockedBadgeText}>
          {raventreBookquesttsCharacter.raventreBookquesttsRegion}
        </Text>
      </View>
    </View>
    <View style={styles.raventreBookquesttsLockedNameWrap}>
      <Text style={styles.raventreBookquesttsLockedName}>???</Text>
    </View>
  </View>
);

const RaventreBookquesttscharct = () => {
  const [raventreBookquesttsTalesRead, setRaventreBookquesttsTalesRead] =
    useState(0);

  const raventreBookquesttsReload = useCallback(async () => {
    setRaventreBookquesttsTalesRead(
      await raventreBookquesttsGetTalesReadCount(),
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      raventreBookquesttsReload();
    }, [raventreBookquesttsReload]),
  );

  const {raventreBookquesttsUnlocked, raventreBookquesttsLocked} =
    useMemo(() => {
      const raventreBookquesttsUnlockedList: RaventreBookquesttsCharacter[] =
        [];
      const raventreBookquesttsLockedList: RaventreBookquesttsCharacter[] = [];

      raventreBookquesttsCharacters.forEach(raventreBookquesttsCharacter => {
        if (
          raventreBookquesttsIsCharacterUnlocked(
            raventreBookquesttsCharacter,
            raventreBookquesttsTalesRead,
          )
        ) {
          raventreBookquesttsUnlockedList.push(raventreBookquesttsCharacter);
        } else {
          raventreBookquesttsLockedList.push(raventreBookquesttsCharacter);
        }
      });

      return {
        raventreBookquesttsUnlocked: raventreBookquesttsUnlockedList,
        raventreBookquesttsLocked: raventreBookquesttsLockedList,
      };
    }, [raventreBookquesttsTalesRead]);

  const raventreBookquesttsTalesLabel =
    raventreBookquesttsTalesRead === 1
      ? '1 Tale Read'
      : `${raventreBookquesttsTalesRead} Tales Read`;

  return (
    <RaventreBookqueslayout raventreBookquesttsTab>
      <Text style={styles.raventreBookquesttsTitle}>Characters</Text>
      <Text style={styles.raventreBookquesttsSubtitle}>
        Mythology heroes and gods
      </Text>
      <Text style={styles.raventreBookquesttsProgress}>
        {raventreBookquesttsTalesLabel}
      </Text>

      {raventreBookquesttsUnlocked.length > 0 && (
        <View style={styles.raventreBookquesttsSection}>
          {raventreBookquesttsUnlocked.map(raventreBookquesttsCharacter => (
            <RaventreBookquesttsUnlockedCard
              key={raventreBookquesttsCharacter.raventreBookquesttsId}
              raventreBookquesttsCharacter={raventreBookquesttsCharacter}
              raventreBookquesttsOnShare={() =>
                Share.share({
                  message: raventreBookquesttsCharacterShareMessage(
                    raventreBookquesttsCharacter,
                  ),
                })
              }
            />
          ))}
        </View>
      )}

      {raventreBookquesttsLocked.length > 0 && (
        <View style={styles.raventreBookquesttsSection}>
          <Text style={styles.raventreBookquesttsSectionTitleLocked}>
            Locked
          </Text>
          {raventreBookquesttsLocked.map(raventreBookquesttsCharacter => (
            <RaventreBookquesttsLockedCard
              key={raventreBookquesttsCharacter.raventreBookquesttsId}
              raventreBookquesttsCharacter={raventreBookquesttsCharacter}
            />
          ))}
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
    gap: 16,
    marginBottom: 24,
  },
  raventreBookquesttsSectionTitle: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 4,
  },
  raventreBookquesttsSectionTitleLocked: {
    color: 'rgba(212, 165, 116, 0.5)',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
    marginBottom: 4,
  },
  raventreBookquesttsUnlockedCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 117, 62, 0.12)',
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16,
  },
  raventreBookquesttsCardImageWrap: {
    position: 'relative',
    marginTop: 20,
  },
  raventreBookquesttsCardImage: {
    alignSelf: 'center',
  },
  raventreBookquesttsBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  raventreBookquesttsBadgeText: {
    color: '#0F0804',
    fontSize: 14,
  },
  raventreBookquesttsCardBody: {
    padding: 24,
    gap: 12,
  },
  raventreBookquesttsCardName: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  raventreBookquesttsCardDesc: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 26,
  },
  raventreBookquesttsSharePress: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 4,
  },
  raventreBookquesttsShareBtn: {
    minHeight: 48,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  raventreBookquesttsShareIcon: {
    width: 20,
    height: 20,
  },
  raventreBookquesttsShareText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
  },
  raventreBookquesttsLockedCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.2)',
    opacity: 0.6,
    marginBottom: 16,
  },
  raventreBookquesttsLockedImageWrap: {
    height: 192,
    position: 'relative',
  },
  raventreBookquesttsLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  raventreBookquesttsLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  raventreBookquesttsLockIcon: {
    fontSize: 40,
  },
  raventreBookquesttsLockHint: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  raventreBookquesttsLockedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  raventreBookquesttsLockedBadgeText: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 14,
  },
  raventreBookquesttsLockedNameWrap: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  raventreBookquesttsLockedName: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  raventreBookquesttsPressed: {
    opacity: 0.85,
  },
});

export default RaventreBookquesttscharct;
