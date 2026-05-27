import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {
  anncintTlllsmythhhsResolveChronicle,
  anncintTlllsmythhhsChroniclesGroupedByLocale,
} from './AnncintTlllsmythhhsCore';
import type {AnncintTlllsmythhhsChroniclePhase} from './AnncintTlllsmythhhsCore';
import {
  anncintTlllsmythhhsBookmarkExists,
  anncintTlllsmythhhsMarkChronicleConsumed,
  anncintTlllsmythhhsPersistBookmark,
} from './AnncintTlllsmythhhsCore';
import {AnncintTlllsmythhhsStoryListCard} from './AnncintTlllsmythhhsUi';
import {
  AnncintTlllsmythhhsAppLayout,
  AnncintTlllsmythhhsFadeInView,
  AnncintTlllsmythhhsGradientButton,
  AnncintTlllsmythhhsScreenHeader,
  AnncintTlllsmythhhsStaggerItem,
  AnncintTlllsmythhhsTypewriterText,
} from './AnncintTlllsmythhhsUi';
import {anncintTlllsmythhhsGradients, anncintTlllsmythhhsGradientAxis} from './AnncintTlllsmythhhsCore';
import {
  AnncintTlllsmythhhsRoutes,
  type AnncintTlllsmythhhsMainTabParamList,
} from './routes/AnncintTlllsmythhhsRoutes';

type AnncintTlllsmythhhsTalesRoute = RouteProp<
  AnncintTlllsmythhhsMainTabParamList,
  typeof AnncintTlllsmythhhsRoutes.Tales
>;

