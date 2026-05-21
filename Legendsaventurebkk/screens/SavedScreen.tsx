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
import {
  AppLayout,
  BackButton,
  ConfirmModal,
  GradientButton,
  IconButton,
  JourneyBadge,
  OutlineButton,
  RegionBadge,
  ScreenHeader,
  StoryListCard,
  TextCard,
} from '../components';
import {legendsaventurebkkAssets} from '../constants';
import {colors, gradients, gradientAxis} from '../themes';

import {legendsaventurebkkGetStoryById} from '../data/legendsaventurebkkStoriesData';
import type {
  LegendsaventurebkkSavedEntry,
  LegendsaventurebkkSavedTale,
  LegendsaventurebkkSavedView,
} from '../types';
import {
  legendsaventurebkkLoadSavedTales,
  legendsaventurebkkPreviewText,
  legendsaventurebkkRemoveSavedTale,
  legendsaventurebkkShareMessage,
} from '../utils';

const LegendsaventurebkkGradientBtn = ({
  legendsaventurebkkLabel,
  legendsaventurebkkOnPress,
  legendsaventurebkkStyle,
  legendsaventurebkkIcon,
}: {
  legendsaventurebkkLabel: string;
  legendsaventurebkkOnPress: () => void;
  legendsaventurebkkStyle?: object;
  legendsaventurebkkIcon?: ImageSourcePropType;
}) => (
  <Pressable
    onPress={legendsaventurebkkOnPress}
    style={({pressed}) => [
      styles.legendsaventurebkkGradientPress,
      pressed && styles.legendsaventurebkkPressed,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[styles.legendsaventurebkkGradientBtn, legendsaventurebkkStyle]}>
      {legendsaventurebkkIcon ? (
        <View style={styles.legendsaventurebkkShareBtnInner}>
          <Image source={legendsaventurebkkIcon} />
          <Text style={styles.legendsaventurebkkGradientText}>
            {legendsaventurebkkLabel}
          </Text>
        </View>
      ) : (
        <Text style={styles.legendsaventurebkkGradientText}>
          {legendsaventurebkkLabel}
        </Text>
      )}
    </LinearGradient>
  </Pressable>
);

const LegendsaventurebkkIconBtn = ({
  legendsaventurebkkLabel,
  legendsaventurebkkOnPress,
  legendsaventurebkkVariant,
}: {
  legendsaventurebkkLabel: ImageSourcePropType;
  legendsaventurebkkOnPress: () => void;
  legendsaventurebkkVariant: 'delete' | 'share';
}) => (
  <Pressable
    onPress={legendsaventurebkkOnPress}
    style={({pressed}) => [
      legendsaventurebkkVariant === 'delete'
        ? styles.legendsaventurebkkDeleteBtn
        : styles.legendsaventurebkkShareCircleBtn,
      pressed && styles.legendsaventurebkkPressed,
    ]}>
    <Image source={legendsaventurebkkLabel} />
  </Pressable>
);

const LegendsaventurebkkSavedCard = ({
  legendsaventurebkkEntry,
  legendsaventurebkkOnOpen,
  legendsaventurebkkOnDelete,
  legendsaventurebkkOnShare,
}: {
  legendsaventurebkkEntry: LegendsaventurebkkSavedEntry;
  legendsaventurebkkOnOpen: () => void;
  legendsaventurebkkOnDelete: () => void;
  legendsaventurebkkOnShare: () => void;
}) => (
  <View style={styles.legendsaventurebkkCard}>
    <View style={styles.legendsaventurebkkCardImageWrap}>
      <ImageBackground
        source={legendsaventurebkkEntry.legendsaventurebkkImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradients.savedCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.legendsaventurebkkBadge}>
        <Text style={styles.legendsaventurebkkBadgeText}>
          {legendsaventurebkkEntry.legendsaventurebkkRegion}
        </Text>
      </View>
    </View>
    <View style={styles.legendsaventurebkkCardBody}>
      <Text style={styles.legendsaventurebkkCardTitle}>
        {legendsaventurebkkEntry.legendsaventurebkkTitle}
      </Text>
      <Text style={styles.legendsaventurebkkCardPreview} numberOfLines={2}>
        {legendsaventurebkkPreviewText(
          legendsaventurebkkEntry.legendsaventurebkkHistory,
        )}
      </Text>
      <View style={styles.legendsaventurebkkCardActions}>
        <LegendsaventurebkkGradientBtn
          legendsaventurebkkLabel="Open"
          legendsaventurebkkOnPress={legendsaventurebkkOnOpen}
          legendsaventurebkkStyle={styles.legendsaventurebkkOpenBtn}
        />
        <LegendsaventurebkkIconBtn
          legendsaventurebkkLabel={require('../../assets/imgs/icons/deleteIcon.png')}
          legendsaventurebkkVariant="delete"
          legendsaventurebkkOnPress={legendsaventurebkkOnDelete}
        />
        <LegendsaventurebkkIconBtn
          legendsaventurebkkLabel={require('../../assets/imgs/icons/shareButtonIcon.png')}
          legendsaventurebkkVariant="share"
          legendsaventurebkkOnPress={legendsaventurebkkOnShare}
        />
      </View>
    </View>
  </View>
);

const SavedScreen = () => {
  const legendsaventurebkkNavigation = useNavigation();
  const [legendsaventurebkkView, setLegendsaventurebkkView] =
    useState<LegendsaventurebkkSavedView>('list');
  const [legendsaventurebkkEntries, setLegendsaventurebkkEntries] = useState<
    LegendsaventurebkkSavedEntry[]
  >([]);
  const [legendsaventurebkkActiveId, setLegendsaventurebkkActiveId] =
    useState<string | null>(null);
  const [legendsaventurebkkDeleteId, setLegendsaventurebkkDeleteId] =
    useState<string | null>(null);

  const legendsaventurebkkReload = useCallback(async () => {
    const legendsaventurebkkTales = await legendsaventurebkkLoadSavedTales();
    const legendsaventurebkkMapped = legendsaventurebkkTales
      .map(legendsaventurebkkTale => {
        const legendsaventurebkkStory = legendsaventurebkkGetStoryById(
          legendsaventurebkkTale.legendsaventurebkkId,
        );
        if (!legendsaventurebkkStory) {
          return null;
        }
        return {
          ...legendsaventurebkkTale,
          legendsaventurebkkTitle:
            legendsaventurebkkStory.legendsaventurebkkTitle,
          legendsaventurebkkRegion:
            legendsaventurebkkStory.legendsaventurebkkRegion,
          legendsaventurebkkImage:
            legendsaventurebkkStory.legendsaventurebkkImage,
        } as LegendsaventurebkkSavedEntry;
      })
      .filter(
        (
          legendsaventurebkkEntry,
        ): legendsaventurebkkEntry is LegendsaventurebkkSavedEntry =>
          legendsaventurebkkEntry != null,
      );
    setLegendsaventurebkkEntries(legendsaventurebkkMapped);
  }, []);

  useFocusEffect(
    useCallback(() => {
      legendsaventurebkkReload();
    }, [legendsaventurebkkReload]),
  );

  const legendsaventurebkkActiveEntry = legendsaventurebkkEntries.find(
    e => e.legendsaventurebkkId === legendsaventurebkkActiveId,
  );

  const legendsaventurebkkShareEntry = useCallback(
    async (legendsaventurebkkEntry: LegendsaventurebkkSavedEntry) => {
      await Share.share({
        message: legendsaventurebkkShareMessage(
          legendsaventurebkkEntry.legendsaventurebkkTitle,
          legendsaventurebkkEntry.legendsaventurebkkHistory,
        ),
      });
    },
    [],
  );

  const legendsaventurebkkConfirmDelete = useCallback(async () => {
    if (!legendsaventurebkkDeleteId) {
      return;
    }
    await legendsaventurebkkRemoveSavedTale(legendsaventurebkkDeleteId);
    if (legendsaventurebkkActiveId === legendsaventurebkkDeleteId) {
      setLegendsaventurebkkView('list');
      setLegendsaventurebkkActiveId(null);
    }
    setLegendsaventurebkkDeleteId(null);
    await legendsaventurebkkReload();
  }, [
    legendsaventurebkkActiveId,
    legendsaventurebkkDeleteId,
    legendsaventurebkkReload,
  ]);

  if (legendsaventurebkkView === 'detail' && legendsaventurebkkActiveEntry) {
    return (
      <AppLayout
        tab
        contentStyle={styles.legendsaventurebkkDetailScroll}>
        <View style={styles.legendsaventurebkkDetailHeader}>
          <Pressable
            onPress={() => {
              setLegendsaventurebkkView('list');
              setLegendsaventurebkkActiveId(null);
            }}
            style={({pressed}) => [
              styles.legendsaventurebkkHeaderBtn,
              pressed && styles.legendsaventurebkkPressed,
            ]}>
            <Image source={require('../../assets/imgs/icons/backIcon.png')} />
          </Pressable>
          <Pressable
            onPress={() =>
              legendsaventurebkkShareEntry(legendsaventurebkkActiveEntry)
            }
            style={({pressed}) => [
              styles.legendsaventurebkkHeaderShareBtn,
              pressed && styles.legendsaventurebkkPressed,
            ]}>
            <Image source={require('../../assets/imgs/icons/shareButtonIcon.png')} />
          </Pressable>
        </View>

        <View style={styles.legendsaventurebkkDetailImageWrap}>
          <Image
            source={legendsaventurebkkActiveEntry.legendsaventurebkkImage}
            style={styles.legendsaventurebkkDetailImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.legendsaventurebkkTextBlocks}>
          {legendsaventurebkkActiveEntry.legendsaventurebkkHistory.map(
            (legendsaventurebkkBlock, i) => (
              <View
                key={`${i}-${legendsaventurebkkBlock.slice(0, 12)}`}
                style={styles.legendsaventurebkkTextCard}>
                <Text style={styles.legendsaventurebkkTextCardBody}>
                  {legendsaventurebkkBlock}
                </Text>
              </View>
            ),
          )}
        </View>

        <View style={styles.legendsaventurebkkJourneyBadge}>
          <Text style={styles.legendsaventurebkkJourneyText}>
            Journey Complete
          </Text>
        </View>

        <LegendsaventurebkkGradientBtn
          legendsaventurebkkLabel="Share"
          legendsaventurebkkIcon={require('../../assets/imgs/icons/shareIcon.png')}
          legendsaventurebkkOnPress={() =>
            legendsaventurebkkShareEntry(legendsaventurebkkActiveEntry)
          }
          legendsaventurebkkStyle={styles.legendsaventurebkkDetailShareBtn}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <Text style={styles.legendsaventurebkkTitle}>Saved Tales</Text>
      <Text style={styles.legendsaventurebkkSubtitle}>
        Your completed adventures
      </Text>

      {legendsaventurebkkEntries.length === 0 ? (
        <View style={styles.legendsaventurebkkEmpty}>
          <Image
            source={require('../../assets/imgs/saved/savedEmpty.png')}
            style={styles.legendsaventurebkkEmptyImage}
            resizeMode="contain"
          />
          <Text style={styles.legendsaventurebkkEmptyText}>
            No saved tales yet
          </Text>
          <LegendsaventurebkkGradientBtn
            legendsaventurebkkLabel="Explore Tales"
            legendsaventurebkkOnPress={() =>
              legendsaventurebkkNavigation.navigate(
                'Legendsaventurebkkstrs' as never,
              )
            }
            legendsaventurebkkStyle={styles.legendsaventurebkkExploreBtn}
          />
        </View>
      ) : (
        <View style={styles.legendsaventurebkkList}>
          {legendsaventurebkkEntries.map(legendsaventurebkkEntry => (
            <LegendsaventurebkkSavedCard
              key={legendsaventurebkkEntry.legendsaventurebkkId}
              legendsaventurebkkEntry={legendsaventurebkkEntry}
              legendsaventurebkkOnOpen={() => {
                setLegendsaventurebkkActiveId(
                  legendsaventurebkkEntry.legendsaventurebkkId,
                );
                setLegendsaventurebkkView('detail');
              }}
              legendsaventurebkkOnDelete={() =>
                setLegendsaventurebkkDeleteId(
                  legendsaventurebkkEntry.legendsaventurebkkId,
                )
              }
              legendsaventurebkkOnShare={() =>
                legendsaventurebkkShareEntry(legendsaventurebkkEntry)
              }
            />
          ))}
        </View>
      )}

      <Modal
        visible={legendsaventurebkkDeleteId != null}
        transparent
        animationType="fade"
        onRequestClose={() => setLegendsaventurebkkDeleteId(null)}>
        <Pressable
          style={styles.legendsaventurebkkModalOverlay}
          onPress={() => setLegendsaventurebkkDeleteId(null)}>
          <Pressable
            style={styles.legendsaventurebkkModal}
            onPress={e => e.stopPropagation()}>
            <Pressable
              onPress={() => setLegendsaventurebkkDeleteId(null)}
              style={styles.legendsaventurebkkModalClose}>
              <Image
                source={require('../../assets/imgs/icons/closeIcon.png')}
              />
            </Pressable>
            <Text style={styles.legendsaventurebkkModalTitle}>
              Remove Saved Tale?
            </Text>
            <Text style={styles.legendsaventurebkkModalBody}>
              This saved story path will be permanently removed.
            </Text>
            <Pressable
              onPress={legendsaventurebkkConfirmDelete}
              style={({pressed}) => [
                styles.legendsaventurebkkModalDeletePress,
                pressed && styles.legendsaventurebkkPressed,
              ]}>
              <LinearGradient
                colors={gradients.danger}
                start={gradientAxis.horizontal.start}
                end={gradientAxis.horizontal.end}
                style={styles.legendsaventurebkkModalDeleteBtn}>
                <Text style={styles.legendsaventurebkkModalDeleteText}>
                  Delete
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable
              onPress={() => setLegendsaventurebkkDeleteId(null)}
              style={({pressed}) => [
                styles.legendsaventurebkkModalCancelBtn,
                pressed && styles.legendsaventurebkkPressed,
              ]}>
              <Text style={styles.legendsaventurebkkModalCancelText}>
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  legendsaventurebkkTitle: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  legendsaventurebkkSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  legendsaventurebkkEmpty: {
    alignItems: 'center',
    paddingVertical: 40.3,
    gap: 16.4,
  },
  legendsaventurebkkEmptyImage: {
    width: 322.5,
    height: 322.1,
    borderRadius: 28.2,
  },
  legendsaventurebkkEmptyText: {
    color: colors.textMutedSoft,
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  legendsaventurebkkExploreBtn: {
    minWidth: 158.5,
  },
  legendsaventurebkkList: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
  legendsaventurebkkCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
  },
  legendsaventurebkkCardImageWrap: {
    height: 160.5,
    position: 'relative',
  },
  legendsaventurebkkBadge: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  legendsaventurebkkBadgeText: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  legendsaventurebkkCardBody: {
    padding: 24.2,
    gap: 8.3,
  },
  legendsaventurebkkCardTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  legendsaventurebkkCardPreview: {
    color: colors.textMuted,
    fontSize: 14.1,
    lineHeight: 20.2,
    marginBottom: 8.3,
  },
  legendsaventurebkkCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  legendsaventurebkkOpenBtn: {
    flex: 1,
    minHeight: 48.5,
  },
  legendsaventurebkkGradientPress: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  legendsaventurebkkGradientBtn: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkGradientText: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendsaventurebkkShareBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
  },
  legendsaventurebkkShareIcon: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '600',
  },
  legendsaventurebkkDeleteBtn: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.dangerBg,
    borderWidth: 1.5,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkDeleteIcon: {
    fontSize: 18.1,
  },
  legendsaventurebkkShareCircleBtn: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.5,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkShareCircleIcon: {
    color: colors.text,
    fontSize: 18.1,
    fontWeight: '600',
  },
  legendsaventurebkkDetailScroll: {
    paddingTop: 8.2,
    paddingBottom: 120.3,
  },
  legendsaventurebkkDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  legendsaventurebkkHeaderBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkHeaderBtnIcon: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  legendsaventurebkkHeaderShareBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkHeaderShareIcon: {
    color: colors.text,
    fontSize: 18.5,
    fontWeight: '600',
  },
  legendsaventurebkkDetailImageWrap: {
    height: 256.1,
    borderRadius: 16.2,
    overflow: 'hidden',
    marginBottom: 24.3,
  },
  legendsaventurebkkDetailImage: {
    width: '100%',
    height: '100%',
  },
  legendsaventurebkkTextBlocks: {
    gap: 24.4,
    marginBottom: 24.5,
  },
  legendsaventurebkkTextCard: {
    borderRadius: 20.1,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  legendsaventurebkkTextCardBody: {
    color: colors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  legendsaventurebkkJourneyBadge: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.4,
    alignItems: 'center',
    marginBottom: 16.5,
  },
  legendsaventurebkkJourneyText: {
    color: colors.gold,
    fontSize: 18.1,
    lineHeight: 28.2,
  },
  legendsaventurebkkDetailShareBtn: {
    minHeight: 48.3,
    marginBottom: 16.4,
  },
  legendsaventurebkkModalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.5,
  },
  legendsaventurebkkModal: {
    width: '100%',
    maxWidth: 361.1,
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
    paddingHorizontal: 24.4,
    paddingTop: 24.5,
    paddingBottom: 24.1,
    gap: 12.2,
  },
  legendsaventurebkkModalClose: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    width: 24.5,
    height: 24.1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1.2,
  },
  legendsaventurebkkModalCloseText: {
    color: colors.textMuted,
    fontSize: 16.2,
  },
  legendsaventurebkkModalTitle: {
    color: colors.gold,
    fontSize: 18.3,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8.4,
    marginBottom: 4.5,
  },
  legendsaventurebkkModalBody: {
    color: colors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 24.2,
    textAlign: 'center',
    marginBottom: 8.3,
  },
  legendsaventurebkkModalDeletePress: {
    borderRadius: 14.4,
    overflow: 'hidden',
  },
  legendsaventurebkkModalDeleteBtn: {
    minHeight: 36.5,
    borderRadius: 14.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkModalDeleteText: {
    color: colors.text,
    fontSize: 14.2,
    fontWeight: '500',
  },
  legendsaventurebkkModalCancelBtn: {
    minHeight: 38.3,
    borderRadius: 14.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.1,
  },
  legendsaventurebkkModalCancelText: {
    color: colors.text,
    fontSize: 14.2,
    fontWeight: '500',
  },
  legendsaventurebkkPressed: {
    opacity: 0.85,
  },
});

export default SavedScreen;
