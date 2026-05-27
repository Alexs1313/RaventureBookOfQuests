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
import {AnncintTlllsmythhhsRoutes} from './routes/AnncintTlllsmythhhsRoutes';
import type {AnncintTlllsmythhhsMainTabParamList} from './routes/AnncintTlllsmythhhsRoutes';
import {
  AnncintTlllsmythhhsAppLayout,
  AnncintTlllsmythhhsConfirmModal,
  AnncintTlllsmythhhsStaggerItem,
} from './AnncintTlllsmythhhsUi';
import {anncintTlllsmythhhsMediaRegistry} from './AnncintTlllsmythhhsCore';
import {
  anncintTlllsmythhhsGradients,
  anncintTlllsmythhhsGradientAxis,
} from './AnncintTlllsmythhhsCore';

import {anncintTlllsmythhhsResolveChronicle} from './AnncintTlllsmythhhsCore';
import type {
  AnncintTlllsmythhhsBookmarkDisplay,
  AnncintTlllsmythhhsBookmarkPhase,
  AnncintTlllsmythhhsSavedJokeDisplay,
} from './AnncintTlllsmythhhsCore';
import {
  anncintTlllsmythhhsLoadShelfBookmarks,
  anncintTlllsmythhhsLoadSavedJokes,
  anncintTlllsmythhhsExcerptFromTrail,
  anncintTlllsmythhhsExcerptFromJoke,
  anncintTlllsmythhhsDiscardBookmark,
  anncintTlllsmythhhsDiscardJoke,
  anncintTlllsmythhhsComposeBookmarkShare,
  anncintTlllsmythhhsComposeJokeShare,
} from './AnncintTlllsmythhhsCore';
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
      anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledPressable,
      pressed &&
        anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
    ]}>
    <LinearGradient
      colors={anncintTlllsmythhhsGradients.primary}
      start={anncintTlllsmythhhsGradientAxis.horizontal.start}
      end={anncintTlllsmythhhsGradientAxis.horizontal.end}
      style={[
        anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledSurface,
        surfaceExtra,
      ]}>
      {glyphSource ? (
        <View
          style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledRow}>
          <Image source={glyphSource} />
          <Text
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledLabel
            }>
            {optionCaption}
          </Text>
        </View>
      ) : (
        <Text
          style={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledLabel
          }>
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
        ? anncintTlllsmythhhsStyles.anncintTlllsmythhhsRemoveSurface
        : anncintTlllsmythhhsStyles.anncintTlllsmythhhsEmitSurface,
      pressed &&
        anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
    ]}>
    <Image source={optionCaption} />
  </Pressable>
);

type PendingDiscard = {kind: 'tale'; key: string} | {kind: 'joke'; key: string};

type ShelfRow =
  | {
      kind: 'tale';
      storedAt: number;
      entry: AnncintTlllsmythhhsBookmarkDisplay;
    }
  | {
      kind: 'joke';
      storedAt: number;
      entry: AnncintTlllsmythhhsSavedJokeDisplay;
    };

