import React, {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  BackHandler,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../ExplorerMytthofNavigation/ExplorerMytthofRoutes';
import type {MainTabParamList} from '../ExplorerMytthofNavigation/ExplorerMytthofTypes';
import {
  AnimatedProgressBar,
  AppLayout,
  FadeInView,
  TypewriterText,
} from '../ExplorerMytthofComponents';
import {colors, gradients, gradientAxis} from '../ExplorerMytthofPalette';

import {sampleTrialPrompts, trialRoundCount} from '../ExplorerMytthofData/ExplorerMytthofQuiz';
import type {TrialPrompt, TrialPhase} from '../ExplorerMytthofTypes';
import {creditInsightBalance, insightPerSuccess} from '../ExplorerMytthofLoungeKit';

const FilledActionControl = ({
  optionCaption,
  onActivate,
  surfaceExtra,
  controlInactive,
}: {
  optionCaption: string;
  onActivate: () => void;
  surfaceExtra?: object;
  controlInactive?: boolean;
}) => (
  <Pressable
    disabled={controlInactive}
    onPress={onActivate}
    style={({pressed}) => [
      explorerMytthofStyles.explorerMytthofFilledPressable,
      controlInactive && explorerMytthofStyles.explorerMytthofInactiveState,
      pressed && !controlInactive && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[explorerMytthofStyles.explorerMytthofFilledSurface, surfaceExtra]}>
      <Text style={explorerMytthofStyles.explorerMytthofFilledLabel}>{optionCaption}</Text>
    </LinearGradient>
  </Pressable>
);

const BorderedActionControl = ({
  optionCaption,
  onActivate,
}: {
  optionCaption: string;
  onActivate: () => void;
}) => (
  <Pressable
    onPress={onActivate}
    style={({pressed}) => [
      explorerMytthofStyles.explorerMytthofBorderedSurface,
      pressed && explorerMytthofStyles.explorerMytthofPressedState,
    ]}>
    <Text style={explorerMytthofStyles.explorerMytthofBorderedLabel}>{optionCaption}</Text>
  </Pressable>
);

const ConfirmLeaveDialog = ({
  dialogVisible,
  onConfirmLeave,
  onDismissLeave,
}: {
  dialogVisible: boolean;
  onConfirmLeave: () => void;
  onDismissLeave: () => void;
}) => (
  <Modal
    visible={dialogVisible}
    transparent
    animationType="fade"
    statusBarTranslucent={Platform.OS === 'android'}
    onRequestClose={onDismissLeave}>
    <Pressable style={explorerMytthofStyles.explorerMytthofDialogScrim} onPress={onDismissLeave}>
      <Pressable style={explorerMytthofStyles.explorerMytthofDialogPanel}>
        <Text style={explorerMytthofStyles.explorerMytthofDialogHeading}>Exit Quiz?</Text>
        <Text style={explorerMytthofStyles.explorerMytthofDialogCopy}>Your progress will be lost!</Text>
        <Pressable
          onPress={onConfirmLeave}
          style={({pressed}) => [
            explorerMytthofStyles.explorerMytthofDialogDestructivePress,
            pressed && explorerMytthofStyles.explorerMytthofPressedState,
          ]}>
          <LinearGradient
            colors={gradients.danger}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={explorerMytthofStyles.explorerMytthofDialogDestructiveSurface}>
            <Text style={explorerMytthofStyles.explorerMytthofDialogDestructiveLabel}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={onDismissLeave}
          style={({pressed}) => [
            explorerMytthofStyles.explorerMytthofDialogSecondarySurface,
            pressed && explorerMytthofStyles.explorerMytthofPressedState,
          ]}>
          <Text style={explorerMytthofStyles.explorerMytthofDialogSecondaryLabel}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const QuizScreen = () => {
  const tabNavigation =
    useNavigation<
      BottomTabNavigationProp<MainTabParamList, typeof Routes.Quiz>
    >();
  const [explorerMytthofScreenPhase, setExplorerMytthofScreenPhase] = useState<TrialPhase>('intro');
  const [explorerMytthofPromptBatch, setExplorerMytthofPromptBatch] = useState<TrialPrompt[]>([]);
  const [explorerMytthofPromptIndex, setExplorerMytthofPromptIndex] = useState(0);
  const [explorerMytthofSuccessCount, setExplorerMytthofSuccessCount] = useState(0);
  const [explorerMytthofPickedCaption, setExplorerMytthofPickedCaption] = useState<string | null>(null);
  const [explorerMytthofFeedbackShown, setExplorerMytthofFeedbackShown] = useState(false);
  const [explorerMytthofLeaveDialogOpen, setExplorerMytthofLeaveDialogOpen] = useState(false);

  const activePrompt = explorerMytthofPromptBatch[explorerMytthofPromptIndex];

  const roundProgress =
    explorerMytthofPromptBatch.length > 0
      ? (explorerMytthofPromptIndex + (explorerMytthofFeedbackShown ? 1 : 0)) / trialRoundCount
      : 0;

  const resetRound = useCallback(() => {
    setExplorerMytthofPromptIndex(0);
    setExplorerMytthofSuccessCount(0);
    setExplorerMytthofPickedCaption(null);
    setExplorerMytthofFeedbackShown(false);
    setExplorerMytthofLeaveDialogOpen(false);
  }, []);

  const beginTrial = useCallback(() => {
    setExplorerMytthofPromptBatch(sampleTrialPrompts());
    resetRound();
    setExplorerMytthofScreenPhase('active');
  }, [resetRound]);

  const returnToIntro = useCallback(() => {
    setExplorerMytthofLeaveDialogOpen(false);
    setExplorerMytthofPromptBatch([]);
    resetRound();
    setExplorerMytthofScreenPhase('intro');
  }, [resetRound]);

  const concludeTrial = useCallback(async (finalSuccessCount: number) => {
    setExplorerMytthofSuccessCount(finalSuccessCount);
    await creditInsightBalance(finalSuccessCount * insightPerSuccess);
    setExplorerMytthofScreenPhase('finished');
  }, []);

  const handleOptionPick = useCallback(
    (optionCaption: string) => {
      if (!activePrompt || explorerMytthofFeedbackShown) {
        return;
      }
      setExplorerMytthofPickedCaption(optionCaption);
      setExplorerMytthofFeedbackShown(true);
      if (optionCaption === activePrompt.keyedResponse) {
        setExplorerMytthofSuccessCount(c => c + 1);
      }
    },
    [activePrompt, explorerMytthofFeedbackShown],
  );

  const advanceRound = useCallback(() => {
    if (!activePrompt || !explorerMytthofFeedbackShown) {
      return;
    }

    if (explorerMytthofPromptIndex >= trialRoundCount - 1) {
      concludeTrial(explorerMytthofSuccessCount);
      return;
    }

    setExplorerMytthofPromptIndex(i => i + 1);
    setExplorerMytthofPickedCaption(null);
    setExplorerMytthofFeedbackShown(false);
  }, [explorerMytthofSuccessCount, activePrompt, concludeTrial, explorerMytthofPromptIndex, explorerMytthofFeedbackShown]);

  const resolveOptionBorder = useCallback(
    (optionCaption: string) => {
      if (!explorerMytthofFeedbackShown) {
        return explorerMytthofStyles.explorerMytthofOptionNeutral;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return explorerMytthofStyles.explorerMytthofOptionPositive;
      }
      if (optionCaption === explorerMytthofPickedCaption) {
        return explorerMytthofStyles.explorerMytthofOptionNegative;
      }
      return explorerMytthofStyles.explorerMytthofOptionNeutral;
    },
    [activePrompt, explorerMytthofFeedbackShown, explorerMytthofPickedCaption],
  );

  const resolveOptionLabel = useCallback(
    (optionCaption: string) => {
      if (!explorerMytthofFeedbackShown) {
        return explorerMytthofStyles.explorerMytthofOptionLabel;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return explorerMytthofStyles.explorerMytthofOptionLabelPositive;
      }
      if (optionCaption === explorerMytthofPickedCaption) {
        return explorerMytthofStyles.explorerMytthofOptionLabelNegative;
      }
      return explorerMytthofStyles.explorerMytthofOptionLabel;
    },
    [activePrompt, explorerMytthofFeedbackShown, explorerMytthofPickedCaption],
  );

  React.useEffect(() => {
    if (explorerMytthofScreenPhase !== 'active') {
      return;
    }
    const backSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setExplorerMytthofLeaveDialogOpen(true);
        return true;
      },
    );
    return () => backSubscribe.remove();
  }, [explorerMytthofScreenPhase]);

  const advanceCaption = useMemo(
    () => (explorerMytthofPromptIndex >= trialRoundCount - 1 ? 'Finish' : 'Next'),
    [explorerMytthofPromptIndex],
  );

  if (explorerMytthofScreenPhase === 'finished') {
    return (
      <AppLayout tab>
        <FadeInView style={explorerMytthofStyles.explorerMytthofResultsWrap} triggerKey="complete">
          <Image
            source={require('../../elements/images/quiz/quizComplete.png')}
            style={explorerMytthofStyles.explorerMytthofResultsVisual}
            resizeMode="contain"
          />
          <Text style={explorerMytthofStyles.explorerMytthofResultsHeading}>Quiz Complete!</Text>
          <Text style={explorerMytthofStyles.explorerMytthofResultsSummary}>
            You answered {explorerMytthofSuccessCount} out of {trialRoundCount} correctly
          </Text>
          <Text style={explorerMytthofStyles.explorerMytthofResultsMetric}>
            +{explorerMytthofSuccessCount * insightPerSuccess} Insights
          </Text>
          <FilledActionControl
            optionCaption="View Artifacts"
            onActivate={() => tabNavigation.navigate(Routes.Artifacts)}
            surfaceExtra={explorerMytthofStyles.explorerMytthofResultsAction}
          />
          <BorderedActionControl
            optionCaption="Back to Quiz"
            onActivate={returnToIntro}
          />
        </FadeInView>
      </AppLayout>
    );
  }

  if (explorerMytthofScreenPhase === 'active' && activePrompt) {
    return (
      <AppLayout tab contentStyle={explorerMytthofStyles.explorerMytthofActiveScroll}>
        <FadeInView triggerKey={explorerMytthofPromptIndex}>
          <View style={explorerMytthofStyles.explorerMytthofActiveHeader}>
            <Pressable
              onPress={() => setExplorerMytthofLeaveDialogOpen(true)}
              style={({pressed}) => [
                explorerMytthofStyles.explorerMytthofNavControl,
                pressed && explorerMytthofStyles.explorerMytthofPressedState,
              ]}>
              <Image
                source={require('../../elements/images/icons/backIcon.png')}
              />
            </Pressable>
            <View style={explorerMytthofStyles.explorerMytthofActiveMeta}>
              <Text style={explorerMytthofStyles.explorerMytthofProgressLabel}>
                Question {explorerMytthofPromptIndex + 1}/{trialRoundCount}
              </Text>
              <Text style={explorerMytthofStyles.explorerMytthofScoreLabel}>{explorerMytthofSuccessCount} Correct</Text>
            </View>
          </View>

          <AnimatedProgressBar progress={roundProgress} />

          <Image
            source={activePrompt.coverVisual}
            style={explorerMytthofStyles.explorerMytthofPromptVisual}
            resizeMode="cover"
          />

          <View style={explorerMytthofStyles.explorerMytthofPromptPanel}>
            <TypewriterText
              text={activePrompt.promptStem}
              style={explorerMytthofStyles.explorerMytthofPromptCopy}
              triggerKey={explorerMytthofPromptIndex}
            />
          </View>

          <View style={explorerMytthofStyles.explorerMytthofOptionsGrid}>
            {activePrompt.responseChoices.map(optionCaption => (
              <Pressable
                key={optionCaption}
                disabled={explorerMytthofFeedbackShown}
                onPress={() => handleOptionPick(optionCaption)}
                style={({pressed}) => [
                  explorerMytthofStyles.explorerMytthofOptionCell,
                  resolveOptionBorder(optionCaption),
                  pressed && !explorerMytthofFeedbackShown && explorerMytthofStyles.explorerMytthofPressedState,
                ]}>
                <Text style={resolveOptionLabel(optionCaption)}>
                  {optionCaption}
                </Text>
              </Pressable>
            ))}
          </View>

          <FilledActionControl
            optionCaption={advanceCaption}
            onActivate={advanceRound}
            controlInactive={!explorerMytthofFeedbackShown}
            surfaceExtra={explorerMytthofStyles.explorerMytthofAdvanceAction}
          />

          <ConfirmLeaveDialog
            dialogVisible={explorerMytthofLeaveDialogOpen}
            onConfirmLeave={returnToIntro}
            onDismissLeave={() => setExplorerMytthofLeaveDialogOpen(false)}
          />
        </FadeInView>
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <FadeInView>
        <Text style={explorerMytthofStyles.explorerMytthofScreenHeading}>Quiz</Text>
        <Text style={explorerMytthofStyles.explorerMytthofScreenSubheading}>
          Test your mythology knowledge
        </Text>

        <Image
          source={require('../../elements/images/quiz/quizHero.png')}
          style={explorerMytthofStyles.explorerMytthofCenterpieceVisual}
          resizeMode="contain"
        />

        <View style={explorerMytthofStyles.explorerMytthofInfoPanel}>
          <Text style={explorerMytthofStyles.explorerMytthofInfoHeading}>Mythology Quiz</Text>
          <Text style={explorerMytthofStyles.explorerMytthofInfoCopy}>
            Answer 10 questions based on the tales and mythology from the app.
            Each correct answer adds 50 insights toward unlocking ancient
            artifacts.
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Start Quiz"
          onActivate={beginTrial}
          surfaceExtra={explorerMytthofStyles.explorerMytthofPrimaryAction}
        />
      </FadeInView>
    </AppLayout>
  );
};

const explorerMytthofStyles = StyleSheet.create({
  explorerMytthofScreenHeading: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  explorerMytthofScreenSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  explorerMytthofCenterpieceVisual: {
    width: 242.3,
    height: 242.4,
    alignSelf: 'center',
    borderRadius: 28.5,
    marginBottom: 16.1,
  },
  explorerMytthofInfoPanel: {
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.4,
    gap: 12.5,
    marginBottom: 24.1,
  },
  explorerMytthofInfoHeading: {
    color: colors.gold,
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
  },
  explorerMytthofInfoCopy: {
    color: colors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
  explorerMytthofPrimaryAction: {
    minHeight: 56.1,
  },
  explorerMytthofActiveScroll: {
    paddingBottom: 120.2,
  },
  explorerMytthofActiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.3,
    marginTop: 40.4,
    marginBottom: 16.5,
  },
  explorerMytthofNavControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofNavGlyph: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  explorerMytthofActiveMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  explorerMytthofProgressLabel: {
    color: colors.textMutedSoft,
    fontSize: 16.1,
    lineHeight: 24.2,
  },
  explorerMytthofScoreLabel: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginLeft: 'auto',
  },
  explorerMytthofBarTrack: {
    height: 8.5,
    borderRadius: 8.1,
    backgroundColor: colors.cardMedium,
    overflow: 'hidden',
    marginBottom: 24.2,
  },
  explorerMytthofBarFill: {
    height: '100%',
    borderRadius: 8.3,
    minWidth: 8.4,
  },
  explorerMytthofPromptVisual: {
    width: 172.5,
    height: 172.1,
    borderRadius: 28.2,
    alignSelf: 'center',
    marginBottom: 24.3,
  },
  explorerMytthofPromptPanel: {
    borderRadius: 16.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.1,
    marginBottom: 24.2,
    minHeight: 120.3,
    justifyContent: 'center',
  },
  explorerMytthofPromptCopy: {
    color: colors.text,
    fontSize: 20.4,
    lineHeight: 32.5,
    textAlign: 'center',
  },
  explorerMytthofOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.1,
    marginBottom: 24.2,
  },
  explorerMytthofOptionCell: {
    width: '48%',
    minHeight: 74.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12.1,
  },
  explorerMytthofOptionNeutral: {
    borderColor: colors.borderMedium,
  },
  explorerMytthofOptionPositive: {
    borderColor: colors.success,
  },
  explorerMytthofOptionNegative: {
    borderColor: colors.error,
  },
  explorerMytthofOptionLabel: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofOptionLabelPositive: {
    color: colors.success,
    fontSize: 16.3,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofOptionLabelNegative: {
    color: colors.error,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofAdvanceAction: {
    minHeight: 56.5,
    marginBottom: 16.1,
  },
  explorerMytthofResultsWrap: {
    alignItems: 'center',
    paddingTop: 8.2,
    paddingBottom: 24.3,
    gap: 12.4,
    marginTop: 50.5,
  },
  explorerMytthofResultsVisual: {
    width: 322.1,
    height: 322.2,
    borderRadius: 28.3,
    marginBottom: 8.4,
  },
  explorerMytthofResultsHeading: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
    textAlign: 'center',
  },
  explorerMytthofResultsSummary: {
    color: colors.textMutedLight,
    fontSize: 18.2,
    lineHeight: 28.3,
    textAlign: 'center',
  },
  explorerMytthofResultsMetric: {
    color: colors.accent,
    fontSize: 24.4,
    lineHeight: 32.5,
    marginBottom: 8.1,
  },
  explorerMytthofResultsAction: {
    width: '100%',
    minHeight: 56.2,
    marginTop: 8.3,
  },
  explorerMytthofFilledPressable: {
    borderRadius: 20.4,
    overflow: 'hidden',
    width: '100%',
  },
  explorerMytthofFilledSurface: {
    minHeight: 56.5,
    borderRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorerMytthofFilledLabel: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  explorerMytthofBorderedSurface: {
    width: '100%',
    minHeight: 56.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14.1,
  },
  explorerMytthofBorderedLabel: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
  },
  explorerMytthofDialogScrim: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  explorerMytthofDialogPanel: {
    width: '100%',
    maxWidth: 361.4,
    borderRadius: 16.5,
    borderWidth: 1.1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
    paddingHorizontal: 24.2,
    paddingVertical: 24.3,
    gap: 12.4,
  },
  explorerMytthofDialogHeading: {
    color: colors.gold,
    fontSize: 18.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.1,
  },
  explorerMytthofDialogCopy: {
    color: colors.textMutedLight,
    fontSize: 16.2,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.4,
  },
  explorerMytthofDialogDestructivePress: {
    borderRadius: 14.5,
    overflow: 'hidden',
  },
  explorerMytthofDialogDestructiveSurface: {
    minHeight: 36.1,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  explorerMytthofDialogDestructiveLabel: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  explorerMytthofDialogSecondarySurface: {
    minHeight: 38.5,
    borderRadius: 14.1,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.3,
  },
  explorerMytthofDialogSecondaryLabel: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  explorerMytthofInactiveState: {
    opacity: 0.45,
  },
  explorerMytthofPressedState: {
    opacity: 0.85,
  },
});

export default QuizScreen;