const AnncintTlllsmythhhsTalesScreen = () => {
  const route = useRoute<AnncintTlllsmythhhsTalesRoute>();
  const navigation =
    useNavigation<BottomTabNavigationProp<AnncintTlllsmythhhsMainTabParamList>>();
  const [anncintTlllsmythhhsScreenPhase, setAnncintTlllsmythhhsScreenPhase] =
    useState<AnncintTlllsmythhhsChroniclePhase>('catalog');
  const [anncintTlllsmythhhsActiveEntryKey, setAnncintTlllsmythhhsActiveEntryKey] = useState<
    string | null
  >(null);
  const [anncintTlllsmythhhsPassageKey, setAnncintTlllsmythhhsPassageKey] =
    useState('start');
  const [anncintTlllsmythhhsPassageTrail, setAnncintTlllsmythhhsPassageTrail] = useState<
    string[]
  >([]);
  const [anncintTlllsmythhhsTrailPersisted, setAnncintTlllsmythhhsTrailPersisted] = useState(false);

  const chronicle = useMemo(
    () =>
      anncintTlllsmythhhsActiveEntryKey
        ? anncintTlllsmythhhsResolveChronicle(anncintTlllsmythhhsActiveEntryKey)
        : undefined,
    [anncintTlllsmythhhsActiveEntryKey],
  );

  const activePassage =
    chronicle?.passageMap[anncintTlllsmythhhsPassageKey];

  const passageCloses =
    activePassage?.closesPassage === true;

  useEffect(() => {
    if (passageCloses && anncintTlllsmythhhsActiveEntryKey) {
      anncintTlllsmythhhsMarkChronicleConsumed(anncintTlllsmythhhsActiveEntryKey);
    }
  }, [anncintTlllsmythhhsActiveEntryKey, passageCloses]);

  const openChronicle = useCallback(
    async (entryKey: string) => {
      const catalogItem =
        anncintTlllsmythhhsResolveChronicle(entryKey);
      if (!catalogItem) {
        return;
      }
      const alreadyBookmarked = await anncintTlllsmythhhsBookmarkExists(
        entryKey,
      );
      setAnncintTlllsmythhhsActiveEntryKey(entryKey);
      setAnncintTlllsmythhhsPassageKey('start');
      setAnncintTlllsmythhhsPassageTrail([
        catalogItem.openingPassage,
      ]);
      setAnncintTlllsmythhhsTrailPersisted(alreadyBookmarked);
      setAnncintTlllsmythhhsScreenPhase('reading');
    },
    [],
  );

  useEffect(() => {
    const entryKey = route.params?.entryKey;
    if (!entryKey) {
      return;
    }
    void openChronicle(entryKey);
    navigation.setParams({entryKey: undefined});
  }, [navigation, openChronicle, route.params?.entryKey]);

  const returnToCatalog = useCallback(() => {
    setAnncintTlllsmythhhsScreenPhase('catalog');
    setAnncintTlllsmythhhsActiveEntryKey(null);
    setAnncintTlllsmythhhsPassageKey('start');
    setAnncintTlllsmythhhsPassageTrail([]);
    setAnncintTlllsmythhhsTrailPersisted(false);
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
        ...anncintTlllsmythhhsPassageTrail,
        ...(targetPassage.insertedPassage
          ? [targetPassage.insertedPassage]
          : []),
      ];
      setAnncintTlllsmythhhsPassageTrail(extendedTrail);
      setAnncintTlllsmythhhsPassageKey(onwardKey);
    },
    [anncintTlllsmythhhsPassageTrail, chronicle],
  );

  const persistPassageTrail = useCallback(async () => {
    if (
      !anncintTlllsmythhhsActiveEntryKey ||
      anncintTlllsmythhhsTrailPersisted ||
      !chronicle
    ) {
      return;
    }
    await anncintTlllsmythhhsPersistBookmark({
      entryKey: anncintTlllsmythhhsActiveEntryKey,
      passageTrail: anncintTlllsmythhhsPassageTrail,
      storedAt: Date.now(),
    });
    setAnncintTlllsmythhhsTrailPersisted(true);
  }, [
    anncintTlllsmythhhsActiveEntryKey,
    anncintTlllsmythhhsPassageTrail,
    anncintTlllsmythhhsTrailPersisted,
    chronicle,
  ]);

  if (anncintTlllsmythhhsScreenPhase === 'catalog') {
    return (
      <AnncintTlllsmythhhsAppLayout tab>
        <AnncintTlllsmythhhsScreenHeader
          title="Tales"
          subtitle="Choose your mythology adventure"
          compact
        />
        {(() => {
          let cardIndex = 0;
          return anncintTlllsmythhhsChroniclesGroupedByLocale.map(
            ({localeTag, groupedEntries}, regionIndex) => (
              <AnncintTlllsmythhhsFadeInView
                key={localeTag}
                delay={regionIndex * 80}
                style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsRegionGroup}>
                <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsRegionHeading}>
                  {localeTag}
                </Text>
                {groupedEntries.map(catalogItem => {
                  const item = (
                    <AnncintTlllsmythhhsStaggerItem
                      key={catalogItem.entryKey}
                      index={cardIndex}>
                      <AnncintTlllsmythhhsStoryListCard
                        story={catalogItem}
                        onOpen={() =>
                          openChronicle(
                            catalogItem.entryKey,
                          )
                        }
                      />
                    </AnncintTlllsmythhhsStaggerItem>
                  );
                  cardIndex += 1;
                  return item;
                })}
              </AnncintTlllsmythhhsFadeInView>
            ),
          );
        })()}
      </AnncintTlllsmythhhsAppLayout>
    );
  }

  if (!chronicle || !activePassage) {
    return null;
  }

  const showOpeningBanner =
    anncintTlllsmythhhsPassageTrail.length === 1 &&
    anncintTlllsmythhhsPassageKey === 'start';

  return (
    <AnncintTlllsmythhhsAppLayout tab contentStyle={anncintTlllsmythhhsStyles.anncintTlllsmythhhsReaderScroll}>
      <AnncintTlllsmythhhsFadeInView triggerKey={anncintTlllsmythhhsActiveEntryKey ?? 'reading'}>
      <Pressable
        onPress={returnToCatalog}
        style={({pressed}) => [
          anncintTlllsmythhhsStyles.anncintTlllsmythhhsNavControl,
          pressed && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
        ]}>
        <Image source={require('../elements/images/anncintTlllsmythhhs_nav_back_arrow.png')} />
      </Pressable>

      {showOpeningBanner && (
        <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOpeningBanner}>
          <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOpeningMediaFrame}>
            <ImageBackground
              source={chronicle.coverVisual}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={anncintTlllsmythhhsGradients.storyHero}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOpeningTagChip}>
              <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsListTagLabel}>
                {chronicle.localeTag}
              </Text>
            </View>
            <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOpeningTitle}>
              {chronicle.headline}
            </Text>
          </View>
        </View>
      )}

      {!showOpeningBanner && (
        <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsReaderMedia}>
          <ImageBackground
            source={chronicle.coverVisual}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseStack}>
        {anncintTlllsmythhhsPassageTrail.map((proseBlock, i) => {
          const isLatest = i === anncintTlllsmythhhsPassageTrail.length - 1;
          const blockKey = `${anncintTlllsmythhhsPassageKey}-${i}`;
          const card = (
            <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsProsePanel}>
              {isLatest ? (
                <AnncintTlllsmythhhsTypewriterText
                  text={proseBlock}
                  style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseCopy}
                  triggerKey={blockKey}
                />
              ) : (
                <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsProseCopy}>
                  {proseBlock}
                </Text>
              )}
            </View>
          );
          return isLatest ? (
            <AnncintTlllsmythhhsFadeInView key={blockKey} triggerKey={blockKey}>
              {card}
            </AnncintTlllsmythhhsFadeInView>
          ) : (
            <View key={`${i}-static`}>{card}</View>
          );
        })}
      </View>

      {passageCloses ? (
        <AnncintTlllsmythhhsFadeInView style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeGroup} triggerKey="complete">
          <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeTagPanel}>
            <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOutcomeTagLabel}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={anncintTlllsmythhhsTrailPersisted}
            onPress={persistPassageTrail}
            style={({pressed}) => [
              anncintTlllsmythhhsStyles.anncintTlllsmythhhsPersistPressable,
              anncintTlllsmythhhsTrailPersisted && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPersistInactive,
              pressed &&
                !anncintTlllsmythhhsTrailPersisted &&
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
            ]}>
            <LinearGradient
              colors={anncintTlllsmythhhsGradients.primary}
              start={anncintTlllsmythhhsGradientAxis.horizontal.start}
              end={anncintTlllsmythhhsGradientAxis.horizontal.end}
              style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsPersistSurface}>
              <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsBranchLabel}>
                {anncintTlllsmythhhsTrailPersisted
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </AnncintTlllsmythhhsFadeInView>
      ) : (
        <AnncintTlllsmythhhsFadeInView
          style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsBranchOptions}
          triggerKey={anncintTlllsmythhhsPassageKey}>
          {activePassage.promptStem && (
            <AnncintTlllsmythhhsTypewriterText
              text={activePassage.promptStem}
              style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsBranchPrompt}
              triggerKey={`q-${anncintTlllsmythhhsPassageKey}`}
            />
          )}
          {activePassage.branchOptions?.map(
            (branchPick, choiceIndex) => (
              <AnncintTlllsmythhhsStaggerItem
                key={branchPick.onwardKey}
                index={choiceIndex}>
                <AnncintTlllsmythhhsGradientButton
                  label={branchPick.optionCaption}
                  tall={
                    branchPick.optionCaption.length > 42
                  }
                  onPress={() =>
                    selectBranch(branchPick.onwardKey)
                  }
                />
              </AnncintTlllsmythhhsStaggerItem>
            ),
          )}
        </AnncintTlllsmythhhsFadeInView>
      )}
      </AnncintTlllsmythhhsFadeInView>
    </AnncintTlllsmythhhsAppLayout>
  );
};

