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
import {AppLayout} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

import {
  legendsaventurebkkPickQuizQuestions,
  legendsaventurebkkQuizTotal,
} from '../../content/quiz';
import type {
  LegendsaventurebkkQuizQuestion,
  LegendsaventurebkkQuizView,
} from '../../shared/types';
import {
  legendsaventurebkkAddQuizPoints,
  legendsaventurebkkPointsPerCorrect,
} from '../../shared/lib';

const LegendsaventurebkkGradientBtn = ({
  legendsaventurebkkLabel,
  legendsaventurebkkOnPress,
  legendsaventurebkkStyle,
  legendsaventurebkkDisabled,
}: {
  legendsaventurebkkLabel: string;
  legendsaventurebkkOnPress: () => void;
  legendsaventurebkkStyle?: object;
  legendsaventurebkkDisabled?: boolean;
}) => (
  <Pressable
    disabled={legendsaventurebkkDisabled}
    onPress={legendsaventurebkkOnPress}
    style={({pressed}) => [
      styles.legendsaventurebkkGradientPress,
      legendsaventurebkkDisabled && styles.legendsaventurebkkDisabled,
      pressed &&
        !legendsaventurebkkDisabled &&
        styles.legendsaventurebkkPressed,
    ]}>
    <LinearGradient
      colors={gradients.primary}
      start={gradientAxis.horizontal.start}
      end={gradientAxis.horizontal.end}
      style={[styles.legendsaventurebkkGradientBtn, legendsaventurebkkStyle]}>
      <Text style={styles.legendsaventurebkkGradientText}>
        {legendsaventurebkkLabel}
      </Text>
    </LinearGradient>
  </Pressable>
);

const LegendsaventurebkkOutlineBtn = ({
  legendsaventurebkkLabel,
  legendsaventurebkkOnPress,
}: {
  legendsaventurebkkLabel: string;
  legendsaventurebkkOnPress: () => void;
}) => (
  <Pressable
    onPress={legendsaventurebkkOnPress}
    style={({pressed}) => [
      styles.legendsaventurebkkOutlineBtn,
      pressed && styles.legendsaventurebkkPressed,
    ]}>
    <Text style={styles.legendsaventurebkkOutlineText}>
      {legendsaventurebkkLabel}
    </Text>
  </Pressable>
);

