import React, {useCallback, useState} from 'react';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Bookqqestlayout from '../Bookqqestcpnt/Bookqqestlayout';
import {bookqqestGetStoryById} from '../Bookqqestdata/bookqqestStoriesData';
import {
  bookqqestLoadSavedTales,
  bookqqestPreviewText,
  bookqqestRemoveSavedTale,
  bookqqestShareMessage,
  type BookqqestSavedTale,
} from '../Bookqqestdata/bookqqestSavedStorage';

type BookqqestView = 'list' | 'detail';

type BookqqestSavedEntry = BookqqestSavedTale & {
  bookqqestTitle: string;
  bookqqestRegion: string;
  bookqqestImage: ImageSourcePropType;
};

const BookqqestGradientBtn = ({
  bookqqestLabel,
  bookqqestOnPress,
  bookqqestStyle,
  bookqqestIcon,
}: {
  bookqqestLabel: string;
  bookqqestOnPress: () => void;
  bookqqestStyle?: object;
  bookqqestIcon?: ImageSourcePropType;
}) => (
  <Pressable
    onPress={bookqqestOnPress}
    style={({pressed}) => [
      styles.bookqqestGradientPress,
      pressed && styles.bookqqestPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[styles.bookqqestGradientBtn, bookqqestStyle]}>
      {bookqqestIcon ? (
        <View style={styles.bookqqestShareBtnInner}>
          <Image source={bookqqestIcon} />
          <Text style={styles.bookqqestGradientText}>
            {bookqqestLabel}
          </Text>
        </View>
      ) : (
        <Text style={styles.bookqqestGradientText}>
          {bookqqestLabel}
        </Text>
      )}
    </LinearGradient>
  </Pressable>
);

const BookqqestIconBtn = ({
  bookqqestLabel,
  bookqqestOnPress,
  bookqqestVariant,
}: {
  bookqqestLabel: ImageSourcePropType;
  bookqqestOnPress: () => void;
  bookqqestVariant: 'delete' | 'share';
}) => (
  <Pressable
    onPress={bookqqestOnPress}
    style={({pressed}) => [
      bookqqestVariant === 'delete'
        ? styles.bookqqestDeleteBtn
        : styles.bookqqestShareCircleBtn,
      pressed && styles.bookqqestPressed,
    ]}>
    <Image source={bookqqestLabel} />
  </Pressable>
);

const BookqqestSavedCard = ({
  bookqqestEntry,
  bookqqestOnOpen,
  bookqqestOnDelete,
  bookqqestOnShare,
}: {
  bookqqestEntry: BookqqestSavedEntry;
  bookqqestOnOpen: () => void;
  bookqqestOnDelete: () => void;
  bookqqestOnShare: () => void;
}) => (
  <View style={styles.bookqqestCard}>
    <View style={styles.bookqqestCardImageWrap}>
      <ImageBackground
        source={bookqqestEntry.bookqqestImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(32,17,11,0.86)', 'rgba(42,24,16,1)']}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.bookqqestBadge}>
        <Text style={styles.bookqqestBadgeText}>
          {bookqqestEntry.bookqqestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.bookqqestCardBody}>
      <Text style={styles.bookqqestCardTitle}>
        {bookqqestEntry.bookqqestTitle}
      </Text>
      <Text style={styles.bookqqestCardPreview} numberOfLines={2}>
        {bookqqestPreviewText(
          bookqqestEntry.bookqqestHistory,
        )}
      </Text>
      <View style={styles.bookqqestCardActions}>
        <BookqqestGradientBtn
          bookqqestLabel="Open"
          bookqqestOnPress={bookqqestOnOpen}
          bookqqestStyle={styles.bookqqestOpenBtn}
        />
        <BookqqestIconBtn
          bookqqestLabel={require('../../assets/img/bookqqestbolbdel.png')}
          bookqqestVariant="delete"
          bookqqestOnPress={bookqqestOnDelete}
        />
        <BookqqestIconBtn
          bookqqestLabel={require('../../assets/img/bookqqestbolbshr.png')}
          bookqqestVariant="share"
          bookqqestOnPress={bookqqestOnShare}
        />
      </View>
    </View>
  </View>
);

const Bookqqestsaved = () => {
  const bookqqestNavigation = useNavigation();
  const [bookqqestView, setBookqqestView] =
    useState<BookqqestView>('list');
  const [bookqqestEntries, setBookqqestEntries] = useState<
    BookqqestSavedEntry[]
  >([]);
  const [bookqqestActiveId, setBookqqestActiveId] =
    useState<string | null>(null);
  const [bookqqestDeleteId, setBookqqestDeleteId] =
    useState<string | null>(null);

  const bookqqestReload = useCallback(async () => {
    const bookqqestTales = await bookqqestLoadSavedTales();
    const bookqqestMapped = bookqqestTales
      .map(bookqqestTale => {
        const bookqqestStory = bookqqestGetStoryById(
          bookqqestTale.bookqqestId,
        );
        if (!bookqqestStory) {
          return null;
        }
        return {
          ...bookqqestTale,
          bookqqestTitle:
            bookqqestStory.bookqqestTitle,
          bookqqestRegion:
            bookqqestStory.bookqqestRegion,
          bookqqestImage:
            bookqqestStory.bookqqestImage,
        } as BookqqestSavedEntry;
      })
      .filter(
        (
          bookqqestEntry,
        ): bookqqestEntry is BookqqestSavedEntry =>
          bookqqestEntry != null,
      );
    setBookqqestEntries(bookqqestMapped);
  }, []);

  useFocusEffect(
    useCallback(() => {
      bookqqestReload();
    }, [bookqqestReload]),
  );

  const bookqqestActiveEntry = bookqqestEntries.find(
    e => e.bookqqestId === bookqqestActiveId,
  );

  const bookqqestShareEntry = useCallback(
    async (bookqqestEntry: BookqqestSavedEntry) => {
      await Share.share({
        message: bookqqestShareMessage(
          bookqqestEntry.bookqqestTitle,
          bookqqestEntry.bookqqestHistory,
        ),
      });
    },
    [],
  );

  const bookqqestConfirmDelete = useCallback(async () => {
    if (!bookqqestDeleteId) {
      return;
    }
    await bookqqestRemoveSavedTale(bookqqestDeleteId);
    if (bookqqestActiveId === bookqqestDeleteId) {
      setBookqqestView('list');
      setBookqqestActiveId(null);
    }
    setBookqqestDeleteId(null);
    await bookqqestReload();
  }, [
    bookqqestActiveId,
    bookqqestDeleteId,
    bookqqestReload,
  ]);

  if (bookqqestView === 'detail' && bookqqestActiveEntry) {
    return (
      <Bookqqestlayout
        bookqqestTab
        contentStyle={styles.bookqqestDetailScroll}>
        <View style={styles.bookqqestDetailHeader}>
          <Pressable
            onPress={() => {
              setBookqqestView('list');
              setBookqqestActiveId(null);
            }}
            style={({pressed}) => [
              styles.bookqqestHeaderBtn,
              pressed && styles.bookqqestPressed,
            ]}>
            <Image source={require('../../assets/img/bookqqestbolback.png')} />
          </Pressable>
          <Pressable
            onPress={() =>
              bookqqestShareEntry(bookqqestActiveEntry)
            }
            style={({pressed}) => [
              styles.bookqqestHeaderShareBtn,
              pressed && styles.bookqqestPressed,
            ]}>
            <Image source={require('../../assets/img/bookqqestbolbshr.png')} />
          </Pressable>
        </View>

        <View style={styles.bookqqestDetailImageWrap}>
          <Image
            source={bookqqestActiveEntry.bookqqestImage}
            style={styles.bookqqestDetailImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bookqqestTextBlocks}>
          {bookqqestActiveEntry.bookqqestHistory.map(
            (bookqqestBlock, i) => (
              <View
                key={`${i}-${bookqqestBlock.slice(0, 12)}`}
                style={styles.bookqqestTextCard}>
                <Text style={styles.bookqqestTextCardBody}>
                  {bookqqestBlock}
                </Text>
              </View>
            ),
          )}
        </View>

        <View style={styles.bookqqestJourneyBadge}>
          <Text style={styles.bookqqestJourneyText}>
            Journey Complete
          </Text>
        </View>

        <BookqqestGradientBtn
          bookqqestLabel="Share"
          bookqqestIcon={require('../../assets/img/bookqqestbolshare.png')}
          bookqqestOnPress={() =>
            bookqqestShareEntry(bookqqestActiveEntry)
          }
          bookqqestStyle={styles.bookqqestDetailShareBtn}
        />
      </Bookqqestlayout>
    );
  }

  return (
    <Bookqqestlayout bookqqestTab>
      <Text style={styles.bookqqestTitle}>Saved Tales</Text>
      <Text style={styles.bookqqestSubtitle}>
        Your completed adventures
      </Text>

      {bookqqestEntries.length === 0 ? (
        <View style={styles.bookqqestEmpty}>
          <Image
            source={require('../../assets/img/bookqqestbooksavedempty.png')}
            style={styles.bookqqestEmptyImage}
            resizeMode="contain"
          />
          <Text style={styles.bookqqestEmptyText}>
            No saved tales yet
          </Text>
          <BookqqestGradientBtn
            bookqqestLabel="Explore Tales"
            bookqqestOnPress={() =>
              bookqqestNavigation.navigate(
                'Bookqqeststrs' as never,
              )
            }
            bookqqestStyle={styles.bookqqestExploreBtn}
          />
        </View>
      ) : (
        <View style={styles.bookqqestList}>
          {bookqqestEntries.map(bookqqestEntry => (
            <BookqqestSavedCard
              key={bookqqestEntry.bookqqestId}
              bookqqestEntry={bookqqestEntry}
              bookqqestOnOpen={() => {
                setBookqqestActiveId(
                  bookqqestEntry.bookqqestId,
                );
                setBookqqestView('detail');
              }}
              bookqqestOnDelete={() =>
                setBookqqestDeleteId(
                  bookqqestEntry.bookqqestId,
                )
              }
              bookqqestOnShare={() =>
                bookqqestShareEntry(bookqqestEntry)
              }
            />
          ))}
        </View>
      )}

      <Modal
        visible={bookqqestDeleteId != null}
        transparent
        animationType="fade"
        onRequestClose={() => setBookqqestDeleteId(null)}>
        <Pressable
          style={styles.bookqqestModalOverlay}
          onPress={() => setBookqqestDeleteId(null)}>
          <Pressable
            style={styles.bookqqestModal}
            onPress={e => e.stopPropagation()}>
            <Pressable
              onPress={() => setBookqqestDeleteId(null)}
              style={styles.bookqqestModalClose}>
              <Image
                source={require('../../assets/img/bookqqestbolshcls.png')}
              />
            </Pressable>
            <Text style={styles.bookqqestModalTitle}>
              Remove Saved Tale?
            </Text>
            <Text style={styles.bookqqestModalBody}>
              This saved story path will be permanently removed.
            </Text>
            <Pressable
              onPress={bookqqestConfirmDelete}
              style={({pressed}) => [
                styles.bookqqestModalDeletePress,
                pressed && styles.bookqqestPressed,
              ]}>
              <LinearGradient
                colors={['#8B1A1A', 'rgba(139,26,26,0.8)']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.bookqqestModalDeleteBtn}>
                <Text style={styles.bookqqestModalDeleteText}>
                  Delete
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable
              onPress={() => setBookqqestDeleteId(null)}
              style={({pressed}) => [
                styles.bookqqestModalCancelBtn,
                pressed && styles.bookqqestPressed,
              ]}>
              <Text style={styles.bookqqestModalCancelText}>
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Bookqqestlayout>
  );
};

const styles = StyleSheet.create({
  bookqqestTitle: {
    color: '#DAA520',
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  bookqqestSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  bookqqestEmpty: {
    alignItems: 'center',
    paddingVertical: 40.3,
    gap: 16.4,
  },
  bookqqestEmptyImage: {
    width: 322.5,
    height: 322.1,
    borderRadius: 28.2,
  },
  bookqqestEmptyText: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  bookqqestExploreBtn: {
    minWidth: 158.5,
  },
  bookqqestList: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
  bookqqestCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
  },
  bookqqestCardImageWrap: {
    height: 160.5,
    position: 'relative',
  },
  bookqqestBadge: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  bookqqestBadgeText: {
    color: '#0F0804',
    fontSize: 14.1,
  },
  bookqqestCardBody: {
    padding: 24.2,
    gap: 8.3,
  },
  bookqqestCardTitle: {
    color: '#DAA520',
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  bookqqestCardPreview: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 14.1,
    lineHeight: 20.2,
    marginBottom: 8.3,
  },
  bookqqestCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  bookqqestOpenBtn: {
    flex: 1,
    minHeight: 48.5,
  },
  bookqqestGradientPress: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  bookqqestGradientBtn: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestGradientText: {
    color: '#0F0804',
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookqqestShareBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
  },
  bookqqestShareIcon: {
    color: '#0F0804',
    fontSize: 16.1,
    fontWeight: '600',
  },
  bookqqestDeleteBtn: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: 'rgba(139, 26, 26, 0.3)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 26, 26, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestDeleteIcon: {
    fontSize: 18.1,
  },
  bookqqestShareCircleBtn: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1.5,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestShareCircleIcon: {
    color: '#D4A574',
    fontSize: 18.1,
    fontWeight: '600',
  },
  bookqqestDetailScroll: {
    paddingTop: 8.2,
    paddingBottom: 120.3,
  },
  bookqqestDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  bookqqestHeaderBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1.4,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestHeaderBtnIcon: {
    color: '#D4A574',
    fontSize: 20.5,
    fontWeight: '600',
  },
  bookqqestHeaderShareBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1.4,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestHeaderShareIcon: {
    color: '#D4A574',
    fontSize: 18.5,
    fontWeight: '600',
  },
  bookqqestDetailImageWrap: {
    height: 256.1,
    borderRadius: 16.2,
    overflow: 'hidden',
    marginBottom: 24.3,
  },
  bookqqestDetailImage: {
    width: '100%',
    height: '100%',
  },
  bookqqestTextBlocks: {
    gap: 24.4,
    marginBottom: 24.5,
  },
  bookqqestTextCard: {
    borderRadius: 20.1,
    borderWidth: 1.2,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  bookqqestTextCardBody: {
    color: '#D4A574',
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  bookqqestJourneyBadge: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24.4,
    alignItems: 'center',
    marginBottom: 16.5,
  },
  bookqqestJourneyText: {
    color: '#DAA520',
    fontSize: 18.1,
    lineHeight: 28.2,
  },
  bookqqestDetailShareBtn: {
    minHeight: 48.3,
    marginBottom: 16.4,
  },
  bookqqestModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.5,
  },
  bookqqestModal: {
    width: '100%',
    maxWidth: 361.1,
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: '#2A1810',
    paddingHorizontal: 24.4,
    paddingTop: 24.5,
    paddingBottom: 24.1,
    gap: 12.2,
  },
  bookqqestModalClose: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    width: 24.5,
    height: 24.1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1.2,
  },
  bookqqestModalCloseText: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16.2,
  },
  bookqqestModalTitle: {
    color: '#DAA520',
    fontSize: 18.3,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8.4,
    marginBottom: 4.5,
  },
  bookqqestModalBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16.1,
    lineHeight: 24.2,
    textAlign: 'center',
    marginBottom: 8.3,
  },
  bookqqestModalDeletePress: {
    borderRadius: 14.4,
    overflow: 'hidden',
  },
  bookqqestModalDeleteBtn: {
    minHeight: 36.5,
    borderRadius: 14.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestModalDeleteText: {
    color: '#D4A574',
    fontSize: 14.2,
    fontWeight: '500',
  },
  bookqqestModalCancelBtn: {
    minHeight: 38.3,
    borderRadius: 14.4,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.1,
  },
  bookqqestModalCancelText: {
    color: '#D4A574',
    fontSize: 14.2,
    fontWeight: '500',
  },
  bookqqestPressed: {
    opacity: 0.85,
  },
});

export default Bookqqestsaved;
