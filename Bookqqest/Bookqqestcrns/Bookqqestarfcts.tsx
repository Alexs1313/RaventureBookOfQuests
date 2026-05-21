// Facts screen

import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import Bookqqestlayout from '../Bookqqestcpnt/Bookqqestlayout';
import {
  bookqqestArtifacts,
  bookqqestIsArtifactUnlocked,
  type BookqqestArtifact,
} from '../Bookqqestdata/bookqqestArtifactsData';
import {bookqqestGetQuizPoints} from '../Bookqqestdata/bookqqestQuizPointsStorage';

const bookqqestCardWidth = (Dimensions.get('window').width - 48.2 - 12.3) / 2;

const BookqqestUnlockedCard = ({
  bookqqestArtifact,
}: {
  bookqqestArtifact: BookqqestArtifact;
}) => (
  <View style={[styles.bookqqestCard, {width: bookqqestCardWidth}]}>
    <View style={styles.bookqqestUnlockedImageWrap}>
      <Image
        source={bookqqestArtifact.bookqqestImage}
        style={styles.bookqqestArtifactImage}
        resizeMode="contain"
      />
      <View style={styles.bookqqestBadge}>
        <Text style={styles.bookqqestBadgeText}>
          {bookqqestArtifact.bookqqestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.bookqqestUnlockedBody}>
      <Text style={styles.bookqqestArtifactName}>
        {bookqqestArtifact.bookqqestName}
      </Text>
      <Text style={styles.bookqqestArtifactDesc}>
        {bookqqestArtifact.bookqqestDescription}
      </Text>
    </View>
  </View>
);

const BookqqestLockedCard = ({
  bookqqestArtifact,
}: {
  bookqqestArtifact: BookqqestArtifact;
}) => (
  <View style={[styles.bookqqestLockedCard, {width: bookqqestCardWidth}]}>
    <View style={styles.bookqqestLockedImageWrap}>
      <Image
        source={bookqqestArtifact.bookqqestImage}
        style={styles.bookqqestLockedImage}
        resizeMode="cover"
      />
      <View style={styles.bookqqestLockedOverlay}>
        <Image source={require('../../assets/img/bookqqestbolarlock.png')} />
      </View>
      <View style={styles.bookqqestLockedBadge}>
        <Text style={styles.bookqqestLockedBadgeText}>
          {bookqqestArtifact.bookqqestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.bookqqestLockedBody}>
      <Text style={styles.bookqqestLockedName}>
        {bookqqestArtifact.bookqqestName}
      </Text>
      <Text style={styles.bookqqestLockedHint}>
        {bookqqestArtifact.bookqqestPointsRequired} points needed
      </Text>
    </View>
  </View>
);

const BookqqestArtifactGrid = ({
  bookqqestItems,
  bookqqestLocked,
}: {
  bookqqestItems: BookqqestArtifact[];
  bookqqestLocked?: boolean;
}) => (
  <View style={styles.bookqqestGrid}>
    {bookqqestItems.map(bookqqestArtifact =>
      bookqqestLocked ? (
        <BookqqestLockedCard
          key={bookqqestArtifact.bookqqestId}
          bookqqestArtifact={bookqqestArtifact}
        />
      ) : (
        <BookqqestUnlockedCard
          key={bookqqestArtifact.bookqqestId}
          bookqqestArtifact={bookqqestArtifact}
        />
      ),
    )}
  </View>
);