const JokeListPanel = ({
  shelfEntry,
  onRevealJoke,
  onDiscard,
  onEmitShare,
}: {
  shelfEntry: AnncintTlllsmythhhsSavedJokeDisplay;
  onRevealJoke: () => void;
  onDiscard: () => void;
  onEmitShare: () => void;
}) => (
  <View
    style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsJokeItemPanel}>
    <View
      style={
        anncintTlllsmythhhsStyles.anncintTlllsmythhhsJokePanelHeader
      }>
      <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsTagChip}>
        <Text
          style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsTagLabel}>
          {shelfEntry.localeTag}
        </Text>
      </View>
      <Text
        style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemTitle}>
        {shelfEntry.headline}
      </Text>
    </View>
    <Text
      style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemExcerpt}
      numberOfLines={3}>
      {anncintTlllsmythhhsExcerptFromJoke(shelfEntry.body)}
    </Text>
    <View
      style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemToolbar}>
      <FilledActionControl
        optionCaption="Open"
        onActivate={onRevealJoke}
        surfaceExtra={
          anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemPrimaryAction
        }
      />
      <GlyphActionControl
        optionCaption={anncintTlllsmythhhsMediaRegistry.icons.delete}
        glyphVariant="delete"
        onActivate={onDiscard}
      />
      <GlyphActionControl
        optionCaption={anncintTlllsmythhhsMediaRegistry.icons.shareButton}
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
  shelfEntry: AnncintTlllsmythhhsBookmarkDisplay;
  onRevealPassage: () => void;
  onDiscard: () => void;
  onEmitShare: () => void;
}) => (
  <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemPanel}>
    <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsMediaFrame}>
      <ImageBackground
        source={shelfEntry.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={anncintTlllsmythhhsGradients.savedCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsTagChip}>
        <Text
          style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsTagLabel}>
          {shelfEntry.localeTag}
        </Text>
      </View>
    </View>
    <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsPanelBody}>
      <Text
        style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemTitle}>
        {shelfEntry.headline}
      </Text>
      <Text
        style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemExcerpt}
        numberOfLines={2}>
        {anncintTlllsmythhhsExcerptFromTrail(shelfEntry.passageTrail)}
      </Text>
      <View
        style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemToolbar}>
        <FilledActionControl
          optionCaption="Open"
          onActivate={onRevealPassage}
          surfaceExtra={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemPrimaryAction
          }
        />
        <GlyphActionControl
          optionCaption={anncintTlllsmythhhsMediaRegistry.icons.delete}
          glyphVariant="delete"
          onActivate={onDiscard}
        />
        <GlyphActionControl
          optionCaption={anncintTlllsmythhhsMediaRegistry.icons.shareButton}
          glyphVariant="share"
          onActivate={onEmitShare}
        />
      </View>
    </View>
  </View>
);