const LegendsaventurebkkExitModal = ({
  legendsaventurebkkVisible,
  legendsaventurebkkOnExit,
  legendsaventurebkkOnCancel,
}: {
  legendsaventurebkkVisible: boolean;
  legendsaventurebkkOnExit: () => void;
  legendsaventurebkkOnCancel: () => void;
}) => (
  <Modal
    visible={legendsaventurebkkVisible}
    transparent
    animationType="fade"
    onRequestClose={legendsaventurebkkOnCancel}>
    <Pressable
      style={styles.legendsaventurebkkModalOverlay}
      onPress={legendsaventurebkkOnCancel}>
      <Pressable
        style={styles.legendsaventurebkkModal}
        onPress={e => e.stopPropagation()}>
        <Text style={styles.legendsaventurebkkModalTitle}>Exit Quiz?</Text>
        <Text style={styles.legendsaventurebkkModalBody}>
          Your progress will be lost!
        </Text>
        <Pressable
          onPress={legendsaventurebkkOnExit}
          style={({pressed}) => [
            styles.legendsaventurebkkModalDeletePress,
            pressed && styles.legendsaventurebkkPressed,
          ]}>
          <LinearGradient
            colors={gradients.danger}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={styles.legendsaventurebkkModalDeleteBtn}>
            <Text style={styles.legendsaventurebkkModalDeleteText}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={legendsaventurebkkOnCancel}
          style={({pressed}) => [
            styles.legendsaventurebkkModalCancelBtn,
            pressed && styles.legendsaventurebkkPressed,
          ]}>
          <Text style={styles.legendsaventurebkkModalCancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const QuizScreen = () => {
  const legendsaventurebkkNavigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, typeof Routes.Quiz>>();
  const [legendsaventurebkkView, setLegendsaventurebkkView] =
    useState<LegendsaventurebkkQuizView>('home');
  const [legendsaventurebkkQuestions, setLegendsaventurebkkQuestions] =
    useState<LegendsaventurebkkQuizQuestion[]>([]);
  const [legendsaventurebkkIndex, setLegendsaventurebkkIndex] = useState(0);
  const [legendsaventurebkkCorrect, setLegendsaventurebkkCorrect] = useState(0);
  const [legendsaventurebkkSelected, setLegendsaventurebkkSelected] = useState<
    string | null
  >(null);
  const [legendsaventurebkkRevealed, setLegendsaventurebkkRevealed] =
    useState(false);
  const [legendsaventurebkkExitOpen, setLegendsaventurebkkExitOpen] =
    useState(false);

  const legendsaventurebkkCurrent =
    legendsaventurebkkQuestions[legendsaventurebkkIndex];

  const legendsaventurebkkProgress =
    legendsaventurebkkQuestions.length > 0
      ? (legendsaventurebkkIndex + (legendsaventurebkkRevealed ? 1 : 0)) /
        legendsaventurebkkQuizTotal
      : 0;

  // const legendsaventurebkkResetPlay = useCallback(() => {
  //   setLegendsaventurebkkIndex(0);
  //   setLegendsaventurebkkCorrect(0);
  //   setLegendsaventurebkkSelected(null);
  //   setLegendsaventurebkkRevealed(false);
  //   setLegendsaventurebkkExitOpen(false);
  // }, []);

  const legendsaventurebkkResetPlay = useCallback(() => {
    setLegendsaventurebkkIndex(0);
    setLegendsaventurebkkCorrect(0);
    setLegendsaventurebkkSelected(null);
    setLegendsaventurebkkRevealed(false);
    setLegendsaventurebkkExitOpen(false);
  }, []);

  const legendsaventurebkkStartQuiz = useCallback(() => {
    setLegendsaventurebkkQuestions(legendsaventurebkkPickQuizQuestions());
    legendsaventurebkkResetPlay();
    setLegendsaventurebkkView('play');
  }, [legendsaventurebkkResetPlay]);

  const legendsaventurebkkExitToHome = useCallback(() => {
    setLegendsaventurebkkExitOpen(false);
    setLegendsaventurebkkQuestions([]);
    legendsaventurebkkResetPlay();
    setLegendsaventurebkkView('home');
  }, [legendsaventurebkkResetPlay]);

  const legendsaventurebkkFinishQuiz = useCallback(
    async (legendsaventurebkkFinalCorrect: number) => {
      setLegendsaventurebkkCorrect(legendsaventurebkkFinalCorrect);
      await legendsaventurebkkAddQuizPoints(
        legendsaventurebkkFinalCorrect * legendsaventurebkkPointsPerCorrect,
      );
      setLegendsaventurebkkView('complete');
    },
    [],
  );

  const legendsaventurebkkOnSelectAnswer = useCallback(
    (legendsaventurebkkOption: string) => {
      if (!legendsaventurebkkCurrent || legendsaventurebkkRevealed) {
        return;
      }
      setLegendsaventurebkkSelected(legendsaventurebkkOption);
      setLegendsaventurebkkRevealed(true);
      if (
        legendsaventurebkkOption ===
        legendsaventurebkkCurrent.legendsaventurebkkCorrect
      ) {
        setLegendsaventurebkkCorrect(c => c + 1);
      }
    },
    [legendsaventurebkkCurrent, legendsaventurebkkRevealed],
  );

  const legendsaventurebkkOnNext = useCallback(() => {
    if (!legendsaventurebkkCurrent || !legendsaventurebkkRevealed) {
      return;
    }

    if (legendsaventurebkkIndex >= legendsaventurebkkQuizTotal - 1) {
      legendsaventurebkkFinishQuiz(legendsaventurebkkCorrect);
      return;
    }

    setLegendsaventurebkkIndex(i => i + 1);
    setLegendsaventurebkkSelected(null);
    setLegendsaventurebkkRevealed(false);
  }, [
    legendsaventurebkkCorrect,
    legendsaventurebkkCurrent,
    legendsaventurebkkFinishQuiz,
    legendsaventurebkkIndex,
    legendsaventurebkkRevealed,
  ]);

  const legendsaventurebkkAnswerStyle = useCallback(
    (legendsaventurebkkOption: string) => {
      if (!legendsaventurebkkRevealed) {
        return styles.legendsaventurebkkAnswerDefault;
      }
      if (
        legendsaventurebkkOption ===
        legendsaventurebkkCurrent?.legendsaventurebkkCorrect
      ) {
        return styles.legendsaventurebkkAnswerCorrect;
      }
      if (legendsaventurebkkOption === legendsaventurebkkSelected) {
        return styles.legendsaventurebkkAnswerWrong;
      }
      return styles.legendsaventurebkkAnswerDefault;
    },
    [
      legendsaventurebkkCurrent,
      legendsaventurebkkRevealed,
      legendsaventurebkkSelected,
    ],
  );

  const legendsaventurebkkAnswerTextStyle = useCallback(
    (legendsaventurebkkOption: string) => {
      if (!legendsaventurebkkRevealed) {
        return styles.legendsaventurebkkAnswerText;
      }
      if (
        legendsaventurebkkOption ===
        legendsaventurebkkCurrent?.legendsaventurebkkCorrect
      ) {
        return styles.legendsaventurebkkAnswerTextCorrect;
      }
      if (legendsaventurebkkOption === legendsaventurebkkSelected) {
        return styles.legendsaventurebkkAnswerTextWrong;
      }
      return styles.legendsaventurebkkAnswerText;
    },
    [
      legendsaventurebkkCurrent,
      legendsaventurebkkRevealed,
      legendsaventurebkkSelected,
    ],
  );

  React.useEffect(() => {
    if (legendsaventurebkkView !== 'play') {
      return;
    }
    const legendsaventurebkkSub = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setLegendsaventurebkkExitOpen(true);
        return true;
      },
    );
    return () => legendsaventurebkkSub.remove();
  }, [legendsaventurebkkView]);

  const legendsaventurebkkNextLabel = useMemo(
    () =>
      legendsaventurebkkIndex >= legendsaventurebkkQuizTotal - 1
        ? 'Finish'
        : 'Next',
    [legendsaventurebkkIndex],
  );

  if (legendsaventurebkkView === 'complete') {
    return (
      <AppLayout tab>
        <View style={styles.legendsaventurebkkCompleteWrap}>
          <Image
            source={require('../../../assets/imgs/quiz/quizComplete.png')}
            style={styles.legendsaventurebkkCompleteImage}
            resizeMode="contain"
          />
          <Text style={styles.legendsaventurebkkCompleteTitle}>
            Quiz Complete!
          </Text>
          <Text style={styles.legendsaventurebkkCompleteScore}>
            You answered {legendsaventurebkkCorrect} out of{' '}
            {legendsaventurebkkQuizTotal} correctly
          </Text>
          <Text style={styles.legendsaventurebkkCompletePoints}>
            +{legendsaventurebkkCorrect * legendsaventurebkkPointsPerCorrect}{' '}
            Insights
          </Text>
          <LegendsaventurebkkGradientBtn
            legendsaventurebkkLabel="View Artifacts"
            legendsaventurebkkOnPress={() =>
              legendsaventurebkkNavigation.navigate(Routes.Artifacts)
            }
            legendsaventurebkkStyle={styles.legendsaventurebkkCompletePrimary}
          />
          <LegendsaventurebkkOutlineBtn
            legendsaventurebkkLabel="Back to Quiz"
            legendsaventurebkkOnPress={legendsaventurebkkExitToHome}
          />
        </View>
      </AppLayout>
    );
  }

  if (legendsaventurebkkView === 'play' && legendsaventurebkkCurrent) {
    return (
      <AppLayout tab contentStyle={styles.legendsaventurebkkPlayScroll}>
        <View style={styles.legendsaventurebkkPlayHeader}>
          <Pressable
            onPress={() => setLegendsaventurebkkExitOpen(true)}
            style={({pressed}) => [
              styles.legendsaventurebkkBackBtn,
              pressed && styles.legendsaventurebkkPressed,
            ]}>
            <Image source={require('../../../assets/imgs/icons/backIcon.png')} />
          </Pressable>
          <View style={styles.legendsaventurebkkPlayHeaderMeta}>
            <Text style={styles.legendsaventurebkkQuestionCount}>
              Question {legendsaventurebkkIndex + 1}/
              {legendsaventurebkkQuizTotal}
            </Text>
            <Text style={styles.legendsaventurebkkCorrectCount}>
              {legendsaventurebkkCorrect} Correct
            </Text>
          </View>
        </View>

        <View style={styles.legendsaventurebkkProgressTrack}>
          <LinearGradient
            colors={gradients.primary}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={[
              styles.legendsaventurebkkProgressFill,
              {width: `${Math.max(legendsaventurebkkProgress * 100, 4.2)}%`},
            ]}
          />
        </View>

        <Image
          source={legendsaventurebkkCurrent.legendsaventurebkkImage}
          style={styles.legendsaventurebkkQuizImage}
          resizeMode="cover"
        />

        <View style={styles.legendsaventurebkkQuestionBox}>
          <Text style={styles.legendsaventurebkkQuestionText}>
            {legendsaventurebkkCurrent.legendsaventurebkkQuestion}
          </Text>
        </View>

        <View style={styles.legendsaventurebkkAnswersGrid}>
          {legendsaventurebkkCurrent.legendsaventurebkkOptions.map(
            legendsaventurebkkOption => (
              <Pressable
                key={legendsaventurebkkOption}
                disabled={legendsaventurebkkRevealed}
                onPress={() =>
                  legendsaventurebkkOnSelectAnswer(legendsaventurebkkOption)
                }
                style={({pressed}) => [
                  styles.legendsaventurebkkAnswerBtn,
                  legendsaventurebkkAnswerStyle(legendsaventurebkkOption),
                  pressed &&
                    !legendsaventurebkkRevealed &&
                    styles.legendsaventurebkkPressed,
                ]}>
                <Text
                  style={legendsaventurebkkAnswerTextStyle(
                    legendsaventurebkkOption,
                  )}>
                  {legendsaventurebkkOption}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <LegendsaventurebkkGradientBtn
          legendsaventurebkkLabel={legendsaventurebkkNextLabel}
          legendsaventurebkkOnPress={legendsaventurebkkOnNext}
          legendsaventurebkkDisabled={!legendsaventurebkkRevealed}
          legendsaventurebkkStyle={styles.legendsaventurebkkNextBtn}
        />

        <LegendsaventurebkkExitModal
          legendsaventurebkkVisible={legendsaventurebkkExitOpen}
          legendsaventurebkkOnExit={legendsaventurebkkExitToHome}
          legendsaventurebkkOnCancel={() =>
            setLegendsaventurebkkExitOpen(false)
          }
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout tab>
      <Text style={styles.legendsaventurebkkTitle}>Quiz</Text>
      <Text style={styles.legendsaventurebkkSubtitle}>
        Test your mythology knowledge
      </Text>

      <Image
        source={require('../../../assets/imgs/quiz/quizHero.png')}
        style={styles.legendsaventurebkkHeroImage}
        resizeMode="contain"
      />

      <View style={styles.legendsaventurebkkInfoCard}>
        <Text style={styles.legendsaventurebkkInfoTitle}>Mythology Quiz</Text>
        <Text style={styles.legendsaventurebkkInfoBody}>
          Answer 10 questions based on the tales and mythology from the app.
          Each correct answer adds 50 insights toward unlocking ancient
          artifacts.
        </Text>
      </View>

      <LegendsaventurebkkGradientBtn
        legendsaventurebkkLabel="Start Quiz"
        legendsaventurebkkOnPress={legendsaventurebkkStartQuiz}
        legendsaventurebkkStyle={styles.legendsaventurebkkStartBtn}
      />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  legendsaventurebkkTitle: {
    color: colors.gold,
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  legendsaventurebkkSubtitle: {
    color: colors.textMuted,
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  legendsaventurebkkHeroImage: {
    width: 242.3,
    height: 242.4,
    alignSelf: 'center',
    borderRadius: 28.5,
    marginBottom: 16.1,
  },
  legendsaventurebkkInfoCard: {
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.4,
    gap: 12.5,
    marginBottom: 24.1,
  },
  legendsaventurebkkInfoTitle: {
    color: colors.gold,
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
  },
  legendsaventurebkkInfoBody: {
    color: colors.textMutedLight,
    fontSize: 16.4,
    lineHeight: 26.5,
  },
  legendsaventurebkkStartBtn: {
    minHeight: 56.1,
  },
  legendsaventurebkkPlayScroll: {
    paddingBottom: 120.2,
  },
  legendsaventurebkkPlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.3,
    marginTop: 40.4,
    marginBottom: 16.5,
  },
  legendsaventurebkkBackBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: colors.cardOverlay,
    borderWidth: 1.4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkBackIcon: {
    color: colors.text,
    fontSize: 20.5,
    fontWeight: '600',
  },
  legendsaventurebkkPlayHeaderMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendsaventurebkkQuestionCount: {
    color: colors.textMutedSoft,
    fontSize: 16.1,
    lineHeight: 24.2,
  },
  legendsaventurebkkCorrectCount: {
    color: colors.gold,
    fontSize: 16.3,
    lineHeight: 24.4,
    marginLeft: 'auto',
  },
  legendsaventurebkkProgressTrack: {
    height: 8.5,
    borderRadius: 8.1,
    backgroundColor: colors.cardMedium,
    overflow: 'hidden',
    marginBottom: 24.2,
  },
  legendsaventurebkkProgressFill: {
    height: '100%',
    borderRadius: 8.3,
    minWidth: 8.4,
  },
  legendsaventurebkkQuizImage: {
    width: 172.5,
    height: 172.1,
    borderRadius: 28.2,
    alignSelf: 'center',
    marginBottom: 24.3,
  },
  legendsaventurebkkQuestionBox: {
    borderRadius: 16.4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 24.1,
    marginBottom: 24.2,
    minHeight: 120.3,
    justifyContent: 'center',
  },
  legendsaventurebkkQuestionText: {
    color: colors.text,
    fontSize: 20.4,
    lineHeight: 32.5,
    textAlign: 'center',
  },
  legendsaventurebkkAnswersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.1,
    marginBottom: 24.2,
  },
  legendsaventurebkkAnswerBtn: {
    width: '48%',
    minHeight: 74.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12.1,
  },
  legendsaventurebkkAnswerDefault: {
    borderColor: colors.borderMedium,
  },
  legendsaventurebkkAnswerCorrect: {
    borderColor: colors.success,
  },
  legendsaventurebkkAnswerWrong: {
    borderColor: colors.error,
  },
  legendsaventurebkkAnswerText: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendsaventurebkkAnswerTextCorrect: {
    color: colors.success,
    fontSize: 16.3,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendsaventurebkkAnswerTextWrong: {
    color: colors.error,
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendsaventurebkkNextBtn: {
    minHeight: 56.5,
    marginBottom: 16.1,
  },
  legendsaventurebkkCompleteWrap: {
    alignItems: 'center',
    paddingTop: 8.2,
    paddingBottom: 24.3,
    gap: 12.4,
    marginTop: 50.5,
  },
  legendsaventurebkkCompleteImage: {
    width: 322.1,
    height: 322.2,
    borderRadius: 28.3,
    marginBottom: 8.4,
  },
  legendsaventurebkkCompleteTitle: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
    textAlign: 'center',
  },
  legendsaventurebkkCompleteScore: {
    color: colors.textMutedLight,
    fontSize: 18.2,
    lineHeight: 28.3,
    textAlign: 'center',
  },
  legendsaventurebkkCompletePoints: {
    color: colors.accent,
    fontSize: 24.4,
    lineHeight: 32.5,
    marginBottom: 8.1,
  },
  legendsaventurebkkCompletePrimary: {
    width: '100%',
    minHeight: 56.2,
    marginTop: 8.3,
  },
  legendsaventurebkkGradientPress: {
    borderRadius: 20.4,
    overflow: 'hidden',
    width: '100%',
  },
  legendsaventurebkkGradientBtn: {
    minHeight: 56.5,
    borderRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkGradientText: {
    color: colors.textDark,
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  legendsaventurebkkOutlineBtn: {
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
  legendsaventurebkkOutlineText: {
    color: colors.text,
    fontSize: 16.2,
    fontWeight: '500',
  },
  legendsaventurebkkModalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  legendsaventurebkkModal: {
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
  legendsaventurebkkModalTitle: {
    color: colors.gold,
    fontSize: 18.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.1,
  },
  legendsaventurebkkModalBody: {
    color: colors.textMutedLight,
    fontSize: 16.2,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.4,
  },
  legendsaventurebkkModalDeletePress: {
    borderRadius: 14.5,
    overflow: 'hidden',
  },
  legendsaventurebkkModalDeleteBtn: {
    minHeight: 36.1,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  legendsaventurebkkModalDeleteText: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  legendsaventurebkkModalCancelBtn: {
    minHeight: 38.5,
    borderRadius: 14.1,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.cardMedium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.3,
  },
  legendsaventurebkkModalCancelText: {
    color: colors.text,
    fontSize: 14.4,
    fontWeight: '500',
  },
  legendsaventurebkkDisabled: {
    opacity: 0.45,
  },
  legendsaventurebkkPressed: {
    opacity: 0.85,
  },
});

export default QuizScreen;
