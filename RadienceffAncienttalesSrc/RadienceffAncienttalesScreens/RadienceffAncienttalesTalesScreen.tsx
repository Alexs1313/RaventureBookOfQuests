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
  radienceffAncienttalesResolveChronicle,
  radienceffAncienttalesChroniclesGroupedByLocale,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData/RadienceffAncienttalesStories';
import type {RadienceffAncienttalesChroniclePhase} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes';
import {
  radienceffAncienttalesBookmarkExists,
  radienceffAncienttalesMarkChronicleConsumed,
  radienceffAncienttalesPersistBookmark,
} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit';
import {RadienceffAncienttalesStoryListCard} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTales';
import {
  RadienceffAncienttalesAppLayout,
  RadienceffAncienttalesFadeInView,
  RadienceffAncienttalesGradientButton,
  RadienceffAncienttalesScreenHeader,
  RadienceffAncienttalesStaggerItem,
  RadienceffAncienttalesTypewriterText,
} from '../RadienceffAncienttalesComponents';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

const RadienceffAncienttalesTalesScreen = () => {
  const [radienceffAncienttalesScreenPhase, setRadienceffAncienttalesScreenPhase] =
    useState<RadienceffAncienttalesChroniclePhase>('catalog');
  const [radienceffAncienttalesActiveEntryKey, setRadienceffAncienttalesActiveEntryKey] = useState<
    string | null
  >(null);
  const [radienceffAncienttalesPassageKey, setRadienceffAncienttalesPassageKey] =
    useState('start');
  const [radienceffAncienttalesPassageTrail, setRadienceffAncienttalesPassageTrail] = useState<
    string[]
  >([]);
  const [radienceffAncienttalesTrailPersisted, setRadienceffAncienttalesTrailPersisted] = useState(false);

  const chronicle = useMemo(
    () =>
      radienceffAncienttalesActiveEntryKey
        ? radienceffAncienttalesResolveChronicle(radienceffAncienttalesActiveEntryKey)
        : undefined,
    [radienceffAncienttalesActiveEntryKey],
  );

  const activePassage =
    chronicle?.passageMap[radienceffAncienttalesPassageKey];

  const passageCloses =
    activePassage?.closesPassage === true;

  useEffect(() => {
    if (passageCloses && radienceffAncienttalesActiveEntryKey) {
      radienceffAncienttalesMarkChronicleConsumed(radienceffAncienttalesActiveEntryKey);
    }
  }, [radienceffAncienttalesActiveEntryKey, passageCloses]);

  const openChronicle = useCallback(
    async (entryKey: string) => {
      const catalogItem =
        radienceffAncienttalesResolveChronicle(entryKey);
      if (!catalogItem) {
        return;
      }
      const alreadyBookmarked = await radienceffAncienttalesBookmarkExists(
        entryKey,
      );
      setRadienceffAncienttalesActiveEntryKey(entryKey);
      setRadienceffAncienttalesPassageKey('start');
      setRadienceffAncienttalesPassageTrail([
        catalogItem.openingPassage,
      ]);
      setRadienceffAncienttalesTrailPersisted(alreadyBookmarked);
      setRadienceffAncienttalesScreenPhase('reading');
    },
    [],
  );

  const returnToCatalog = useCallback(() => {
    setRadienceffAncienttalesScreenPhase('catalog');
    setRadienceffAncienttalesActiveEntryKey(null);
    setRadienceffAncienttalesPassageKey('start');
    setRadienceffAncienttalesPassageTrail([]);
    setRadienceffAncienttalesTrailPersisted(false);
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
        ...radienceffAncienttalesPassageTrail,
        ...(targetPassage.insertedPassage
          ? [targetPassage.insertedPassage]
          : []),
      ];
      setRadienceffAncienttalesPassageTrail(extendedTrail);
      setRadienceffAncienttalesPassageKey(onwardKey);
    },
    [radienceffAncienttalesPassageTrail, chronicle],
  );

  const persistPassageTrail = useCallback(async () => {
    if (
      !radienceffAncienttalesActiveEntryKey ||
      radienceffAncienttalesTrailPersisted ||
      !chronicle
    ) {
      return;
    }
    await radienceffAncienttalesPersistBookmark({
      entryKey: radienceffAncienttalesActiveEntryKey,
      passageTrail: radienceffAncienttalesPassageTrail,
      storedAt: Date.now(),
    });
    setRadienceffAncienttalesTrailPersisted(true);
  }, [
    radienceffAncienttalesActiveEntryKey,
    radienceffAncienttalesPassageTrail,
    radienceffAncienttalesTrailPersisted,
    chronicle,
  ]);

  if (radienceffAncienttalesScreenPhase === 'catalog') {
    return (
      <RadienceffAncienttalesAppLayout tab>
        <RadienceffAncienttalesScreenHeader
          title="Tales"
          subtitle="Choose your mythology adventure"
          compact
        />
        {(() => {
          let cardIndex = 0;
          return radienceffAncienttalesChroniclesGroupedByLocale.map(
            ({localeTag, groupedEntries}, regionIndex) => (
              <RadienceffAncienttalesFadeInView
                key={localeTag}
                delay={regionIndex * 80}
                style={radienceffAncienttalesStyles.radienceffAncienttalesRegionGroup}>
                <Text style={radienceffAncienttalesStyles.radienceffAncienttalesRegionHeading}>
                  {localeTag}
                </Text>
                {groupedEntries.map(catalogItem => {
                  const item = (
                    <RadienceffAncienttalesStaggerItem
                      key={catalogItem.entryKey}
                      index={cardIndex}>
                      <RadienceffAncienttalesStoryListCard
                        story={catalogItem}
                        onOpen={() =>
                          openChronicle(
                            catalogItem.entryKey,
                          )
                        }
                      />
                    </RadienceffAncienttalesStaggerItem>
                  );
                  cardIndex += 1;
                  return item;
                })}
              </RadienceffAncienttalesFadeInView>
            ),
          );
        })()}
      </RadienceffAncienttalesAppLayout>
    );
  }

  if (!chronicle || !activePassage) {
    return null;
  }

  const showOpeningBanner =
    radienceffAncienttalesPassageTrail.length === 1 &&
    radienceffAncienttalesPassageKey === 'start';

  return (
    <RadienceffAncienttalesAppLayout tab contentStyle={radienceffAncienttalesStyles.radienceffAncienttalesReaderScroll}>
      <RadienceffAncienttalesFadeInView triggerKey={radienceffAncienttalesActiveEntryKey ?? 'reading'}>
      <Pressable
        onPress={returnToCatalog}
        style={({pressed}) => [
          radienceffAncienttalesStyles.radienceffAncienttalesNavControl,
          pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
        ]}>
        <Image source={require('../../elements/images/nav_back_arrow.png')} />
      </Pressable>

      {showOpeningBanner && (
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesOpeningBanner}>
          <View style={radienceffAncienttalesStyles.radienceffAncienttalesOpeningMediaFrame}>
            <ImageBackground
              source={chronicle.coverVisual}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={radienceffAncienttalesGradients.storyHero}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={radienceffAncienttalesStyles.radienceffAncienttalesOpeningTagChip}>
              <Text style={radienceffAncienttalesStyles.radienceffAncienttalesListTagLabel}>
                {chronicle.localeTag}
              </Text>
            </View>
            <Text style={radienceffAncienttalesStyles.radienceffAncienttalesOpeningTitle}>
              {chronicle.headline}
            </Text>
          </View>
        </View>
      )}

      {!showOpeningBanner && (
        <View style={radienceffAncienttalesStyles.radienceffAncienttalesReaderMedia}>
          <ImageBackground
            source={chronicle.coverVisual}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={radienceffAncienttalesStyles.radienceffAncienttalesProseStack}>
        {radienceffAncienttalesPassageTrail.map((proseBlock, i) => {
          const isLatest = i === radienceffAncienttalesPassageTrail.length - 1;
          const blockKey = `${radienceffAncienttalesPassageKey}-${i}`;
          const card = (
            <View style={radienceffAncienttalesStyles.radienceffAncienttalesProsePanel}>
              {isLatest ? (
                <RadienceffAncienttalesTypewriterText
                  text={proseBlock}
                  style={radienceffAncienttalesStyles.radienceffAncienttalesProseCopy}
                  triggerKey={blockKey}
                />
              ) : (
                <Text style={radienceffAncienttalesStyles.radienceffAncienttalesProseCopy}>
                  {proseBlock}
                </Text>
              )}
            </View>
          );
          return isLatest ? (
            <RadienceffAncienttalesFadeInView key={blockKey} triggerKey={blockKey}>
              {card}
            </RadienceffAncienttalesFadeInView>
          ) : (
            <View key={`${i}-static`}>{card}</View>
          );
        })}
      </View>

      {passageCloses ? (
        <RadienceffAncienttalesFadeInView style={radienceffAncienttalesStyles.radienceffAncienttalesOutcomeGroup} triggerKey="complete">
          <View style={radienceffAncienttalesStyles.radienceffAncienttalesOutcomeTagPanel}>
            <Text style={radienceffAncienttalesStyles.radienceffAncienttalesOutcomeTagLabel}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={radienceffAncienttalesTrailPersisted}
            onPress={persistPassageTrail}
            style={({pressed}) => [
              radienceffAncienttalesStyles.radienceffAncienttalesPersistPressable,
              radienceffAncienttalesTrailPersisted && radienceffAncienttalesStyles.radienceffAncienttalesPersistInactive,
              pressed &&
                !radienceffAncienttalesTrailPersisted &&
                radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
            ]}>
            <LinearGradient
              colors={radienceffAncienttalesGradients.primary}
              start={radienceffAncienttalesGradientAxis.horizontal.start}
              end={radienceffAncienttalesGradientAxis.horizontal.end}
              style={radienceffAncienttalesStyles.radienceffAncienttalesPersistSurface}>
              <Text style={radienceffAncienttalesStyles.radienceffAncienttalesBranchLabel}>
                {radienceffAncienttalesTrailPersisted
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </RadienceffAncienttalesFadeInView>
      ) : (
        <RadienceffAncienttalesFadeInView
          style={radienceffAncienttalesStyles.radienceffAncienttalesBranchOptions}
          triggerKey={radienceffAncienttalesPassageKey}>
          {activePassage.promptStem && (
            <RadienceffAncienttalesTypewriterText
              text={activePassage.promptStem}
              style={radienceffAncienttalesStyles.radienceffAncienttalesBranchPrompt}
              triggerKey={`q-${radienceffAncienttalesPassageKey}`}
            />
          )}
          {activePassage.branchOptions?.map(
            (branchPick, choiceIndex) => (
              <RadienceffAncienttalesStaggerItem
                key={branchPick.onwardKey}
                index={choiceIndex}>
                <RadienceffAncienttalesGradientButton
                  label={branchPick.optionCaption}
                  tall={
                    branchPick.optionCaption.length > 42
                  }
                  onPress={() =>
                    selectBranch(branchPick.onwardKey)
                  }
                />
              </RadienceffAncienttalesStaggerItem>
            ),
          )}
        </RadienceffAncienttalesFadeInView>
      )}
      </RadienceffAncienttalesFadeInView>
    </RadienceffAncienttalesAppLayout>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesCatalogHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  radienceffAncienttalesCatalogSubheading: {
    color: radienceffAncienttalesColors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  radienceffAncienttalesRegionGroup: {
    marginBottom: 24.3,
    gap: 16.4,
  },
  radienceffAncienttalesRegionHeading: {
    color: radienceffAncienttalesColors.accent,
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
  },
  radienceffAncienttalesListPanel: {
    borderRadius: 16.2,
    overflow: 'hidden',
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardStrong,
    marginBottom: 16.4,
  },
  radienceffAncienttalesListMediaFrame: {
    height: 192.5,
    position: 'relative',
  },
  radienceffAncienttalesListTagChip: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: radienceffAncienttalesColors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  radienceffAncienttalesListTagLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 14.1,
  },
  radienceffAncienttalesListPanelBody: {
    padding: 24.2,
    gap: 12.3,
  },
  radienceffAncienttalesListPanelTitle: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  radienceffAncienttalesListPanelCopy: {
    color: radienceffAncienttalesColors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 26.2,
    marginBottom: 4.3,
  },
  radienceffAncienttalesReaderScroll: {
    paddingTop: 8.4,
  },
  radienceffAncienttalesNavControl: {
    width: 40.5,
    height: 40.1,
    borderRadius: 20.2,
    backgroundColor: radienceffAncienttalesColors.brownMuted,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16.4,
    marginTop: 50.5,
  },
  radienceffAncienttalesNavGlyph: {
    color: radienceffAncienttalesColors.text,
    fontSize: 20.1,
    fontWeight: '600',
  },
  radienceffAncienttalesOpeningBanner: {
    marginBottom: 24.2,
  },
  radienceffAncienttalesOpeningMediaFrame: {
    height: 256.3,
    borderRadius: 16.4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24.5,
  },
  radienceffAncienttalesOpeningTagChip: {
    alignSelf: 'flex-start',
    backgroundColor: radienceffAncienttalesColors.badge,
    paddingHorizontal: 12.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
    marginBottom: 12.4,
  },
  radienceffAncienttalesOpeningTitle: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 30.5,
    fontWeight: '500',
    lineHeight: 36.1,
  },
  radienceffAncienttalesReaderMedia: {
    height: 256.2,
    borderRadius: 16.3,
    overflow: 'hidden',
    marginBottom: 24.4,
  },
  radienceffAncienttalesProseStack: {
    gap: 24.5,
    marginBottom: 24.1,
  },
  radienceffAncienttalesProsePanel: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.borderStrong,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    paddingHorizontal: 24.4,
    paddingVertical: 24.5,
  },
  radienceffAncienttalesProseCopy: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.1,
    lineHeight: 26.2,
  },
  radienceffAncienttalesBranchPrompt: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    textAlign: 'center',
    marginBottom: 16.5,
  },
  radienceffAncienttalesBranchOptions: {
    gap: 12.1,
    marginBottom: 16.2,
  },
  radienceffAncienttalesBranchPressable: {
    borderRadius: 20.3,
    overflow: 'hidden',
    width: '100%',
  },
  radienceffAncienttalesBranchSurface: {
    minHeight: 47.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesBranchSurfaceTall: {
    minHeight: 80.1,
  },
  radienceffAncienttalesBranchLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesOutcomeGroup: {
    gap: 16.3,
    marginBottom: 16.4,
  },
  radienceffAncienttalesOutcomeTagPanel: {
    borderRadius: 20.5,
    borderWidth: 1.1,
    borderColor: radienceffAncienttalesColors.journeyBorder,
    backgroundColor: radienceffAncienttalesColors.journey,
    paddingVertical: 24.2,
    alignItems: 'center',
  },
  radienceffAncienttalesOutcomeTagLabel: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
  radienceffAncienttalesPersistPressable: {
    borderRadius: 20.5,
    overflow: 'hidden',
  },
  radienceffAncienttalesPersistInactive: {
    opacity: 0.5,
  },
  radienceffAncienttalesPersistSurface: {
    height: 56.1,
    borderRadius: 20.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesPressedState: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesTalesScreen;
