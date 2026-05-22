import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
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
import {Routes} from '../../app/navigation/routes';
import type {MainTabParamList} from '../../app/navigation/types';
import {AppLayout, FadeInView, StaggerItem} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

import {ravenQuestGetStoryById} from '../../../content/stories';
import type {
  RavenQuestSavedEntry,
  RavenQuestBookmarkPhase,
} from '../../shared/types';
import {
  ravenQuestLoadSavedTales,
  ravenQuestPreviewText,
  ravenQuestRemoveSavedTale,
  ravenQuestShareMessage,
} from '../../shared/lib';

const RavenQuestGradientBtn = ({
  ravenQuestLabel,
  ravenQuestOnPress,
  ravenQuestStyle,
  ravenQuestIcon,
}: {
  ravenQuestLabel: string;
  ravenQuestOnPress: () => void;
  ravenQuestStyle?: object;
  ravenQuestIcon?: ImageSourcePropType;
}) => (
  <Pressable
    onPress={ravenQuestOnPress}
    style={({pressed}) => [
      styles.ravenQuestGradientPress,
      pressed && styles.ravenQuestPressed,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[styles.ravenQuestGradientBtn, ravenQuestStyle]}>
      {ravenQuestIcon ? (
        <View style={styles.ravenQuestShareBtnInner}>
          <Image source={ravenQuestIcon} />
          <Text style={styles.ravenQuestGradientText}>
            {ravenQuestLabel}
          </Text>
        </View>
      ) : (
        <Text style={styles.ravenQuestGradientText}>
          {ravenQuestLabel}
        </Text>
      )}
    </LinearGradient>
  </Pressable>
);

const RavenQuestIconBtn = ({
  ravenQuestLabel,
  ravenQuestOnPress,
  ravenQuestVariant,
}: {
  ravenQuestLabel: ImageSourcePropType;
  ravenQuestOnPress: () => void;
  ravenQuestVariant: 'delete' | 'share';
}) => (
  <Pressable
    onPress={ravenQuestOnPress}
    style={({pressed}) => [
      ravenQuestVariant === 'delete'
        ? styles.ravenQuestDeleteBtn
        : styles.ravenQuestShareCircleBtn,
      pressed && styles.ravenQuestPressed,
    ]}>
    <Image source={ravenQuestLabel} />
  </Pressable>
);

const RavenQuestSavedCard = ({
  ravenQuestEntry,
  ravenQuestOnOpen,
  ravenQuestOnDelete,
  ravenQuestOnShare,
}: {
  ravenQuestEntry: RavenQuestSavedEntry;
  ravenQuestOnOpen: () => void;
  ravenQuestOnDelete: () => void;
  ravenQuestOnShare: () => void;
}) => (
  <View style={styles.ravenQuestCard}>
    <View style={styles.ravenQuestCardImageWrap}>
      <ImageBackground
        source={ravenQuestEntry.ravenQuestImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradients.savedCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.ravenQuestBadge}>
        <Text style={styles.ravenQuestBadgeText}>
          {ravenQuestEntry.ravenQuestRegion}
        </Text>
      </View>
    </View>
    <View style={styles.ravenQuestCardBody}>
      <Text style={styles.ravenQuestCardTitle}>
        {ravenQuestEntry.ravenQuestTitle}
      </Text>
      <Text style={styles.ravenQuestCardPreview} numberOfLines={2}>
        {ravenQuestPreviewText(
          ravenQuestEntry.ravenQuestHistory,
        )}
      </Text>
      <View style={styles.ravenQuestCardActions}>
        <RavenQuestGradientBtn
          ravenQuestLabel="Open"
          ravenQuestOnPress={ravenQuestOnOpen}
          ravenQuestStyle={styles.ravenQuestOpenBtn}
        />
        <RavenQuestIconBtn
          ravenQuestLabel={require('../../../assets/imgs/icons/deleteIcon.png')}
          ravenQuestVariant="delete"
          ravenQuestOnPress={ravenQuestOnDelete}
        />
        <RavenQuestIconBtn
          ravenQuestLabel={require('../../../assets/imgs/icons/shareButtonIcon.png')}
          ravenQuestVariant="share"
          ravenQuestOnPress={ravenQuestOnShare}
        />
      </View>
    </View>
  </View>
);

const SavedScreen = () => {
  const ravenQuestNavigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, typeof Routes.Saved>>();
  const [ravenQuestView, setRavenQuestView] =
    useState<RavenQuestBookmarkPhase>('shelf');
  const [ravenQuestEntries, setRavenQuestEntries] = useState<
    RavenQuestSavedEntry[]
  >([]);
  const [ravenQuestActiveId, setRavenQuestActiveId] = useState<
    string | null
  >(null);
  const [ravenQuestDeleteId, setRavenQuestDeleteId] = useState<
    string | null
  >(null);

  const ravenQuestReload = useCallback(async () => {
    const ravenQuestTales = await ravenQuestLoadSavedTales();
    const ravenQuestMapped = ravenQuestTales
      .map(ravenQuestTale => {
        const ravenQuestStory = ravenQuestGetStoryById(
          ravenQuestTale.ravenQuestId,
        );
        if (!ravenQuestStory) {
          return null;
        }
        return {
          ...ravenQuestTale,
          ravenQuestTitle:
            ravenQuestStory.ravenQuestTitle,
          ravenQuestRegion:
            ravenQuestStory.ravenQuestRegion,
          ravenQuestImage:
            ravenQuestStory.ravenQuestImage,
        } as RavenQuestSavedEntry;
      })
      .filter(
        (
          ravenQuestEntry,
        ): ravenQuestEntry is RavenQuestSavedEntry =>
          ravenQuestEntry != null,
      );
    setRavenQuestEntries(ravenQuestMapped);
  }, []);

  useFocusEffect(
    useCallback(() => {
      ravenQuestReload();
    }, [ravenQuestReload]),
  );

  const ravenQuestActiveEntry = ravenQuestEntries.find(
    e => e.ravenQuestId === ravenQuestActiveId,
  );

  const ravenQuestShareEntry = useCallback(
    async (ravenQuestEntry: RavenQuestSavedEntry) => {
      await Share.share({
        message: ravenQuestShareMessage(
          ravenQuestEntry.ravenQuestTitle,
          ravenQuestEntry.ravenQuestHistory,
        ),
      });
    },
    [],
  );

  const ravenQuestConfirmDelete = useCallback(async () => {
    if (!ravenQuestDeleteId) {
      return;
    }
    await ravenQuestRemoveSavedTale(ravenQuestDeleteId);
    if (ravenQuestActiveId === ravenQuestDeleteId) {
      setRavenQuestView('shelf');
      setRavenQuestActiveId(null);
    }
    setRavenQuestDeleteId(null);
    await ravenQuestReload();
  }, [
    ravenQuestActiveId,
    ravenQuestDeleteId,
    ravenQuestReload,
  ]);

  if (ravenQuestView === 'passage' && ravenQuestActiveEntry) {
    return (
      <AppLayout tab contentStyle={styles.ravenQuestDetailScroll}>
        <View style={styles.ravenQuestDetailHeader}>
          <Pressable
            onPress={() => {
              setRavenQuestView('shelf');
              setRavenQuestActiveId(null);
            }}
            style={({pressed}) => [
              styles.ravenQuestHeaderBtn,
              pressed && styles.ravenQuestPressed,
            ]}>
            <Image source={require('../../../assets/imgs/icons/backIcon.png')} />
          </Pressable>
          <Pressable
            onPress={() =>
              ravenQuestShareEntry(ravenQuestActiveEntry)
            }
            style={({pressed}) => [
              styles.ravenQuestHeaderShareBtn,
              pressed && styles.ravenQuestPressed,
            ]}>
            <Image
              source={require('../../../assets/imgs/icons/shareButtonIcon.png')}
            />
          </Pressable>
        </View>

        <View style={styles.ravenQuestDetailImageWrap}>
          <Image
            source={ravenQuestActiveEntry.ravenQuestImage}
            style={styles.ravenQuestDetailImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.ravenQuestTextBlocks}>
          {ravenQuestActiveEntry.ravenQuestHistory.map(
            (ravenQuestBlock, i) => (
              <View
                key={`${i}-${ravenQuestBlock.slice(0, 12)}`}
                style={styles.ravenQuestTextCard}>
                <Text style={styles.ravenQuestTextCardBody}>
                  {ravenQuestBlock}
                </Text>
              </View>
            ),
          )}
        </View>

        <View style={styles.ravenQuestJourneyBadge}>
          <Text style={styles.ravenQuestJourneyText}>
            Journey Complete
          </Text>
        </View>

        <RavenQuestGradientBtn
          ravenQuestLabel="Share"
          ravenQuestIcon={require('../../../assets/imgs/icons/shareIcon.png')}
          ravenQuestOnPress={() =>
            ravenQuestShareEntry(ravenQuestActiveEntry)
          }
          ravenQuestStyle={styles.ravenQuestDetailShareBtn}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <Text style={styles.ravenQuestTitle}>Saved Tales</Text>
      <Text style={styles.ravenQuestSubtitle}>
        Your completed adventures
      </Text>

      {ravenQuestEntries.length === 0 ? (
        <View style={styles.ravenQuestEmpty}>
          <Image
            source={require('../../../assets/imgs/saved/savedEmpty.png')}
            style={styles.ravenQuestEmptyImage}
            resizeMode="contain"
          />
          <Text style={styles.ravenQuestEmptyText}>
            No saved tales yet
          </Text>
          <RavenQuestGradientBtn
            ravenQuestLabel="Explore Tales"
            ravenQuestOnPress={() =>
              ravenQuestNavigation.navigate(Routes.Tales)
            }
            ravenQuestStyle={styles.ravenQuestExploreBtn}
          />
        </View>
      ) : (
        <View style={styles.ravenQuestList}>
          {ravenQuestEntries.map((ravenQuestEntry, index) => (
            <StaggerItem
              key={ravenQuestEntry.ravenQuestId}
              index={index}>
            <RavenQuestSavedCard
              ravenQuestEntry={ravenQuestEntry}
              ravenQuestOnOpen={() => {
                setRavenQuestActiveId(
                  ravenQuestEntry.ravenQuestId,
                );
                setRavenQuestView('passage');
              }}
              ravenQuestOnDelete={() =>
                setRavenQuestDeleteId(
                  ravenQuestEntry.ravenQuestId,
                )
              }
              ravenQuestOnShare={() =>
                ravenQuestShareEntry(ravenQuestEntry)
              }
            />
            </StaggerItem>
          ))}
        </View>
      )}

      <Modal
        visible={ravenQuestDeleteId != null}
        transparent
        animationType="fade"
        onRequestClose={() => setRavenQuestDeleteId(null)}>
        <Pressable
          style={styles.ravenQuestModalOverlay}
          onPress={() => setRavenQuestDeleteId(null)}>
          <Pressable
            style={styles.ravenQuestModal}
            onPress={e => e.stopPropagation()}>
            <Pressable
              onPress={() => setRavenQuestDeleteId(null)}
              style={styles.ravenQuestModalClose}>
              <Image
                source={require('../../../assets/imgs/icons/closeIcon.png')}
              />
            </Pressable>
            <Text style={styles.ravenQuestModalTitle}>
              Remove Saved Tale?
            </Text>
            <Text style={styles.ravenQuestModalBody}>
              This saved story path will be permanently removed.
            </Text>
            <Pressable
              onPress={ravenQuestConfirmDelete}
              style={({pressed}) => [
                styles.ravenQuestModalDeletePress,
                pressed && styles.ravenQuestPressed,
              ]}>
              <LinearGradient
                colors={gradients.danger}
                start={gradientAxis.horizontal.start}
                end={gradientAxis.horizontal.end}
                style={styles.ravenQuestModalDeleteBtn}>
                <Text style={styles.ravenQuestModalDeleteText}>
                  Delete
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable
              onPress={() => setRavenQuestDeleteId(null)}
              style={({pressed}) => [
                styles.ravenQuestModalCancelBtn,
                pressed && styles.ravenQuestPressed,
              ]}>
              <Text style={styles.ravenQuestModalCancelText}>
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
  ravenQuestTitle: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  ravenQuestSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  ravenQuestEmpty: {
    alignItems: 'center',
    paddingVertical: 40.3,
    gap: 16.4,
  },
  ravenQuestEmptyImage: {
    width: 322.5,
    height: 322.1,
    borderRadius: 28.2,
  },
  ravenQuestEmptyText: {
    color: colors.textMutedSoft,
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  ravenQuestExploreBtn: {
    minWidth: 158.5,
  },
  ravenQuestList: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
  ravenQuestCard: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
  },
  ravenQuestCardImageWrap: {
    height: 160.5,
    position: 'relative',
  },
  ravenQuestBadge: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  ravenQuestBadgeText: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  ravenQuestCardBody: {
    padding: 24.2,
    gap: 8.3,
  },
  ravenQuestCardTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  ravenQuestCardPreview: {
    color: colors.textMuted,
    fontSize: 14.1,
    lineHeight: 20.2,
    marginBottom: 8.3,
  },
  ravenQuestCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  ravenQuestOpenBtn: {
    flex: 1,
    minHeight: 48.5,
  },
  ravenQuestGradientPress: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  ravenQuestGradientBtn: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestGradientText: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  ravenQuestShareBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
  },
  ravenQuestShareIcon: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '600',
  },
  ravenQuestDeleteBtn: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.dangerBg,
    borderWidth: 1.5,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestDeleteIcon: {
    fontSize: 18.1,
  },
  ravenQuestShareCircleBtn: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.5,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestShareCircleIcon: {
    color: colors.text,
    fontSize: 18.1,
    fontWeight: '600',
  },
  ravenQuestDetailScroll: {
    paddingTop: 8.2,
    paddingBottom: 120.3,
  },
  ravenQuestDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  ravenQuestHeaderBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestHeaderBtnIcon: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  ravenQuestHeaderShareBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    marginLeft: 'auto',
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestHeaderShareIcon: {
    color: colors.text,
    fontSize: 18.5,
    fontWeight: '600',
  },
  ravenQuestDetailImageWrap: {
    height: 256.1,
    borderRadius: 16.2,
    overflow: 'hidden',
    marginBottom: 24.3,
  },
  ravenQuestDetailImage: {
    width: '100%',
    height: '100%',
  },
  ravenQuestTextBlocks: {
    gap: 24.4,
    marginBottom: 24.5,
  },
  ravenQuestTextCard: {
    borderRadius: 20.1,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  ravenQuestTextCardBody: {
    color: colors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  ravenQuestJourneyBadge: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.4,
    alignItems: 'center',
    marginBottom: 16.5,
  },
  ravenQuestJourneyText: {
    color: colors.gold,
    fontSize: 18.1,
    lineHeight: 28.2,
  },
  ravenQuestDetailShareBtn: {
    minHeight: 48.3,
    marginBottom: 16.4,
  },
  ravenQuestModalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.5,
  },
  ravenQuestModal: {
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
  ravenQuestModalClose: {
    position: 'absolute',
    top: 16.3,
    right: 16.4,
    width: 24.5,
    height: 24.1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1.2,
  },
  ravenQuestModalCloseText: {
    color: colors.textMuted,
    fontSize: 16.2,
  },
  ravenQuestModalTitle: {
    color: colors.gold,
    fontSize: 18.3,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8.4,
    marginBottom: 4.5,
  },
  ravenQuestModalBody: {
    color: colors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 24.2,
    textAlign: 'center',
    marginBottom: 8.3,
  },
  ravenQuestModalDeletePress: {
    borderRadius: 14.4,
    overflow: 'hidden',
  },
  ravenQuestModalDeleteBtn: {
    minHeight: 36.5,
    borderRadius: 14.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestModalDeleteText: {
    color: colors.text,
    fontSize: 14.2,
    fontWeight: '500',
  },
  ravenQuestModalCancelBtn: {
    minHeight: 38.3,
    borderRadius: 14.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.1,
  },
  ravenQuestModalCancelText: {
    color: colors.text,
    fontSize: 14.2,
    fontWeight: '500',
  },
  ravenQuestPressed: {
    opacity: 0.85,
  },
});

export default SavedScreen;
