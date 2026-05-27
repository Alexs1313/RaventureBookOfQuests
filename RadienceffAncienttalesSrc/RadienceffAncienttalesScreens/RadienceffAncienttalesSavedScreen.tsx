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
import {RadienceffAncienttalesRoutes} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesRoutes';
import type {RadienceffAncienttalesMainTabParamList} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesTypes';
import {
  RadienceffAncienttalesAppLayout,
  RadienceffAncienttalesConfirmModal,
  RadienceffAncienttalesStaggerItem,
} from '../RadienceffAncienttalesComponents';
import {radienceffAncienttalesMediaRegistry} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesAssets';
import {
  radienceffAncienttalesColors,
  radienceffAncienttalesGradients,
  radienceffAncienttalesGradientAxis,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

import {radienceffAncienttalesResolveChronicle} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData/RadienceffAncienttalesStories';
import type {
  RadienceffAncienttalesBookmarkDisplay,
  RadienceffAncienttalesBookmarkPhase,
  RadienceffAncienttalesSavedJokeDisplay,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes';
import {
  radienceffAncienttalesLoadShelfBookmarks,
  radienceffAncienttalesLoadSavedJokes,
  radienceffAncienttalesExcerptFromTrail,
  radienceffAncienttalesExcerptFromJoke,
  radienceffAncienttalesDiscardBookmark,
  radienceffAncienttalesDiscardJoke,
  radienceffAncienttalesComposeBookmarkShare,
  radienceffAncienttalesComposeJokeShare,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit';
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
      radienceffAncienttalesStyles.radienceffAncienttalesFilledPressable,
      pressed &&
        radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    <LinearGradient
      colors={radienceffAncienttalesGradients.primary}
      start={radienceffAncienttalesGradientAxis.horizontal.start}
      end={radienceffAncienttalesGradientAxis.horizontal.end}
      style={[
        radienceffAncienttalesStyles.radienceffAncienttalesFilledSurface,
        surfaceExtra,
      ]}>
      {glyphSource ? (
        <View
          style={radienceffAncienttalesStyles.radienceffAncienttalesFilledRow}>
          <Image source={glyphSource} />
          <Text
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesFilledLabel
            }>
            {optionCaption}
          </Text>
        </View>
      ) : (
        <Text
          style={
            radienceffAncienttalesStyles.radienceffAncienttalesFilledLabel
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
        ? radienceffAncienttalesStyles.radienceffAncienttalesRemoveSurface
        : radienceffAncienttalesStyles.radienceffAncienttalesEmitSurface,
      pressed &&
        radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    <Image source={optionCaption} />
  </Pressable>
);

type PendingDiscard = {kind: 'tale'; key: string} | {kind: 'joke'; key: string};

type ShelfRow =
  | {
      kind: 'tale';
      storedAt: number;
      entry: RadienceffAncienttalesBookmarkDisplay;
    }
  | {
      kind: 'joke';
      storedAt: number;
      entry: RadienceffAncienttalesSavedJokeDisplay;
    };

const JokeListPanel = ({
  shelfEntry,
  onRevealJoke,
  onDiscard,
  onEmitShare,
}: {
  shelfEntry: RadienceffAncienttalesSavedJokeDisplay;
  onRevealJoke: () => void;
  onDiscard: () => void;
  onEmitShare: () => void;
}) => (
  <View
    style={radienceffAncienttalesStyles.radienceffAncienttalesJokeItemPanel}>
    <View
      style={
        radienceffAncienttalesStyles.radienceffAncienttalesJokePanelHeader
      }>
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesTagChip}>
        <Text
          style={radienceffAncienttalesStyles.radienceffAncienttalesTagLabel}>
          {shelfEntry.localeTag}
        </Text>
      </View>
      <Text
        style={radienceffAncienttalesStyles.radienceffAncienttalesItemTitle}>
        {shelfEntry.headline}
      </Text>
    </View>
    <Text
      style={radienceffAncienttalesStyles.radienceffAncienttalesItemExcerpt}
      numberOfLines={3}>
      {radienceffAncienttalesExcerptFromJoke(shelfEntry.body)}
    </Text>
    <View
      style={radienceffAncienttalesStyles.radienceffAncienttalesItemToolbar}>
      <FilledActionControl
        optionCaption="Open"
        onActivate={onRevealJoke}
        surfaceExtra={
          radienceffAncienttalesStyles.radienceffAncienttalesItemPrimaryAction
        }
      />
      <GlyphActionControl
        optionCaption={radienceffAncienttalesMediaRegistry.icons.delete}
        glyphVariant="delete"
        onActivate={onDiscard}
      />
      <GlyphActionControl
        optionCaption={radienceffAncienttalesMediaRegistry.icons.shareButton}
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
  shelfEntry: RadienceffAncienttalesBookmarkDisplay;
  onRevealPassage: () => void;
  onDiscard: () => void;
  onEmitShare: () => void;
}) => (
  <View style={radienceffAncienttalesStyles.radienceffAncienttalesItemPanel}>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesMediaFrame}>
      <ImageBackground
        source={shelfEntry.coverVisual}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={radienceffAncienttalesGradients.savedCard}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={radienceffAncienttalesStyles.radienceffAncienttalesTagChip}>
        <Text
          style={radienceffAncienttalesStyles.radienceffAncienttalesTagLabel}>
          {shelfEntry.localeTag}
        </Text>
      </View>
    </View>
    <View style={radienceffAncienttalesStyles.radienceffAncienttalesPanelBody}>
      <Text
        style={radienceffAncienttalesStyles.radienceffAncienttalesItemTitle}>
        {shelfEntry.headline}
      </Text>
      <Text
        style={radienceffAncienttalesStyles.radienceffAncienttalesItemExcerpt}
        numberOfLines={2}>
        {radienceffAncienttalesExcerptFromTrail(shelfEntry.passageTrail)}
      </Text>
      <View
        style={radienceffAncienttalesStyles.radienceffAncienttalesItemToolbar}>
        <FilledActionControl
          optionCaption="Open"
          onActivate={onRevealPassage}
          surfaceExtra={
            radienceffAncienttalesStyles.radienceffAncienttalesItemPrimaryAction
          }
        />
        <GlyphActionControl
          optionCaption={radienceffAncienttalesMediaRegistry.icons.delete}
          glyphVariant="delete"
          onActivate={onDiscard}
        />
        <GlyphActionControl
          optionCaption={radienceffAncienttalesMediaRegistry.icons.shareButton}
          glyphVariant="share"
          onActivate={onEmitShare}
        />
      </View>
    </View>
  </View>
);

const RadienceffAncienttalesSavedScreen = () => {
  const tabNavigation =
    useNavigation<
      BottomTabNavigationProp<
        RadienceffAncienttalesMainTabParamList,
        typeof RadienceffAncienttalesRoutes.Saved
      >
    >();
  const [
    radienceffAncienttalesScreenPhase,
    setRadienceffAncienttalesScreenPhase,
  ] = useState<RadienceffAncienttalesBookmarkPhase>('shelf');
  const [
    radienceffAncienttalesShelfEntries,
    setRadienceffAncienttalesShelfEntries,
  ] = useState<RadienceffAncienttalesBookmarkDisplay[]>([]);
  const [
    radienceffAncienttalesSavedJokes,
    setRadienceffAncienttalesSavedJokes,
  ] = useState<RadienceffAncienttalesSavedJokeDisplay[]>([]);
  const [
    radienceffAncienttalesActiveEntryKey,
    setRadienceffAncienttalesActiveEntryKey,
  ] = useState<string | null>(null);
  const [
    radienceffAncienttalesActiveJokeKey,
    setRadienceffAncienttalesActiveJokeKey,
  ] = useState<string | null>(null);
  const [
    radienceffAncienttalesPendingDiscard,
    setRadienceffAncienttalesPendingDiscard,
  ] = useState<PendingDiscard | null>(null);

  const refreshSnapshot = useCallback(async () => {
    const [storedPayloads, storedJokes] = await Promise.all([
      radienceffAncienttalesLoadShelfBookmarks(),
      radienceffAncienttalesLoadSavedJokes(),
    ]);
    const enrichedEntries = storedPayloads
      .map(bookmarkPayload => {
        const chronicle = radienceffAncienttalesResolveChronicle(
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
        } as RadienceffAncienttalesBookmarkDisplay;
      })
      .filter(
        (shelfEntry): shelfEntry is RadienceffAncienttalesBookmarkDisplay =>
          shelfEntry != null,
      );
    setRadienceffAncienttalesShelfEntries(enrichedEntries);
    setRadienceffAncienttalesSavedJokes(storedJokes);
  }, []);

  const radienceffAncienttalesShelfRows = useMemo<ShelfRow[]>(() => {
    const rows: ShelfRow[] = [
      ...radienceffAncienttalesShelfEntries.map(entry => ({
        kind: 'tale' as const,
        storedAt: entry.storedAt,
        entry,
      })),
      ...radienceffAncienttalesSavedJokes.map(entry => ({
        kind: 'joke' as const,
        storedAt: entry.storedAt,
        entry,
      })),
    ];
    return rows.sort((a, b) => b.storedAt - a.storedAt);
  }, [radienceffAncienttalesSavedJokes, radienceffAncienttalesShelfEntries]);

  const radienceffAncienttalesHasSavedItems =
    radienceffAncienttalesShelfRows.length > 0;

  useFocusEffect(
    useCallback(() => {
      refreshSnapshot();
    }, [refreshSnapshot]),
  );

  const activeEntry = radienceffAncienttalesShelfEntries.find(
    e => e.entryKey === radienceffAncienttalesActiveEntryKey,
  );
  const activeJoke = radienceffAncienttalesSavedJokes.find(
    j => j.jokeKey === radienceffAncienttalesActiveJokeKey,
  );

  const emitJokeShare = useCallback(
    async (shelfEntry: RadienceffAncienttalesSavedJokeDisplay) => {
      await Share.share({
        message: radienceffAncienttalesComposeJokeShare(
          shelfEntry.localeTag,
          shelfEntry.body,
        ),
      });
    },
    [],
  );

  const emitBookmarkShare = useCallback(
    async (shelfEntry: RadienceffAncienttalesBookmarkDisplay) => {
      await Share.share({
        message: radienceffAncienttalesComposeBookmarkShare(
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
    if (!radienceffAncienttalesPendingDiscard) {
      return;
    }
    if (radienceffAncienttalesPendingDiscard.kind === 'tale') {
      await radienceffAncienttalesDiscardBookmark(
        radienceffAncienttalesPendingDiscard.key,
      );
      if (
        radienceffAncienttalesActiveEntryKey ===
        radienceffAncienttalesPendingDiscard.key
      ) {
        setRadienceffAncienttalesScreenPhase('shelf');
        setRadienceffAncienttalesActiveEntryKey(null);
      }
    } else {
      await radienceffAncienttalesDiscardJoke(
        radienceffAncienttalesPendingDiscard.key,
      );
      if (
        radienceffAncienttalesActiveJokeKey ===
        radienceffAncienttalesPendingDiscard.key
      ) {
        setRadienceffAncienttalesScreenPhase('shelf');
        setRadienceffAncienttalesActiveJokeKey(null);
      }
    }
    setRadienceffAncienttalesPendingDiscard(null);
    await refreshSnapshot();
  }, [
    radienceffAncienttalesActiveEntryKey,
    radienceffAncienttalesActiveJokeKey,
    radienceffAncienttalesPendingDiscard,
    refreshSnapshot,
  ]);

  const discardModal = (
    <RadienceffAncienttalesConfirmModal
      visible={radienceffAncienttalesPendingDiscard != null}
      title={
        radienceffAncienttalesPendingDiscard?.kind === 'joke'
          ? 'Remove Saved Joke?'
          : 'Remove Saved Tale?'
      }
      body={
        radienceffAncienttalesPendingDiscard?.kind === 'joke'
          ? 'This saved joke will be permanently removed.'
          : 'This saved story path will be permanently removed.'
      }
      confirmLabel="Delete"
      showClose
      onConfirm={confirmDiscard}
      onCancel={() => setRadienceffAncienttalesPendingDiscard(null)}
    />
  );

  if (radienceffAncienttalesScreenPhase === 'joke' && activeJoke) {
    return (
      <>
        <RadienceffAncienttalesAppLayout
          tab
          contentStyle={
            radienceffAncienttalesStyles.radienceffAncienttalesPassageScroll
          }>
          <View
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesPassageHeader
            }>
            <Pressable
              onPress={() => {
                setRadienceffAncienttalesScreenPhase('shelf');
                setRadienceffAncienttalesActiveJokeKey(null);
              }}
              style={({pressed}) => [
                radienceffAncienttalesStyles.radienceffAncienttalesPassageNavControl,
                pressed &&
                  radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
              ]}>
              <Image source={radienceffAncienttalesMediaRegistry.icons.back} />
            </Pressable>
            <Pressable
              onPress={() => emitJokeShare(activeJoke)}
              style={({pressed}) => [
                radienceffAncienttalesStyles.radienceffAncienttalesPassageEmitControl,
                pressed &&
                  radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
              ]}>
              <Image
                source={radienceffAncienttalesMediaRegistry.icons.shareButton}
              />
            </Pressable>
          </View>

          <View
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesJokeDetailTag
            }>
            <Text
              style={
                radienceffAncienttalesStyles.radienceffAncienttalesTagLabel
              }>
              {activeJoke.localeTag}
            </Text>
          </View>

          <View
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesProseStack
            }>
            <View
              style={
                radienceffAncienttalesStyles.radienceffAncienttalesProsePanel
              }>
              <Text
                style={
                  radienceffAncienttalesStyles.radienceffAncienttalesProseCopy
                }>
                {activeJoke.body}
              </Text>
            </View>
          </View>

          <View
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesOutcomeTagPanel
            }>
            <Text
              style={
                radienceffAncienttalesStyles.radienceffAncienttalesOutcomeTagLabel
              }>
              Saved Joke
            </Text>
          </View>

          <FilledActionControl
            optionCaption="Share"
            glyphSource={radienceffAncienttalesMediaRegistry.icons.share}
            onActivate={() => emitJokeShare(activeJoke)}
            surfaceExtra={
              radienceffAncienttalesStyles.radienceffAncienttalesPassageEmitAction
            }
          />
        </RadienceffAncienttalesAppLayout>
        {discardModal}
      </>
    );
  }

  if (radienceffAncienttalesScreenPhase === 'passage' && activeEntry) {
    return (
      <RadienceffAncienttalesAppLayout
        tab
        contentStyle={
          radienceffAncienttalesStyles.radienceffAncienttalesPassageScroll
        }>
        <View
          style={
            radienceffAncienttalesStyles.radienceffAncienttalesPassageHeader
          }>
          <Pressable
            onPress={() => {
              setRadienceffAncienttalesScreenPhase('shelf');
              setRadienceffAncienttalesActiveEntryKey(null);
            }}
            style={({pressed}) => [
              radienceffAncienttalesStyles.radienceffAncienttalesPassageNavControl,
              pressed &&
                radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
            ]}>
            <Image source={radienceffAncienttalesMediaRegistry.icons.back} />
          </Pressable>
          <Pressable
            onPress={() => emitBookmarkShare(activeEntry)}
            style={({pressed}) => [
              radienceffAncienttalesStyles.radienceffAncienttalesPassageEmitControl,
              pressed &&
                radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
            ]}>
            <Image
              source={radienceffAncienttalesMediaRegistry.icons.shareButton}
            />
          </Pressable>
        </View>

        <View
          style={
            radienceffAncienttalesStyles.radienceffAncienttalesPassageMediaFrame
          }>
          <Image
            source={activeEntry.coverVisual}
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesPassageMedia
            }
            resizeMode="cover"
          />
        </View>

        <View
          style={radienceffAncienttalesStyles.radienceffAncienttalesProseStack}>
          {activeEntry.passageTrail.map((proseBlock, i) => (
            <View
              key={`${i}-${proseBlock.slice(0, 12)}`}
              style={
                radienceffAncienttalesStyles.radienceffAncienttalesProsePanel
              }>
              <Text
                style={
                  radienceffAncienttalesStyles.radienceffAncienttalesProseCopy
                }>
                {proseBlock}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={
            radienceffAncienttalesStyles.radienceffAncienttalesOutcomeTagPanel
          }>
          <Text
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesOutcomeTagLabel
            }>
            Journey Complete
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Share"
          glyphSource={radienceffAncienttalesMediaRegistry.icons.share}
          onActivate={() => emitBookmarkShare(activeEntry)}
          surfaceExtra={
            radienceffAncienttalesStyles.radienceffAncienttalesPassageEmitAction
          }
        />
      </RadienceffAncienttalesAppLayout>
    );
  }

  return (
    <>
      <RadienceffAncienttalesAppLayout tab>
        <Text
          style={
            radienceffAncienttalesStyles.radienceffAncienttalesScreenHeading
          }>
          Saved
        </Text>
        <Text
          style={
            radienceffAncienttalesStyles.radienceffAncienttalesScreenSubheading
          }>
          Your saved tales and jokes
        </Text>

        {!radienceffAncienttalesHasSavedItems ? (
          <View
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesVacantState
            }>
            <Image
              source={radienceffAncienttalesMediaRegistry.saved.empty}
              style={
                radienceffAncienttalesStyles.radienceffAncienttalesVacantVisual
              }
              resizeMode="contain"
            />
            <Text
              style={
                radienceffAncienttalesStyles.radienceffAncienttalesVacantCopy
              }>
              Nothing saved yet
            </Text>
            <FilledActionControl
              optionCaption="Explore Tales"
              onActivate={() =>
                tabNavigation.navigate(RadienceffAncienttalesRoutes.Tales)
              }
              surfaceExtra={
                radienceffAncienttalesStyles.radienceffAncienttalesVacantAction
              }
            />
            <FilledActionControl
              optionCaption="Browse Jokes"
              onActivate={() =>
                tabNavigation.navigate(RadienceffAncienttalesRoutes.Jokes)
              }
              surfaceExtra={
                radienceffAncienttalesStyles.radienceffAncienttalesVacantAction
              }
            />
          </View>
        ) : (
          <View
            style={
              radienceffAncienttalesStyles.radienceffAncienttalesItemStack
            }>
            {radienceffAncienttalesShelfRows.map((row, index) => (
              <RadienceffAncienttalesStaggerItem
                key={
                  row.kind === 'tale' ? row.entry.entryKey : row.entry.jokeKey
                }
                index={index}>
                {row.kind === 'tale' ? (
                  <BookmarkListPanel
                    shelfEntry={row.entry}
                    onRevealPassage={() => {
                      setRadienceffAncienttalesActiveEntryKey(
                        row.entry.entryKey,
                      );
                      setRadienceffAncienttalesScreenPhase('passage');
                    }}
                    onDiscard={() =>
                      setRadienceffAncienttalesPendingDiscard({
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
                      setRadienceffAncienttalesActiveJokeKey(row.entry.jokeKey);
                      setRadienceffAncienttalesScreenPhase('joke');
                    }}
                    onDiscard={() =>
                      setRadienceffAncienttalesPendingDiscard({
                        kind: 'joke',
                        key: row.entry.jokeKey,
                      })
                    }
                    onEmitShare={() => emitJokeShare(row.entry)}
                  />
                )}
              </RadienceffAncienttalesStaggerItem>
            ))}
          </View>
        )}
      </RadienceffAncienttalesAppLayout>
      {discardModal}
    </>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesScreenHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  radienceffAncienttalesScreenSubheading: {
    color: radienceffAncienttalesColors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  radienceffAncienttalesVacantState: {
    alignItems: 'center',
    paddingVertical: 40.3,
    gap: 16.4,
  },
  radienceffAncienttalesVacantVisual: {
    width: 322.5,
    height: 322.1,
    borderRadius: 28.2,
  },
  radienceffAncienttalesVacantCopy: {
    color: radienceffAncienttalesColors.textMutedSoft,
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  radienceffAncienttalesVacantAction: {
    minWidth: 158.5,
  },
  radienceffAncienttalesItemStack: {
    gap: 16.1,
    paddingBottom: 16.2,
  },
  radienceffAncienttalesItemPanel: {
    borderRadius: 16.3,
    overflow: 'hidden',
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardStrong,
  },
  radienceffAncienttalesJokeItemPanel: {
    borderRadius: 16.3,
    borderWidth: 1,
    borderColor: radienceffAncienttalesColors.borderMedium,
    backgroundColor: radienceffAncienttalesColors.card,
    padding: 24.2,
    gap: 12.3,
  },
  radienceffAncienttalesJokePanelHeader: {
    gap: 8.3,
  },
  radienceffAncienttalesJokeDetailTag: {
    alignSelf: 'flex-start',
    backgroundColor: radienceffAncienttalesColors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4,
    borderRadius: 20.5,
    marginBottom: 16,
  },
  radienceffAncienttalesMediaFrame: {
    height: 160,
    position: 'relative',
  },
  radienceffAncienttalesTagChip: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: radienceffAncienttalesColors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  radienceffAncienttalesTagLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 14.1,
  },
  radienceffAncienttalesPanelBody: {
    padding: 24.2,
    gap: 8.3,
  },
  radienceffAncienttalesItemTitle: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  radienceffAncienttalesItemExcerpt: {
    color: radienceffAncienttalesColors.textMuted,
    fontSize: 14.1,
    lineHeight: 20.2,
    marginBottom: 8.3,
  },
  radienceffAncienttalesItemToolbar: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 12.4,
  },
  radienceffAncienttalesItemPrimaryAction: {
    flex: 1,

    minHeight: 48.5,
  },
  radienceffAncienttalesFilledPressable: {
    borderRadius: 20.1,
    overflow: 'hidden',
    flex: 1,
  },
  radienceffAncienttalesFilledSurface: {
    minHeight: 48.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesFilledLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesFilledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8.5,
  },
  radienceffAncienttalesActionGlyph: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.1,
    fontWeight: '600',
  },
  radienceffAncienttalesRemoveSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: radienceffAncienttalesColors.dangerBg,
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesRemoveGlyph: {
    fontSize: 18.1,
  },
  radienceffAncienttalesEmitSurface: {
    width: 48.2,
    height: 48.3,
    borderRadius: 20.4,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesEmitGlyph: {
    color: radienceffAncienttalesColors.text,
    fontSize: 18.1,
    fontWeight: '600',
  },
  radienceffAncienttalesPassageScroll: {
    paddingTop: 8.2,
    paddingBottom: 120.3,
  },
  radienceffAncienttalesPassageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  radienceffAncienttalesPassageNavControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: radienceffAncienttalesColors.cardOverlay,
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesPassageNavGlyph: {
    color: radienceffAncienttalesColors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  radienceffAncienttalesPassageEmitControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    marginLeft: 'auto',
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.shareBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesPassageEmitGlyph: {
    color: radienceffAncienttalesColors.text,
    fontSize: 18.5,
    fontWeight: '600',
  },
  radienceffAncienttalesPassageMediaFrame: {
    height: 256.1,
    borderRadius: 16.2,
    overflow: 'hidden',
    marginBottom: 24.3,
  },
  radienceffAncienttalesPassageMedia: {
    width: '100%',
    height: '100%',
  },
  radienceffAncienttalesProseStack: {
    gap: 24.4,
    marginBottom: 24.5,
  },
  radienceffAncienttalesProsePanel: {
    borderRadius: 20.1,
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.borderStrong,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    paddingHorizontal: 24.3,
    paddingVertical: 24.4,
  },
  radienceffAncienttalesProseCopy: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.5,
    lineHeight: 26.1,
  },
  radienceffAncienttalesOutcomeTagPanel: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.journeyBorder,
    backgroundColor: radienceffAncienttalesColors.journey,
    paddingVertical: 24.4,
    alignItems: 'center',
    marginBottom: 16.5,
  },
  radienceffAncienttalesOutcomeTagLabel: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 18.1,
    lineHeight: 28.2,
  },
  radienceffAncienttalesPassageEmitAction: {
    minHeight: 48.3,
    marginBottom: 16.4,
  },
  radienceffAncienttalesPressedState: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesSavedScreen;