const anncintTlllsmythhhsStyles = StyleSheet.create({
  anncintTlllsmythhhsCatalogHeading: {
    color: '#DAA520',
    fontSize: 46,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  anncintTlllsmythhhsCatalogSubheading: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  anncintTlllsmythhhsRegionGroup: {
    marginBottom: 24,
    gap: 16,
  },
  anncintTlllsmythhhsRegionHeading: {
    color: '#D4763E',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  anncintTlllsmythhhsListPanel: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 16,
  },
  anncintTlllsmythhhsListMediaFrame: {
    height: 192,
    position: 'relative',
  },
  anncintTlllsmythhhsListTagChip: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  anncintTlllsmythhhsListTagLabel: {
    color: '#0F0804',
    fontSize: 14,
  },
  anncintTlllsmythhhsListPanelBody: {
    padding: 24,
    gap: 12,
  },
  anncintTlllsmythhhsListPanelTitle: {
    color: '#DAA520',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  anncintTlllsmythhhsListPanelCopy: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 4,
  },
  anncintTlllsmythhhsReaderScroll: {
    paddingTop: 8,
  },
  anncintTlllsmythhhsNavControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A3A2480',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  anncintTlllsmythhhsNavGlyph: {
    color: '#D4A574',
    fontSize: 20,
    fontWeight: '600',
  },
  anncintTlllsmythhhsOpeningBanner: {
    marginBottom: 24,
  },
  anncintTlllsmythhhsOpeningMediaFrame: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24,
  },
  anncintTlllsmythhhsOpeningTagChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  anncintTlllsmythhhsOpeningTitle: {
    color: '#DAA520',
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
  },
  anncintTlllsmythhhsReaderMedia: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
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
  anncintTlllsmythhhsBranchPrompt: {
    color: '#DAA520',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  anncintTlllsmythhhsBranchOptions: {
    gap: 12,
    marginBottom: 16,
  },
  anncintTlllsmythhhsBranchPressable: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  anncintTlllsmythhhsBranchSurface: {
    minHeight: 47,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsBranchSurfaceTall: {
    minHeight: 80,
  },
  anncintTlllsmythhhsBranchLabel: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsOutcomeGroup: {
    gap: 16,
    marginBottom: 16,
  },
  anncintTlllsmythhhsOutcomeTagPanel: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24,
    alignItems: 'center',
  },
  anncintTlllsmythhhsOutcomeTagLabel: {
    color: '#DAA520',
    fontSize: 18,
    lineHeight: 28,
  },
  anncintTlllsmythhhsPersistPressable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  anncintTlllsmythhhsPersistInactive: {
    opacity: 0.5,
  },
  anncintTlllsmythhhsPersistSurface: {
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPressedState: {
    opacity: 0.85,
  },
});

export default AnncintTlllsmythhhsTalesScreen;