const AnncintTlllsmythhhsSavedScreen = () => {
  const tabNavigation =
    useNavigation<
      BottomTabNavigationProp<
        AnncintTlllsmythhhsMainTabParamList,
        typeof AnncintTlllsmythhhsRoutes.Saved
      >
    >();
  const [
    anncintTlllsmythhhsScreenPhase,
    setAnncintTlllsmythhhsScreenPhase,
  ] = useState<AnncintTlllsmythhhsBookmarkPhase>('shelf');
  const [
    anncintTlllsmythhhsShelfEntries,
    setAnncintTlllsmythhhsShelfEntries,
  ] = useState<AnncintTlllsmythhhsBookmarkDisplay[]>([]);
  const [
    anncintTlllsmythhhsSavedJokes,
    setAnncintTlllsmythhhsSavedJokes,
  ] = useState<AnncintTlllsmythhhsSavedJokeDisplay[]>([]);
  const [
    anncintTlllsmythhhsActiveEntryKey,
    setAnncintTlllsmythhhsActiveEntryKey,
  ] = useState<string | null>(null);
  const [
    anncintTlllsmythhhsActiveJokeKey,
    setAnncintTlllsmythhhsActiveJokeKey,
  ] = useState<string | null>(null);
  const [
    anncintTlllsmythhhsPendingDiscard,
    setAnncintTlllsmythhhsPendingDiscard,
  ] = useState<PendingDiscard | null>(null);

  const refreshSnapshot = useCallback(async () => {
    const [storedPayloads, storedJokes] = await Promise.all([
      anncintTlllsmythhhsLoadShelfBookmarks(),
      anncintTlllsmythhhsLoadSavedJokes(),
    ]);
    const enrichedEntries = storedPayloads
      .map(bookmarkPayload => {
        const chronicle = anncintTlllsmythhhsResolveChronicle(
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
        } as AnncintTlllsmythhhsBookmarkDisplay;
      })
      .filter(
        (shelfEntry): shelfEntry is AnncintTlllsmythhhsBookmarkDisplay =>
          shelfEntry != null,
      );
    setAnncintTlllsmythhhsShelfEntries(enrichedEntries);
    setAnncintTlllsmythhhsSavedJokes(storedJokes);
  }, []);

  const anncintTlllsmythhhsShelfRows = useMemo<ShelfRow[]>(() => {
    const rows: ShelfRow[] = [
      ...anncintTlllsmythhhsShelfEntries.map(entry => ({
        kind: 'tale' as const,
        storedAt: entry.storedAt,
        entry,
      })),
      ...anncintTlllsmythhhsSavedJokes.map(entry => ({
        kind: 'joke' as const,
        storedAt: entry.storedAt,
        entry,
      })),
    ];
    return rows.sort((a, b) => b.storedAt - a.storedAt);
  }, [anncintTlllsmythhhsSavedJokes, anncintTlllsmythhhsShelfEntries]);

  const anncintTlllsmythhhsHasSavedItems =
    anncintTlllsmythhhsShelfRows.length > 0;

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const activeEntry = anncintTlllsmythhhsShelfEntries.find(
    e => e.entryKey === anncintTlllsmythhhsActiveEntryKey,
  );
  const activeJoke = anncintTlllsmythhhsSavedJokes.find(
    j => j.jokeKey === anncintTlllsmythhhsActiveJokeKey,
  );

  const emitJokeShare = useCallback(
    async (shelfEntry: AnncintTlllsmythhhsSavedJokeDisplay) => {
      await Share.share({
        message: anncintTlllsmythhhsComposeJokeShare(
          shelfEntry.localeTag,
          shelfEntry.body,
        ),
      });
    },
    [],
  );

  const emitBookmarkShare = useCallback(
    async (shelfEntry: AnncintTlllsmythhhsBookmarkDisplay) => {
      await Share.share({
        message: anncintTlllsmythhhsComposeBookmarkShare(
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
    if (!anncintTlllsmythhhsPendingDiscard) {
      return;
    }
    if (anncintTlllsmythhhsPendingDiscard.kind === 'tale') {
      await anncintTlllsmythhhsDiscardBookmark(
        anncintTlllsmythhhsPendingDiscard.key,
      );
      if (
        anncintTlllsmythhhsActiveEntryKey ===
        anncintTlllsmythhhsPendingDiscard.key
      ) {
        setAnncintTlllsmythhhsScreenPhase('shelf');
        setAnncintTlllsmythhhsActiveEntryKey(null);
      }
    } else {
      await anncintTlllsmythhhsDiscardJoke(
        anncintTlllsmythhhsPendingDiscard.key,
      );
      if (
        anncintTlllsmythhhsActiveJokeKey ===
        anncintTlllsmythhhsPendingDiscard.key
      ) {
        setAnncintTlllsmythhhsScreenPhase('shelf');
        setAnncintTlllsmythhhsActiveJokeKey(null);
      }
    }
    setAnncintTlllsmythhhsPendingDiscard(null);
    await refreshSnapshot();
  }, [
    anncintTlllsmythhhsActiveEntryKey,
    anncintTlllsmythhhsActiveJokeKey,
    anncintTlllsmythhhsPendingDiscard,
    refreshSnapshot,
  ]);

  const discardModal = (
    <AnncintTlllsmythhhsConfirmModal
      visible={anncintTlllsmythhhsPendingDiscard != null}
      title={
        anncintTlllsmythhhsPendingDiscard?.kind === 'joke'
          ? 'Remove Saved Joke?'
          : 'Remove Saved Tale?'
      }
      body={
        anncintTlllsmythhhsPendingDiscard?.kind === 'joke'
          ? 'This saved joke will be permanently removed.'
          : 'This saved story path will be permanently removed.'
      }
      confirmLabel="Delete"
      showClose
      onConfirm={confirmDiscard}
      onCancel={() => setAnncintTlllsmythhhsPendingDiscard(null)}
    />
  );

  if (anncintTlllsmythhhsScreenPhase === 'joke' && activeJoke) {
    return (
      <>
        <AnncintTlllsmythhhsAppLayout
          tab
          contentStyle={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageScroll
          }>
          <View
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageHeader
            }>
            <Pressable
              onPress={() => {
                setAnncintTlllsmythhhsScreenPhase('shelf');
                setAnncintTlllsmythhhsActiveJokeKey(null);
              }}
              style={({pressed}) => [
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageNavControl,
                pressed &&
                  anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
              ]}>
              <Image source={anncintTlllsmythhhsMediaRegistry.icons.back} />
            </Pressable>
            <Pressable
              onPress={() => emitJokeShare(activeJoke)}
              style={({pressed}) => [
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageEmitControl,
                pressed &&
                  anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
              ]}>
              <Image
                source={anncintTlllsmythhhsMediaRegistry.icons.shareButton}
              />
            </Pressable>
          </View>

          <View
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsJokeDetailTag
            }>
            <Text
              style={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsTagLabel
              }>
              {activeJoke.localeTag}
            </Text>
          </View>

          <View
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseStack
            }>
            <View
              style={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsProsePanel
              }>
              <Text
                style={
                  anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseCopy
                }>
                {activeJoke.body}
              </Text>
            </View>
          </View>

          <View
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeTagPanel
            }>
            <Text
              style={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeTagLabel
              }>
              Saved Joke
            </Text>
          </View>

          <FilledActionControl
            optionCaption="Share"
            glyphSource={anncintTlllsmythhhsMediaRegistry.icons.share}
            onActivate={() => emitJokeShare(activeJoke)}
            surfaceExtra={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageEmitAction
            }
          />
        </AnncintTlllsmythhhsAppLayout>
        {discardModal}
      </>
    );
  }

  if (anncintTlllsmythhhsScreenPhase === 'passage' && activeEntry) {
    return (
      <AnncintTlllsmythhhsAppLayout
        tab
        contentStyle={
          anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageScroll
        }>
        <View
          style={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageHeader
          }>
          <Pressable
            onPress={() => {
              setAnncintTlllsmythhhsScreenPhase('shelf');
              setAnncintTlllsmythhhsActiveEntryKey(null);
            }}
            style={({pressed}) => [
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageNavControl,
              pressed &&
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
            ]}>
            <Image source={anncintTlllsmythhhsMediaRegistry.icons.back} />
          </Pressable>
          <Pressable
            onPress={() => emitBookmarkShare(activeEntry)}
            style={({pressed}) => [
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageEmitControl,
              pressed &&
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
            ]}>
            <Image
              source={anncintTlllsmythhhsMediaRegistry.icons.shareButton}
            />
          </Pressable>
        </View>

        <View
          style={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageMediaFrame
          }>
          <Image
            source={activeEntry.coverVisual}
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageMedia
            }
            resizeMode="cover"
          />
        </View>

        <View
          style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseStack}>
          {activeEntry.passageTrail.map((proseBlock, i) => (
            <View
              key={`${i}-${proseBlock.slice(0, 12)}`}
              style={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsProsePanel
              }>
              <Text
                style={
                  anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseCopy
                }>
                {proseBlock}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeTagPanel
          }>
          <Text
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeTagLabel
            }>
            Journey Complete
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Share"
          glyphSource={anncintTlllsmythhhsMediaRegistry.icons.share}
          onActivate={() => emitBookmarkShare(activeEntry)}
          surfaceExtra={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsPassageEmitAction
          }
        />
      </AnncintTlllsmythhhsAppLayout>
    );
  }

  return (
    <>
      <AnncintTlllsmythhhsAppLayout tab>
        <Text
          style={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsScreenHeading
          }>
          Saved
        </Text>
        <Text
          style={
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsScreenSubheading
          }>
          Your saved tales and jokes
        </Text>

        {!anncintTlllsmythhhsHasSavedItems ? (
          <View
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsVacantState
            }>
            <Image
              source={anncintTlllsmythhhsMediaRegistry.saved.empty}
              style={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsVacantVisual
              }
              resizeMode="contain"
            />
            <Text
              style={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsVacantCopy
              }>
              Nothing saved yet
            </Text>
            <FilledActionControl
              optionCaption="Explore Tales"
              onActivate={() =>
                tabNavigation.navigate(AnncintTlllsmythhhsRoutes.Tales)
              }
              surfaceExtra={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsVacantAction
              }
            />
            <FilledActionControl
              optionCaption="Browse Jokes"
              onActivate={() =>
                tabNavigation.navigate(AnncintTlllsmythhhsRoutes.Jokes)
              }
              surfaceExtra={
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsVacantAction
              }
            />
          </View>
        ) : (
          <View
            style={
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsItemStack
            }>
            {anncintTlllsmythhhsShelfRows.map((row, index) => (
              <AnncintTlllsmythhhsStaggerItem
                key={
                  row.kind === 'tale' ? row.entry.entryKey : row.entry.jokeKey
                }
                index={index}>
                {row.kind === 'tale' ? (
                  <BookmarkListPanel
                    shelfEntry={row.entry}
                    onRevealPassage={() => {
                      setAnncintTlllsmythhhsActiveEntryKey(
                        row.entry.entryKey,
                      );
                      setAnncintTlllsmythhhsScreenPhase('passage');
                    }}
                    onDiscard={() =>
                      setAnncintTlllsmythhhsPendingDiscard({
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
                      setAnncintTlllsmythhhsActiveJokeKey(row.entry.jokeKey);
                      setAnncintTlllsmythhhsScreenPhase('joke');
                    }}
                    onDiscard={() =>
                      setAnncintTlllsmythhhsPendingDiscard({
                        kind: 'joke',
                        key: row.entry.jokeKey,
                      })
                    }
                    onEmitShare={() => emitJokeShare(row.entry)}
                  />
                )}
              </AnncintTlllsmythhhsStaggerItem>
            ))}
          </View>
        )}
      </AnncintTlllsmythhhsAppLayout>
      {discardModal}
    </>
  );
};

