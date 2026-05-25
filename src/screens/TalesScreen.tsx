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
} from '../data/stories';
import type {ChroniclePhase} from '../types';
import {
  bookmarkExists,
  markChronicleConsumed,
  persistBookmark,
} from '../loungeKit';
import {StoryListCard} from '../components/tales';
import {
  AppLayout,
  FadeInView,
  GradientButton,
  ScreenHeader,
  StaggerItem,
  TypewriterText,
} from '../components';
import {colors, gradients, gradientAxis} from '../palette';

const TalesScreen = () => {
  const [screenPhase, setScreenPhase] =
    useState<ChroniclePhase>('catalog');
  const [activeEntryKey, setActiveEntryKey] = useState<
    string | null
  >(null);
  const [passageKey, setPassageKey] =
    useState('start');
  const [passageTrail, setPassageTrail] = useState<
    string[]
  >([]);
  const [trailPersisted, setTrailPersisted] = useState(false);

  const chronicle = useMemo(
    () =>
      activeEntryKey
        ? resolveChronicle(activeEntryKey)
        : undefined,
    [activeEntryKey],
  );

  const activePassage =
    chronicle?.passageMap[passageKey];

  const passageCloses =
    activePassage?.closesPassage === true;

  useEffect(() => {
    if (passageCloses && activeEntryKey) {
      markChronicleConsumed(activeEntryKey);
    }
  }, [activeEntryKey, passageCloses]);

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
      setActiveEntryKey(entryKey);
      setPassageKey('start');
      setPassageTrail([
        catalogItem.openingPassage,
      ]);
      setTrailPersisted(alreadyBookmarked);
      setScreenPhase('reading');
    },
    [],
  );

  const returnToCatalog = useCallback(() => {
    setScreenPhase('catalog');
    setActiveEntryKey(null);
    setPassageKey('start');
    setPassageTrail([]);
    setTrailPersisted(false);
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
        ...passageTrail,
        ...(targetPassage.insertedPassage
          ? [targetPassage.insertedPassage]
          : []),
      ];
      setPassageTrail(extendedTrail);
      setPassageKey(onwardKey);
    },
    [passageTrail, chronicle],
  );

  const persistPassageTrail = useCallback(async () => {
    if (
      !activeEntryKey ||
      trailPersisted ||
      !chronicle
    ) {
      return;
    }
    await persistBookmark({
      entryKey: activeEntryKey,
      passageTrail: passageTrail,
      storedAt: Date.now(),
    });
    setTrailPersisted(true);
  }, [
    activeEntryKey,
    passageTrail,
    trailPersisted,
    chronicle,
  ]);

  if (screenPhase === 'catalog') {
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
                style={styles.regionGroup}>
                <Text style={styles.regionHeading}>
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
    passageTrail.length === 1 &&
    passageKey === 'start';

  return (
    <AppLayout tab contentStyle={styles.readerScroll}>
      <FadeInView triggerKey={activeEntryKey ?? 'reading'}>
      <Pressable
        onPress={returnToCatalog}
        style={({pressed}) => [
          styles.navControl,
          pressed && styles.pressedState,
        ]}>
        <Image source={require('../../elements/images/icons/backIcon.png')} />
      </Pressable>

      {showOpeningBanner && (
        <View style={styles.openingBanner}>
          <View style={styles.openingMediaFrame}>
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
            <View style={styles.openingTagChip}>
              <Text style={styles.listTagLabel}>
                {chronicle.localeTag}
              </Text>
            </View>
            <Text style={styles.openingTitle}>
              {chronicle.headline}
            </Text>
          </View>
        </View>
      )}

      {!showOpeningBanner && (
        <View style={styles.readerMedia}>
          <ImageBackground
            source={chronicle.coverVisual}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.proseStack}>
        {passageTrail.map((proseBlock, i) => {
          const isLatest = i === passageTrail.length - 1;
          const blockKey = `${passageKey}-${i}`;
          const card = (
            <View style={styles.prosePanel}>
              {isLatest ? (
                <TypewriterText
                  text={proseBlock}
                  style={styles.proseCopy}
                  triggerKey={blockKey}
                />
              ) : (
                <Text style={styles.proseCopy}>
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
        <FadeInView style={styles.outcomeGroup} triggerKey="complete">
          <View style={styles.outcomeTagPanel}>
            <Text style={styles.outcomeTagLabel}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={trailPersisted}
            onPress={persistPassageTrail}
            style={({pressed}) => [
              styles.persistPressable,
              trailPersisted && styles.persistInactive,
              pressed &&
                !trailPersisted &&
                styles.pressedState,
            ]}>
            <LinearGradient
              colors={gradients.primary}
              start={gradientAxis.horizontal.start}
              end={gradientAxis.horizontal.end}
              style={styles.persistSurface}>
              <Text style={styles.branchLabel}>
                {trailPersisted
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </FadeInView>
      ) : (
        <FadeInView
          style={styles.branchOptions}
          triggerKey={passageKey}>
          {activePassage.promptStem && (
            <TypewriterText
              text={activePassage.promptStem}
              style={styles.branchPrompt}
              triggerKey={`q-${passageKey}`}
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

const styles = StyleSheet.create({
  catalogHeading: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  catalogSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  regionGroup: {
    marginBottom: 24.3,
    gap: 16.4,
  },
  regionHeading: {
    color: colors.accent,
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
  },
  listPanel: {
    borderRadius: 16.2,
    overflow: 'hidden',
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 16.4,
  },
  listMediaFrame: {
    height: 192.5,
    position: 'relative',
  },
  listTagChip: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  listTagLabel: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  listPanelBody: {
    padding: 24.2,
    gap: 12.3,
  },
  listPanelTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  listPanelCopy: {
    color: colors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 26.2,
    marginBottom: 4.3,
  },
  readerScroll: {
    paddingTop: 8.4,
  },
  navControl: {
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
  navGlyph: {
    color: colors.text,
    fontSize: 20.1,
    fontWeight: '600',
  },
  openingBanner: {
    marginBottom: 24.2,
  },
  openingMediaFrame: {
    height: 256.3,
    borderRadius: 16.4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24.5,
  },
  openingTagChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badge,
    paddingHorizontal: 12.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
    marginBottom: 12.4,
  },
  openingTitle: {
    color: colors.gold,
    fontSize: 30.5,
    fontWeight: '500',
    lineHeight: 36.1,
  },
  readerMedia: {
    height: 256.2,
    borderRadius: 16.3,
    overflow: 'hidden',
    marginBottom: 24.4,
  },
  proseStack: {
    gap: 24.5,
    marginBottom: 24.1,
  },
  prosePanel: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.4,
    paddingVertical: 24.5,
  },
  proseCopy: {
    color: colors.text,
    fontSize: 16.1,
    lineHeight: 26.2,
  },
  branchPrompt: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    textAlign: 'center',
    marginBottom: 16.5,
  },
  branchOptions: {
    gap: 12.1,
    marginBottom: 16.2,
  },
  branchPressable: {
    borderRadius: 20.3,
    overflow: 'hidden',
    width: '100%',
  },
  branchSurface: {
    minHeight: 47.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  branchSurfaceTall: {
    minHeight: 80.1,
  },
  branchLabel: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  outcomeGroup: {
    gap: 16.3,
    marginBottom: 16.4,
  },
  outcomeTagPanel: {
    borderRadius: 20.5,
    borderWidth: 1.1,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.2,
    alignItems: 'center',
  },
  outcomeTagLabel: {
    color: colors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
  persistPressable: {
    borderRadius: 20.5,
    overflow: 'hidden',
  },
  persistInactive: {
    opacity: 0.5,
  },
  persistSurface: {
    height: 56.1,
    borderRadius: 20.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedState: {
    opacity: 0.85,
  },
});

export default TalesScreen;
