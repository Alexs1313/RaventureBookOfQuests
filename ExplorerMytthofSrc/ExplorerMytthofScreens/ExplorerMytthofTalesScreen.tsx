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
import {
  resolveChronicle,
  chroniclesGroupedByLocale,
} from '../ExplorerMytthofData/ExplorerMytthofStories';
import type {ChroniclePhase} from '../ExplorerMytthofTypes';
import {
  bookmarkExists,
  markChronicleConsumed,
  persistBookmark,
} from '../ExplorerMytthofLoungeKit';
import {StoryListCard} from '../ExplorerMytthofComponents/ExplorerMytthofTales';
import {
  AppLayout,
  FadeInView,
  GradientButton,
  ScreenHeader,
  StaggerItem,
  TypewriterText,
} from '../ExplorerMytthofComponents';
import {colors, gradients, gradientAxis} from '../ExplorerMytthofPalette';

const TalesScreen = () => {
  const [explorerMytthofScreenPhase, setExplorerMytthofScreenPhase] =
    useState<ChroniclePhase>('catalog');
  const [explorerMytthofActiveEntryKey, setExplorerMytthofActiveEntryKey] = useState<
    string | null
  >(null);
  const [explorerMytthofPassageKey, setExplorerMytthofPassageKey] =
    useState('start');
  const [explorerMytthofPassageTrail, setExplorerMytthofPassageTrail] = useState<
    string[]
  >([]);
  const [explorerMytthofTrailPersisted, setExplorerMytthofTrailPersisted] = useState(false);

  const chronicle = useMemo(
    () =>
      explorerMytthofActiveEntryKey
        ? resolveChronicle(explorerMytthofActiveEntryKey)
        : undefined,
    [explorerMytthofActiveEntryKey],
  );

  const activePassage =
    chronicle?.passageMap[explorerMytthofPassageKey];

  const passageCloses =
    activePassage?.closesPassage === true;

  useEffect(() => {
    if (passageCloses && explorerMytthofActiveEntryKey) {
      markChronicleConsumed(explorerMytthofActiveEntryKey);
    }
  }, [explorerMytthofActiveEntryKey, passageCloses]);

  const openChronicle = useCallback(
    async (entryKey: string) => {
      const catalogItem =
        resolveChronicle(entryKey);
      if (!catalogItem) {
        return;
      }
      const alreadyBookmarked = await bookmarkExists(
        entryKey,
      );
      setExplorerMytthofActiveEntryKey(entryKey);
      setExplorerMytthofPassageKey('start');
      setExplorerMytthofPassageTrail([
        catalogItem.openingPassage,
      ]);
      setExplorerMytthofTrailPersisted(alreadyBookmarked);
      setExplorerMytthofScreenPhase('reading');
    },
    [],
  );

  const returnToCatalog = useCallback(() => {
    setExplorerMytthofScreenPhase('catalog');
    setExplorerMytthofActiveEntryKey(null);
    setExplorerMytthofPassageKey('start');
    setExplorerMytthofPassageTrail([]);
    setExplorerMytthofTrailPersisted(false);
  }, []);

  const selectBranch = useCallback(
    (onwardKey: string) => {
      if (!chronicle) {
        return;
      }
      const targetPassage =
        chronicle.passageMap[onwardKey];
      if (!targetPassage) {
        return;
      }
      const extendedTrail = [
        ...explorerMytthofPassageTrail,
        ...(targetPassage.insertedPassage
          ? [targetPassage.insertedPassage]
          : []),
      ];
      setExplorerMytthofPassageTrail(extendedTrail);
      setExplorerMytthofPassageKey(onwardKey);
    },
    [explorerMytthofPassageTrail, chronicle],
  );

  const persistPassageTrail = useCallback(async () => {
    if (
      !explorerMytthofActiveEntryKey ||
      explorerMytthofTrailPersisted ||
      !chronicle
    ) {
      return;
    }
    await persistBookmark({
      entryKey: explorerMytthofActiveEntryKey,
      passageTrail: explorerMytthofPassageTrail,
      storedAt: Date.now(),
    });
    setExplorerMytthofTrailPersisted(true);
  }, [
    explorerMytthofActiveEntryKey,
    explorerMytthofPassageTrail,
    explorerMytthofTrailPersisted,
    chronicle,
  ]);

  if (explorerMytthofScreenPhase === 'catalog') {
    return (
      <AppLayout tab>
        <ScreenHeader
          title="Tales"
          subtitle="Choose your mythology adventure"
          compact
        />
        {(() => {
          let cardIndex = 0;
          return chroniclesGroupedByLocale.map(
            ({localeTag, groupedEntries}, regionIndex) => (
              <FadeInView
                key={localeTag}
                delay={regionIndex * 80}
                style={explorerMytthofStyles.explorerMytthofRegionGroup}>
                <Text style={explorerMytthofStyles.explorerMytthofRegionHeading}>
                  {localeTag}
                </Text>
                {groupedEntries.map(catalogItem => {
                  const item = (
                    <StaggerItem
                      key={catalogItem.entryKey}
                      index={cardIndex}>
                      <StoryListCard
                        story={catalogItem}
                        onOpen={() =>
                          openChronicle(
                            catalogItem.entryKey,
                          )
                        }
                      />
                    </StaggerItem>
                  );
                  cardIndex += 1;
                  return item;
                })}
              </FadeInView>
            ),
          );
        })()}
      </AppLayout>
    );
  }

  if (!chronicle || !activePassage) {
    return null;
  }

  const showOpeningBanner =
    explorerMytthofPassageTrail.length === 1 &&
    explorerMytthofPassageKey === 'start';

  return (
    <AppLayout tab contentStyle={explorerMytthofStyles.explorerMytthofReaderScroll}>
      <FadeInView triggerKey={explorerMytthofActiveEntryKey ?? 'reading'}>
      <Pressable
        onPress={returnToCatalog}
        style={({pressed}) => [
          explorerMytthofStyles.explorerMytthofNavControl,
          pressed && explorerMytthofStyles.explorerMytthofPressedState,
        ]}>
        <Image source={require('../../elements/images/icons/backIcon.png')} />
      </Pressable>

      {showOpeningBanner && (
        <View style={explorerMytthofStyles.explorerMytthofOpeningBanner}>
          <View style={explorerMytthofStyles.explorerMytthofOpeningMediaFrame}>
            <ImageBackground
              source={chronicle.coverVisual}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={gradients.storyHero}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={explorerMytthofStyles.explorerMytthofOpeningTagChip}>
              <Text style={explorerMytthofStyles.explorerMytthofListTagLabel}>
                {chronicle.localeTag}
              </Text>
            </View>
            <Text style={explorerMytthofStyles.explorerMytthofOpeningTitle}>
              {chronicle.headline}
            </Text>
          </View>
        </View>
      )}

      {!showOpeningBanner && (
        <View style={explorerMytthofStyles.explorerMytthofReaderMedia}>
          <ImageBackground
            source={chronicle.coverVisual}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={explorerMytthofStyles.explorerMytthofProseStack}>
        {explorerMytthofPassageTrail.map((proseBlock, i) => {
          const isLatest = i === explorerMytthofPassageTrail.length - 1;
          const blockKey = `${explorerMytthofPassageKey}-${i}`;
          const card = (
            <View style={explorerMytthofStyles.explorerMytthofProsePanel}>
              {isLatest ? (
                <TypewriterText
                  text={proseBlock}
                  style={explorerMytthofStyles.explorerMytthofProseCopy}
                  triggerKey={blockKey}
                />
              ) : (
                <Text style={explorerMytthofStyles.explorerMytthofProseCopy}>
                  {proseBlock}
                </Text>
              )}
            </View>
          );
          return isLatest ? (
            <FadeInView key={blockKey} triggerKey={blockKey}>
              {card}
            </FadeInView>
          ) : (
            <View key={`${i}-static`}>{card}</View>
          );
        })}
      </View>

      {passageCloses ? (
        <FadeInView style={explorerMytthofStyles.explorerMytthofOutcomeGroup} triggerKey="complete">
          <View style={explorerMytthofStyles.explorerMytthofOutcomeTagPanel}>
            <Text style={explorerMytthofStyles.explorerMytthofOutcomeTagLabel}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={explorerMytthofTrailPersisted}
            onPress={persistPassageTrail}
            style={({pressed}) => [
              explorerMytthofStyles.explorerMytthofPersistPressable,
              explorerMytthofTrailPersisted && explorerMytthofStyles.explorerMytthofPersistInactive,
              pressed &&
                !explorerMytthofTrailPersisted &&
                explorerMytthofStyles.explorerMytthofPressedState,
            ]}>
            <LinearGradient
              colors={gradients.primary}
              start={gradientAxis.horizontal.start}
              end={gradientAxis.horizontal.end}
              style={explorerMytthofStyles.explorerMytthofPersistSurface}>
              <Text style={explorerMytthofStyles.explorerMytthofBranchLabel}>
                {explorerMytthofTrailPersisted
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </FadeInView>
      ) : (
        <FadeInView
          style={explorerMytthofStyles.explorerMytthofBranchOptions}
          triggerKey={explorerMytthofPassageKey}>
          {activePassage.promptStem && (
            <TypewriterText
              text={activePassage.promptStem}
              style={explorerMytthofStyles.explorerMytthofBranchPrompt}
              triggerKey={`q-${explorerMytthofPassageKey}`}
            />
          )}
          {activePassage.branchOptions?.map(
            (branchPick, choiceIndex) => (
              <StaggerItem
                key={branchPick.onwardKey}
                index={choiceIndex}>
                <GradientButton
                  label={branchPick.optionCaption}
                  tall={
                    branchPick.optionCaption.length > 42
                  }
                  onPress={() =>
                    selectBranch(branchPick.onwardKey)
                  }
                />
              </StaggerItem>
            ),
          )}
        </FadeInView>
      )}
      </FadeInView>
    </AppLayout>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofCatalogHeading: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  explorerMytthofCatalogSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  explorerMytthofRegionGroup: {
    marginBottom: 24.3,
    gap: 16.4,
  },
  explorerMytthofRegionHeading: {
    color: colors.accent,
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
  },
  explorerMytthofListPanel: {
    borderRadius: 16.2,
    overflow: 'hidden',
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 16.4,
  },
  explorerMytthofListMediaFrame: {
    height: 192.5,
    position: 'relative',
  },
  explorerMytthofListTagChip: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  explorerMytthofListTagLabel: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  explorerMytthofListPanelBody: {
    padding: 24.2,
    gap: 12.3,
  },
  explorerMytthofListPanelTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  explorerMytthofListPanelCopy: {
    color: colors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 26.2,
    marginBottom: 4.3,
  },
  explorerMytthofReaderScroll: {
    paddingTop: 8.4,
  },
  explorerMytthofNavControl: {
    width: 40.5,
    height: 40.1,
    borderRadius: 20.2,
    backgroundColor: colors.brownMuted,
    borderWidth: 1.3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  explorerMytthofNavGlyph: {
    color: colors.text,
    fontSize: 20.1,
    fontWeight: '600',
  },
  explorerMytthofOpeningBanner: {
    marginBottom: 24.2,
  },
  explorerMytthofOpeningMediaFrame: {
    height: 256.3,
    borderRadius: 16.4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24.5,
  },
  explorerMytthofOpeningTagChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badge,
    paddingHorizontal: 12.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
    marginBottom: 12.4,
  },
  explorerMytthofOpeningTitle: {
    color: colors.gold,
    fontSize: 30.5,
    fontWeight: '500',
    lineHeight: 36.1,
  },
  explorerMytthofReaderMedia: {
    height: 256.2,
    borderRadius: 16.3,
    overflow: 'hidden',
    marginBottom: 24.4,
  },
  explorerMytthofProseStack: {
    gap: 24.5,
    marginBottom: 24.1,
  },
  explorerMytthofProsePanel: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.4,
    paddingVertical: 24.5,
  },
  explorerMytthofProseCopy: {
    color: colors.text,
    fontSize: 16.1,
    lineHeight: 26.2,
  },
  explorerMytthofBranchPrompt: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    textAlign: 'center',
    marginBottom: 16.5,
  },
  explorerMytthofBranchOptions: {
    gap: 12.1,
    marginBottom: 16.2,
  },
  explorerMytthofBranchPressable: {
    borderRadius: 20.3,
    overflow: 'hidden',
    width: '100%',
  },
  explorerMytthofBranchSurface: {
    minHeight: 47.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofBranchSurfaceTall: {
    minHeight: 80.1,
  },
  explorerMytthofBranchLabel: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofOutcomeGroup: {
    gap: 16.3,
    marginBottom: 16.4,
  },
  explorerMytthofOutcomeTagPanel: {
    borderRadius: 20.5,
    borderWidth: 1.1,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.2,
    alignItems: 'center',
  },
  explorerMytthofOutcomeTagLabel: {
    color: colors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
  explorerMytthofPersistPressable: {
    borderRadius: 20.5,
    overflow: 'hidden',
  },
  explorerMytthofPersistInactive: {
    opacity: 0.5,
  },
  explorerMytthofPersistSurface: {
    height: 56.1,
    borderRadius: 20.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofPressedState: {
    opacity: 0.85,
  },
});

export default TalesScreen;