const anncintTlllsmythhhsStyles = StyleSheet.create({
  anncintTlllsmythhhsScreenHeading: {
    color: '#DAA520',
    fontSize: 46,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  anncintTlllsmythhhsScreenSubheading: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  anncintTlllsmythhhsVacantState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  anncintTlllsmythhhsVacantVisual: {
    width: 322,
    height: 322,
    borderRadius: 28,
  },
  anncintTlllsmythhhsVacantCopy: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 16,
    lineHeight: 24,
  },
  anncintTlllsmythhhsVacantAction: {
    minWidth: 158,
  },
  anncintTlllsmythhhsItemStack: {
    gap: 16,
    paddingBottom: 16,
  },
  anncintTlllsmythhhsItemPanel: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
  },
  anncintTlllsmythhhsJokeItemPanel: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24,
    gap: 12,
  },
  anncintTlllsmythhhsJokePanelHeader: {
    gap: 8,
  },
  anncintTlllsmythhhsJokeDetailTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
  },
  anncintTlllsmythhhsMediaFrame: {
    height: 160,
    position: 'relative',
  },
  anncintTlllsmythhhsTagChip: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  anncintTlllsmythhhsTagLabel: {
    color: '#0F0804',
    fontSize: 14,
  },
  anncintTlllsmythhhsPanelBody: {
    padding: 24,
    gap: 8,
  },
  anncintTlllsmythhhsItemTitle: {
    color: '#DAA520',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  anncintTlllsmythhhsItemExcerpt: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  anncintTlllsmythhhsItemToolbar: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 12,
  },
  anncintTlllsmythhhsItemPrimaryAction: {
    flex: 1,

    minHeight: 48,
  },
  anncintTlllsmythhhsFilledPressable: {
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  anncintTlllsmythhhsFilledSurface: {
    minHeight: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsFilledLabel: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsFilledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  anncintTlllsmythhhsActionGlyph: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '600',
  },
  anncintTlllsmythhhsRemoveSurface: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 26, 26, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(139, 26, 26, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsRemoveGlyph: {
    fontSize: 18,
  },
  anncintTlllsmythhhsEmitSurface: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 2,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsEmitGlyph: {
    color: '#D4A574',
    fontSize: 18,
    fontWeight: '600',
  },
  anncintTlllsmythhhsPassageScroll: {
    paddingTop: 8,
    paddingBottom: 120,
  },
  anncintTlllsmythhhsPassageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  anncintTlllsmythhhsPassageNavControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPassageNavGlyph: {
    color: '#D4A574',
    fontSize: 20,
    fontWeight: '600',
  },
  anncintTlllsmythhhsPassageEmitControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 'auto',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: '#FA9A40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPassageEmitGlyph: {
    color: '#D4A574',
    fontSize: 18,
    fontWeight: '600',
  },
  anncintTlllsmythhhsPassageMediaFrame: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  anncintTlllsmythhhsPassageMedia: {
    width: '100%',
    height: '100%',
  },
  anncintTlllsmythhhsProseStack: {
    gap: 24,
    marginBottom: 24,
  },
  anncintTlllsmythhhsProsePanel: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  anncintTlllsmythhhsProseCopy: {
    color: '#D4A574',
    fontSize: 16,
    lineHeight: 26,
  },
  anncintTlllsmythhhsOutcomeTagPanel: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  anncintTlllsmythhhsOutcomeTagLabel: {
    color: '#DAA520',
    fontSize: 18,
    lineHeight: 28,
  },
  anncintTlllsmythhhsPassageEmitAction: {
    minHeight: 48,
    marginBottom: 16,
  },
  anncintTlllsmythhhsPressedState: {
    opacity: 0.85,
  },
});

export default AnncintTlllsmythhhsSavedScreen;
