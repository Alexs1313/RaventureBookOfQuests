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
import {AnncintTlllsmythhhsRoutes} from './routes/AnncintTlllsmythhhsRoutes';
import type {AnncintTlllsmythhhsMainTabParamList} from './routes/AnncintTlllsmythhhsRoutes';
import {
  AnncintTlllsmythhhsAnimatedProgressBar,
  AnncintTlllsmythhhsAppLayout,
  AnncintTlllsmythhhsFadeInView,
  AnncintTlllsmythhhsTypewriterText,
} from './AnncintTlllsmythhhsUi';
import {anncintTlllsmythhhsGradients, anncintTlllsmythhhsGradientAxis} from './AnncintTlllsmythhhsCore';

import {anncintTlllsmythhhsSampleTrialPrompts, anncintTlllsmythhhsTrialRoundCount} from './AnncintTlllsmythhhsCore';
import type {AnncintTlllsmythhhsTrialPrompt, AnncintTlllsmythhhsTrialPhase} from './AnncintTlllsmythhhsCore';
import {anncintTlllsmythhhsCreditInsightBalance, anncintTlllsmythhhsInsightPerSuccess} from './AnncintTlllsmythhhsCore';

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
      anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledPressable,
      controlInactive && anncintTlllsmythhhsStyles.anncintTlllsmythhhsInactiveState,
      pressed && !controlInactive && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
    ]}>
    <LinearGradient
      colors={anncintTlllsmythhhsGradients.primary}
      start={anncintTlllsmythhhsGradientAxis.horizontal.start}
      end={anncintTlllsmythhhsGradientAxis.horizontal.end}
      style={[anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledSurface, surfaceExtra]}>
      <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsFilledLabel}>{optionCaption}</Text>
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
      anncintTlllsmythhhsStyles.anncintTlllsmythhhsBorderedSurface,
      pressed && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
    ]}>
    <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsBorderedLabel}>{optionCaption}</Text>
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
    <Pressable style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogScrim} onPress={onDismissLeave}>
      <Pressable style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogPanel}>
        <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogHeading}>Exit Quiz?</Text>
        <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogCopy}>Your progress will be lost!</Text>
        <Pressable
          onPress={onConfirmLeave}
          style={({pressed}) => [
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogDestructivePress,
            pressed && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
          ]}>
          <LinearGradient
            colors={anncintTlllsmythhhsGradients.danger}
            start={anncintTlllsmythhhsGradientAxis.horizontal.start}
            end={anncintTlllsmythhhsGradientAxis.horizontal.end}
            style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogDestructiveSurface}>
            <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogDestructiveLabel}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={onDismissLeave}
          style={({pressed}) => [
            anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogSecondarySurface,
            pressed && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
          ]}>
          <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsDialogSecondaryLabel}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const AnncintTlllsmythhhsQuizScreen = () => {
  const tabNavigation =
    useNavigation<
      BottomTabNavigationProp<AnncintTlllsmythhhsMainTabParamList, typeof AnncintTlllsmythhhsRoutes.Quiz>
    >();
  const [anncintTlllsmythhhsScreenPhase, setAnncintTlllsmythhhsScreenPhase] = useState<AnncintTlllsmythhhsTrialPhase>('intro');
  const [anncintTlllsmythhhsPromptBatch, setAnncintTlllsmythhhsPromptBatch] = useState<AnncintTlllsmythhhsTrialPrompt[]>([]);
  const [anncintTlllsmythhhsPromptIndex, setAnncintTlllsmythhhsPromptIndex] = useState(0);
  const [anncintTlllsmythhhsSuccessCount, setAnncintTlllsmythhhsSuccessCount] = useState(0);
  const [anncintTlllsmythhhsPickedCaption, setAnncintTlllsmythhhsPickedCaption] = useState<string | null>(null);
  const [anncintTlllsmythhhsFeedbackShown, setAnncintTlllsmythhhsFeedbackShown] = useState(false);
  const [anncintTlllsmythhhsLeaveDialogOpen, setAnncintTlllsmythhhsLeaveDialogOpen] = useState(false);

  const activePrompt = anncintTlllsmythhhsPromptBatch[anncintTlllsmythhhsPromptIndex];

  const roundProgress =
    anncintTlllsmythhhsPromptBatch.length > 0
      ? (anncintTlllsmythhhsPromptIndex + (anncintTlllsmythhhsFeedbackShown ? 1 : 0)) / anncintTlllsmythhhsTrialRoundCount
      : 0;

  const resetRound = useCallback(() => {
    setAnncintTlllsmythhhsPromptIndex(0);
    setAnncintTlllsmythhhsSuccessCount(0);
    setAnncintTlllsmythhhsPickedCaption(null);
    setAnncintTlllsmythhhsFeedbackShown(false);
    setAnncintTlllsmythhhsLeaveDialogOpen(false);
  }, []);

  const beginTrial = useCallback(() => {
    setAnncintTlllsmythhhsPromptBatch(anncintTlllsmythhhsSampleTrialPrompts());
    resetRound();
    setAnncintTlllsmythhhsScreenPhase('active');
  }, [resetRound]);

  const returnToIntro = useCallback(() => {
    setAnncintTlllsmythhhsLeaveDialogOpen(false);
    setAnncintTlllsmythhhsPromptBatch([]);
    resetRound();
    setAnncintTlllsmythhhsScreenPhase('intro');
  }, [resetRound]);

  const concludeTrial = useCallback(async (finalSuccessCount: number) => {
    setAnncintTlllsmythhhsSuccessCount(finalSuccessCount);
    await anncintTlllsmythhhsCreditInsightBalance(finalSuccessCount * anncintTlllsmythhhsInsightPerSuccess);
    setAnncintTlllsmythhhsScreenPhase('finished');
  }, []);

  const handleOptionPick = useCallback(
    (optionCaption: string) => {
      if (!activePrompt || anncintTlllsmythhhsFeedbackShown) {
        return;
      }
      setAnncintTlllsmythhhsPickedCaption(optionCaption);
      setAnncintTlllsmythhhsFeedbackShown(true);
      if (optionCaption === activePrompt.keyedResponse) {
        setAnncintTlllsmythhhsSuccessCount(c => c + 1);
      }
    },
    [activePrompt, anncintTlllsmythhhsFeedbackShown],
  );

  const advanceRound = useCallback(() => {
    if (!activePrompt || !anncintTlllsmythhhsFeedbackShown) {
      return;
    }

    if (anncintTlllsmythhhsPromptIndex >= anncintTlllsmythhhsTrialRoundCount - 1) {
      concludeTrial(anncintTlllsmythhhsSuccessCount);
      return;
    }

    setAnncintTlllsmythhhsPromptIndex(i => i + 1);
    setAnncintTlllsmythhhsPickedCaption(null);
    setAnncintTlllsmythhhsFeedbackShown(false);
  }, [anncintTlllsmythhhsSuccessCount, activePrompt, concludeTrial, anncintTlllsmythhhsPromptIndex, anncintTlllsmythhhsFeedbackShown]);

  const resolveOptionBorder = useCallback(
    (optionCaption: string) => {
      if (!anncintTlllsmythhhsFeedbackShown) {
        return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionNeutral;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionPositive;
      }
      if (optionCaption === anncintTlllsmythhhsPickedCaption) {
        return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionNegative;
      }
      return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionNeutral;
    },
    [activePrompt, anncintTlllsmythhhsFeedbackShown, anncintTlllsmythhhsPickedCaption],
  );

  const resolveOptionLabel = useCallback(
    (optionCaption: string) => {
      if (!anncintTlllsmythhhsFeedbackShown) {
        return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionLabel;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionLabelPositive;
      }
      if (optionCaption === anncintTlllsmythhhsPickedCaption) {
        return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionLabelNegative;
      }
      return anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionLabel;
    },
    [activePrompt, anncintTlllsmythhhsFeedbackShown, anncintTlllsmythhhsPickedCaption],
  );

  React.useEffect(() => {
    if (anncintTlllsmythhhsScreenPhase !== 'active') {
      return;
    }
    const backSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setAnncintTlllsmythhhsLeaveDialogOpen(true);
        return true;
      },
    );
    return () => backSubscribe.remove();
  }, [anncintTlllsmythhhsScreenPhase]);

  const advanceCaption = useMemo(
    () => (anncintTlllsmythhhsPromptIndex >= anncintTlllsmythhhsTrialRoundCount - 1 ? 'Finish' : 'Next'),
    [anncintTlllsmythhhsPromptIndex],
  );

  if (anncintTlllsmythhhsScreenPhase === 'finished') {
    return (
      <AnncintTlllsmythhhsAppLayout tab>
        <AnncintTlllsmythhhsFadeInView style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsResultsWrap} triggerKey="complete">
          <Image
            source={require('../elements/images/anncintTlllsmythhhs_study_finished_banner.png')}
            style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsResultsVisual}
            resizeMode="contain"
          />
          <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsResultsHeading}>Quiz finished</Text>
          <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsResultsSummary}>
            You answered {anncintTlllsmythhhsSuccessCount} out of {anncintTlllsmythhhsTrialRoundCount} correctly
          </Text>
          <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsResultsMetric}>
            +{anncintTlllsmythhhsSuccessCount * anncintTlllsmythhhsInsightPerSuccess} Progress points
          </Text>
          <FilledActionControl
            optionCaption="View Artifacts"
            onActivate={() => tabNavigation.navigate(AnncintTlllsmythhhsRoutes.Artifacts)}
            surfaceExtra={anncintTlllsmythhhsStyles.anncintTlllsmythhhsResultsAction}
          />
          <BorderedActionControl
            optionCaption="Back to Quiz"
            onActivate={returnToIntro}
          />
        </AnncintTlllsmythhhsFadeInView>
      </AnncintTlllsmythhhsAppLayout>
    );
  }

  if (anncintTlllsmythhhsScreenPhase === 'active' && activePrompt) {
    return (
      <AnncintTlllsmythhhsAppLayout tab contentStyle={anncintTlllsmythhhsStyles.anncintTlllsmythhhsActiveScroll}>
        <AnncintTlllsmythhhsFadeInView triggerKey={anncintTlllsmythhhsPromptIndex}>
          <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsActiveHeader}>
            <Pressable
              onPress={() => setAnncintTlllsmythhhsLeaveDialogOpen(true)}
              style={({pressed}) => [
                anncintTlllsmythhhsStyles.anncintTlllsmythhhsNavControl,
                pressed && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
              ]}>
              <Image
                source={require('../elements/images/anncintTlllsmythhhs_nav_back_arrow.png')}
              />
            </Pressable>
            <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsActiveMeta}>
              <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsProgressLabel}>
                Question {anncintTlllsmythhhsPromptIndex + 1}/{anncintTlllsmythhhsTrialRoundCount}
              </Text>
              <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsScoreLabel}>{anncintTlllsmythhhsSuccessCount} Correct</Text>
            </View>
          </View>

          <AnncintTlllsmythhhsAnimatedProgressBar progress={roundProgress} />

          <Image
            source={activePrompt.coverVisual}
            style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsPromptVisual}
            resizeMode="cover"
          />

          <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsPromptPanel}>
            <AnncintTlllsmythhhsTypewriterText
              text={activePrompt.promptStem}
              style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsPromptCopy}
              triggerKey={anncintTlllsmythhhsPromptIndex}
            />
          </View>

          <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionsGrid}>
            {activePrompt.responseChoices.map(optionCaption => (
              <Pressable
                key={optionCaption}
                disabled={anncintTlllsmythhhsFeedbackShown}
                onPress={() => handleOptionPick(optionCaption)}
                style={({pressed}) => [
                  anncintTlllsmythhhsStyles.anncintTlllsmythhhsOptionCell,
                  resolveOptionBorder(optionCaption),
                  pressed && !anncintTlllsmythhhsFeedbackShown && anncintTlllsmythhhsStyles.anncintTlllsmythhhsPressedState,
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
            controlInactive={!anncintTlllsmythhhsFeedbackShown}
            surfaceExtra={anncintTlllsmythhhsStyles.anncintTlllsmythhhsAdvanceAction}
          />

          <ConfirmLeaveDialog
            dialogVisible={anncintTlllsmythhhsLeaveDialogOpen}
            onConfirmLeave={returnToIntro}
            onDismissLeave={() => setAnncintTlllsmythhhsLeaveDialogOpen(false)}
          />
        </AnncintTlllsmythhhsFadeInView>
      </AnncintTlllsmythhhsAppLayout>
    );
  }

  return (
    <AnncintTlllsmythhhsAppLayout tab>
      <AnncintTlllsmythhhsFadeInView>
        <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsScreenHeading}>Quiz</Text>
        <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsScreenSubheading}>
          Test your mythology knowledge
        </Text>

        <Image
          source={require('../elements/images/anncintTlllsmythhhs_study_intro_scene.png')}
          style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsCenterpieceVisual}
          resizeMode="contain"
        />

        <View style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsInfoPanel}>
          <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsInfoHeading}>Mythology Quiz</Text>
          <Text style={anncintTlllsmythhhsStyles.anncintTlllsmythhhsInfoCopy}>
            Answer 10 questions based on the tales and mythology from the app.
            Each correct answer adds 50 progress points toward unlocking more
            artifacts.
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Start Quiz"
          onActivate={beginTrial}
          surfaceExtra={anncintTlllsmythhhsStyles.anncintTlllsmythhhsPrimaryAction}
        />
      </AnncintTlllsmythhhsFadeInView>
    </AnncintTlllsmythhhsAppLayout>
  );
};

