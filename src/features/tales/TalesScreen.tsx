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
  ravenQuestGetStoryById,
  ravenQuestStoriesByRegion,
} from '../../../content/stories';
import type {RavenQuestChroniclePhase} from '../../shared/types';
import {
  ravenQuestIsStorySaved,
  ravenQuestMarkTaleRead,
  ravenQuestSaveTale,
} from '../../shared/lib';
import {StoryListCard} from './components';
import {
  AppLayout,
  FadeInView,
  GradientButton,
  ScreenHeader,
  StaggerItem,
  TypewriterText,
} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

const TalesScreen = () => {
  const [ravenQuestView, setRavenQuestView] =
    useState<RavenQuestChroniclePhase>('catalog');
  const [ravenQuestActiveId, setRavenQuestActiveId] = useState<
    string | null
  >(null);
  const [ravenQuestNodeId, setRavenQuestNodeId] =
    useState('start');
  const [ravenQuestHistory, setRavenQuestHistory] = useState<
    string[]
  >([]);
  const [ravenQuestSaved, setRavenQuestSaved] = useState(false);

  const ravenQuestStory = useMemo(
    () =>
      ravenQuestActiveId
        ? ravenQuestGetStoryById(ravenQuestActiveId)
        : undefined,
    [ravenQuestActiveId],
  );

  const ravenQuestNode =
    ravenQuestStory?.ravenQuestNodes[ravenQuestNodeId];

  const ravenQuestIsComplete =
    ravenQuestNode?.ravenQuestEnding === true;

  useEffect(() => {
    if (ravenQuestIsComplete && ravenQuestActiveId) {
      ravenQuestMarkTaleRead(ravenQuestActiveId);
    }
  }, [ravenQuestActiveId, ravenQuestIsComplete]);

  const ravenQuestOpenStory = useCallback(
    async (ravenQuestId: string) => {
      const ravenQuestItem =
        ravenQuestGetStoryById(ravenQuestId);
      if (!ravenQuestItem) {
        return;
      }
      const ravenQuestWasSaved = await ravenQuestIsStorySaved(
        ravenQuestId,
      );
      setRavenQuestActiveId(ravenQuestId);
      setRavenQuestNodeId('start');
      setRavenQuestHistory([
        ravenQuestItem.ravenQuestIntro,
      ]);
      setRavenQuestSaved(ravenQuestWasSaved);
      setRavenQuestView('reading');
    },
    [],
  );

  const ravenQuestBackToList = useCallback(() => {
    setRavenQuestView('catalog');
    setRavenQuestActiveId(null);
    setRavenQuestNodeId('start');
    setRavenQuestHistory([]);
    setRavenQuestSaved(false);
  }, []);

  const ravenQuestPickChoice = useCallback(
    (ravenQuestNext: string) => {
      if (!ravenQuestStory) {
        return;
      }
      const ravenQuestNextNode =
        ravenQuestStory.ravenQuestNodes[ravenQuestNext];
      if (!ravenQuestNextNode) {
        return;
      }
      const ravenQuestNewHistory = [
        ...ravenQuestHistory,
        ...(ravenQuestNextNode.ravenQuestAddText
          ? [ravenQuestNextNode.ravenQuestAddText]
          : []),
      ];
      setRavenQuestHistory(ravenQuestNewHistory);
      setRavenQuestNodeId(ravenQuestNext);
    },
    [ravenQuestHistory, ravenQuestStory],
  );

  const ravenQuestSaveStory = useCallback(async () => {
    if (
      !ravenQuestActiveId ||
      ravenQuestSaved ||
      !ravenQuestStory
    ) {
      return;
    }
    await ravenQuestSaveTale({
      ravenQuestId: ravenQuestActiveId,
      ravenQuestHistory: ravenQuestHistory,
      ravenQuestSavedAt: Date.now(),
    });
    setRavenQuestSaved(true);
  }, [
    ravenQuestActiveId,
    ravenQuestHistory,
    ravenQuestSaved,
    ravenQuestStory,
  ]);

  if (ravenQuestView === 'catalog') {
    return (
      <AppLayout tab>
        <ScreenHeader
          title="Tales"
          subtitle="Choose your mythology adventure"
          compact
        />
        {(() => {
          let cardIndex = 0;
          return ravenQuestStoriesByRegion.map(
            ({ravenQuestRegion, ravenQuestItems}, regionIndex) => (
              <FadeInView
                key={ravenQuestRegion}
                delay={regionIndex * 80}
                style={styles.ravenQuestRegionBlock}>
                <Text style={styles.ravenQuestRegionTitle}>
                  {ravenQuestRegion}
                </Text>
                {ravenQuestItems.map(ravenQuestItem => {
                  const item = (
                    <StaggerItem
                      key={ravenQuestItem.ravenQuestId}
                      index={cardIndex}>
                      <StoryListCard
                        story={ravenQuestItem}
                        onOpen={() =>
                          ravenQuestOpenStory(
                            ravenQuestItem.ravenQuestId,
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

  if (!ravenQuestStory || !ravenQuestNode) {
    return null;
  }

  const ravenQuestShowHero =
    ravenQuestHistory.length === 1 &&
    ravenQuestNodeId === 'start';

  return (
    <AppLayout tab contentStyle={styles.ravenQuestReaderScroll}>
      <FadeInView triggerKey={ravenQuestActiveId ?? 'reading'}>
      <Pressable
        onPress={ravenQuestBackToList}
        style={({pressed}) => [
          styles.ravenQuestBackBtn,
          pressed && styles.ravenQuestPressed,
        ]}>
        <Image source={require('../../../assets/imgs/icons/backIcon.png')} />
      </Pressable>

      {ravenQuestShowHero && (
        <View style={styles.ravenQuestHero}>
          <View style={styles.ravenQuestHeroImageWrap}>
            <ImageBackground
              source={ravenQuestStory.ravenQuestImage}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={gradients.storyHero}
              locations={[0.42, 0.72, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.ravenQuestHeroBadge}>
              <Text style={styles.ravenQuestListBadgeText}>
                {ravenQuestStory.ravenQuestRegion}
              </Text>
            </View>
            <Text style={styles.ravenQuestHeroTitle}>
              {ravenQuestStory.ravenQuestTitle}
            </Text>
          </View>
        </View>
      )}

      {!ravenQuestShowHero && (
        <View style={styles.ravenQuestReaderThumb}>
          <ImageBackground
            source={ravenQuestStory.ravenQuestImage}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.ravenQuestTextBlocks}>
        {ravenQuestHistory.map((ravenQuestBlock, i) => {
          const isLatest = i === ravenQuestHistory.length - 1;
          const blockKey = `${ravenQuestNodeId}-${i}`;
          const card = (
            <View style={styles.ravenQuestTextCard}>
              {isLatest ? (
                <TypewriterText
                  text={ravenQuestBlock}
                  style={styles.ravenQuestTextCardBody}
                  triggerKey={blockKey}
                />
              ) : (
                <Text style={styles.ravenQuestTextCardBody}>
                  {ravenQuestBlock}
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

      {ravenQuestIsComplete ? (
        <FadeInView style={styles.ravenQuestCompleteBlock} triggerKey="complete">
          <View style={styles.ravenQuestJourneyBadge}>
            <Text style={styles.ravenQuestJourneyText}>
              Journey Complete
            </Text>
          </View>
          <Pressable
            disabled={ravenQuestSaved}
            onPress={ravenQuestSaveStory}
            style={({pressed}) => [
              styles.ravenQuestSavePress,
              ravenQuestSaved && styles.ravenQuestSaveDisabled,
              pressed &&
                !ravenQuestSaved &&
                styles.ravenQuestPressed,
            ]}>
            <LinearGradient
              colors={gradients.primary}
              start={gradientAxis.horizontal.start}
              end={gradientAxis.horizontal.end}
              style={styles.ravenQuestSaveBtn}>
              <Text style={styles.ravenQuestChoiceText}>
                {ravenQuestSaved
                  ? 'Your Story Saved'
                  : 'Save This Version'}
              </Text>
            </LinearGradient>
          </Pressable>
        </FadeInView>
      ) : (
        <FadeInView
          style={styles.ravenQuestChoicesBlock}
          triggerKey={ravenQuestNodeId}>
          {ravenQuestNode.ravenQuestQuestion && (
            <TypewriterText
              text={ravenQuestNode.ravenQuestQuestion}
              style={styles.ravenQuestQuestion}
              triggerKey={`q-${ravenQuestNodeId}`}
            />
          )}
          {ravenQuestNode.ravenQuestChoices?.map(
            (ravenQuestChoice, choiceIndex) => (
              <StaggerItem
                key={ravenQuestChoice.ravenQuestNext}
                index={choiceIndex}>
                <GradientButton
                  label={ravenQuestChoice.ravenQuestLabel}
                  tall={
                    ravenQuestChoice.ravenQuestLabel.length > 42
                  }
                  onPress={() =>
                    ravenQuestPickChoice(
                      ravenQuestChoice.ravenQuestNext,
                    )
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
  ravenQuestListTitle: {
    color: colors.gold,
    fontSize: 46.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  ravenQuestListSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 24.2,
  },
  ravenQuestRegionBlock: {
    marginBottom: 24.3,
    gap: 16.4,
  },
  ravenQuestRegionTitle: {
    color: colors.accent,
    fontSize: 24.5,
    fontWeight: '500',
    lineHeight: 32.1,
  },
  ravenQuestListCard: {
    borderRadius: 16.2,
    overflow: 'hidden',
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.cardStrong,
    marginBottom: 16.4,
  },
  ravenQuestListCardImageWrap: {
    height: 192.5,
    position: 'relative',
  },
  ravenQuestListBadge: {
    position: 'absolute',
    top: 16.1,
    right: 16.2,
    backgroundColor: colors.badge,
    paddingHorizontal: 12.3,
    paddingVertical: 4.4,
    borderRadius: 20.5,
  },
  ravenQuestListBadgeText: {
    color: colors.textDark,
    fontSize: 14.1,
  },
  ravenQuestListCardBody: {
    padding: 24.2,
    gap: 12.3,
  },
  ravenQuestListCardTitle: {
    color: colors.gold,
    fontSize: 20.4,
    fontWeight: '500',
    lineHeight: 28.5,
  },
  ravenQuestListCardDesc: {
    color: colors.textMutedLight,
    fontSize: 16.1,
    lineHeight: 26.2,
    marginBottom: 4.3,
  },
  ravenQuestReaderScroll: {
    paddingTop: 8.4,
  },
  ravenQuestBackBtn: {
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
  ravenQuestBackIcon: {
    color: colors.text,
    fontSize: 20.1,
    fontWeight: '600',
  },
  ravenQuestHero: {
    marginBottom: 24.2,
  },
  ravenQuestHeroImageWrap: {
    height: 256.3,
    borderRadius: 16.4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 24.5,
  },
  ravenQuestHeroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badge,
    paddingHorizontal: 12.1,
    paddingVertical: 4.2,
    borderRadius: 20.3,
    marginBottom: 12.4,
  },
  ravenQuestHeroTitle: {
    color: colors.gold,
    fontSize: 30.5,
    fontWeight: '500',
    lineHeight: 36.1,
  },
  ravenQuestReaderThumb: {
    height: 256.2,
    borderRadius: 16.3,
    overflow: 'hidden',
    marginBottom: 24.4,
  },
  ravenQuestTextBlocks: {
    gap: 24.5,
    marginBottom: 24.1,
  },
  ravenQuestTextCard: {
    borderRadius: 20.2,
    borderWidth: 1.3,
    borderColor: colors.borderStrong,
    backgroundColor: colors.cardMedium,
    paddingHorizontal: 24.4,
    paddingVertical: 24.5,
  },
  ravenQuestTextCardBody: {
    color: colors.text,
    fontSize: 16.1,
    lineHeight: 26.2,
  },
  ravenQuestQuestion: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    textAlign: 'center',
    marginBottom: 16.5,
  },
  ravenQuestChoicesBlock: {
    gap: 12.1,
    marginBottom: 16.2,
  },
  ravenQuestChoicePress: {
    borderRadius: 20.3,
    overflow: 'hidden',
    width: '100%',
  },
  ravenQuestChoiceBtn: {
    minHeight: 47.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestChoiceBtnTall: {
    minHeight: 80.1,
  },
  ravenQuestChoiceText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  ravenQuestCompleteBlock: {
    gap: 16.3,
    marginBottom: 16.4,
  },
  ravenQuestJourneyBadge: {
    borderRadius: 20.5,
    borderWidth: 1.1,
    borderColor: colors.journeyBorder,
    backgroundColor: colors.journey,
    paddingVertical: 24.2,
    alignItems: 'center',
  },
  ravenQuestJourneyText: {
    color: colors.gold,
    fontSize: 18.3,
    lineHeight: 28.4,
  },
  ravenQuestSavePress: {
    borderRadius: 20.5,
    overflow: 'hidden',
  },
  ravenQuestSaveDisabled: {
    opacity: 0.5,
  },
  ravenQuestSaveBtn: {
    height: 56.1,
    borderRadius: 20.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestPressed: {
    opacity: 0.85,
  },
});

export default TalesScreen;
