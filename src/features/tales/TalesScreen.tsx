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
  legendsaventurebkkGetStoryById,
  legendsaventurebkkStoriesByRegion,
} from '../../content/stories';
import type {LegendsaventurebkkStoriesView} from '../../shared/types';
import {
  legendsaventurebkkIsStorySaved,
  legendsaventurebkkMarkTaleRead,
  legendsaventurebkkSaveTale,
} from '../../shared/lib';
import {StoryListCard} from './components';
import {AppLayout, GradientButton, ScreenHeader} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

const TalesScreen = () => {
  const [legendsaventurebkkView, setLegendsaventurebkkView] =
    useState<LegendsaventurebkkStoriesView>('list');
  const [legendsaventurebkkActiveId, setLegendsaventurebkkActiveId] = useState<
    string | null
  >(null);
  const [legendsaventurebkkNodeId, setLegendsaventurebkkNodeId] =
    useState('start');
  const [legendsaventurebkkHistory, setLegendsaventurebkkHistory] = useState<
    string[]
  >([]);
  const [legendsaventurebkkSaved, setLegendsaventurebkkSaved] = useState(false);

  const legendsaventurebkkStory = useMemo(
    () =>
      legendsaventurebkkActiveId
        ? legendsaventurebkkGetStoryById(legendsaventurebkkActiveId)
        : undefined,
    [legendsaventurebkkActiveId],
  );

  const legendsaventurebkkNode =
    legendsaventurebkkStory?.legendsaventurebkkNodes[legendsaventurebkkNodeId];

  const legendsaventurebkkIsComplete =
    legendsaventurebkkNode?.legendsaventurebkkEnding === true;

  useEffect(() => {
    if (legendsaventurebkkIsComplete && legendsaventurebkkActiveId) {
      legendsaventurebkkMarkTaleRead(legendsaventurebkkActiveId);
    }
  }, [legendsaventurebkkActiveId, legendsaventurebkkIsComplete]);

  const legendsaventurebkkOpenStory = useCallback(
    async (legendsaventurebkkId: string) => {
      const legendsaventurebkkItem =
        legendsaventurebkkGetStoryById(legendsaventurebkkId);
      if (!legendsaventurebkkItem) {
        return;
      }
      const legendsaventurebkkWasSaved = await legendsaventurebkkIsStorySaved(
        legendsaventurebkkId,
      );
      setLegendsaventurebkkActiveId(legendsaventurebkkId);
      setLegendsaventurebkkNodeId('start');
      setLegendsaventurebkkHistory([
        legendsaventurebkkItem.legendsaventurebkkIntro,
      ]);
      setLegendsaventurebkkSaved(legendsaventurebkkWasSaved);
      setLegendsaventurebkkView('reader');
    },
    [],
  );

  const legendsaventurebkkBackToList = useCallback(() => {
    setLegendsaventurebkkView('list');
    setLegendsaventurebkkActiveId(null);
    setLegendsaventurebkkNodeId('start');
    setLegendsaventurebkkHistory([]);
    setLegendsaventurebkkSaved(false);
  }, []);

  const legendsaventurebkkPickChoice = useCallback(
    (legendsaventurebkkNext: string) => {
      if (!legendsaventurebkkStory) {
        return;
      }
      const legendsaventurebkkNextNode =
        legendsaventurebkkStory.legendsaventurebkkNodes[legendsaventurebkkNext];
      if (!legendsaventurebkkNextNode) {
        return;
      }
      const legendsaventurebkkNewHistory = [
        ...legendsaventurebkkHistory,
        ...(legendsaventurebkkNextNode.legendsaventurebkkAddText
          ? [legendsaventurebkkNextNode.legendsaventurebkkAddText]
          : []),
      ];
      setLegendsaventurebkkHistory(legendsaventurebkkNewHistory);
      setLegendsaventurebkkNodeId(legendsaventurebkkNext);
    },
    [legendsaventurebkkHistory, legendsaventurebkkStory],
  );

  const legendsaventurebkkSaveStory = useCallback(async () => {
    if (
      !legendsaventurebkkActiveId ||
      legendsaventurebkkSaved ||
      !legendsaventurebkkStory
    ) {
      return;
    }
    await legendsaventurebkkSaveTale({
      legendsaventurebkkId: legendsaventurebkkActiveId,
      legendsaventurebkkHistory: legendsaventurebkkHistory,
      legendsaventurebkkSavedAt: Date.now(),
    });
    setLegendsaventurebkkSaved(true);
  }, [
    legendsaventurebkkActiveId,
    legendsaventurebkkHistory,
    legendsaventurebkkSaved,
    legendsaventurebkkStory,
  ]);

  if (legendsaventurebkkView === 'list') {
    return (
      <AppLayout tab>
        <ScreenHeader
          title="Tales"
          subtitle="Choose your mythology adventure"
          compact
        />
        {legendsaventurebkkStoriesByRegion.map(
          ({legendsaventurebkkRegion, legendsaventurebkkItems}) => (
            <View
              key={legendsaventurebkkRegion}
              style={styles.legendsaventurebkkRegionBlock}>
              <Text style={styles.legendsaventurebkkRegionTitle}>
                {legendsaventurebkkRegion}
              </Text>
              {legendsaventurebkkItems.map(legendsaventurebkkItem => (
                <StoryListCard
                  key={legendsaventurebkkItem.legendsaventurebkkId}
                  story={legendsaventurebkkItem}
                  onOpen={() =>
                    legendsaventurebkkOpenStory(
                      legendsaventurebkkItem.legendsaventurebkkId,
                    )
                  }
                />
              ))}
            </View>
          ),
        )}
      </AppLayout>
    );
  }

  if (!legendsaventurebkkStory || !legendsaventurebkkNode) {
    return null;
  }

  const legendsaventurebkkShowHero =
    legendsaventurebkkHistory.length === 1 &&
    legendsaventurebkkNodeId === 'start';

  return (
    <AppLayout tab contentStyle={styles.legendsaventurebkkReaderScroll}>
      <Pressable
        onPress={legendsaventurebkkBackToList}
        style={({pressed}) => [
          styles.legendsaventurebkkBackBtn,
          pressed && styles.legendsaventurebkkPressed,
        ]}>
        <Image source={require('../../../assets/imgs/icons/backIcon.png')} />
      </Pressable>

      {legendsaventurebkkShowHero && (
        <View style={styles.legendsaventurebkkHero}>
          <View style={styles.legendsaventurebkkHeroImageWrap}>
            <ImageBackground
              source={legendsaventurebkkStory.legendsaventurebkkImage}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={gradients.storyHero}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.legendsaventurebkkHeroBadge}>
              <Text style={styles.legendsaventurebkkListBadgeText}>
                {legendsaventurebkkStory.legendsaventurebkkRegion}
              </Text>
            </View>
            <Text style={styles.legendsaventurebkkHeroTitle}>
              {legendsaventurebkkStory.legendsaventurebkkTitle}
            </Text>
          </View>
        </View>
      )}

      {!legendsaventurebkkShowHero && (
        <View style={styles.legendsaventurebkkReaderThumb}>
          <ImageBackground
            source={legendsaventurebkkStory.legendsaventurebkkImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.legendsaventurebkkTextBlocks}>
        {legendsaventurebkkHistory.map((legendsaventurebkkBlock, i) => (
          <View
            key={`${i}-${legendsaventurebkkBlock.slice(0, 12)}`}
            style={styles.legendsaventurebkkTextCard}>
            <Text style={styles.legendsaventurebkkTextCardBody}>
              {legendsaventurebkkBlock}
            </Text>
          </View>
        ))}
      </View>

      {legendsaventurebkkIsComplete ? (
        <View style={styles.legendsaventurebkkCompleteBlock}>
          <View style={styles.legendsaventurebkkJourneyBadge}>
            <Text style={styles.legendsaventurebkkJourneyText}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={legendsaventurebkkSaved}
            onPress={legendsaventurebkkSaveStory}
            style={({pressed}) => [
              styles.legendsaventurebkkSavePress,
              legendsaventurebkkSaved && styles.legendsaventurebkkSaveDisabled,
              pressed &&
                !legendsaventurebkkSaved &&
                styles.legendsaventurebkkPressed,
            ]}>
            <LinearGradient
              colors={gradients.primary}
              start={gradientAxis.horizontal.start}
              end={gradientAxis.horizontal.end}
              style={styles.legendsaventurebkkSaveBtn}>
              <Text style={styles.legendsaventurebkkChoiceText}>
                {legendsaventurebkkSaved
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        <View style={styles.legendsaventurebkkChoicesBlock}>
          {legendsaventurebkkNode.legendsaventurebkkQuestion && (
            <Text style={styles.legendsaventurebkkQuestion}>
              {legendsaventurebkkNode.legendsaventurebkkQuestion}
            </Text>
          )}
          {legendsaventurebkkNode.legendsaventurebkkChoices?.map(
            legendsaventurebkkChoice => (
              <GradientButton
                key={legendsaventurebkkChoice.legendsaventurebkkNext}
                label={legendsaventurebkkChoice.legendsaventurebkkLabel}
                tall={
                  legendsaventurebkkChoice.legendsaventurebkkLabel.length > 42
                }
                onPress={() =>
                  legendsaventurebkkPickChoice(
                    legendsaventurebkkChoice.legendsaventurebkkNext,
                  )
                }
              />
            ),
          )}
        </View>
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  legendsaventurebkkListTitle: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  legendsaventurebkkListSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  legendsaventurebkkRegionBlock: {
    marginBottom: 24.3,
    gap: 16.4,
  },
  legendsaventurebkkRegionTitle: {
    color: colors.accent,
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
  },
  legendsaventurebkkListCard: {
    borderRadius: 16.2,
    overflow: 'hidden',
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 16.4,
  },
  legendsaventurebkkListCardImageWrap: {
    height: 192.5,
    position: 'relative',
  },
  legendsaventurebkkListBadge: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  legendsaventurebkkListBadgeText: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  legendsaventurebkkListCardBody: {
    padding: 24.2,
    gap: 12.3,
  },
  legendsaventurebkkListCardTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  legendsaventurebkkListCardDesc: {
    color: colors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 26.2,
    marginBottom: 4.3,
  },
  legendsaventurebkkReaderScroll: {
    paddingTop: 8.4,
  },
  legendsaventurebkkBackBtn: {
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
  legendsaventurebkkBackIcon: {
    color: colors.text,
    fontSize: 20.1,
    fontWeight: '600',
  },
  legendsaventurebkkHero: {
    marginBottom: 24.2,
  },
  legendsaventurebkkHeroImageWrap: {
    height: 256.3,
    borderRadius: 16.4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24.5,
  },
  legendsaventurebkkHeroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badge,
    paddingHorizontal: 12.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
    marginBottom: 12.4,
  },
  legendsaventurebkkHeroTitle: {
    color: colors.gold,
    fontSize: 30.5,
    fontWeight: '500',
    lineHeight: 36.1,
  },
  legendsaventurebkkReaderThumb: {
    height: 256.2,
    borderRadius: 16.3,
    overflow: 'hidden',
    marginBottom: 24.4,
  },
  legendsaventurebkkTextBlocks: {
    gap: 24.5,
    marginBottom: 24.1,
  },
  legendsaventurebkkTextCard: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.4,
    paddingVertical: 24.5,
  },
  legendsaventurebkkTextCardBody: {
    color: colors.text,
    fontSize: 16.1,
    lineHeight: 26.2,
  },
  legendsaventurebkkQuestion: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    textAlign: 'center',
    marginBottom: 16.5,
  },
  legendsaventurebkkChoicesBlock: {
    gap: 12.1,
    marginBottom: 16.2,
  },
  legendsaventurebkkChoicePress: {
    borderRadius: 20.3,
    overflow: 'hidden',
    width: '100%',
  },
  legendsaventurebkkChoiceBtn: {
    minHeight: 47.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkChoiceBtnTall: {
    minHeight: 80.1,
  },
  legendsaventurebkkChoiceText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendsaventurebkkCompleteBlock: {
    gap: 16.3,
    marginBottom: 16.4,
  },
  legendsaventurebkkJourneyBadge: {
    borderRadius: 20.5,
    borderWidth: 1.1,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.2,
    alignItems: 'center',
  },
  legendsaventurebkkJourneyText: {
    color: colors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
  legendsaventurebkkSavePress: {
    borderRadius: 20.5,
    overflow: 'hidden',
  },
  legendsaventurebkkSaveDisabled: {
    opacity: 0.5,
  },
  legendsaventurebkkSaveBtn: {
    height: 56.1,
    borderRadius: 20.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkPressed: {
    opacity: 0.85,
  },
});

export default TalesScreen;
