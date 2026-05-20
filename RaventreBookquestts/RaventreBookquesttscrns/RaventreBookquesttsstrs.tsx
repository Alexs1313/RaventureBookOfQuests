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
import RaventreBookqueslayout from '../RaventreBookquesttscpnt/RaventreBookqueslayout';
import {
  raventreBookquesttsGetStoryById,
  raventreBookquesttsStoriesByRegion,
  type RaventreBookquesttsStory,
} from '../RaventreBookquesttsdata/raventreBookquesttsStoriesData';
import {
  raventreBookquesttsIsStorySaved,
  raventreBookquesttsSaveTale,
} from '../RaventreBookquesttsdata/raventreBookquesttsSavedStorage';
import {raventreBookquesttsMarkTaleRead} from '../RaventreBookquesttsdata/raventreBookquesttsTalesProgressStorage';

type RaventreBookquesttsView = 'list' | 'reader';

const RaventreBookquesttsGradientBtn = ({
  raventreBookquesttsLabel,
  raventreBookquesttsOnPress,
  raventreBookquesttsTall,
}: {
  raventreBookquesttsLabel: string;
  raventreBookquesttsOnPress: () => void;
  raventreBookquesttsTall?: boolean;
}) => (
  <Pressable
    onPress={raventreBookquesttsOnPress}
    style={({pressed}) => [
      styles.raventreBookquesttsChoicePress,
      pressed && styles.raventreBookquesttsPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[
        styles.raventreBookquesttsChoiceBtn,
        raventreBookquesttsTall && styles.raventreBookquesttsChoiceBtnTall,
      ]}>
      <Text style={styles.raventreBookquesttsChoiceText}>
        {raventreBookquesttsLabel}
      </Text>
    </LinearGradient>
  </Pressable>
);

const RaventreBookquesttsStoryCard = ({
  raventreBookquesttsStory,
  raventreBookquesttsOnOpen,
}: {
  raventreBookquesttsStory: RaventreBookquesttsStory;
  raventreBookquesttsOnOpen: () => void;
}) => (
  <View style={styles.raventreBookquesttsListCard}>
    <View style={styles.raventreBookquesttsListCardImageWrap}>
      <ImageBackground
        source={raventreBookquesttsStory.raventreBookquesttsImage}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(23,11,6,0.71)', 'rgba(42,24,16,1)']}
        locations={[0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.raventreBookquesttsListBadge}>
        <Text style={styles.raventreBookquesttsListBadgeText}>
          {raventreBookquesttsStory.raventreBookquesttsRegion}
        </Text>
      </View>
    </View>
    <View style={styles.raventreBookquesttsListCardBody}>
      <Text style={styles.raventreBookquesttsListCardTitle}>
        {raventreBookquesttsStory.raventreBookquesttsTitle}
      </Text>
      <Text style={styles.raventreBookquesttsListCardDesc}>
        {raventreBookquesttsStory.raventreBookquesttsDescription}
      </Text>
      <RaventreBookquesttsGradientBtn
        raventreBookquesttsLabel="Open"
        raventreBookquesttsOnPress={raventreBookquesttsOnOpen}
      />
    </View>
  </View>
);

const RaventreBookquesttsstrs = () => {
  const [raventreBookquesttsView, setRaventreBookquesttsView] =
    useState<RaventreBookquesttsView>('list');
  const [raventreBookquesttsActiveId, setRaventreBookquesttsActiveId] =
    useState<string | null>(null);
  const [raventreBookquesttsNodeId, setRaventreBookquesttsNodeId] =
    useState('start');
  const [raventreBookquesttsHistory, setRaventreBookquesttsHistory] = useState<
    string[]
  >([]);
  const [raventreBookquesttsSaved, setRaventreBookquesttsSaved] =
    useState(false);

  const raventreBookquesttsStory = useMemo(
    () =>
      raventreBookquesttsActiveId
        ? raventreBookquesttsGetStoryById(raventreBookquesttsActiveId)
        : undefined,
    [raventreBookquesttsActiveId],
  );

  const raventreBookquesttsNode =
    raventreBookquesttsStory?.raventreBookquesttsNodes[
      raventreBookquesttsNodeId
    ];

  const raventreBookquesttsIsComplete =
    raventreBookquesttsNode?.raventreBookquesttsEnding === true;

  useEffect(() => {
    if (raventreBookquesttsIsComplete && raventreBookquesttsActiveId) {
      raventreBookquesttsMarkTaleRead(raventreBookquesttsActiveId);
    }
  }, [raventreBookquesttsActiveId, raventreBookquesttsIsComplete]);

  const raventreBookquesttsOpenStory = useCallback(
    async (raventreBookquesttsId: string) => {
      const raventreBookquesttsItem = raventreBookquesttsGetStoryById(
        raventreBookquesttsId,
      );
      if (!raventreBookquesttsItem) {
        return;
      }
      const raventreBookquesttsWasSaved = await raventreBookquesttsIsStorySaved(
        raventreBookquesttsId,
      );
      setRaventreBookquesttsActiveId(raventreBookquesttsId);
      setRaventreBookquesttsNodeId('start');
      setRaventreBookquesttsHistory([
        raventreBookquesttsItem.raventreBookquesttsIntro,
      ]);
      setRaventreBookquesttsSaved(raventreBookquesttsWasSaved);
      setRaventreBookquesttsView('reader');
    },
    [],
  );

  const raventreBookquesttsBackToList = useCallback(() => {
    setRaventreBookquesttsView('list');
    setRaventreBookquesttsActiveId(null);
    setRaventreBookquesttsNodeId('start');
    setRaventreBookquesttsHistory([]);
    setRaventreBookquesttsSaved(false);
  }, []);

  const raventreBookquesttsPickChoice = useCallback(
    (raventreBookquesttsNext: string) => {
      if (!raventreBookquesttsStory) {
        return;
      }
      const raventreBookquesttsNextNode =
        raventreBookquesttsStory.raventreBookquesttsNodes[
          raventreBookquesttsNext
        ];
      if (!raventreBookquesttsNextNode) {
        return;
      }
      const raventreBookquesttsNewHistory = [
        ...raventreBookquesttsHistory,
        ...(raventreBookquesttsNextNode.raventreBookquesttsAddText
          ? [raventreBookquesttsNextNode.raventreBookquesttsAddText]
          : []),
      ];
      setRaventreBookquesttsHistory(raventreBookquesttsNewHistory);
      setRaventreBookquesttsNodeId(raventreBookquesttsNext);
    },
    [raventreBookquesttsHistory, raventreBookquesttsStory],
  );

  const raventreBookquesttsSaveStory = useCallback(async () => {
    if (
      !raventreBookquesttsActiveId ||
      raventreBookquesttsSaved ||
      !raventreBookquesttsStory
    ) {
      return;
    }
    await raventreBookquesttsSaveTale({
      raventreBookquesttsId: raventreBookquesttsActiveId,
      raventreBookquesttsHistory: raventreBookquesttsHistory,
      raventreBookquesttsSavedAt: Date.now(),
    });
    setRaventreBookquesttsSaved(true);
  }, [
    raventreBookquesttsActiveId,
    raventreBookquesttsHistory,
    raventreBookquesttsSaved,
    raventreBookquesttsStory,
  ]);

  if (raventreBookquesttsView === 'list') {
    return (
      <RaventreBookqueslayout raventreBookquesttsTab>
        <Text style={styles.raventreBookquesttsListTitle}>Tales</Text>
        <Text style={styles.raventreBookquesttsListSubtitle}>
          Choose your mythology adventure
        </Text>
        {raventreBookquesttsStoriesByRegion.map(
          ({raventreBookquesttsRegion, raventreBookquesttsItems}) => (
            <View
              key={raventreBookquesttsRegion}
              style={styles.raventreBookquesttsRegionBlock}>
              <Text style={styles.raventreBookquesttsRegionTitle}>
                {raventreBookquesttsRegion}
              </Text>
              {raventreBookquesttsItems.map(raventreBookquesttsItem => (
                <RaventreBookquesttsStoryCard
                  key={raventreBookquesttsItem.raventreBookquesttsId}
                  raventreBookquesttsStory={raventreBookquesttsItem}
                  raventreBookquesttsOnOpen={() =>
                    raventreBookquesttsOpenStory(
                      raventreBookquesttsItem.raventreBookquesttsId,
                    )
                  }
                />
              ))}
            </View>
          ),
        )}
      </RaventreBookqueslayout>
    );
  }

  if (!raventreBookquesttsStory || !raventreBookquesttsNode) {
    return null;
  }

  const raventreBookquesttsShowHero =
    raventreBookquesttsHistory.length === 1 &&
    raventreBookquesttsNodeId === 'start';

  return (
    <RaventreBookqueslayout
      raventreBookquesttsTab
      contentStyle={styles.raventreBookquesttsReaderScroll}>
      <Pressable
        onPress={raventreBookquesttsBackToList}
        style={({pressed}) => [
          styles.raventreBookquesttsBackBtn,
          pressed && styles.raventreBookquesttsPressed,
        ]}>
        <Image source={require('../../assets/img/raventrebolback.png')} />
      </Pressable>

      {raventreBookquesttsShowHero && (
        <View style={styles.raventreBookquesttsHero}>
          <View style={styles.raventreBookquesttsHeroImageWrap}>
            <ImageBackground
              source={raventreBookquesttsStory.raventreBookquesttsImage}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                'rgba(0,0,0,0)',
                'rgba(32,17,11,0.86)',
                'rgba(42,24,16,1)',
              ]}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.raventreBookquesttsHeroBadge}>
              <Text style={styles.raventreBookquesttsListBadgeText}>
                {raventreBookquesttsStory.raventreBookquesttsRegion}
              </Text>
            </View>
            <Text style={styles.raventreBookquesttsHeroTitle}>
              {raventreBookquesttsStory.raventreBookquesttsTitle}
            </Text>
          </View>
        </View>
      )}

      {!raventreBookquesttsShowHero && (
        <View style={styles.raventreBookquesttsReaderThumb}>
          <ImageBackground
            source={raventreBookquesttsStory.raventreBookquesttsImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.raventreBookquesttsTextBlocks}>
        {raventreBookquesttsHistory.map((raventreBookquesttsBlock, i) => (
          <View
            key={`${i}-${raventreBookquesttsBlock.slice(0, 12)}`}
            style={styles.raventreBookquesttsTextCard}>
            <Text style={styles.raventreBookquesttsTextCardBody}>
              {raventreBookquesttsBlock}
            </Text>
          </View>
        ))}
      </View>

      {raventreBookquesttsIsComplete ? (
        <View style={styles.raventreBookquesttsCompleteBlock}>
          <View style={styles.raventreBookquesttsJourneyBadge}>
            <Text style={styles.raventreBookquesttsJourneyText}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={raventreBookquesttsSaved}
            onPress={raventreBookquesttsSaveStory}
            style={({pressed}) => [
              styles.raventreBookquesttsSavePress,
              raventreBookquesttsSaved &&
                styles.raventreBookquesttsSaveDisabled,
              pressed &&
                !raventreBookquesttsSaved &&
                styles.raventreBookquesttsPressed,
            ]}>
            <LinearGradient
              colors={['#D4763E', '#FF9F40']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.raventreBookquesttsSaveBtn}>
              <Text style={styles.raventreBookquesttsChoiceText}>
                {raventreBookquesttsSaved
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        <View style={styles.raventreBookquesttsChoicesBlock}>
          {raventreBookquesttsNode.raventreBookquesttsQuestion && (
            <Text style={styles.raventreBookquesttsQuestion}>
              {raventreBookquesttsNode.raventreBookquesttsQuestion}
            </Text>
          )}
          {raventreBookquesttsNode.raventreBookquesttsChoices?.map(
            raventreBookquesttsChoice => (
              <RaventreBookquesttsGradientBtn
                key={raventreBookquesttsChoice.raventreBookquesttsNext}
                raventreBookquesttsLabel={
                  raventreBookquesttsChoice.raventreBookquesttsLabel
                }
                raventreBookquesttsTall={
                  raventreBookquesttsChoice.raventreBookquesttsLabel.length > 42
                }
                raventreBookquesttsOnPress={() =>
                  raventreBookquesttsPickChoice(
                    raventreBookquesttsChoice.raventreBookquesttsNext,
                  )
                }
              />
            ),
          )}
        </View>
      )}
    </RaventreBookqueslayout>
  );
};

const styles = StyleSheet.create({
  raventreBookquesttsListTitle: {
    color: '#DAA520',
    fontSize: 46,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  raventreBookquesttsListSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  raventreBookquesttsRegionBlock: {
    marginBottom: 24,
    gap: 16,
  },
  raventreBookquesttsRegionTitle: {
    color: '#D4763E',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  raventreBookquesttsListCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.4)',
    marginBottom: 16,
  },
  raventreBookquesttsListCardImageWrap: {
    height: 192,
    position: 'relative',
  },
  raventreBookquesttsListBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  raventreBookquesttsListBadgeText: {
    color: '#0F0804',
    fontSize: 14,
  },
  raventreBookquesttsListCardBody: {
    padding: 24,
    gap: 12,
  },
  raventreBookquesttsListCardTitle: {
    color: '#DAA520',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  raventreBookquesttsListCardDesc: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 4,
  },
  raventreBookquesttsReaderScroll: {
    paddingTop: 8,
  },
  raventreBookquesttsBackBtn: {
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
  raventreBookquesttsBackIcon: {
    color: '#D4A574',
    fontSize: 20,
    fontWeight: '600',
  },
  raventreBookquesttsHero: {
    marginBottom: 24,
  },
  raventreBookquesttsHeroImageWrap: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24,
  },
  raventreBookquesttsHeroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 118, 62, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  raventreBookquesttsHeroTitle: {
    color: '#DAA520',
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
  },
  raventreBookquesttsReaderThumb: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  raventreBookquesttsTextBlocks: {
    gap: 24,
    marginBottom: 24,
  },
  raventreBookquesttsTextCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.1)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  raventreBookquesttsTextCardBody: {
    color: '#D4A574',
    fontSize: 16,
    lineHeight: 26,
  },
  raventreBookquesttsQuestion: {
    color: '#DAA520',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  raventreBookquesttsChoicesBlock: {
    gap: 12,
    marginBottom: 16,
  },
  raventreBookquesttsChoicePress: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  raventreBookquesttsChoiceBtn: {
    minHeight: 47,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsChoiceBtnTall: {
    minHeight: 80,
  },
  raventreBookquesttsChoiceText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  raventreBookquesttsCompleteBlock: {
    gap: 16,
    marginBottom: 16,
  },
  raventreBookquesttsJourneyBadge: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
    backgroundColor: 'rgba(218, 165, 32, 0.15)',
    paddingVertical: 24,
    alignItems: 'center',
  },
  raventreBookquesttsJourneyText: {
    color: '#DAA520',
    fontSize: 18,
    lineHeight: 28,
  },
  raventreBookquesttsSavePress: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  raventreBookquesttsSaveDisabled: {
    opacity: 0.5,
  },
  raventreBookquesttsSaveBtn: {
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsPressed: {
    opacity: 0.85,
  },
});

export default RaventreBookquesttsstrs;
