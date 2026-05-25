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
import {Routes} from '../navigation/routes';
import type {MainTabParamList} from '../navigation/types';
import {
  AnimatedProgressBar,
  AppLayout,
  FadeInView,
  TypewriterText,
} from '../components';
import {colors, gradients, gradientAxis} from '../palette';

import {sampleTrialPrompts, trialRoundCount} from '../data/quiz';
import type {TrialPrompt, TrialPhase} from '../types';
import {creditInsightBalance, insightPerSuccess} from '../loungeKit';

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
      styles.filledPressable,
      controlInactive && styles.inactiveState,
      pressed && !controlInactive && styles.pressedState,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[styles.filledSurface, surfaceExtra]}>
      <Text style={styles.filledLabel}>{optionCaption}</Text>
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
      styles.borderedSurface,
      pressed && styles.pressedState,
    ]}>
    <Text style={styles.borderedLabel}>{optionCaption}</Text>
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
    <Pressable style={styles.dialogScrim} onPress={onDismissLeave}>
      <Pressable style={styles.dialogPanel}>
        <Text style={styles.dialogHeading}>Exit Quiz?</Text>
        <Text style={styles.dialogCopy}>Your progress will be lost!</Text>
        <Pressable
          onPress={onConfirmLeave}
          style={({pressed}) => [
            styles.dialogDestructivePress,
            pressed && styles.pressedState,
          ]}>
          <LinearGradient
            colors={gradients.danger}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={styles.dialogDestructiveSurface}>
            <Text style={styles.dialogDestructiveLabel}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={onDismissLeave}
          style={({pressed}) => [
            styles.dialogSecondarySurface,
            pressed && styles.pressedState,
          ]}>
          <Text style={styles.dialogSecondaryLabel}>Cancel</Text>
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
  const [screenPhase, setScreenPhase] = useState<TrialPhase>('intro');
  const [promptBatch, setPromptBatch] = useState<TrialPrompt[]>([]);
  const [promptIndex, setPromptIndex] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [pickedCaption, setPickedCaption] = useState<string | null>(null);
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

  const activePrompt = promptBatch[promptIndex];

  const roundProgress =
    promptBatch.length > 0
      ? (promptIndex + (feedbackShown ? 1 : 0)) / trialRoundCount
      : 0;

  const resetRound = useCallback(() => {
    setPromptIndex(0);
    setSuccessCount(0);
    setPickedCaption(null);
    setFeedbackShown(false);
    setLeaveDialogOpen(false);
  }, []);

  const beginTrial = useCallback(() => {
    setPromptBatch(sampleTrialPrompts());
    resetRound();
    setScreenPhase('active');
  }, [resetRound]);

  const returnToIntro = useCallback(() => {
    setLeaveDialogOpen(false);
    setPromptBatch([]);
    resetRound();
    setScreenPhase('intro');
  }, [resetRound]);

  const concludeTrial = useCallback(async (finalSuccessCount: number) => {
    setSuccessCount(finalSuccessCount);
    await creditInsightBalance(finalSuccessCount * insightPerSuccess);
    setScreenPhase('finished');
  }, []);

  const handleOptionPick = useCallback(
    (optionCaption: string) => {
      if (!activePrompt || feedbackShown) {
        return;
      }
      setPickedCaption(optionCaption);
      setFeedbackShown(true);
      if (optionCaption === activePrompt.keyedResponse) {
        setSuccessCount(c => c + 1);
      }
    },
    [activePrompt, feedbackShown],
  );

  const advanceRound = useCallback(() => {
    if (!activePrompt || !feedbackShown) {
      return;
    }

    if (promptIndex >= trialRoundCount - 1) {
      concludeTrial(successCount);
      return;
    }

    setPromptIndex(i => i + 1);
    setPickedCaption(null);
    setFeedbackShown(false);
  }, [successCount, activePrompt, concludeTrial, promptIndex, feedbackShown]);

  const resolveOptionBorder = useCallback(
    (optionCaption: string) => {
      if (!feedbackShown) {
        return styles.optionNeutral;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return styles.optionPositive;
      }
      if (optionCaption === pickedCaption) {
        return styles.optionNegative;
      }
      return styles.optionNeutral;
    },
    [activePrompt, feedbackShown, pickedCaption],
  );

  const resolveOptionLabel = useCallback(
    (optionCaption: string) => {
      if (!feedbackShown) {
        return styles.optionLabel;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return styles.optionLabelPositive;
      }
      if (optionCaption === pickedCaption) {
        return styles.optionLabelNegative;
      }
      return styles.optionLabel;
    },
    [activePrompt, feedbackShown, pickedCaption],
  );

  React.useEffect(() => {
    if (screenPhase !== 'active') {
      return;
    }
    const backSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setLeaveDialogOpen(true);
        return true;
      },
    );
    return () => backSubscribe.remove();
  }, [screenPhase]);

  const advanceCaption = useMemo(
    () => (promptIndex >= trialRoundCount - 1 ? 'Finish' : 'Next'),
    [promptIndex],
  );

  if (screenPhase === 'finished') {
    return (
      <AppLayout tab>
        <FadeInView style={styles.resultsWrap} triggerKey="complete">
          <Image
            source={require('../../elements/images/quiz/quizComplete.png')}
            style={styles.resultsVisual}
            resizeMode="contain"
          />
          <Text style={styles.resultsHeading}>Quiz Complete!</Text>
          <Text style={styles.resultsSummary}>
            You answered {successCount} out of {trialRoundCount} correctly
          </Text>
          <Text style={styles.resultsMetric}>
            +{successCount * insightPerSuccess} Insights
          </Text>
          <FilledActionControl
            optionCaption="View Artifacts"
            onActivate={() => tabNavigation.navigate(Routes.Artifacts)}
            surfaceExtra={styles.resultsAction}
          />
          <BorderedActionControl
            optionCaption="Back to Quiz"
            onActivate={returnToIntro}
          />
        </FadeInView>
      </AppLayout>
    );
  }

  if (screenPhase === 'active' && activePrompt) {
    return (
      <AppLayout tab contentStyle={styles.activeScroll}>
        <FadeInView triggerKey={promptIndex}>
          <View style={styles.activeHeader}>
            <Pressable
              onPress={() => setLeaveDialogOpen(true)}
              style={({pressed}) => [
                styles.navControl,
                pressed && styles.pressedState,
              ]}>
              <Image
                source={require('../../elements/images/icons/backIcon.png')}
              />
            </Pressable>
            <View style={styles.activeMeta}>
              <Text style={styles.progressLabel}>
                Question {promptIndex + 1}/{trialRoundCount}
              </Text>
              <Text style={styles.scoreLabel}>{successCount} Correct</Text>
            </View>
          </View>

          <AnimatedProgressBar progress={roundProgress} />

          <Image
            source={activePrompt.coverVisual}
            style={styles.promptVisual}
            resizeMode="cover"
          />

          <View style={styles.promptPanel}>
            <TypewriterText
              text={activePrompt.promptStem}
              style={styles.promptCopy}
              triggerKey={promptIndex}
            />
          </View>

          <View style={styles.optionsGrid}>
            {activePrompt.responseChoices.map(optionCaption => (
              <Pressable
                key={optionCaption}
                disabled={feedbackShown}
                onPress={() => handleOptionPick(optionCaption)}
                style={({pressed}) => [
                  styles.optionCell,
                  resolveOptionBorder(optionCaption),
                  pressed && !feedbackShown && styles.pressedState,
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
            controlInactive={!feedbackShown}
            surfaceExtra={styles.advanceAction}
          />

          <ConfirmLeaveDialog
            dialogVisible={leaveDialogOpen}
            onConfirmLeave={returnToIntro}
            onDismissLeave={() => setLeaveDialogOpen(false)}
          />
        </FadeInView>
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <FadeInView>
        <Text style={styles.screenHeading}>Quiz</Text>
        <Text style={styles.screenSubheading}>
          Test your mythology knowledge
        </Text>

        <Image
          source={require('../../elements/images/quiz/quizHero.png')}
          style={styles.centerpieceVisual}
          resizeMode="contain"
        />

        <View style={styles.infoPanel}>
          <Text style={styles.infoHeading}>Mythology Quiz</Text>
          <Text style={styles.infoCopy}>
            Answer 10 questions based on the tales and mythology from the app.
            Each correct answer adds 50 insights toward unlocking ancient
            artifacts.
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Start Quiz"
          onActivate={beginTrial}
          surfaceExtra={styles.primaryAction}
        />
      </FadeInView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  screenHeading: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  screenSubheading: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  centerpieceVisual: {
    width: 242.3,
    height: 242.4,
    alignSelf: 'center',
    borderRadius: 28.5,
    marginBottom: 16.1,
  },
  infoPanel: {
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.4,
    gap: 12.5,
    marginBottom: 24.1,
  },
  infoHeading: {
    color: colors.gold,
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
  },
  infoCopy: {
    color: colors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
  primaryAction: {
    minHeight: 56.1,
  },
  activeScroll: {
    paddingBottom: 120.2,
  },
  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.3,
    marginTop: 40.4,
    marginBottom: 16.5,
  },
  navControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navGlyph: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  activeMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    color: colors.textMutedSoft,
    fontSize: 16.1,
    lineHeight: 24.2,
  },
  scoreLabel: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginLeft: 'auto',
  },
  barTrack: {
    height: 8.5,
    borderRadius: 8.1,
    backgroundColor: colors.cardMedium,
    overflow: 'hidden',
    marginBottom: 24.2,
  },
  barFill: {
    height: '100%',
    borderRadius: 8.3,
    minWidth: 8.4,
  },
  promptVisual: {
    width: 172.5,
    height: 172.1,
    borderRadius: 28.2,
    alignSelf: 'center',
    marginBottom: 24.3,
  },
  promptPanel: {
    borderRadius: 16.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.1,
    marginBottom: 24.2,
    minHeight: 120.3,
    justifyContent: 'center',
  },
  promptCopy: {
    color: colors.text,
    fontSize: 20.4,
    lineHeight: 32.5,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.1,
    marginBottom: 24.2,
  },
  optionCell: {
    width: '48%',
    minHeight: 74.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12.1,
  },
  optionNeutral: {
    borderColor: colors.borderMedium,
  },
  optionPositive: {
    borderColor: colors.success,
  },
  optionNegative: {
    borderColor: colors.error,
  },
  optionLabel: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionLabelPositive: {
    color: colors.success,
    fontSize: 16.3,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionLabelNegative: {
    color: colors.error,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  advanceAction: {
    minHeight: 56.5,
    marginBottom: 16.1,
  },
  resultsWrap: {
    alignItems: 'center',
    paddingTop: 8.2,
    paddingBottom: 24.3,
    gap: 12.4,
    marginTop: 50.5,
  },
  resultsVisual: {
    width: 322.1,
    height: 322.2,
    borderRadius: 28.3,
    marginBottom: 8.4,
  },
  resultsHeading: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
    textAlign: 'center',
  },
  resultsSummary: {
    color: colors.textMutedLight,
    fontSize: 18.2,
    lineHeight: 28.3,
    textAlign: 'center',
  },
  resultsMetric: {
    color: colors.accent,
    fontSize: 24.4,
    lineHeight: 32.5,
    marginBottom: 8.1,
  },
  resultsAction: {
    width: '100%',
    minHeight: 56.2,
    marginTop: 8.3,
  },
  filledPressable: {
    borderRadius: 20.4,
    overflow: 'hidden',
    width: '100%',
  },
  filledSurface: {
    minHeight: 56.5,
    borderRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledLabel: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  borderedSurface: {
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
  borderedLabel: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
  },
  dialogScrim: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  dialogPanel: {
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
  dialogHeading: {
    color: colors.gold,
    fontSize: 18.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.1,
  },
  dialogCopy: {
    color: colors.textMutedLight,
    fontSize: 16.2,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.4,
  },
  dialogDestructivePress: {
    borderRadius: 14.5,
    overflow: 'hidden',
  },
  dialogDestructiveSurface: {
    minHeight: 36.1,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  dialogDestructiveLabel: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  dialogSecondarySurface: {
    minHeight: 38.5,
    borderRadius: 14.1,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.3,
  },
  dialogSecondaryLabel: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  inactiveState: {
    opacity: 0.45,
  },
  pressedState: {
    opacity: 0.85,
  },
});

export default QuizScreen;
