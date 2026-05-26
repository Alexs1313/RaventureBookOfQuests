import React, {useCallback, useMemo, useState} from 'react';
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
import {Routes} from '../ExplorerMytthofNavigation/ExplorerMytthofRoutes';
import type {MainTabParamList} from '../ExplorerMytthofNavigation/ExplorerMytthofTypes';
import {AppLayout, ConfirmModal, StaggerItem} from '../ExplorerMytthofComponents';
import {mediaRegistry} from '../ExplorerMytthofAssets';
import {colors, gradients, gradientAxis} from '../ExplorerMytthofPalette';

import {resolveChronicle} from '../ExplorerMytthofData/ExplorerMytthofStories';
import type {
  BookmarkDisplay,
  BookmarkPhase,
  SavedJokeDisplay,
} from '../ExplorerMytthofTypes';
import {
  loadShelfBookmarks,
  loadSavedJokes,
  excerptFromTrail,
  excerptFromJoke,
  discardBookmark,
  discardJoke,
  composeBookmarkShare,
  composeJokeShare,
} from '../ExplorerMytthofLoungeKit';
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
      explorerMytthofStyles.explorerMytthofFilledPressable,
      pressed && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[
        explorerMytthofStyles.explorerMytthofFilledSurface,
        surfaceExtra,
      ]}>
      {glyphSource ? (
        <View style={explorerMytthofStyles.explorerMytthofFilledRow}>
          <Image source={glyphSource} />
          <Text style={explorerMytthofStyles.explorerMytthofFilledLabel}>
            {optionCaption}
          </Text>
        </View>
      ) : (
        <Text style={explorerMytthofStyles.explorerMytthofFilledLabel}>
          {optionCaption}
        </Text>
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
        ? explorerMytthofStyles.explorerMytthofRemoveSurface
        : explorerMytthofStyles.explorerMytthofEmitSurface,
      pressed && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    <Image source={optionCaption} />
  </Pressable>
);

type PendingDiscard =
  | {kind: 'tale'; key: string}
  | {kind: 'joke'; key: string};

type ShelfRow =
  | {kind: 'tale'; storedAt: number; entry: BookmarkDisplay}
  | {kind: 'joke'; storedAt: number; entry: SavedJokeDisplay};

const JokeListPanel = ({
  shelfEntry,
  onRevealJoke,
  onDiscard,
  onEmitShare,
}: {
  shelfEntry: SavedJokeDisplay;
  onRevealJoke: () => void;
  onDiscard: () => void;
  onEmitShare: () => void;
}) => (
  <View style={explorerMytthofStyles.explorerMytthofJokeItemPanel}>
    <View style={explorerMytthofStyles.explorerMytthofJokePanelHeader}>
      <View style={explorerMytthofStyles.explorerMytthofTagChip}>
        <Text style={explorerMytthofStyles.explorerMytthofTagLabel}>
          {shelfEntry.localeTag}
        </Text>
      </View>
      <Text style={explorerMytthofStyles.explorerMytthofItemTitle}>
        {shelfEntry.headline}
      </Text>
    </View>
    <Text
      style={explorerMytthofStyles.explorerMytthofItemExcerpt}
      numberOfLines={3}>
      {excerptFromJoke(shelfEntry.body)}
    </Text>
    <View style={explorerMytthofStyles.explorerMytthofItemToolbar}>
      <FilledActionControl
        optionCaption="Open"
        onActivate={onRevealJoke}
        surfaceExtra={explorerMytthofStyles.explorerMytthofItemPrimaryAction}
      />
      <GlyphActionControl
        optionCaption={mediaRegistry.icons.delete}
        glyphVariant="delete"
        onActivate={onDiscard}
      />
      <GlyphActionControl
        optionCaption={mediaRegistry.icons.shareButton}
        glyphVariant="share"
        onActivate={onEmitShare}
      />
    </View>
  </View>
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
  <View style={explorerMytthofStyles.explorerMytthofItemPanel}>
    <View style={explorerMytthofStyles.explorerMytthofMediaFrame}>
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
      <View style={explorerMytthofStyles.explorerMytthofTagChip}>
        <Text style={explorerMytthofStyles.explorerMytthofTagLabel}>
          {shelfEntry.localeTag}
        </Text>
      </View>
    </View>
    <View style={explorerMytthofStyles.explorerMytthofPanelBody}>
      <Text style={explorerMytthofStyles.explorerMytthofItemTitle}>
        {shelfEntry.headline}
      </Text>
      <Text
        style={explorerMytthofStyles.explorerMytthofItemExcerpt}
        numberOfLines={2}>
        {excerptFromTrail(shelfEntry.passageTrail)}
      </Text>
      <View style={explorerMytthofStyles.explorerMytthofItemToolbar}>
        <FilledActionControl
          optionCaption="Open"
          onActivate={onRevealPassage}
          surfaceExtra={explorerMytthofStyles.explorerMytthofItemPrimaryAction}
        />
        <GlyphActionControl
          optionCaption={mediaRegistry.icons.delete}
          glyphVariant="delete"
          onActivate={onDiscard}
        />
        <GlyphActionControl
          optionCaption={mediaRegistry.icons.shareButton}
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
  const [explorerMytthofScreenPhase, setExplorerMytthofScreenPhase] =
    useState<BookmarkPhase>('shelf');
  const [explorerMytthofShelfEntries, setExplorerMytthofShelfEntries] =
    useState<BookmarkDisplay[]>([]);
  const [explorerMytthofSavedJokes, setExplorerMytthofSavedJokes] = useState<
    SavedJokeDisplay[]
  >([]);
  const [explorerMytthofActiveEntryKey, setExplorerMytthofActiveEntryKey] =
    useState<string | null>(null);
  const [explorerMytthofActiveJokeKey, setExplorerMytthofActiveJokeKey] =
    useState<string | null>(null);
  const [explorerMytthofPendingDiscard, setExplorerMytthofPendingDiscard] =
    useState<PendingDiscard | null>(null);

  const refreshSnapshot = useCallback(async () => {
    const [storedPayloads, storedJokes] = await Promise.all([
      loadShelfBookmarks(),
      loadSavedJokes(),
    ]);
    const enrichedEntries = storedPayloads
      .map(bookmarkPayload => {
        const chronicle = resolveChronicle(bookmarkPayload.entryKey);
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
        (shelfEntry): shelfEntry is BookmarkDisplay => shelfEntry != null,
      );
    setExplorerMytthofShelfEntries(enrichedEntries);
    setExplorerMytthofSavedJokes(storedJokes);
  }, []);

  const explorerMytthofShelfRows = useMemo<ShelfRow[]>(() => {
    const rows: ShelfRow[] = [
      ...explorerMytthofShelfEntries.map(entry => ({
        kind: 'tale' as const,
        storedAt: entry.storedAt,
        entry,
      })),
      ...explorerMytthofSavedJokes.map(entry => ({
        kind: 'joke' as const,
        storedAt: entry.storedAt,
        entry,
      })),
    ];
    return rows.sort((a, b) => b.storedAt - a.storedAt);
  }, [explorerMytthofSavedJokes, explorerMytthofShelfEntries]);

  const explorerMytthofHasSavedItems = explorerMytthofShelfRows.length > 0;

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const activeEntry = explorerMytthofShelfEntries.find(
    e => e.entryKey === explorerMytthofActiveEntryKey,
  );
  const activeJoke = explorerMytthofSavedJokes.find(
    j => j.jokeKey === explorerMytthofActiveJokeKey,
  );

  const emitJokeShare = useCallback(async (shelfEntry: SavedJokeDisplay) => {
    await Share.share({
      message: composeJokeShare(shelfEntry.localeTag, shelfEntry.body),
    });
  }, []);

  const emitBookmarkShare = useCallback(async (shelfEntry: BookmarkDisplay) => {
    await Share.share({
      message: composeBookmarkShare(
        shelfEntry.headline,
        shelfEntry.passageTrail,
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const confirmDiscard = useCallback(async () => {
    if (!explorerMytthofPendingDiscard) {
      return;
    }
    if (explorerMytthofPendingDiscard.kind === 'tale') {
      await discardBookmark(explorerMytthofPendingDiscard.key);
      if (explorerMytthofActiveEntryKey === explorerMytthofPendingDiscard.key) {
        setExplorerMytthofScreenPhase('shelf');
        setExplorerMytthofActiveEntryKey(null);
      }
    } else {
      await discardJoke(explorerMytthofPendingDiscard.key);
      if (explorerMytthofActiveJokeKey === explorerMytthofPendingDiscard.key) {
        setExplorerMytthofScreenPhase('shelf');
        setExplorerMytthofActiveJokeKey(null);
      }
    }
    setExplorerMytthofPendingDiscard(null);
    await refreshSnapshot();
  }, [
    explorerMytthofActiveEntryKey,
    explorerMytthofActiveJokeKey,
    explorerMytthofPendingDiscard,
    refreshSnapshot,
  ]);

  const discardModal = (
    <ConfirmModal
      visible={explorerMytthofPendingDiscard != null}
      title={
        explorerMytthofPendingDiscard?.kind === 'joke'
          ? 'Remove Saved Joke?'
          : 'Remove Saved Tale?'
      }
      body={
        explorerMytthofPendingDiscard?.kind === 'joke'
          ? 'This saved joke will be permanently removed.'
          : 'This saved story path will be permanently removed.'
      }
      confirmLabel="Delete"
      showClose
      onConfirm={confirmDiscard}
      onCancel={() => setExplorerMytthofPendingDiscard(null)}
    />
  );

  if (explorerMytthofScreenPhase === 'joke' && activeJoke) {
    return (
      <>
        <AppLayout
          tab
          contentStyle={explorerMytthofStyles.explorerMytthofPassageScroll}>
          <View style={explorerMytthofStyles.explorerMytthofPassageHeader}>
            <Pressable
              onPress={() => {
                setExplorerMytthofScreenPhase('shelf');
                setExplorerMytthofActiveJokeKey(null);
              }}
              style={({pressed}) => [
                explorerMytthofStyles.explorerMytthofPassageNavControl,
                pressed && explorerMytthofStyles.explorerMytthofPressedState,
              ]}>
              <Image source={mediaRegistry.icons.back} />
            </Pressable>
            <Pressable
              onPress={() => emitJokeShare(activeJoke)}
              style={({pressed}) => [
                explorerMytthofStyles.explorerMytthofPassageEmitControl,
                pressed && explorerMytthofStyles.explorerMytthofPressedState,
              ]}>
              <Image source={mediaRegistry.icons.shareButton} />
            </Pressable>
          </View>

          <View style={explorerMytthofStyles.explorerMytthofJokeDetailTag}>
            <Text style={explorerMytthofStyles.explorerMytthofTagLabel}>
              {activeJoke.localeTag}
            </Text>
          </View>

          <View style={explorerMytthofStyles.explorerMytthofProseStack}>
            <View style={explorerMytthofStyles.explorerMytthofProsePanel}>
              <Text style={explorerMytthofStyles.explorerMytthofProseCopy}>
                {activeJoke.body}
              </Text>
            </View>
          </View>

          <View style={explorerMytthofStyles.explorerMytthofOutcomeTagPanel}>
            <Text style={explorerMytthofStyles.explorerMytthofOutcomeTagLabel}>
              Saved Joke
            </Text>
          </View>

          <FilledActionControl
            optionCaption="Share"
            glyphSource={mediaRegistry.icons.share}
            onActivate={() => emitJokeShare(activeJoke)}
            surfaceExtra={explorerMytthofStyles.explorerMytthofPassageEmitAction}
          />
        </AppLayout>
        {discardModal}
      </>
    );
  }

  if (explorerMytthofScreenPhase === 'passage' && activeEntry) {
    return (
      <AppLayout
        tab
        contentStyle={explorerMytthofStyles.explorerMytthofPassageScroll}>
        <View style={explorerMytthofStyles.explorerMytthofPassageHeader}>
          <Pressable
            onPress={() => {
              setExplorerMytthofScreenPhase('shelf');
              setExplorerMytthofActiveEntryKey(null);
            }}
            style={({pressed}) => [
              explorerMytthofStyles.explorerMytthofPassageNavControl,
              pressed && explorerMytthofStyles.explorerMytthofPressedState,
            ]}>
            <Image source={mediaRegistry.icons.back} />
          </Pressable>
          <Pressable
            onPress={() => emitBookmarkShare(activeEntry)}
            style={({pressed}) => [
              explorerMytthofStyles.explorerMytthofPassageEmitControl,
              pressed && explorerMytthofStyles.explorerMytthofPressedState,
            ]}>
            <Image source={mediaRegistry.icons.shareButton} />
          </Pressable>
        </View>

        <View style={explorerMytthofStyles.explorerMytthofPassageMediaFrame}>
          <Image
            source={activeEntry.coverVisual}
            style={explorerMytthofStyles.explorerMytthofPassageMedia}
            resizeMode="cover"
          />
        </View>

        <View style={explorerMytthofStyles.explorerMytthofProseStack}>
          {activeEntry.passageTrail.map((proseBlock, i) => (
            <View
              key={`${i}-${proseBlock.slice(0, 12)}`}
              style={explorerMytthofStyles.explorerMytthofProsePanel}>
              <Text style={explorerMytthofStyles.explorerMytthofProseCopy}>
                {proseBlock}
              </Text>
            </View>
          ))}
        </View>

        <View style={explorerMytthofStyles.explorerMytthofOutcomeTagPanel}>
          <Text style={explorerMytthofStyles.explorerMytthofOutcomeTagLabel}>
            Journey Complete
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Share"
          glyphSource={mediaRegistry.icons.share}
          onActivate={() => emitBookmarkShare(activeEntry)}
          surfaceExtra={explorerMytthofStyles.explorerMytthofPassageEmitAction}
        />
      </AppLayout>
    );
  }

  return (
    <>
    <AppLayout tab>
      <Text style={explorerMytthofStyles.explorerMytthofScreenHeading}>
        Saved
      </Text>
      <Text style={explorerMytthofStyles.explorerMytthofScreenSubheading}>
        Your saved tales and jokes
      </Text>

      {!explorerMytthofHasSavedItems ? (
        <View style={explorerMytthofStyles.explorerMytthofVacantState}>
          <Image
            source={mediaRegistry.saved.empty}
            style={explorerMytthofStyles.explorerMytthofVacantVisual}
            resizeMode="contain"
          />
          <Text style={explorerMytthofStyles.explorerMytthofVacantCopy}>
            Nothing saved yet
          </Text>
          <FilledActionControl
            optionCaption="Explore Tales"
            onActivate={() => tabNavigation.navigate(Routes.Tales)}
            surfaceExtra={explorerMytthofStyles.explorerMytthofVacantAction}
          />
          <FilledActionControl
            optionCaption="Browse Jokes"
            onActivate={() => tabNavigation.navigate(Routes.Jokes)}
            surfaceExtra={explorerMytthofStyles.explorerMytthofVacantAction}
          />
        </View>
      ) : (
        <View style={explorerMytthofStyles.explorerMytthofItemStack}>
          {explorerMytthofShelfRows.map((row, index) => (
            <StaggerItem
              key={
                row.kind === 'tale' ? row.entry.entryKey : row.entry.jokeKey
              }
              index={index}>
              {row.kind === 'tale' ? (
                <BookmarkListPanel
                  shelfEntry={row.entry}
                  onRevealPassage={() => {
                    setExplorerMytthofActiveEntryKey(row.entry.entryKey);
                    setExplorerMytthofScreenPhase('passage');
                  }}
                  onDiscard={() =>
                    setExplorerMytthofPendingDiscard({
                      kind: 'tale',
                      key: row.entry.entryKey,
                    })
                  }
                  onEmitShare={() => emitBookmarkShare(row.entry)}
                />
              ) : (
                <JokeListPanel
                  shelfEntry={row.entry}
                  onRevealJoke={() => {
                    setExplorerMytthofActiveJokeKey(row.entry.jokeKey);
                    setExplorerMytthofScreenPhase('joke');
                  }}
                  onDiscard={() =>
                    setExplorerMytthofPendingDiscard({
                      kind: 'joke',
                      key: row.entry.jokeKey,
                    })
                  }
                  onEmitShare={() => emitJokeShare(row.entry)}
                />
              )}
            </StaggerItem>
          ))}
        </View>
      )}
    </AppLayout>
    {discardModal}
    </>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofScreenHeading: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  explorerMytthofScreenSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  explorerMytthofVacantState: {
    alignItems: 'center',
    paddingVertical: 40.3,
    gap: 16.4,
  },
  explorerMytthofVacantVisual: {
    width: 322.5,
    height: 322.1,
    borderRadius: 28.2,
  },
  explorerMytthofVacantCopy: {
    color: colors.textMutedSoft,
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  explorerMytthofVacantAction: {
    minWidth: 158.5,
  },
  explorerMytthofItemStack: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
  explorerMytthofItemPanel: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
  },
  explorerMytthofJokeItemPanel: {
    borderRadius: 16.3,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.card,
    padding: 24.2,
    gap: 12.3,
  },
  explorerMytthofJokePanelHeader: {
    gap: 8.3,
  },
  explorerMytthofJokeDetailTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
    marginBottom: 16.4,
  },
  explorerMytthofMediaFrame: {
    height: 160.5,
    position: 'relative',
  },
  explorerMytthofTagChip: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  explorerMytthofTagLabel: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  explorerMytthofPanelBody: {
    padding: 24.2,
    gap: 8.3,
  },
  explorerMytthofItemTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  explorerMytthofItemExcerpt: {
    color: colors.textMuted,
    fontSize: 14.1,
    lineHeight: 20.2,
    marginBottom: 8.3,
  },
  explorerMytthofItemToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.4,
  },
  explorerMytthofItemPrimaryAction: {
    flex: 1,
    minHeight: 48.5,
  },
  explorerMytthofFilledPressable: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  explorerMytthofFilledSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofFilledLabel: {
    color: colors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofFilledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
  },
  explorerMytthofActionGlyph: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '600',
  },
  explorerMytthofRemoveSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.dangerBg,
    borderWidth: 1.5,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofRemoveGlyph: {
    fontSize: 18.1,
  },
  explorerMytthofEmitSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: colors.cardMedium,
    borderWidth: 1.5,
    borderColor: colors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofEmitGlyph: {
    color: colors.text,
    fontSize: 18.1,
    fontWeight: '600',
  },
  explorerMytthofPassageScroll: {
    paddingTop: 8.2,
    paddingBottom: 120.3,
  },
  explorerMytthofPassageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  explorerMytthofPassageNavControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofPassageNavGlyph: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  explorerMytthofPassageEmitControl: {
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
  explorerMytthofPassageEmitGlyph: {
    color: colors.text,
    fontSize: 18.5,
    fontWeight: '600',
  },
  explorerMytthofPassageMediaFrame: {
    height: 256.1,
    borderRadius: 16.2,
    overflow: 'hidden',
    marginBottom: 24.3,
  },
  explorerMytthofPassageMedia: {
    width: '100%',
    height: '100%',
  },
  explorerMytthofProseStack: {
    gap: 24.4,
    marginBottom: 24.5,
  },
  explorerMytthofProsePanel: {
    borderRadius: 20.1,
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  explorerMytthofProseCopy: {
    color: colors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  explorerMytthofOutcomeTagPanel: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.4,
    alignItems: 'center',
    marginBottom: 16.5,
  },
  explorerMytthofOutcomeTagLabel: {
    color: colors.gold,
    fontSize: 18.1,
    lineHeight: 28.2,
  },
  explorerMytthofPassageEmitAction: {
    minHeight: 48.3,
    marginBottom: 16.4,
  },
  explorerMytthofPressedState: {
    opacity: 0.85,
  },
});

export default SavedScreen;