const anncintTlllsmythhhsStyles = StyleSheet.create({
  anncintTlllsmythhhsScreenHeading: {
    color: '#DAA520',
    fontSize: 48,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  anncintTlllsmythhhsScreenSubheading: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  anncintTlllsmythhhsCenterpieceVisual: {
    width: 242,
    height: 242,
    alignSelf: 'center',
    borderRadius: 28,
    marginBottom: 16,
  },
  anncintTlllsmythhhsInfoPanel: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24,
    gap: 12,
    marginBottom: 24,
  },
  anncintTlllsmythhhsInfoHeading: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  anncintTlllsmythhhsInfoCopy: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 26,
  },
  anncintTlllsmythhhsPrimaryAction: {
    minHeight: 56,
  },
  anncintTlllsmythhhsActiveScroll: {
    paddingBottom: 120,
  },
  anncintTlllsmythhhsActiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 40,
    marginBottom: 16,
  },
  anncintTlllsmythhhsNavControl: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsNavGlyph: {
    color: '#D4A574',
    fontSize: 20,
    fontWeight: '600',
  },
  anncintTlllsmythhhsActiveMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  anncintTlllsmythhhsProgressLabel: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 16,
    lineHeight: 24,
  },
  anncintTlllsmythhhsScoreLabel: {
    color: '#DAA520',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 'auto',
  },
  anncintTlllsmythhhsBarTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  anncintTlllsmythhhsBarFill: {
    height: '100%',
    borderRadius: 8,
    minWidth: 8,
  },
  anncintTlllsmythhhsPromptVisual: {
    width: 172,
    height: 172,
    borderRadius: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  anncintTlllsmythhhsPromptPanel: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24,
    marginBottom: 24,
    minHeight: 120,
    justifyContent: 'center',
  },
  anncintTlllsmythhhsPromptCopy: {
    color: '#D4A574',
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
  },
  anncintTlllsmythhhsOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  anncintTlllsmythhhsOptionCell: {
    width: '48%',
    minHeight: 74,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  anncintTlllsmythhhsOptionNeutral: {
    borderColor: 'rgba(212, 118, 62, 0.3)',
  },
  anncintTlllsmythhhsOptionPositive: {
    borderColor: '#15FF00',
  },
  anncintTlllsmythhhsOptionNegative: {
    borderColor: '#FF0000',
  },
  anncintTlllsmythhhsOptionLabel: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsOptionLabelPositive: {
    color: '#15FF00',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsOptionLabelNegative: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsAdvanceAction: {
    minHeight: 56,
    marginBottom: 16,
  },
  anncintTlllsmythhhsResultsWrap: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
    marginTop: 50,
  },
  anncintTlllsmythhhsResultsVisual: {
    width: 322,
    height: 322,
    borderRadius: 28,
    marginBottom: 8,
  },
  anncintTlllsmythhhsResultsHeading: {
    color: '#DAA520',
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 40,
    textAlign: 'center',
  },
  anncintTlllsmythhhsResultsSummary: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  anncintTlllsmythhhsResultsMetric: {
    color: '#D4763E',
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 8,
  },
  anncintTlllsmythhhsResultsAction: {
    width: '100%',
    minHeight: 56,
    marginTop: 8,
  },
  anncintTlllsmythhhsFilledPressable: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  anncintTlllsmythhhsFilledSurface: {
    minHeight: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anncintTlllsmythhhsFilledLabel: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  anncintTlllsmythhhsBorderedSurface: {
    width: '100%',
    minHeight: 56,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  anncintTlllsmythhhsBorderedLabel: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
  },
  anncintTlllsmythhhsDialogScrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  anncintTlllsmythhhsDialogPanel: {
    width: '100%',
    maxWidth: 361,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: '#2A1810',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  anncintTlllsmythhhsDialogHeading: {
    color: '#DAA520',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  anncintTlllsmythhhsDialogCopy: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  anncintTlllsmythhhsDialogDestructivePress: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  anncintTlllsmythhhsDialogDestructiveSurface: {
    minHeight: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  anncintTlllsmythhhsDialogDestructiveLabel: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  anncintTlllsmythhhsDialogSecondarySurface: {
    minHeight: 38,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
  },
  anncintTlllsmythhhsDialogSecondaryLabel: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  anncintTlllsmythhhsInactiveState: {
    opacity: 0.45,
  },
  anncintTlllsmythhhsPressedState: {
    opacity: 0.85,
  },
});

export default AnncintTlllsmythhhsQuizScreen;
