import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../navigation/routes';
import type {MainTabParamList} from '../navigation/types';
import {AppLayout, ConfirmModal, StaggerItem} from '../components';
import {colors, gradients, gradientAxis} from '../palette';

import {resolveChronicle} from '../data/stories';
import type {
  BookmarkDisplay,
  BookmarkPhase,
} from '../types';
import {
  loadShelfBookmarks,
  excerptFromTrail,
  discardBookmark,
  composeBookmarkShare,
} from '../loungeKit';
import Orientation from 'react-native-orientation-locker';

const FilledActionControl = ({
  optionCaption,
  onActivate,
  surfaceExtra,
  glyphSource,
}: {
  optionCaption: string;
  onActivate: () => void;
  surfaceExtra?: object;
  glyphSource?: ImageSourcePropType;
}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      styles.filledPressable,
      pressed && styles.pressedState,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[styles.filledSurface, surfaceExtra]}>
      {glyphSource ? (
        <View style={styles.filledRow}>
          <Image source={glyphSource} />
          <Text style={styles.filledLabel}>{optionCaption}</Text>
        </View>
      ) : (
        <Text style={styles.filledLabel}>{optionCaption}</Text>
      )}
    </LinearGradient>
  </Pressable>
);

const GlyphActionControl = ({
  optionCaption,
  onActivate,
  glyphVariant,
}: {
  optionCaption: ImageSourcePropType;
  onActivate: () => void;
  glyphVariant: 'delete' | 'share';
}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      glyphVariant === 'delete'
        ? styles.removeSurface
        : styles.emitSurface,
      pressed && styles.pressedState,
    ]}>
    <Image source={optionCaption} />
  </Pressable>
);

const BookmarkListPanel = ({
  shelfEntry,
  onRevealPassage,
  onDiscard,
  onEmitShare,
}: {
  shelfEntry: BookmarkDisplay;
  onRevealPassage: () => void;
  onDiscard: () => void;
  onEmitShare: () => void;
}) => (
  <View style={styles.itemPanel}>
    <View style={styles.mediaFrame}>
      <ImageBackground
        source={shelfEntry.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradients.savedCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.tagChip}>
        <Text style={styles.tagLabel}>{shelfEntry.localeTag}</Text>
      </View>
    </View>
    <View style={styles.panelBody}>
      <Text style={styles.itemTitle}>{shelfEntry.headline}</Text>
      <Text style={styles.itemExcerpt} numberOfLines={2}>
        {excerptFromTrail(shelfEntry.passageTrail)}
      </Text>
      <View style={styles.itemToolbar}>
        <FilledActionControl
          optionCaption="Open"
          onActivate={onRevealPassage}
          surfaceExtra={styles.itemPrimaryAction}
        />
        <GlyphActionControl
          optionCaption={require('../../elements/images/icons/deleteIcon.png')}
          glyphVariant="delete"
          onActivate={onDiscard}
        />
        <GlyphActionControl
          optionCaption={require('../../elements/images/icons/shareButtonIcon.png')}
          glyphVariant="share"
          onActivate={onEmitShare}
        />
      </View>
    </View>
  </View>
);

