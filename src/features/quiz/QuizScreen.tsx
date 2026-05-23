// Quiz screen
import React, {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  BackHandler,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../../app/navigation/routes';
import type {MainTabParamList} from '../../app/navigation/types';
import {
  AnimatedProgressBar,
  AppLayout,
  FadeInView,
  TypewriterText,
} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

import {
  ravenQuestPickQuizQuestions,
  ravenQuestQuizTotal,
} from '../../../content/quiz';
import type {
  RavenQuestQuizQuestion,
  RavenQuestTrialPhase,
} from '../../shared/types';
import {
  ravenQuestAddQuizPoints,
  ravenQuestPointsPerCorrect,
} from '../../shared/lib';

const RavenQuestGradientBtn = ({
  ravenQuestLabel,
  ravenQuestOnPress,
  ravenQuestStyle,
  ravenQuestDisabled,
}: {
  ravenQuestLabel: string;
  ravenQuestOnPress: () => void;
  ravenQuestStyle?: object;
  ravenQuestDisabled?: boolean;
}) => (
  <Pressable
    disabled={ravenQuestDisabled}
    onPress={ravenQuestOnPress}
    style={({pressed}) => [
      styles.ravenQuestGradientPress,
      ravenQuestDisabled && styles.ravenQuestDisabled,
      pressed &&
        !ravenQuestDisabled &&
        styles.ravenQuestPressed,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[styles.ravenQuestGradientBtn, ravenQuestStyle]}>
      <Text style={styles.ravenQuestGradientText}>
        {ravenQuestLabel}
      </Text>
    </LinearGradient>
  </Pressable>
);

const RavenQuestOutlineBtn = ({
  ravenQuestLabel,
  ravenQuestOnPress,
}: {
  ravenQuestLabel: string;
  ravenQuestOnPress: () => void;
}) => (
  <Pressable
    onPress={ravenQuestOnPress}
    style={({pressed}) => [
      styles.ravenQuestOutlineBtn,
      pressed && styles.ravenQuestPressed,
    ]}>
    <Text style={styles.ravenQuestOutlineText}>
      {ravenQuestLabel}
    </Text>
  </Pressable>
);

const RavenQuestExitModal = ({
  ravenQuestVisible,
  ravenQuestOnExit,
  ravenQuestOnCancel,
}: {
  ravenQuestVisible: boolean;
  ravenQuestOnExit: () => void;
  ravenQuestOnCancel: () => void;
}) => (
  <Modal
    visible={ravenQuestVisible}
    transparent
    animationType="fade"
    onRequestClose={ravenQuestOnCancel}>
    <Pressable
      style={styles.ravenQuestModalOverlay}
      onPress={ravenQuestOnCancel}>
      <Pressable style={styles.ravenQuestModal}>
        <Text style={styles.ravenQuestModalTitle}>Exit Quiz?</Text>
        <Text style={styles.ravenQuestModalBody}>
          Your progress will be lost!
        </Text>
        <Pressable
          onPress={ravenQuestOnExit}
          style={({pressed}) => [
            styles.ravenQuestModalDeletePress,
            pressed && styles.ravenQuestPressed,
          ]}>
          <LinearGradient
            colors={gradients.danger}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={styles.ravenQuestModalDeleteBtn}>
            <Text style={styles.ravenQuestModalDeleteText}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={ravenQuestOnCancel}
          style={({pressed}) => [
            styles.ravenQuestModalCancelBtn,
            pressed && styles.ravenQuestPressed,
          ]}>
          <Text style={styles.ravenQuestModalCancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const QuizScreen = () => {
  const ravenQuestNavigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, typeof Routes.Quiz>>();
  const [ravenQuestView, setRavenQuestView] =
    useState<RavenQuestTrialPhase>('intro');
  const [ravenQuestQuestions, setRavenQuestQuestions] =
    useState<RavenQuestQuizQuestion[]>([]);
  const [ravenQuestIndex, setRavenQuestIndex] = useState(0);
  const [ravenQuestCorrect, setRavenQuestCorrect] = useState(0);
  const [ravenQuestSelected, setRavenQuestSelected] = useState<
    string | null
  >(null);
  const [ravenQuestRevealed, setRavenQuestRevealed] =
    useState(false);
  const [ravenQuestExitOpen, setRavenQuestExitOpen] =
    useState(false);

  const ravenQuestCurrent =
    ravenQuestQuestions[ravenQuestIndex];

  const ravenQuestProgress =
    ravenQuestQuestions.length > 0
      ? (ravenQuestIndex + (ravenQuestRevealed ? 1 : 0)) /
        ravenQuestQuizTotal
      : 0;

  // const ravenQuestResetPlay = useCallback(() => {
  //   setRavenQuestIndex(0);
  //   setRavenQuestCorrect(0);
  //   setRavenQuestSelected(null);
  //   setRavenQuestRevealed(false);
  //   setRavenQuestExitOpen(false);
  // }, []);

  const ravenQuestResetPlay = useCallback(() => {
    setRavenQuestIndex(0);
    setRavenQuestCorrect(0);
    setRavenQuestSelected(null);
    setRavenQuestRevealed(false);
    setRavenQuestExitOpen(false);
  }, []);

  const ravenQuestStartQuiz = useCallback(() => {
    setRavenQuestQuestions(ravenQuestPickQuizQuestions());
    ravenQuestResetPlay();
    setRavenQuestView('active');
  }, [ravenQuestResetPlay]);

  const ravenQuestExitToHome = useCallback(() => {
    setRavenQuestExitOpen(false);
    setRavenQuestQuestions([]);
    ravenQuestResetPlay();
    setRavenQuestView('intro');
  }, [ravenQuestResetPlay]);

  const ravenQuestFinishQuiz = useCallback(
    async (ravenQuestFinalCorrect: number) => {
      setRavenQuestCorrect(ravenQuestFinalCorrect);
      await ravenQuestAddQuizPoints(
        ravenQuestFinalCorrect * ravenQuestPointsPerCorrect,
      );
      setRavenQuestView('finished');
    },
    [],
  );

  const ravenQuestOnSelectAnswer = useCallback(
    (ravenQuestOption: string) => {
      if (!ravenQuestCurrent || ravenQuestRevealed) {
        return;
      }
      setRavenQuestSelected(ravenQuestOption);
      setRavenQuestRevealed(true);
      if (
        ravenQuestOption ===
        ravenQuestCurrent.ravenQuestCorrect
      ) {
        setRavenQuestCorrect(c => c + 1);
      }
    },
    [ravenQuestCurrent, ravenQuestRevealed],
  );

  const ravenQuestOnNext = useCallback(() => {
    if (!ravenQuestCurrent || !ravenQuestRevealed) {
      return;
    }

    if (ravenQuestIndex >= ravenQuestQuizTotal - 1) {
      ravenQuestFinishQuiz(ravenQuestCorrect);
      return;
    }

    setRavenQuestIndex(i => i + 1);
    setRavenQuestSelected(null);
    setRavenQuestRevealed(false);
  }, [
    ravenQuestCorrect,
    ravenQuestCurrent,
    ravenQuestFinishQuiz,
    ravenQuestIndex,
    ravenQuestRevealed,
  ]);

  const ravenQuestAnswerStyle = useCallback(
    (ravenQuestOption: string) => {
      if (!ravenQuestRevealed) {
        return styles.ravenQuestAnswerDefault;
      }
      if (
        ravenQuestOption ===
        ravenQuestCurrent?.ravenQuestCorrect
      ) {
        return styles.ravenQuestAnswerCorrect;
      }
      if (ravenQuestOption === ravenQuestSelected) {
        return styles.ravenQuestAnswerWrong;
      }
      return styles.ravenQuestAnswerDefault;
    },
    [
      ravenQuestCurrent,
      ravenQuestRevealed,
      ravenQuestSelected,
    ],
  );

  const ravenQuestAnswerTextStyle = useCallback(
    (ravenQuestOption: string) => {
      if (!ravenQuestRevealed) {
        return styles.ravenQuestAnswerText;
      }
      if (
        ravenQuestOption ===
        ravenQuestCurrent?.ravenQuestCorrect
      ) {
        return styles.ravenQuestAnswerTextCorrect;
      }
      if (ravenQuestOption === ravenQuestSelected) {
        return styles.ravenQuestAnswerTextWrong;
      }
      return styles.ravenQuestAnswerText;
    },
    [
      ravenQuestCurrent,
      ravenQuestRevealed,
      ravenQuestSelected,
    ],
  );

  React.useEffect(() => {
    if (ravenQuestView !== 'active') {
      return;
    }
    const ravenQuestSub = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setRavenQuestExitOpen(true);
        return true;
      },
    );
    return () => ravenQuestSub.remove();
  }, [ravenQuestView]);

  const ravenQuestNextLabel = useMemo(
    () =>
      ravenQuestIndex >= ravenQuestQuizTotal - 1
        ? 'Finish'
        : 'Next',
    [ravenQuestIndex],
  );

  if (ravenQuestView === 'finished') {
    return (
      <AppLayout tab>
        <FadeInView style={styles.ravenQuestCompleteWrap} triggerKey="complete">
          <Image
            source={require('../../../assets/imgs/quiz/quizComplete.png')}
            style={styles.ravenQuestCompleteImage}
            resizeMode="contain"
          />
          <Text style={styles.ravenQuestCompleteTitle}>
            Quiz Complete!
          </Text>
          <Text style={styles.ravenQuestCompleteScore}>
            You answered {ravenQuestCorrect} out of{' '}
            {ravenQuestQuizTotal} correctly
          </Text>
          <Text style={styles.ravenQuestCompletePoints}>
            +{ravenQuestCorrect * ravenQuestPointsPerCorrect}{' '}
            Insights
          </Text>
          <RavenQuestGradientBtn
            ravenQuestLabel="View Artifacts"
            ravenQuestOnPress={() =>
              ravenQuestNavigation.navigate(Routes.Artifacts)
            }
            ravenQuestStyle={styles.ravenQuestCompletePrimary}
          />
          <RavenQuestOutlineBtn
            ravenQuestLabel="Back to Quiz"
            ravenQuestOnPress={ravenQuestExitToHome}
          />
        </FadeInView>
      </AppLayout>
    );
  }

  if (ravenQuestView === 'active' && ravenQuestCurrent) {
    return (
      <AppLayout tab contentStyle={styles.ravenQuestPlayScroll}>
        <FadeInView triggerKey={ravenQuestIndex}>
        <View style={styles.ravenQuestPlayHeader}>
          <Pressable
            onPress={() => setRavenQuestExitOpen(true)}
            style={({pressed}) => [
              styles.ravenQuestBackBtn,
              pressed && styles.ravenQuestPressed,
            ]}>
            <Image source={require('../../../assets/imgs/icons/backIcon.png')} />
          </Pressable>
          <View style={styles.ravenQuestPlayHeaderMeta}>
            <Text style={styles.ravenQuestQuestionCount}>
              Question {ravenQuestIndex + 1}/
              {ravenQuestQuizTotal}
            </Text>
            <Text style={styles.ravenQuestCorrectCount}>
              {ravenQuestCorrect} Correct
            </Text>
          </View>
        </View>

        <AnimatedProgressBar progress={ravenQuestProgress} />

        <Image
          source={ravenQuestCurrent.ravenQuestImage}
          style={styles.ravenQuestQuizImage}
          resizeMode="cover"
        />

        <View style={styles.ravenQuestQuestionBox}>
          <TypewriterText
            text={ravenQuestCurrent.ravenQuestQuestion}
            style={styles.ravenQuestQuestionText}
            triggerKey={ravenQuestIndex}
          />
        </View>

        <View style={styles.ravenQuestAnswersGrid}>
          {ravenQuestCurrent.ravenQuestOptions.map(
            ravenQuestOption => (
              <Pressable
                key={ravenQuestOption}
                disabled={ravenQuestRevealed}
                onPress={() =>
                  ravenQuestOnSelectAnswer(ravenQuestOption)
                }
                style={({pressed}) => [
                  styles.ravenQuestAnswerBtn,
                  ravenQuestAnswerStyle(ravenQuestOption),
                  pressed &&
                    !ravenQuestRevealed &&
                    styles.ravenQuestPressed,
                ]}>
                <Text
                  style={ravenQuestAnswerTextStyle(
                    ravenQuestOption,
                  )}>
                  {ravenQuestOption}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <RavenQuestGradientBtn
          ravenQuestLabel={ravenQuestNextLabel}
          ravenQuestOnPress={ravenQuestOnNext}
          ravenQuestDisabled={!ravenQuestRevealed}
          ravenQuestStyle={styles.ravenQuestNextBtn}
        />

        <RavenQuestExitModal
          ravenQuestVisible={ravenQuestExitOpen}
          ravenQuestOnExit={ravenQuestExitToHome}
          ravenQuestOnCancel={() =>
            setRavenQuestExitOpen(false)
          }
        />
        </FadeInView>
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <FadeInView>
      <Text style={styles.ravenQuestTitle}>Quiz</Text>
      <Text style={styles.ravenQuestSubtitle}>
        Test your mythology knowledge
      </Text>

      <Image
        source={require('../../../assets/imgs/quiz/quizHero.png')}
        style={styles.ravenQuestHeroImage}
        resizeMode="contain"
      />

      <View style={styles.ravenQuestInfoCard}>
        <Text style={styles.ravenQuestInfoTitle}>Mythology Quiz</Text>
        <Text style={styles.ravenQuestInfoBody}>
          Answer 10 questions based on the tales and mythology from the app.
          Each correct answer adds 50 insights toward unlocking ancient
          artifacts.
        </Text>
      </View>

      <RavenQuestGradientBtn
        ravenQuestLabel="Start Quiz"
        ravenQuestOnPress={ravenQuestStartQuiz}
        ravenQuestStyle={styles.ravenQuestStartBtn}
      />
      </FadeInView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  ravenQuestTitle: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  ravenQuestSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  ravenQuestHeroImage: {
    width: 242.3,
    height: 242.4,
    alignSelf: 'center',
    borderRadius: 28.5,
    marginBottom: 16.1,
  },
  ravenQuestInfoCard: {
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.4,
    gap: 12.5,
    marginBottom: 24.1,
  },
  ravenQuestInfoTitle: {
    color: colors.gold,
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
  },
  ravenQuestInfoBody: {
    color: colors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
  ravenQuestStartBtn: {
    minHeight: 56.1,
  },
  ravenQuestPlayScroll: {
    paddingBottom: 120.2,
  },
  ravenQuestPlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.3,
    marginTop: 40.4,
    marginBottom: 16.5,
  },
  ravenQuestBackBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestBackIcon: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  ravenQuestPlayHeaderMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ravenQuestQuestionCount: {
    color: colors.textMutedSoft,
    fontSize: 16.1,
    lineHeight: 24.2,
  },
  ravenQuestCorrectCount: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginLeft: 'auto',
  },
  ravenQuestProgressTrack: {
    height: 8.5,
    borderRadius: 8.1,
    backgroundColor: colors.cardMedium,
    overflow: 'hidden',
    marginBottom: 24.2,
  },
  ravenQuestProgressFill: {
    height: '100%',
    borderRadius: 8.3,
    minWidth: 8.4,
  },
  ravenQuestQuizImage: {
    width: 172.5,
    height: 172.1,
    borderRadius: 28.2,
    alignSelf: 'center',
    marginBottom: 24.3,
  },
  ravenQuestQuestionBox: {
    borderRadius: 16.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.1,
    marginBottom: 24.2,
    minHeight: 120.3,
    justifyContent: 'center',
  },
  ravenQuestQuestionText: {
    color: colors.text,
    fontSize: 20.4,
    lineHeight: 32.5,
    textAlign: 'center',
  },
  ravenQuestAnswersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.1,
    marginBottom: 24.2,
  },
  ravenQuestAnswerBtn: {
    width: '48%',
    minHeight: 74.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12.1,
  },
  ravenQuestAnswerDefault: {
    borderColor: colors.borderMedium,
  },
  ravenQuestAnswerCorrect: {
    borderColor: colors.success,
  },
  ravenQuestAnswerWrong: {
    borderColor: colors.error,
  },
  ravenQuestAnswerText: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  ravenQuestAnswerTextCorrect: {
    color: colors.success,
    fontSize: 16.3,
    fontWeight: '500',
    textAlign: 'center',
  },
  ravenQuestAnswerTextWrong: {
    color: colors.error,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  ravenQuestNextBtn: {
    minHeight: 56.5,
    marginBottom: 16.1,
  },
  ravenQuestCompleteWrap: {
    alignItems: 'center',
    paddingTop: 8.2,
    paddingBottom: 24.3,
    gap: 12.4,
    marginTop: 50.5,
  },
  ravenQuestCompleteImage: {
    width: 322.1,
    height: 322.2,
    borderRadius: 28.3,
    marginBottom: 8.4,
  },
  ravenQuestCompleteTitle: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
    textAlign: 'center',
  },
  ravenQuestCompleteScore: {
    color: colors.textMutedLight,
    fontSize: 18.2,
    lineHeight: 28.3,
    textAlign: 'center',
  },
  ravenQuestCompletePoints: {
    color: colors.accent,
    fontSize: 24.4,
    lineHeight: 32.5,
    marginBottom: 8.1,
  },
  ravenQuestCompletePrimary: {
    width: '100%',
    minHeight: 56.2,
    marginTop: 8.3,
  },
  ravenQuestGradientPress: {
    borderRadius: 20.4,
    overflow: 'hidden',
    width: '100%',
  },
  ravenQuestGradientBtn: {
    minHeight: 56.5,
    borderRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ravenQuestGradientText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  ravenQuestOutlineBtn: {
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
  ravenQuestOutlineText: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
  },
  ravenQuestModalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  ravenQuestModal: {
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
  ravenQuestModalTitle: {
    color: colors.gold,
    fontSize: 18.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.1,
  },
  ravenQuestModalBody: {
    color: colors.textMutedLight,
    fontSize: 16.2,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.4,
  },
  ravenQuestModalDeletePress: {
    borderRadius: 14.5,
    overflow: 'hidden',
  },
  ravenQuestModalDeleteBtn: {
    minHeight: 36.1,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  ravenQuestModalDeleteText: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  ravenQuestModalCancelBtn: {
    minHeight: 38.5,
    borderRadius: 14.1,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.3,
  },
  ravenQuestModalCancelText: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  ravenQuestDisabled: {
    opacity: 0.45,
  },
  ravenQuestPressed: {
    opacity: 0.85,
  },
});

export default QuizScreen;
