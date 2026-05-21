import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Bookqqestlayout from '../Bookqqestcpnt/Bookqqestlayout';
import {
  bookqqestGetStoryById,
  bookqqestStoriesByRegion,
  type BookqqestStory,
} from '../Bookqqestdata/bookqqestStoriesData';
import {
  bookqqestIsStorySaved,
  bookqqestSaveTale,
} from '../Bookqqestdata/bookqqestSavedStorage';
import {bookqqestMarkTaleRead} from '../Bookqqestdata/bookqqestTalesProgressStorage';

type BookqqestView = 'list' | 'reader';

const BookqqestGradientBtn = ({
  bookqqestLabel,
  bookqqestOnPress,
  bookqqestTall,
}: {
  bookqqestLabel: string;
  bookqqestOnPress: () => void;
  bookqqestTall?: boolean;
}) => (
  <Pressable
    onPress={bookqqestOnPress}
    style={({pressed}) => [
      styles.bookqqestChoicePress,
      pressed && styles.bookqqestPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[
        styles.bookqqestChoiceBtn,
        bookqqestTall && styles.bookqqestChoiceBtnTall,
      ]}>
      <Text style={styles.bookqqestChoiceText}>
        {bookqqestLabel}
      </Text>
    </LinearGradient>
  </Pressable>
);

const BookqqestStoryCard = ({
  bookqqestStory,
  bookqqestOnOpen,
}: {
  bookqqestStory: BookqqestStory;
  bookqqestOnOpen: () => void;
}) => (
  <View style={styles.bookqqestListCard}>
    <View style={styles.bookqqestListCardImageWrap}>
      <ImageBackground
        source={bookqqestStory.bookqqestImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(23,11,6,0.71)', 'rgba(42,24,16,1)']}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.bookqqestListBadge}>
        <Text style={styles.bookqqestListBadgeText}>
          {bookqqestStory.bookqqestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.bookqqestListCardBody}>
      <Text style={styles.bookqqestListCardTitle}>
        {bookqqestStory.bookqqestTitle}
      </Text>
      <Text style={styles.bookqqestListCardDesc}>
        {bookqqestStory.bookqqestDescription}
      </Text>
      <BookqqestGradientBtn
        bookqqestLabel="Open"
        bookqqestOnPress={bookqqestOnOpen}
      />
    </View>
  </View>
);

const Bookqqeststrs = () => {
  const [bookqqestView, setBookqqestView] =
    useState<BookqqestView>('list');
  const [bookqqestActiveId, setBookqqestActiveId] =
    useState<string | null>(null);
  const [bookqqestNodeId, setBookqqestNodeId] =
    useState('start');
  const [bookqqestHistory, setBookqqestHistory] = useState<
    string[]
  >([]);
  const [bookqqestSaved, setBookqqestSaved] =
    useState(false);

  const bookqqestStory = useMemo(
    () =>
      bookqqestActiveId
        ? bookqqestGetStoryById(bookqqestActiveId)
        : undefined,
    [bookqqestActiveId],
  );

  const bookqqestNode =
    bookqqestStory?.bookqqestNodes[
      bookqqestNodeId
    ];

  const bookqqestIsComplete =
    bookqqestNode?.bookqqestEnding === true;

  useEffect(() => {
    if (bookqqestIsComplete && bookqqestActiveId) {
      bookqqestMarkTaleRead(bookqqestActiveId);
    }
  }, [bookqqestActiveId, bookqqestIsComplete]);

  const bookqqestOpenStory = useCallback(
    async (bookqqestId: string) => {
      const bookqqestItem = bookqqestGetStoryById(
        bookqqestId,
      );
      if (!bookqqestItem) {
        return;
      }
      const bookqqestWasSaved = await bookqqestIsStorySaved(
        bookqqestId,
      );
      setBookqqestActiveId(bookqqestId);
      setBookqqestNodeId('start');
      setBookqqestHistory([
        bookqqestItem.bookqqestIntro,
      ]);
      setBookqqestSaved(bookqqestWasSaved);
      setBookqqestView('reader');
    },
    [],
  );

  const bookqqestBackToList = useCallback(() => {
    setBookqqestView('list');
    setBookqqestActiveId(null);
    setBookqqestNodeId('start');
    setBookqqestHistory([]);
    setBookqqestSaved(false);
  }, []);

  const bookqqestPickChoice = useCallback(
    (bookqqestNext: string) => {
      if (!bookqqestStory) {
        return;
      }
      const bookqqestNextNode =
        bookqqestStory.bookqqestNodes[
          bookqqestNext
        ];
      if (!bookqqestNextNode) {
        return;
      }
      const bookqqestNewHistory = [
        ...bookqqestHistory,
        ...(bookqqestNextNode.bookqqestAddText
          ? [bookqqestNextNode.bookqqestAddText]
          : []),
      ];
      setBookqqestHistory(bookqqestNewHistory);
      setBookqqestNodeId(bookqqestNext);
    },
    [bookqqestHistory, bookqqestStory],
  );

  const bookqqestSaveStory = useCallback(async () => {
    if (
      !bookqqestActiveId ||
      bookqqestSaved ||
      !bookqqestStory
    ) {
      return;
    }
    await bookqqestSaveTale({
      bookqqestId: bookqqestActiveId,
      bookqqestHistory: bookqqestHistory,
      bookqqestSavedAt: Date.now(),
    });
    setBookqqestSaved(true);
  }, [
    bookqqestActiveId,
    bookqqestHistory,
    bookqqestSaved,
    bookqqestStory,
  ]);

  if (bookqqestView === 'list') {
    return (
      <Bookqqestlayout bookqqestTab>
        <Text style={styles.bookqqestListTitle}>Tales</Text>
        <Text style={styles.bookqqestListSubtitle}>
          Choose your mythology adventure
        </Text>
        {bookqqestStoriesByRegion.map(
          ({bookqqestRegion, bookqqestItems}) => (
            <View
              key={bookqqestRegion}
              style={styles.bookqqestRegionBlock}>
              <Text style={styles.bookqqestRegionTitle}>
                {bookqqestRegion}
              </Text>
              {bookqqestItems.map(bookqqestItem => (
                <BookqqestStoryCard
                  key={bookqqestItem.bookqqestId}
                  bookqqestStory={bookqqestItem}
                  bookqqestOnOpen={() =>
                    bookqqestOpenStory(
                      bookqqestItem.bookqqestId,
                    )
                  }
                />
              ))}
            </View>
          ),
        )}
      </Bookqqestlayout>
    );
  }

  if (!bookqqestStory || !bookqqestNode) {
    return null;
  }

  const bookqqestShowHero =
    bookqqestHistory.length === 1 &&
    bookqqestNodeId === 'start';

  return (
    <Bookqqestlayout
      bookqqestTab
      contentStyle={styles.bookqqestReaderScroll}>
      <Pressable
        onPress={bookqqestBackToList}
        style={({pressed}) => [
          styles.bookqqestBackBtn,
          pressed && styles.bookqqestPressed,
        ]}>
        <Image source={require('../../assets/img/bookqqestbolback.png')} />
      </Pressable>

      {bookqqestShowHero && (
        <View style={styles.bookqqestHero}>
          <View style={styles.bookqqestHeroImageWrap}>
            <ImageBackground
              source={bookqqestStory.bookqqestImage}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                'rgba(0,0,0,0)',
                'rgba(32,17,11,0.86)',
                'rgba(42,24,16,1)',
              ]}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.bookqqestHeroBadge}>
              <Text style={styles.bookqqestListBadgeText}>
                {bookqqestStory.bookqqestRegion}
              </Text>
            </View>
            <Text style={styles.bookqqestHeroTitle}>
              {bookqqestStory.bookqqestTitle}
            </Text>
          </View>
        </View>
      )}

      {!bookqqestShowHero && (
        <View style={styles.bookqqestReaderThumb}>
          <ImageBackground
            source={bookqqestStory.bookqqestImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.bookqqestTextBlocks}>
        {bookqqestHistory.map((bookqqestBlock, i) => (
          <View
            key={`${i}-${bookqqestBlock.slice(0, 12)}`}
            style={styles.bookqqestTextCard}>
            <Text style={styles.bookqqestTextCardBody}>
              {bookqqestBlock}
            </Text>
          </View>
        ))}
      </View>

      {bookqqestIsComplete ? (
        <View style={styles.bookqqestCompleteBlock}>
          <View style={styles.bookqqestJourneyBadge}>
            <Text style={styles.bookqqestJourneyText}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={bookqqestSaved}
            onPress={bookqqestSaveStory}
            style={({pressed}) => [
              styles.bookqqestSavePress,
              bookqqestSaved &&
                styles.bookqqestSaveDisabled,
              pressed &&
                !bookqqestSaved &&
                styles.bookqqestPressed,
            ]}>
            <LinearGradient
              colors={['#D4763E', '#FF9F40']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.bookqqestSaveBtn}>
              <Text style={styles.bookqqestChoiceText}>
                {bookqqestSaved
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        <View style={styles.bookqqestChoicesBlock}>
          {bookqqestNode.bookqqestQuestion && (
            <Text style={styles.bookqqestQuestion}>
              {bookqqestNode.bookqqestQuestion}
            </Text>
          )}
          {bookqqestNode.bookqqestChoices?.map(
            bookqqestChoice => (
              <BookqqestGradientBtn
                key={bookqqestChoice.bookqqestNext}
                bookqqestLabel={
                  bookqqestChoice.bookqqestLabel
                }
                bookqqestTall={
                  bookqqestChoice.bookqqestLabel.length > 42
                }
                bookqqestOnPress={() =>
                  bookqqestPickChoice(
                    bookqqestChoice.bookqqestNext,
                  )
                }
              />
            ),
          )}
        </View>
      )}
    </Bookqqestlayout>
  );
};

const styles = StyleSheet.create({
  bookqqestListTitle: {
    color: '#DAA520',
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  bookqqestListSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  bookqqestRegionBlock: {
    marginBottom: 24.3,
    gap: 16.4,
  },
  bookqqestRegionTitle: {
    color: '#D4763E',
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
  },
  bookqqestListCard: {
    borderRadius: 16.2,
    overflow: 'hidden',
    borderWidth: 1.3,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 16.4,
  },
  bookqqestListCardImageWrap: {
    height: 192.5,
    position: 'relative',
  },
  bookqqestListBadge: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  bookqqestListBadgeText: {
    color: '#0F0804',
    fontSize: 14.1,
  },
  bookqqestListCardBody: {
    padding: 24.2,
    gap: 12.3,
  },
  bookqqestListCardTitle: {
    color: '#DAA520',
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  bookqqestListCardDesc: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16.1,
    lineHeight: 26.2,
    marginBottom: 4.3,
  },
  bookqqestReaderScroll: {
    paddingTop: 8.4,
  },
  bookqqestBackBtn: {
    width: 40.5,
    height: 40.1,
    borderRadius: 20.2,
    backgroundColor: '#5A3A2480',
    borderWidth: 1.3,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  bookqqestBackIcon: {
    color: '#D4A574',
    fontSize: 20.1,
    fontWeight: '600',
  },
  bookqqestHero: {
    marginBottom: 24.2,
  },
  bookqqestHeroImageWrap: {
    height: 256.3,
    borderRadius: 16.4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24.5,
  },
  bookqqestHeroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
    marginBottom: 12.4,
  },
  bookqqestHeroTitle: {
    color: '#DAA520',
    fontSize: 30.5,
    fontWeight: '500',
    lineHeight: 36.1,
  },
  bookqqestReaderThumb: {
    height: 256.2,
    borderRadius: 16.3,
    overflow: 'hidden',
    marginBottom: 24.4,
  },
  bookqqestTextBlocks: {
    gap: 24.5,
    marginBottom: 24.1,
  },
  bookqqestTextCard: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    paddingHorizontal: 24.4,
    paddingVertical: 24.5,
  },
  bookqqestTextCardBody: {
    color: '#D4A574',
    fontSize: 16.1,
    lineHeight: 26.2,
  },
  bookqqestQuestion: {
    color: '#DAA520',
    fontSize: 16.3,
    lineHeight: 24.4,
    textAlign: 'center',
    marginBottom: 16.5,
  },
  bookqqestChoicesBlock: {
    gap: 12.1,
    marginBottom: 16.2,
  },
  bookqqestChoicePress: {
    borderRadius: 20.3,
    overflow: 'hidden',
    width: '100%',
  },
  bookqqestChoiceBtn: {
    minHeight: 47.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestChoiceBtnTall: {
    minHeight: 80.1,
  },
  bookqqestChoiceText: {
    color: '#0F0804',
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookqqestCompleteBlock: {
    gap: 16.3,
    marginBottom: 16.4,
  },
  bookqqestJourneyBadge: {
    borderRadius: 20.5,
    borderWidth: 1.1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24.2,
    alignItems: 'center',
  },
  bookqqestJourneyText: {
    color: '#DAA520',
    fontSize: 18.3,
    lineHeight: 28.4,
  },
  bookqqestSavePress: {
    borderRadius: 20.5,
    overflow: 'hidden',
  },
  bookqqestSaveDisabled: {
    opacity: 0.5,
  },
  bookqqestSaveBtn: {
    height: 56.1,
    borderRadius: 20.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestPressed: {
    opacity: 0.85,
  },
});

export default Bookqqeststrs;