const SavedScreen = () => {
  const tabNavigation =
    useNavigation<
      BottomTabNavigationProp<MainTabParamList, typeof Routes.Saved>
    >();
  const [screenPhase, setScreenPhase] =
    useState<BookmarkPhase>('shelf');
  const [shelfEntries, setShelfEntries] = useState<
    BookmarkDisplay[]
  >([]);
  const [activeEntryKey, setActiveEntryKey] = useState<string | null>(
    null,
  );
  const [pendingDiscardKey, setPendingDiscardKey] = useState<string | null>(
    null,
  );

  const refreshSnapshot = useCallback(async () => {
    const storedPayloads = await loadShelfBookmarks();
    const enrichedEntries = storedPayloads
      .map(bookmarkPayload => {
        const chronicle = resolveChronicle(
          bookmarkPayload.entryKey,
        );
        if (!chronicle) {
          return null;
        }
        return {
          ...bookmarkPayload,
          headline: chronicle.headline,
          localeTag: chronicle.localeTag,
          coverVisual: chronicle.coverVisual,
        } as BookmarkDisplay;
      })
      .filter(
        (shelfEntry): shelfEntry is BookmarkDisplay =>
          shelfEntry != null,
      );
    setShelfEntries(enrichedEntries);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const activeEntry = shelfEntries.find(
    e => e.entryKey === activeEntryKey,
  );

  const emitBookmarkShare = useCallback(
    async (shelfEntry: BookmarkDisplay) => {
      await Share.share({
        message: composeBookmarkShare(
          shelfEntry.headline,
          shelfEntry.passageTrail,
        ),
      });
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const confirmDiscard = useCallback(async () => {
    if (!pendingDiscardKey) {
      return;
    }
    await discardBookmark(pendingDiscardKey);
    if (activeEntryKey === pendingDiscardKey) {
      setScreenPhase('shelf');
      setActiveEntryKey(null);
    }
    setPendingDiscardKey(null);
    await refreshSnapshot();
  }, [activeEntryKey, pendingDiscardKey, refreshSnapshot]);

  if (screenPhase === 'passage' && activeEntry) {
    return (
      <AppLayout tab contentStyle={styles.passageScroll}>
        <View style={styles.passageHeader}>
          <Pressable
            onPress={() => {
              setScreenPhase('shelf');
              setActiveEntryKey(null);
            }}
            style={({pressed}) => [
              styles.passageNavControl,
              pressed && styles.pressedState,
            ]}>
            <Image
              source={require('../../elements/images/icons/backIcon.png')}
            />
          </Pressable>
          <Pressable
            onPress={() => emitBookmarkShare(activeEntry)}
            style={({pressed}) => [
              styles.passageEmitControl,
              pressed && styles.pressedState,
            ]}>
            <Image
              source={require('../../elements/images/icons/shareButtonIcon.png')}
            />
          </Pressable>
        </View>

        <View style={styles.passageMediaFrame}>
          <Image
            source={activeEntry.coverVisual}
            style={styles.passageMedia}
            resizeMode="cover"
          />
        </View>

        <View style={styles.proseStack}>
          {activeEntry.passageTrail.map((proseBlock, i) => (
            <View
              key={`${i}-${proseBlock.slice(0, 12)}`}
              style={styles.prosePanel}>
              <Text style={styles.proseCopy}>{proseBlock}</Text>
            </View>
          ))}
        </View>

        <View style={styles.outcomeTagPanel}>
          <Text style={styles.outcomeTagLabel}>Journey Complete</Text>
        </View>

        <FilledActionControl
          optionCaption="Share"
          glyphSource={require('../../elements/images/icons/shareIcon.png')}
          onActivate={() => emitBookmarkShare(activeEntry)}
          surfaceExtra={styles.passageEmitAction}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <Text style={styles.screenHeading}>Saved Tales</Text>
      <Text style={styles.screenSubheading}>Your completed adventures</Text>

      {shelfEntries.length === 0 ? (
        <View style={styles.vacantState}>
          <Image
            source={require('../../elements/images/saved/savedEmpty.png')}
            style={styles.vacantVisual}
            resizeMode="contain"
          />
          <Text style={styles.vacantCopy}>No saved tales yet</Text>
          <FilledActionControl
            optionCaption="Explore Tales"
            onActivate={() =>
              tabNavigation.navigate(Routes.Tales)
            }
            surfaceExtra={styles.vacantAction}
          />
        </View>
      ) : (
        <View style={styles.itemStack}>
          {shelfEntries.map((shelfEntry, index) => (
            <StaggerItem key={shelfEntry.entryKey} index={index}>
              <BookmarkListPanel
                shelfEntry={shelfEntry}
                onRevealPassage={() => {
                  setActiveEntryKey(shelfEntry.entryKey);
                  setScreenPhase('passage');
                }}
                onDiscard={() =>
                  setPendingDiscardKey(shelfEntry.entryKey)
                }
                onEmitShare={() => emitBookmarkShare(shelfEntry)}
              />
            </StaggerItem>
          ))}
        </View>
      )}

      <ConfirmModal
        visible={pendingDiscardKey != null}
        title="Remove Saved Tale?"
        body="This saved story path will be permanently removed."
        confirmLabel="Delete"
        showClose
        onConfirm={() => {
          void confirmDiscard();
        }}
        onCancel={() => setPendingDiscardKey(null)}
      />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  screenHeading: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  screenSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  vacantState: {
    alignItems: 'center',
    paddingVertical: 40.3,
    gap: 16.4,
  },
  vacantVisual: {
    width: 322.5,
    height: 322.1,
    borderRadius: 28.2,
  },
  vacantCopy: {
    color: colors.textMutedSoft,
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  vacantAction: {
    minWidth: 158.5,
  },
  itemStack: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
  itemPanel: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
  },
  mediaFrame: {
    height: 160.5,
    position: 'relative',
  },
  tagChip: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  tagLabel: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  panelBody: {
    padding: 24.2,
    gap: 8.3,
  },
  itemTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  itemExcerpt: {
    color: colors.textMuted,
    fontSize: 14.1,
    lineHeight: 20.2,
    marginBottom: 8.3,
  },
  itemToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  itemPrimaryAction: {
    flex: 1,
    minHeight: 48.5,
  },
  filledPressable: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  filledSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledLabel: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  filledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
  },
  actionGlyph: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '600',
  },
  removeSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.dangerBg,
    borderWidth: 1.5,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeGlyph: {
    fontSize: 18.1,
  },
  emitSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.5,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emitGlyph: {
    color: colors.text,
    fontSize: 18.1,
    fontWeight: '600',
  },
  passageScroll: {
    paddingTop: 8.2,
    paddingBottom: 120.3,
  },
  passageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  passageNavControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passageNavGlyph: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  passageEmitControl: {
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
  passageEmitGlyph: {
    color: colors.text,
    fontSize: 18.5,
    fontWeight: '600',
  },
  passageMediaFrame: {
    height: 256.1,
    borderRadius: 16.2,
    overflow: 'hidden',
    marginBottom: 24.3,
  },
  passageMedia: {
    width: '100%',
    height: '100%',
  },
  proseStack: {
    gap: 24.4,
    marginBottom: 24.5,
  },
  prosePanel: {
    borderRadius: 20.1,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  proseCopy: {
    color: colors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  outcomeTagPanel: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.4,
    alignItems: 'center',
    marginBottom: 16.5,
  },
  outcomeTagLabel: {
    color: colors.gold,
    fontSize: 18.1,
    lineHeight: 28.2,
  },
  passageEmitAction: {
    minHeight: 48.3,
    marginBottom: 16.4,
  },
  pressedState: {
    opacity: 0.85,
  },
});

export default SavedScreen;
