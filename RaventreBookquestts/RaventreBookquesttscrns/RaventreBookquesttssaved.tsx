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

import RaventreBookqueslayout from '../RaventreBookquesttscpnt/RaventreBookqueslayout';
import {raventreBookquesttsGetStoryById} from '../RaventreBookquesttsdata/raventreBookquesttsStoriesData';
import {
  raventreBookquesttsLoadSavedTales,
  raventreBookquesttsPreviewText,
  raventreBookquesttsRemoveSavedTale,
  raventreBookquesttsShareMessage,
  type RaventreBookquesttsSavedTale,
} from '../RaventreBookquesttsdata/raventreBookquesttsSavedStorage';

type RaventreBookquesttsView = 'list' | 'detail';

type RaventreBookquesttsSavedEntry = RaventreBookquesttsSavedTale & {
  raventreBookquesttsTitle: string;
  raventreBookquesttsRegion: string;
  raventreBookquesttsImage: ImageSourcePropType;
};

const RaventreBookquesttsGradientBtn = ({
  raventreBookquesttsLabel,
  raventreBookquesttsOnPress,
  raventreBookquesttsStyle,
  raventreBookquesttsIcon,
}: {
  raventreBookquesttsLabel: string;
  raventreBookquesttsOnPress: () => void;
  raventreBookquesttsStyle?: object;
  raventreBookquesttsIcon?: string;
}) => (
  <Pressable
    onPress={raventreBookquesttsOnPress}
    style={({pressed}) => [
      styles.raventreBookquesttsGradientPress,
      pressed && styles.raventreBookquesttsPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[styles.raventreBookquesttsGradientBtn, raventreBookquesttsStyle]}>
      {raventreBookquesttsIcon ? (
        <View style={styles.raventreBookquesttsShareBtnInner}>
          <Image source={raventreBookquesttsIcon} />
          <Text style={styles.raventreBookquesttsGradientText}>
            {raventreBookquesttsLabel}
          </Text>
        </View>
      ) : (
        <Text style={styles.raventreBookquesttsGradientText}>
          {raventreBookquesttsLabel}
        </Text>
      )}
    </LinearGradient>
  </Pressable>
);

const RaventreBookquesttsIconBtn = ({
  raventreBookquesttsLabel,
  raventreBookquesttsOnPress,
  raventreBookquesttsVariant,
}: {
  raventreBookquesttsLabel: ImageSourcePropType;
  raventreBookquesttsOnPress: () => void;
  raventreBookquesttsVariant: 'delete' | 'share';
}) => (
  <Pressable
    onPress={raventreBookquesttsOnPress}
    style={({pressed}) => [
      raventreBookquesttsVariant === 'delete'
        ? styles.raventreBookquesttsDeleteBtn
        : styles.raventreBookquesttsShareCircleBtn,
      pressed && styles.raventreBookquesttsPressed,
    ]}>
    <Image source={raventreBookquesttsLabel} />
  </Pressable>
);

const RaventreBookquesttsSavedCard = ({
  raventreBookquesttsEntry,
  raventreBookquesttsOnOpen,
  raventreBookquesttsOnDelete,
  raventreBookquesttsOnShare,
}: {
  raventreBookquesttsEntry: RaventreBookquesttsSavedEntry;
  raventreBookquesttsOnOpen: () => void;
  raventreBookquesttsOnDelete: () => void;
  raventreBookquesttsOnShare: () => void;
}) => (
  <View style={styles.raventreBookquesttsCard}>
    <View style={styles.raventreBookquesttsCardImageWrap}>
      <ImageBackground
        source={raventreBookquesttsEntry.raventreBookquesttsImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(32,17,11,0.86)', 'rgba(42,24,16,1)']}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.raventreBookquesttsBadge}>
        <Text style={styles.raventreBookquesttsBadgeText}>
          {raventreBookquesttsEntry.raventreBookquesttsRegion}
        </Text>
      </View>
    </View>
    <View style={styles.raventreBookquesttsCardBody}>
      <Text style={styles.raventreBookquesttsCardTitle}>
        {raventreBookquesttsEntry.raventreBookquesttsTitle}
      </Text>
      <Text style={styles.raventreBookquesttsCardPreview} numberOfLines={2}>
        {raventreBookquesttsPreviewText(
          raventreBookquesttsEntry.raventreBookquesttsHistory,
        )}
      </Text>
      <View style={styles.raventreBookquesttsCardActions}>
        <RaventreBookquesttsGradientBtn
          raventreBookquesttsLabel="Open"
          raventreBookquesttsOnPress={raventreBookquesttsOnOpen}
          raventreBookquesttsStyle={styles.raventreBookquesttsOpenBtn}
        />
        <RaventreBookquesttsIconBtn
          raventreBookquesttsLabel={require('../../assets/img/raventrebolbdel.png')}
          raventreBookquesttsVariant="delete"
          raventreBookquesttsOnPress={raventreBookquesttsOnDelete}
        />
        <RaventreBookquesttsIconBtn
          raventreBookquesttsLabel={require('../../assets/img/raventrebolbshr.png')}
          raventreBookquesttsVariant="share"
          raventreBookquesttsOnPress={raventreBookquesttsOnShare}
        />
      </View>
    </View>
  </View>
);

const RaventreBookquesttssaved = () => {
  const raventreBookquesttsNavigation = useNavigation();
  const [raventreBookquesttsView, setRaventreBookquesttsView] =
    useState<RaventreBookquesttsView>('list');
  const [raventreBookquesttsEntries, setRaventreBookquesttsEntries] = useState<
    RaventreBookquesttsSavedEntry[]
  >([]);
  const [raventreBookquesttsActiveId, setRaventreBookquesttsActiveId] =
    useState<string | null>(null);
  const [raventreBookquesttsDeleteId, setRaventreBookquesttsDeleteId] =
    useState<string | null>(null);

  const raventreBookquesttsReload = useCallback(async () => {
    const raventreBookquesttsTales = await raventreBookquesttsLoadSavedTales();
    const raventreBookquesttsMapped = raventreBookquesttsTales
      .map(raventreBookquesttsTale => {
        const raventreBookquesttsStory = raventreBookquesttsGetStoryById(
          raventreBookquesttsTale.raventreBookquesttsId,
        );
        if (!raventreBookquesttsStory) {
          return null;
        }
        return {
          ...raventreBookquesttsTale,
          raventreBookquesttsTitle:
            raventreBookquesttsStory.raventreBookquesttsTitle,
          raventreBookquesttsRegion:
            raventreBookquesttsStory.raventreBookquesttsRegion,
          raventreBookquesttsImage:
            raventreBookquesttsStory.raventreBookquesttsImage,
        } as RaventreBookquesttsSavedEntry;
      })
      .filter(
        (
          raventreBookquesttsEntry,
        ): raventreBookquesttsEntry is RaventreBookquesttsSavedEntry =>
          raventreBookquesttsEntry != null,
      );
    setRaventreBookquesttsEntries(raventreBookquesttsMapped);
  }, []);

  useFocusEffect(
    useCallback(() => {
      raventreBookquesttsReload();
    }, [raventreBookquesttsReload]),
  );

  const raventreBookquesttsActiveEntry = raventreBookquesttsEntries.find(
    e => e.raventreBookquesttsId === raventreBookquesttsActiveId,
  );

  const raventreBookquesttsShareEntry = useCallback(
    async (raventreBookquesttsEntry: RaventreBookquesttsSavedEntry) => {
      await Share.share({
        message: raventreBookquesttsShareMessage(
          raventreBookquesttsEntry.raventreBookquesttsTitle,
          raventreBookquesttsEntry.raventreBookquesttsHistory,
        ),
      });
    },
    [],
  );

  const raventreBookquesttsConfirmDelete = useCallback(async () => {
    if (!raventreBookquesttsDeleteId) {
      return;
    }
    await raventreBookquesttsRemoveSavedTale(raventreBookquesttsDeleteId);
    if (raventreBookquesttsActiveId === raventreBookquesttsDeleteId) {
      setRaventreBookquesttsView('list');
      setRaventreBookquesttsActiveId(null);
    }
    setRaventreBookquesttsDeleteId(null);
    await raventreBookquesttsReload();
  }, [
    raventreBookquesttsActiveId,
    raventreBookquesttsDeleteId,
    raventreBookquesttsReload,
  ]);

  if (raventreBookquesttsView === 'detail' && raventreBookquesttsActiveEntry) {
    return (
      <RaventreBookqueslayout
        raventreBookquesttsTab
        contentStyle={styles.raventreBookquesttsDetailScroll}>
        <View style={styles.raventreBookquesttsDetailHeader}>
          <Pressable
            onPress={() => {
              setRaventreBookquesttsView('list');
              setRaventreBookquesttsActiveId(null);
            }}
            style={({pressed}) => [
              styles.raventreBookquesttsHeaderBtn,
              pressed && styles.raventreBookquesttsPressed,
            ]}>
            <Image source={require('../../assets/img/raventrebolback.png')} />
          </Pressable>
          <Pressable
            onPress={() =>
              raventreBookquesttsShareEntry(raventreBookquesttsActiveEntry)
            }
            style={({pressed}) => [
              styles.raventreBookquesttsHeaderShareBtn,
              pressed && styles.raventreBookquesttsPressed,
            ]}>
            <Image source={require('../../assets/img/raventrebolbshr.png')} />
          </Pressable>
        </View>

        <View style={styles.raventreBookquesttsDetailImageWrap}>
          <Image
            source={raventreBookquesttsActiveEntry.raventreBookquesttsImage}
            style={styles.raventreBookquesttsDetailImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.raventreBookquesttsTextBlocks}>
          {raventreBookquesttsActiveEntry.raventreBookquesttsHistory.map(
            (raventreBookquesttsBlock, i) => (
              <View
                key={`${i}-${raventreBookquesttsBlock.slice(0, 12)}`}
                style={styles.raventreBookquesttsTextCard}>
                <Text style={styles.raventreBookquesttsTextCardBody}>
                  {raventreBookquesttsBlock}
                </Text>
              </View>
            ),
          )}
        </View>

        <View style={styles.raventreBookquesttsJourneyBadge}>
          <Text style={styles.raventreBookquesttsJourneyText}>
            Journey Complete
          </Text>
        </View>

        <RaventreBookquesttsGradientBtn
          raventreBookquesttsLabel="Share"
          raventreBookquesttsIcon={require('../../assets/img/raventrebolshare.png')}
          raventreBookquesttsOnPress={() =>
            raventreBookquesttsShareEntry(raventreBookquesttsActiveEntry)
          }
          raventreBookquesttsStyle={styles.raventreBookquesttsDetailShareBtn}
        />
      </RaventreBookqueslayout>
    );
  }

  return (
    <RaventreBookqueslayout raventreBookquesttsTab>
      <Text style={styles.raventreBookquesttsTitle}>Saved Tales</Text>
      <Text style={styles.raventreBookquesttsSubtitle}>
        Your completed adventures
      </Text>

      {raventreBookquesttsEntries.length === 0 ? (
        <View style={styles.raventreBookquesttsEmpty}>
          <Image
            source={require('../../assets/img/raventrebooksavedempty.png')}
            style={styles.raventreBookquesttsEmptyImage}
            resizeMode="contain"
          />
          <Text style={styles.raventreBookquesttsEmptyText}>
            No saved tales yet
          </Text>
          <RaventreBookquesttsGradientBtn
            raventreBookquesttsLabel="Explore Tales"
            raventreBookquesttsOnPress={() =>
              raventreBookquesttsNavigation.navigate(
                'RaventreBookquesttsstrs' as never,
              )
            }
            raventreBookquesttsStyle={styles.raventreBookquesttsExploreBtn}
          />
        </View>
      ) : (
        <View style={styles.raventreBookquesttsList}>
          {raventreBookquesttsEntries.map(raventreBookquesttsEntry => (
            <RaventreBookquesttsSavedCard
              key={raventreBookquesttsEntry.raventreBookquesttsId}
              raventreBookquesttsEntry={raventreBookquesttsEntry}
              raventreBookquesttsOnOpen={() => {
                setRaventreBookquesttsActiveId(
                  raventreBookquesttsEntry.raventreBookquesttsId,
                );
                setRaventreBookquesttsView('detail');
              }}
              raventreBookquesttsOnDelete={() =>
                setRaventreBookquesttsDeleteId(
                  raventreBookquesttsEntry.raventreBookquesttsId,
                )
              }
              raventreBookquesttsOnShare={() =>
                raventreBookquesttsShareEntry(raventreBookquesttsEntry)
              }
            />
          ))}
        </View>
      )}

      <Modal
        visible={raventreBookquesttsDeleteId != null}
        transparent
        animationType="fade"
        onRequestClose={() => setRaventreBookquesttsDeleteId(null)}>
        <Pressable
          style={styles.raventreBookquesttsModalOverlay}
          onPress={() => setRaventreBookquesttsDeleteId(null)}>
          <Pressable
            style={styles.raventreBookquesttsModal}
            onPress={e => e.stopPropagation()}>
            <Pressable
              onPress={() => setRaventreBookquesttsDeleteId(null)}
              style={styles.raventreBookquesttsModalClose}>
              <Image
                source={require('../../assets/img/raventrebolshcls.png')}
              />
            </Pressable>
            <Text style={styles.raventreBookquesttsModalTitle}>
              Remove Saved Tale?
            </Text>
            <Text style={styles.raventreBookquesttsModalBody}>
              This saved story path will be permanently removed.
            </Text>
            <Pressable
              onPress={raventreBookquesttsConfirmDelete}
              style={({pressed}) => [
                styles.raventreBookquesttsModalDeletePress,
                pressed && styles.raventreBookquesttsPressed,
              ]}>
              <LinearGradient
                colors={['#8B1A1A', 'rgba(139,26,26,0.8)']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.raventreBookquesttsModalDeleteBtn}>
                <Text style={styles.raventreBookquesttsModalDeleteText}>
                  Delete
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable
              onPress={() => setRaventreBookquesttsDeleteId(null)}
              style={({pressed}) => [
                styles.raventreBookquesttsModalCancelBtn,
                pressed && styles.raventreBookquesttsPressed,
              ]}>
              <Text style={styles.raventreBookquesttsModalCancelText}>
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </RaventreBookqueslayout>
  );
};

const styles = StyleSheet.create({
  raventreBookquesttsTitle: {
    color: '#DAA520',
    fontSize: 46,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  raventreBookquesttsSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  raventreBookquesttsEmpty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  raventreBookquesttsEmptyImage: {
    width: 322,
    height: 322,
    borderRadius: 28,
  },
  raventreBookquesttsEmptyText: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 16,
    lineHeight: 24,
  },
  raventreBookquesttsExploreBtn: {
    minWidth: 158,
  },
  raventreBookquesttsList: {
    gap: 16,
    paddingBottom: 16,
  },
  raventreBookquesttsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
  },
  raventreBookquesttsCardImageWrap: {
    height: 160,
    position: 'relative',
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
    gap: 8,
  },
  raventreBookquesttsCardTitle: {
    color: '#DAA520',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  raventreBookquesttsCardPreview: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  raventreBookquesttsCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  raventreBookquesttsOpenBtn: {
    flex: 1,
    minHeight: 48,
  },
  raventreBookquesttsGradientPress: {
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  raventreBookquesttsGradientBtn: {
    minHeight: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsGradientText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  raventreBookquesttsShareBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  raventreBookquesttsShareIcon: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '600',
  },
  raventreBookquesttsDeleteBtn: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 26, 26, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(139, 26, 26, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsDeleteIcon: {
    fontSize: 18,
  },
  raventreBookquesttsShareCircleBtn: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsShareCircleIcon: {
    color: '#D4A574',
    fontSize: 18,
    fontWeight: '600',
  },
  raventreBookquesttsDetailScroll: {
    paddingTop: 8,
    paddingBottom: 120,
  },
  raventreBookquesttsDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  raventreBookquesttsHeaderBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsHeaderBtnIcon: {
    color: '#D4A574',
    fontSize: 20,
    fontWeight: '600',
  },
  raventreBookquesttsHeaderShareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsHeaderShareIcon: {
    color: '#D4A574',
    fontSize: 18,
    fontWeight: '600',
  },
  raventreBookquesttsDetailImageWrap: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  raventreBookquesttsDetailImage: {
    width: '100%',
    height: '100%',
  },
  raventreBookquesttsTextBlocks: {
    gap: 24,
    marginBottom: 24,
  },
  raventreBookquesttsTextCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  raventreBookquesttsTextCardBody: {
    color: '#D4A574',
    fontSize: 16,
    lineHeight: 26,
  },
  raventreBookquesttsJourneyBadge: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  raventreBookquesttsJourneyText: {
    color: '#DAA520',
    fontSize: 18,
    lineHeight: 28,
  },
  raventreBookquesttsDetailShareBtn: {
    minHeight: 48,
    marginBottom: 16,
  },
  raventreBookquesttsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  raventreBookquesttsModal: {
    width: '100%',
    maxWidth: 361,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: '#2A1810',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 12,
  },
  raventreBookquesttsModalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  raventreBookquesttsModalCloseText: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
  },
  raventreBookquesttsModalTitle: {
    color: '#DAA520',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  raventreBookquesttsModalBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  raventreBookquesttsModalDeletePress: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  raventreBookquesttsModalDeleteBtn: {
    minHeight: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsModalDeleteText: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  raventreBookquesttsModalCancelBtn: {
    minHeight: 38,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
  },
  raventreBookquesttsModalCancelText: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  raventreBookquesttsPressed: {
    opacity: 0.85,
  },
});

export default RaventreBookquesttssaved;
