// Characters screen
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import Bookqqestlayout from '../Bookqqestcpnt/Bookqqestlayout';
import {
  bookqqestCharacterShareMessage,
  bookqqestCharacters,
  bookqqestIsCharacterUnlocked,
  type BookqqestCharacter,
} from '../Bookqqestdata/bookqqestCharactersData';
import {bookqqestGetTalesReadCount} from '../Bookqqestdata/bookqqestTalesProgressStorage';

const BookqqestShareBtn = ({
  bookqqestOnPress,
}: {
  bookqqestOnPress: () => void;
}) => (
  <Pressable
    onPress={bookqqestOnPress}
    style={({pressed}) => [
      styles.bookqqestSharePress,
      pressed && styles.bookqqestPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.bookqqestShareBtn}>
      <Image
        source={require('../../assets/img/bookqqestbolshare.png')}
        style={styles.bookqqestShareIcon}
        resizeMode="contain"
      />
      <Text style={styles.bookqqestShareText}>Share</Text>
    </LinearGradient>
  </Pressable>
);

const BookqqestUnlockedCard = ({
  bookqqestCharacter,
  bookqqestOnShare,
}: {
  bookqqestCharacter: BookqqestCharacter;
  bookqqestOnShare: () => void;
}) => (
  <View style={styles.bookqqestUnlockedCard}>
    <View style={styles.bookqqestCardImageWrap}>
      <Image
        source={bookqqestCharacter.bookqqestImage}
        style={styles.bookqqestCardImage}
      />
      <View style={styles.bookqqestBadge}>
        <Text style={styles.bookqqestBadgeText}>
          {bookqqestCharacter.bookqqestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.bookqqestCardBody}>
      <Text style={styles.bookqqestCardName}>
        {bookqqestCharacter.bookqqestName}
      </Text>
      <Text style={styles.bookqqestCardDesc}>
        {bookqqestCharacter.bookqqestDescription}
      </Text>
      <BookqqestShareBtn
        bookqqestOnPress={bookqqestOnShare}
      />
    </View>
  </View>
);

const BookqqestLockedCard = ({
  bookqqestCharacter,
}: {
  bookqqestCharacter: BookqqestCharacter;
}) => (
  <View style={styles.bookqqestLockedCard}>
    <View style={styles.bookqqestLockedImageWrap}>
      <Image
        source={bookqqestCharacter.bookqqestImage}
        style={styles.bookqqestLockedImage}
        resizeMode="cover"
      />
      <View style={styles.bookqqestLockedOverlay}>
        <Image source={require('../../assets/img/bookqqestbolarlock.png')} />
        <Text style={styles.bookqqestLockHint}>
          Read {bookqqestCharacter.bookqqestTalesRequired}{' '}
          tales to unlock
        </Text>
      </View>
      <View style={styles.bookqqestLockedBadge}>
        <Text style={styles.bookqqestLockedBadgeText}>
          {bookqqestCharacter.bookqqestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.bookqqestLockedNameWrap}>
      <Text style={styles.bookqqestLockedName}>???</Text>
    </View>
  </View>
);

const Bookqqestcharct = () => {
  const [bookqqestTalesRead, setBookqqestTalesRead] =
    useState(0);

  const bookqqestReload = useCallback(async () => {
    setBookqqestTalesRead(
      await bookqqestGetTalesReadCount(),
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      bookqqestReload();
    }, [bookqqestReload]),
  );

  const {bookqqestUnlocked, bookqqestLocked} =
    useMemo(() => {
      const bookqqestUnlockedList: BookqqestCharacter[] =
        [];
      const bookqqestLockedList: BookqqestCharacter[] = [];

      bookqqestCharacters.forEach(bookqqestCharacter => {
        if (
          bookqqestIsCharacterUnlocked(
            bookqqestCharacter,
            bookqqestTalesRead,
          )
        ) {
          bookqqestUnlockedList.push(bookqqestCharacter);
        } else {
          bookqqestLockedList.push(bookqqestCharacter);
        }
      });

      return {
        bookqqestUnlocked: bookqqestUnlockedList,
        bookqqestLocked: bookqqestLockedList,
      };
    }, [bookqqestTalesRead]);

  const bookqqestTalesLabel =
    bookqqestTalesRead === 1
      ? '1 Tale Read'
      : `${bookqqestTalesRead} Tales Read`;

  return (
    <Bookqqestlayout bookqqestTab>
      <Text style={styles.bookqqestTitle}>Characters</Text>
      <Text style={styles.bookqqestSubtitle}>
        Mythology heroes and gods
      </Text>
      <Text style={styles.bookqqestProgress}>
        {bookqqestTalesLabel}
      </Text>

      {bookqqestUnlocked.length > 0 && (
        <View style={styles.bookqqestSection}>
          {bookqqestUnlocked.map(bookqqestCharacter => (
            <BookqqestUnlockedCard
              key={bookqqestCharacter.bookqqestId}
              bookqqestCharacter={bookqqestCharacter}
              bookqqestOnShare={() =>
                Share.share({
                  message: bookqqestCharacterShareMessage(
                    bookqqestCharacter,
                  ),
                })
              }
            />
          ))}
        </View>
      )}

      {bookqqestLocked.length > 0 && (
        <View style={styles.bookqqestSection}>
          <Text style={styles.bookqqestSectionTitleLocked}>
            Locked
          </Text>
          {bookqqestLocked.map(bookqqestCharacter => (
            <BookqqestLockedCard
              key={bookqqestCharacter.bookqqestId}
              bookqqestCharacter={bookqqestCharacter}
            />
          ))}
        </View>
      )}
    </Bookqqestlayout>
  );
};

const styles = StyleSheet.create({
  bookqqestTitle: {
    color: '#DAA520',
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  bookqqestSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 8.2,
  },
  bookqqestProgress: {
    color: '#D4763E',
    fontSize: 16.3,
    lineHeight: 24.4,
    marginBottom: 24.5,
  },
  bookqqestSection: {
    gap: 16.1,
    marginBottom: 24.2,
  },
  bookqqestSectionTitle: {
    color: '#DAA520',
    fontSize: 24.3,
    fontWeight: '500',
    lineHeight: 32.4,
    marginBottom: 4.5,
  },
  bookqqestSectionTitleLocked: {
    color: 'rgba(212, 165, 116, 0.5)',
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
    marginBottom: 4.3,
  },
  bookqqestUnlockedCard: {
    borderRadius: 16.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 117, 62, 0.12)',
    backgroundColor: 'rgba(90, 58, 36, 0.31)',
    marginBottom: 16.1,
  },
  bookqqestCardImageWrap: {
    position: 'relative',
    marginTop: 20.2,
  },
  bookqqestCardImage: {
    alignSelf: 'center',
  },
  bookqqestBadge: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  bookqqestBadgeText: {
    color: '#0F0804',
    fontSize: 14.3,
  },
  bookqqestCardBody: {
    padding: 24.4,
    gap: 12.5,
  },
  bookqqestCardName: {
    color: '#DAA520',
    fontSize: 24.1,
    fontWeight: '500',
    lineHeight: 32.2,
  },
  bookqqestCardDesc: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16.3,
    lineHeight: 26.4,
  },
  bookqqestSharePress: {
    borderRadius: 20.5,
    overflow: 'hidden',
    marginTop: 4.1,
  },
  bookqqestShareBtn: {
    minHeight: 48.2,
    borderRadius: 20.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
  },
  bookqqestShareIcon: {
    width: 20.5,
    height: 20.1,
  },
  bookqqestShareText: {
    color: '#0F0804',
    fontSize: 16.2,
    fontWeight: '500',
  },
  bookqqestLockedCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.2)',
    opacity: 0.6,
    marginBottom: 16.5,
  },
  bookqqestLockedImageWrap: {
    height: 192.1,
    position: 'relative',
  },
  bookqqestLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  bookqqestLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.2,
    paddingHorizontal: 24.3,
  },
  bookqqestLockIcon: {
    fontSize: 40.4,
  },
  bookqqestLockHint: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 14.5,
    lineHeight: 20.1,
    textAlign: 'center',
  },
  bookqqestLockedBadge: {
    position: 'absolute',
    top: 16.2,
    right: 16.3,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 12.4,
    paddingVertical: 4.5,
    borderRadius: 20.1,
  },
  bookqqestLockedBadgeText: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 14.2,
  },
  bookqqestLockedNameWrap: {
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  bookqqestLockedName: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 20.5,
    fontWeight: '500',
    lineHeight: 28.1,
  },
  bookqqestPressed: {
    opacity: 0.85,
  },
});

export default Bookqqestcharct;