const Bookqqestarfcts = () => {
  const bookqqestNavigation = useNavigation();
  const [bookqqestPoints, setBookqqestPoints] = useState(0);

  const bookqqestReload = useCallback(async () => {
    setBookqqestPoints(await bookqqestGetQuizPoints());
  }, []);

  useFocusEffect(
    useCallback(() => {
      bookqqestReload();
    }, [bookqqestReload]),
  );

  const {bookqqestUnlocked, bookqqestLocked} = useMemo(() => {
    const bookqqestUnlockedList: BookqqestArtifact[] = [];
    const bookqqestLockedList: BookqqestArtifact[] = [];

    bookqqestArtifacts.forEach(bookqqestArtifact => {
      if (bookqqestIsArtifactUnlocked(bookqqestArtifact, bookqqestPoints)) {
        bookqqestUnlockedList.push(bookqqestArtifact);
      } else {
        bookqqestLockedList.push(bookqqestArtifact);
      }
    });

    return {
      bookqqestUnlocked: bookqqestUnlockedList,
      bookqqestLocked: bookqqestLockedList,
    };
  }, [bookqqestPoints]);

  const bookqqestPointsLabel =
    bookqqestPoints === 1
      ? '1 Point Obtained'
      : `${bookqqestPoints} Points Obtained`;

  return (
    <Bookqqestlayout bookqqestTab>
      <Text style={styles.bookqqestTitle}>Artifacts</Text>
      <Text style={styles.bookqqestSubtitle}>Your collected treasures</Text>
      <Text style={styles.bookqqestProgress}>{bookqqestPointsLabel}</Text>

      {bookqqestUnlocked.length > 0 && (
        <View style={styles.bookqqestSection}>
          <Text style={styles.bookqqestSectionTitle}>Unlocked</Text>
          <BookqqestArtifactGrid bookqqestItems={bookqqestUnlocked} />
        </View>
      )}

      {bookqqestLocked.length > 0 && (
        <View style={styles.bookqqestSection}>
          <Text style={styles.bookqqestSectionTitleLocked}>Locked</Text>
          <BookqqestArtifactGrid
            bookqqestItems={bookqqestLocked}
            bookqqestLocked
          />
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
    marginBottom: 24.1,
  },
  bookqqestSectionTitle: {
    color: '#DAA520',
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
    marginBottom: 16.4,
  },
  bookqqestSectionTitleLocked: {
    color: 'rgba(212, 165, 116, 0.5)',
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
    marginBottom: 16.2,
  },
  bookqqestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.3,
  },
  bookqqestCard: {
    borderRadius: 20.4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 4.1,
  },
  bookqqestUnlockedImageWrap: {
    height: 148.2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bookqqestArtifactImage: {
    width: '72%',
    height: '88%',
    marginTop: 25.3,
  },
  bookqqestBadge: {
    position: 'absolute',
    top: 8.4,
    right: 8.5,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 8.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
  },
  bookqqestBadgeText: {
    color: '#0F0804',
    fontSize: 12.4,
  },
  bookqqestUnlockedBody: {
    paddingHorizontal: 12.5,
    paddingBottom: 14.1,
    paddingTop: 10.2,
    gap: 6.3,
  },
  bookqqestArtifactName: {
    color: '#DAA520',
    fontSize: 14.4,
    fontWeight: '500',
    lineHeight: 20.5,
  },
  bookqqestArtifactDesc: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 10.1,
    lineHeight: 14.2,
  },
  bookqqestLockedCard: {
    borderRadius: 20.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.2)',
    opacity: 0.6,
    marginBottom: 4.5,
  },
  bookqqestLockedImageWrap: {
    height: 128.1,
    position: 'relative',
  },
  bookqqestLockedImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  bookqqestLockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 15, 10, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestLockIcon: {
    fontSize: 32.2,
  },
  bookqqestLockedBadge: {
    position: 'absolute',
    top: 8.3,
    right: 8.4,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    paddingHorizontal: 8.5,
    paddingVertical: 4.1,
    borderRadius: 20.2,
  },
  bookqqestLockedBadgeText: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 12.3,
  },
  bookqqestLockedBody: {
    paddingHorizontal: 12.4,
    paddingVertical: 12.5,
    gap: 4.1,
  },
  bookqqestLockedName: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 14.2,
    fontWeight: '500',
    lineHeight: 20.3,
  },
  bookqqestLockedHint: {
    color: 'rgba(212, 165, 116, 0.4)',
    fontSize: 12.4,
    lineHeight: 16.5,
  },
  bookqqestQuizPress: {
    borderRadius: 20.1,
    overflow: 'hidden',
    marginTop: 8.2,
    marginBottom: 16.3,
  },
  bookqqestQuizBtn: {
    minHeight: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24.1,
  },
  bookqqestQuizText: {
    color: '#0F0804',
    fontSize: 16.2,
    fontWeight: '500',
  },
  bookqqestPressed: {
    opacity: 0.85,
  },
});

export default Bookqqestarfcts;
