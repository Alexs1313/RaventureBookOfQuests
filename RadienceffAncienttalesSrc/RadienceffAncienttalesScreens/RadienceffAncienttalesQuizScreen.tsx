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
import {RadienceffAncienttalesRoutes} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesRoutes';
import type {RadienceffAncienttalesMainTabParamList} from '../RadienceffAncienttalesNavigation/RadienceffAncienttalesTypes';
import {
  RadienceffAncienttalesAnimatedProgressBar,
  RadienceffAncienttalesAppLayout,
  RadienceffAncienttalesFadeInView,
  RadienceffAncienttalesTypewriterText,
} from '../RadienceffAncienttalesComponents';
import {radienceffAncienttalesColors, radienceffAncienttalesGradients, radienceffAncienttalesGradientAxis} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette';

import {radienceffAncienttalesSampleTrialPrompts, radienceffAncienttalesTrialRoundCount} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData/RadienceffAncienttalesQuiz';
import type {RadienceffAncienttalesTrialPrompt, RadienceffAncienttalesTrialPhase} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes';
import {radienceffAncienttalesCreditInsightBalance, radienceffAncienttalesInsightPerSuccess} from '../RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit';

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
      radienceffAncienttalesStyles.radienceffAncienttalesFilledPressable,
      controlInactive && radienceffAncienttalesStyles.radienceffAncienttalesInactiveState,
      pressed && !controlInactive && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    <LinearGradient
      colors={radienceffAncienttalesGradients.primary}
      start={radienceffAncienttalesGradientAxis.horizontal.start}
      end={radienceffAncienttalesGradientAxis.horizontal.end}
      style={[radienceffAncienttalesStyles.radienceffAncienttalesFilledSurface, surfaceExtra]}>
      <Text style={radienceffAncienttalesStyles.radienceffAncienttalesFilledLabel}>{optionCaption}</Text>
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
      radienceffAncienttalesStyles.radienceffAncienttalesBorderedSurface,
      pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
    ]}>
    <Text style={radienceffAncienttalesStyles.radienceffAncienttalesBorderedLabel}>{optionCaption}</Text>
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
    <Pressable style={radienceffAncienttalesStyles.radienceffAncienttalesDialogScrim} onPress={onDismissLeave}>
      <Pressable style={radienceffAncienttalesStyles.radienceffAncienttalesDialogPanel}>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDialogHeading}>Exit Quiz?</Text>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDialogCopy}>Your progress will be lost!</Text>
        <Pressable
          onPress={onConfirmLeave}
          style={({pressed}) => [
            radienceffAncienttalesStyles.radienceffAncienttalesDialogDestructivePress,
            pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
          ]}>
          <LinearGradient
            colors={radienceffAncienttalesGradients.danger}
            start={radienceffAncienttalesGradientAxis.horizontal.start}
            end={radienceffAncienttalesGradientAxis.horizontal.end}
            style={radienceffAncienttalesStyles.radienceffAncienttalesDialogDestructiveSurface}>
            <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDialogDestructiveLabel}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={onDismissLeave}
          style={({pressed}) => [
            radienceffAncienttalesStyles.radienceffAncienttalesDialogSecondarySurface,
            pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
          ]}>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesDialogSecondaryLabel}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const RadienceffAncienttalesQuizScreen = () => {
  const tabNavigation =
    useNavigation<
      BottomTabNavigationProp<RadienceffAncienttalesMainTabParamList, typeof RadienceffAncienttalesRoutes.Quiz>
    >();
  const [radienceffAncienttalesScreenPhase, setRadienceffAncienttalesScreenPhase] = useState<RadienceffAncienttalesTrialPhase>('intro');
  const [radienceffAncienttalesPromptBatch, setRadienceffAncienttalesPromptBatch] = useState<RadienceffAncienttalesTrialPrompt[]>([]);
  const [radienceffAncienttalesPromptIndex, setRadienceffAncienttalesPromptIndex] = useState(0);
  const [radienceffAncienttalesSuccessCount, setRadienceffAncienttalesSuccessCount] = useState(0);
  const [radienceffAncienttalesPickedCaption, setRadienceffAncienttalesPickedCaption] = useState<string | null>(null);
  const [radienceffAncienttalesFeedbackShown, setRadienceffAncienttalesFeedbackShown] = useState(false);
  const [radienceffAncienttalesLeaveDialogOpen, setRadienceffAncienttalesLeaveDialogOpen] = useState(false);

  const activePrompt = radienceffAncienttalesPromptBatch[radienceffAncienttalesPromptIndex];

  const roundProgress =
    radienceffAncienttalesPromptBatch.length > 0
      ? (radienceffAncienttalesPromptIndex + (radienceffAncienttalesFeedbackShown ? 1 : 0)) / radienceffAncienttalesTrialRoundCount
      : 0;

  const resetRound = useCallback(() => {
    setRadienceffAncienttalesPromptIndex(0);
    setRadienceffAncienttalesSuccessCount(0);
    setRadienceffAncienttalesPickedCaption(null);
    setRadienceffAncienttalesFeedbackShown(false);
    setRadienceffAncienttalesLeaveDialogOpen(false);
  }, []);

  const beginTrial = useCallback(() => {
    setRadienceffAncienttalesPromptBatch(radienceffAncienttalesSampleTrialPrompts());
    resetRound();
    setRadienceffAncienttalesScreenPhase('active');
  }, [resetRound]);

  const returnToIntro = useCallback(() => {
    setRadienceffAncienttalesLeaveDialogOpen(false);
    setRadienceffAncienttalesPromptBatch([]);
    resetRound();
    setRadienceffAncienttalesScreenPhase('intro');
  }, [resetRound]);

  const concludeTrial = useCallback(async (finalSuccessCount: number) => {
    setRadienceffAncienttalesSuccessCount(finalSuccessCount);
    await radienceffAncienttalesCreditInsightBalance(finalSuccessCount * radienceffAncienttalesInsightPerSuccess);
    setRadienceffAncienttalesScreenPhase('finished');
  }, []);

  const handleOptionPick = useCallback(
    (optionCaption: string) => {
      if (!activePrompt || radienceffAncienttalesFeedbackShown) {
        return;
      }
      setRadienceffAncienttalesPickedCaption(optionCaption);
      setRadienceffAncienttalesFeedbackShown(true);
      if (optionCaption === activePrompt.keyedResponse) {
        setRadienceffAncienttalesSuccessCount(c => c + 1);
      }
    },
    [activePrompt, radienceffAncienttalesFeedbackShown],
  );

  const advanceRound = useCallback(() => {
    if (!activePrompt || !radienceffAncienttalesFeedbackShown) {
      return;
    }

    if (radienceffAncienttalesPromptIndex >= radienceffAncienttalesTrialRoundCount - 1) {
      concludeTrial(radienceffAncienttalesSuccessCount);
      return;
    }

    setRadienceffAncienttalesPromptIndex(i => i + 1);
    setRadienceffAncienttalesPickedCaption(null);
    setRadienceffAncienttalesFeedbackShown(false);
  }, [radienceffAncienttalesSuccessCount, activePrompt, concludeTrial, radienceffAncienttalesPromptIndex, radienceffAncienttalesFeedbackShown]);

  const resolveOptionBorder = useCallback(
    (optionCaption: string) => {
      if (!radienceffAncienttalesFeedbackShown) {
        return radienceffAncienttalesStyles.radienceffAncienttalesOptionNeutral;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return radienceffAncienttalesStyles.radienceffAncienttalesOptionPositive;
      }
      if (optionCaption === radienceffAncienttalesPickedCaption) {
        return radienceffAncienttalesStyles.radienceffAncienttalesOptionNegative;
      }
      return radienceffAncienttalesStyles.radienceffAncienttalesOptionNeutral;
    },
    [activePrompt, radienceffAncienttalesFeedbackShown, radienceffAncienttalesPickedCaption],
  );

  const resolveOptionLabel = useCallback(
    (optionCaption: string) => {
      if (!radienceffAncienttalesFeedbackShown) {
        return radienceffAncienttalesStyles.radienceffAncienttalesOptionLabel;
      }
      if (optionCaption === activePrompt?.keyedResponse) {
        return radienceffAncienttalesStyles.radienceffAncienttalesOptionLabelPositive;
      }
      if (optionCaption === radienceffAncienttalesPickedCaption) {
        return radienceffAncienttalesStyles.radienceffAncienttalesOptionLabelNegative;
      }
      return radienceffAncienttalesStyles.radienceffAncienttalesOptionLabel;
    },
    [activePrompt, radienceffAncienttalesFeedbackShown, radienceffAncienttalesPickedCaption],
  );

  React.useEffect(() => {
    if (radienceffAncienttalesScreenPhase !== 'active') {
      return;
    }
    const backSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setRadienceffAncienttalesLeaveDialogOpen(true);
        return true;
      },
    );
    return () => backSubscribe.remove();
  }, [radienceffAncienttalesScreenPhase]);

  const advanceCaption = useMemo(
    () => (radienceffAncienttalesPromptIndex >= radienceffAncienttalesTrialRoundCount - 1 ? 'Finish' : 'Next'),
    [radienceffAncienttalesPromptIndex],
  );

  if (radienceffAncienttalesScreenPhase === 'finished') {
    return (
      <RadienceffAncienttalesAppLayout tab>
        <RadienceffAncienttalesFadeInView style={radienceffAncienttalesStyles.radienceffAncienttalesResultsWrap} triggerKey="complete">
          <Image
            source={require('../../elements/images/study_finished_banner.png')}
            style={radienceffAncienttalesStyles.radienceffAncienttalesResultsVisual}
            resizeMode="contain"
          />
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesResultsHeading}>Quiz finished</Text>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesResultsSummary}>
            You answered {radienceffAncienttalesSuccessCount} out of {radienceffAncienttalesTrialRoundCount} correctly
          </Text>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesResultsMetric}>
            +{radienceffAncienttalesSuccessCount * radienceffAncienttalesInsightPerSuccess} Progress points
          </Text>
          <FilledActionControl
            optionCaption="View Artifacts"
            onActivate={() => tabNavigation.navigate(RadienceffAncienttalesRoutes.Artifacts)}
            surfaceExtra={radienceffAncienttalesStyles.radienceffAncienttalesResultsAction}
          />
          <BorderedActionControl
            optionCaption="Back to Quiz"
            onActivate={returnToIntro}
          />
        </RadienceffAncienttalesFadeInView>
      </RadienceffAncienttalesAppLayout>
    );
  }

  if (radienceffAncienttalesScreenPhase === 'active' && activePrompt) {
    return (
      <RadienceffAncienttalesAppLayout tab contentStyle={radienceffAncienttalesStyles.radienceffAncienttalesActiveScroll}>
        <RadienceffAncienttalesFadeInView triggerKey={radienceffAncienttalesPromptIndex}>
          <View style={radienceffAncienttalesStyles.radienceffAncienttalesActiveHeader}>
            <Pressable
              onPress={() => setRadienceffAncienttalesLeaveDialogOpen(true)}
              style={({pressed}) => [
                radienceffAncienttalesStyles.radienceffAncienttalesNavControl,
                pressed && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
              ]}>
              <Image
                source={require('../../elements/images/nav_back_arrow.png')}
              />
            </Pressable>
            <View style={radienceffAncienttalesStyles.radienceffAncienttalesActiveMeta}>
              <Text style={radienceffAncienttalesStyles.radienceffAncienttalesProgressLabel}>
                Question {radienceffAncienttalesPromptIndex + 1}/{radienceffAncienttalesTrialRoundCount}
              </Text>
              <Text style={radienceffAncienttalesStyles.radienceffAncienttalesScoreLabel}>{radienceffAncienttalesSuccessCount} Correct</Text>
            </View>
          </View>

          <RadienceffAncienttalesAnimatedProgressBar progress={roundProgress} />

          <Image
            source={activePrompt.coverVisual}
            style={radienceffAncienttalesStyles.radienceffAncienttalesPromptVisual}
            resizeMode="cover"
          />

          <View style={radienceffAncienttalesStyles.radienceffAncienttalesPromptPanel}>
            <RadienceffAncienttalesTypewriterText
              text={activePrompt.promptStem}
              style={radienceffAncienttalesStyles.radienceffAncienttalesPromptCopy}
              triggerKey={radienceffAncienttalesPromptIndex}
            />
          </View>

          <View style={radienceffAncienttalesStyles.radienceffAncienttalesOptionsGrid}>
            {activePrompt.responseChoices.map(optionCaption => (
              <Pressable
                key={optionCaption}
                disabled={radienceffAncienttalesFeedbackShown}
                onPress={() => handleOptionPick(optionCaption)}
                style={({pressed}) => [
                  radienceffAncienttalesStyles.radienceffAncienttalesOptionCell,
                  resolveOptionBorder(optionCaption),
                  pressed && !radienceffAncienttalesFeedbackShown && radienceffAncienttalesStyles.radienceffAncienttalesPressedState,
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
            controlInactive={!radienceffAncienttalesFeedbackShown}
            surfaceExtra={radienceffAncienttalesStyles.radienceffAncienttalesAdvanceAction}
          />

          <ConfirmLeaveDialog
            dialogVisible={radienceffAncienttalesLeaveDialogOpen}
            onConfirmLeave={returnToIntro}
            onDismissLeave={() => setRadienceffAncienttalesLeaveDialogOpen(false)}
          />
        </RadienceffAncienttalesFadeInView>
      </RadienceffAncienttalesAppLayout>
    );
  }

  return (
    <RadienceffAncienttalesAppLayout tab>
      <RadienceffAncienttalesFadeInView>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesScreenHeading}>Quiz</Text>
        <Text style={radienceffAncienttalesStyles.radienceffAncienttalesScreenSubheading}>
          Test your mythology knowledge
        </Text>

        <Image
          source={require('../../elements/images/study_intro_scene.png')}
          style={radienceffAncienttalesStyles.radienceffAncienttalesCenterpieceVisual}
          resizeMode="contain"
        />

        <View style={radienceffAncienttalesStyles.radienceffAncienttalesInfoPanel}>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesInfoHeading}>Mythology Quiz</Text>
          <Text style={radienceffAncienttalesStyles.radienceffAncienttalesInfoCopy}>
            Answer 10 questions based on the tales and mythology from the app.
            Each correct answer adds 50 progress points toward unlocking more
            artifacts.
          </Text>
        </View>

        <FilledActionControl
          optionCaption="Start Quiz"
          onActivate={beginTrial}
          surfaceExtra={radienceffAncienttalesStyles.radienceffAncienttalesPrimaryAction}
        />
      </RadienceffAncienttalesFadeInView>
    </RadienceffAncienttalesAppLayout>
  );
};

const radienceffAncienttalesStyles = StyleSheet.create({
  radienceffAncienttalesScreenHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  radienceffAncienttalesScreenSubheading: {
    color: radienceffAncienttalesColors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  radienceffAncienttalesCenterpieceVisual: {
    width: 242.3,
    height: 242.4,
    alignSelf: 'center',
    borderRadius: 28.5,
    marginBottom: 16.1,
  },
  radienceffAncienttalesInfoPanel: {
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.card,
    padding: 24.4,
    gap: 12.5,
    marginBottom: 24.1,
  },
  radienceffAncienttalesInfoHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
  },
  radienceffAncienttalesInfoCopy: {
    color: radienceffAncienttalesColors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
  radienceffAncienttalesPrimaryAction: {
    minHeight: 56.1,
  },
  radienceffAncienttalesActiveScroll: {
    paddingBottom: 120.2,
  },
  radienceffAncienttalesActiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.3,
    marginTop: 40.4,
    marginBottom: 16.5,
  },
  radienceffAncienttalesNavControl: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: radienceffAncienttalesColors.cardOverlay,
    borderWidth: 1.4,
    borderColor: radienceffAncienttalesColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesNavGlyph: {
    color: radienceffAncienttalesColors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  radienceffAncienttalesActiveMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radienceffAncienttalesProgressLabel: {
    color: radienceffAncienttalesColors.textMutedSoft,
    fontSize: 16.1,
    lineHeight: 24.2,
  },
  radienceffAncienttalesScoreLabel: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginLeft: 'auto',
  },
  radienceffAncienttalesBarTrack: {
    height: 8.5,
    borderRadius: 8.1,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    overflow: 'hidden',
    marginBottom: 24.2,
  },
  radienceffAncienttalesBarFill: {
    height: '100%',
    borderRadius: 8.3,
    minWidth: 8.4,
  },
  radienceffAncienttalesPromptVisual: {
    width: 172.5,
    height: 172.1,
    borderRadius: 28.2,
    alignSelf: 'center',
    marginBottom: 24.3,
  },
  radienceffAncienttalesPromptPanel: {
    borderRadius: 16.4,
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.card,
    padding: 24.1,
    marginBottom: 24.2,
    minHeight: 120.3,
    justifyContent: 'center',
  },
  radienceffAncienttalesPromptCopy: {
    color: radienceffAncienttalesColors.text,
    fontSize: 20.4,
    lineHeight: 32.5,
    textAlign: 'center',
  },
  radienceffAncienttalesOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.1,
    marginBottom: 24.2,
  },
  radienceffAncienttalesOptionCell: {
    width: '48%',
    minHeight: 74.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    backgroundColor: radienceffAncienttalesColors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12.1,
  },
  radienceffAncienttalesOptionNeutral: {
    borderColor: radienceffAncienttalesColors.borderMedium,
  },
  radienceffAncienttalesOptionPositive: {
    borderColor: radienceffAncienttalesColors.success,
  },
  radienceffAncienttalesOptionNegative: {
    borderColor: radienceffAncienttalesColors.error,
  },
  radienceffAncienttalesOptionLabel: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesOptionLabelPositive: {
    color: radienceffAncienttalesColors.success,
    fontSize: 16.3,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesOptionLabelNegative: {
    color: radienceffAncienttalesColors.error,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesAdvanceAction: {
    minHeight: 56.5,
    marginBottom: 16.1,
  },
  radienceffAncienttalesResultsWrap: {
    alignItems: 'center',
    paddingTop: 8.2,
    paddingBottom: 24.3,
    gap: 12.4,
    marginTop: 50.5,
  },
  radienceffAncienttalesResultsVisual: {
    width: 322.1,
    height: 322.2,
    borderRadius: 28.3,
    marginBottom: 8.4,
  },
  radienceffAncienttalesResultsHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
    textAlign: 'center',
  },
  radienceffAncienttalesResultsSummary: {
    color: radienceffAncienttalesColors.textMutedLight,
    fontSize: 18.2,
    lineHeight: 28.3,
    textAlign: 'center',
  },
  radienceffAncienttalesResultsMetric: {
    color: radienceffAncienttalesColors.accent,
    fontSize: 24.4,
    lineHeight: 32.5,
    marginBottom: 8.1,
  },
  radienceffAncienttalesResultsAction: {
    width: '100%',
    minHeight: 56.2,
    marginTop: 8.3,
  },
  radienceffAncienttalesFilledPressable: {
    borderRadius: 20.4,
    overflow: 'hidden',
    width: '100%',
  },
  radienceffAncienttalesFilledSurface: {
    minHeight: 56.5,
    borderRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radienceffAncienttalesFilledLabel: {
    color: radienceffAncienttalesColors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  radienceffAncienttalesBorderedSurface: {
    width: '100%',
    minHeight: 56.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14.1,
  },
  radienceffAncienttalesBorderedLabel: {
    color: radienceffAncienttalesColors.text,
    fontSize: 16.2,
    fontWeight: '500',
  },
  radienceffAncienttalesDialogScrim: {
    flex: 1,
    backgroundColor: radienceffAncienttalesColors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  radienceffAncienttalesDialogPanel: {
    width: '100%',
    maxWidth: 361.4,
    borderRadius: 16.5,
    borderWidth: 1.1,
    borderColor: radienceffAncienttalesColors.borderMedium,
    backgroundColor: radienceffAncienttalesColors.surface,
    paddingHorizontal: 24.2,
    paddingVertical: 24.3,
    gap: 12.4,
  },
  radienceffAncienttalesDialogHeading: {
    color: radienceffAncienttalesColors.gold,
    fontSize: 18.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.1,
  },
  radienceffAncienttalesDialogCopy: {
    color: radienceffAncienttalesColors.textMutedLight,
    fontSize: 16.2,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.4,
  },
  radienceffAncienttalesDialogDestructivePress: {
    borderRadius: 14.5,
    overflow: 'hidden',
  },
  radienceffAncienttalesDialogDestructiveSurface: {
    minHeight: 36.1,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  radienceffAncienttalesDialogDestructiveLabel: {
    color: radienceffAncienttalesColors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  radienceffAncienttalesDialogSecondarySurface: {
    minHeight: 38.5,
    borderRadius: 14.1,
    borderWidth: 1.2,
    borderColor: radienceffAncienttalesColors.border,
    backgroundColor: radienceffAncienttalesColors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.3,
  },
  radienceffAncienttalesDialogSecondaryLabel: {
    color: radienceffAncienttalesColors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  radienceffAncienttalesInactiveState: {
    opacity: 0.45,
  },
  radienceffAncienttalesPressedState: {
    opacity: 0.85,
  },
});

export default RadienceffAncienttalesQuizScreen;
