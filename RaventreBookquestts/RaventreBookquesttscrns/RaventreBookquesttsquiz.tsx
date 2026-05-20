// Quiz screen

import React, {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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

import RaventreBookqueslayout from '../RaventreBookquesttscpnt/RaventreBookqueslayout';
import {
  raventreBookquesttsPickQuizQuestions,
  raventreBookquesttsQuizTotal,
  type RaventreBookquesttsQuizQuestion,
} from '../RaventreBookquesttsdata/raventreBookquesttsQuizData';
import {
  raventreBookquesttsAddQuizPoints,
  raventreBookquesttsPointsPerCorrect,
} from '../RaventreBookquesttsdata/raventreBookquesttsQuizPointsStorage';

type RaventreBookquesttsView = 'home' | 'play' | 'complete';

const RaventreBookquesttsGradientBtn = ({
  raventreBookquesttsLabel,
  raventreBookquesttsOnPress,
  raventreBookquesttsStyle,
  raventreBookquesttsDisabled,
}: {
  raventreBookquesttsLabel: string;
  raventreBookquesttsOnPress: () => void;
  raventreBookquesttsStyle?: object;
  raventreBookquesttsDisabled?: boolean;
}) => (
  <Pressable
    disabled={raventreBookquesttsDisabled}
    onPress={raventreBookquesttsOnPress}
    style={({pressed}) => [
      styles.raventreBookquesttsGradientPress,
      raventreBookquesttsDisabled && styles.raventreBookquesttsDisabled,
      pressed &&
        !raventreBookquesttsDisabled &&
        styles.raventreBookquesttsPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[styles.raventreBookquesttsGradientBtn, raventreBookquesttsStyle]}>
      <Text style={styles.raventreBookquesttsGradientText}>
        {raventreBookquesttsLabel}
      </Text>
    </LinearGradient>
  </Pressable>
);

const RaventreBookquesttsOutlineBtn = ({
  raventreBookquesttsLabel,
  raventreBookquesttsOnPress,
}: {
  raventreBookquesttsLabel: string;
  raventreBookquesttsOnPress: () => void;
}) => (
  <Pressable
    onPress={raventreBookquesttsOnPress}
    style={({pressed}) => [
      styles.raventreBookquesttsOutlineBtn,
      pressed && styles.raventreBookquesttsPressed,
    ]}>
    <Text style={styles.raventreBookquesttsOutlineText}>
      {raventreBookquesttsLabel}
    </Text>
  </Pressable>
);

const RaventreBookquesttsExitModal = ({
  raventreBookquesttsVisible,
  raventreBookquesttsOnExit,
  raventreBookquesttsOnCancel,
}: {
  raventreBookquesttsVisible: boolean;
  raventreBookquesttsOnExit: () => void;
  raventreBookquesttsOnCancel: () => void;
}) => (
  <Modal
    visible={raventreBookquesttsVisible}
    transparent
    animationType="fade"
    onRequestClose={raventreBookquesttsOnCancel}>
    <Pressable
      style={styles.raventreBookquesttsModalOverlay}
      onPress={raventreBookquesttsOnCancel}>
      <Pressable
        style={styles.raventreBookquesttsModal}
        onPress={e => e.stopPropagation()}>
        <Text style={styles.raventreBookquesttsModalTitle}>Exit Quiz?</Text>
        <Text style={styles.raventreBookquesttsModalBody}>
          Your progress will be lost!
        </Text>
        <Pressable
          onPress={raventreBookquesttsOnExit}
          style={({pressed}) => [
            styles.raventreBookquesttsModalDeletePress,
            pressed && styles.raventreBookquesttsPressed,
          ]}>
          <LinearGradient
            colors={['#8B1A1A', 'rgba(139,26,26,0.8)']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.raventreBookquesttsModalDeleteBtn}>
            <Text style={styles.raventreBookquesttsModalDeleteText}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={raventreBookquesttsOnCancel}
          style={({pressed}) => [
            styles.raventreBookquesttsModalCancelBtn,
            pressed && styles.raventreBookquesttsPressed,
          ]}>
          <Text style={styles.raventreBookquesttsModalCancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const RaventreBookquesttsquiz = () => {
  const raventreBookquesttsNavigation = useNavigation();
  const [raventreBookquesttsView, setRaventreBookquesttsView] =
    useState<RaventreBookquesttsView>('home');
  const [raventreBookquesttsQuestions, setRaventreBookquesttsQuestions] =
    useState<RaventreBookquesttsQuizQuestion[]>([]);
  const [raventreBookquesttsIndex, setRaventreBookquesttsIndex] = useState(0);
  const [raventreBookquesttsCorrect, setRaventreBookquesttsCorrect] =
    useState(0);
  const [raventreBookquesttsSelected, setRaventreBookquesttsSelected] =
    useState<string | null>(null);
  const [raventreBookquesttsRevealed, setRaventreBookquesttsRevealed] =
    useState(false);
  const [raventreBookquesttsExitOpen, setRaventreBookquesttsExitOpen] =
    useState(false);

  const raventreBookquesttsCurrent =
    raventreBookquesttsQuestions[raventreBookquesttsIndex];

  const raventreBookquesttsProgress =
    raventreBookquesttsQuestions.length > 0
      ? (raventreBookquesttsIndex + (raventreBookquesttsRevealed ? 1 : 0)) /
        raventreBookquesttsQuizTotal
      : 0;

  const raventreBookquesttsResetPlay = useCallback(() => {
    setRaventreBookquesttsIndex(0);
    setRaventreBookquesttsCorrect(0);
    setRaventreBookquesttsSelected(null);
    setRaventreBookquesttsRevealed(false);
    setRaventreBookquesttsExitOpen(false);
  }, []);

  const raventreBookquesttsStartQuiz = useCallback(() => {
    setRaventreBookquesttsQuestions(raventreBookquesttsPickQuizQuestions());
    raventreBookquesttsResetPlay();
    setRaventreBookquesttsView('play');
  }, [raventreBookquesttsResetPlay]);

  const raventreBookquesttsExitToHome = useCallback(() => {
    setRaventreBookquesttsExitOpen(false);
    setRaventreBookquesttsQuestions([]);
    raventreBookquesttsResetPlay();
    setRaventreBookquesttsView('home');
  }, [raventreBookquesttsResetPlay]);

  const raventreBookquesttsFinishQuiz = useCallback(
    async (raventreBookquesttsFinalCorrect: number) => {
      setRaventreBookquesttsCorrect(raventreBookquesttsFinalCorrect);
      await raventreBookquesttsAddQuizPoints(
        raventreBookquesttsFinalCorrect * raventreBookquesttsPointsPerCorrect,
      );
      setRaventreBookquesttsView('complete');
    },
    [],
  );

  const raventreBookquesttsOnSelectAnswer = useCallback(
    (raventreBookquesttsOption: string) => {
      if (!raventreBookquesttsCurrent || raventreBookquesttsRevealed) {
        return;
      }
      setRaventreBookquesttsSelected(raventreBookquesttsOption);
      setRaventreBookquesttsRevealed(true);
      if (
        raventreBookquesttsOption ===
        raventreBookquesttsCurrent.raventreBookquesttsCorrect
      ) {
        setRaventreBookquesttsCorrect(c => c + 1);
      }
    },
    [raventreBookquesttsCurrent, raventreBookquesttsRevealed],
  );

  const raventreBookquesttsOnNext = useCallback(() => {
    if (!raventreBookquesttsCurrent || !raventreBookquesttsRevealed) {
      return;
    }

    if (raventreBookquesttsIndex >= raventreBookquesttsQuizTotal - 1) {
      raventreBookquesttsFinishQuiz(raventreBookquesttsCorrect);
      return;
    }

    setRaventreBookquesttsIndex(i => i + 1);
    setRaventreBookquesttsSelected(null);
    setRaventreBookquesttsRevealed(false);
  }, [
    raventreBookquesttsCorrect,
    raventreBookquesttsCurrent,
    raventreBookquesttsFinishQuiz,
    raventreBookquesttsIndex,
    raventreBookquesttsRevealed,
  ]);

  const raventreBookquesttsAnswerStyle = useCallback(
    (raventreBookquesttsOption: string) => {
      if (!raventreBookquesttsRevealed) {
        return styles.raventreBookquesttsAnswerDefault;
      }
      if (
        raventreBookquesttsOption ===
        raventreBookquesttsCurrent?.raventreBookquesttsCorrect
      ) {
        return styles.raventreBookquesttsAnswerCorrect;
      }
      if (raventreBookquesttsOption === raventreBookquesttsSelected) {
        return styles.raventreBookquesttsAnswerWrong;
      }
      return styles.raventreBookquesttsAnswerDefault;
    },
    [
      raventreBookquesttsCurrent,
      raventreBookquesttsRevealed,
      raventreBookquesttsSelected,
    ],
  );

  const raventreBookquesttsAnswerTextStyle = useCallback(
    (raventreBookquesttsOption: string) => {
      if (!raventreBookquesttsRevealed) {
        return styles.raventreBookquesttsAnswerText;
      }
      if (
        raventreBookquesttsOption ===
        raventreBookquesttsCurrent?.raventreBookquesttsCorrect
      ) {
        return styles.raventreBookquesttsAnswerTextCorrect;
      }
      if (raventreBookquesttsOption === raventreBookquesttsSelected) {
        return styles.raventreBookquesttsAnswerTextWrong;
      }
      return styles.raventreBookquesttsAnswerText;
    },
    [
      raventreBookquesttsCurrent,
      raventreBookquesttsRevealed,
      raventreBookquesttsSelected,
    ],
  );

  React.useEffect(() => {
    if (raventreBookquesttsView !== 'play') {
      return;
    }
    const raventreBookquesttsSub = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setRaventreBookquesttsExitOpen(true);
        return true;
      },
    );
    return () => raventreBookquesttsSub.remove();
  }, [raventreBookquesttsView]);

  const raventreBookquesttsNextLabel = useMemo(
    () =>
      raventreBookquesttsIndex >= raventreBookquesttsQuizTotal - 1
        ? 'Finish'
        : 'Next',
    [raventreBookquesttsIndex],
  );

  if (raventreBookquesttsView === 'complete') {
    return (
      <RaventreBookqueslayout raventreBookquesttsTab>
        <View style={styles.raventreBookquesttsCompleteWrap}>
          <Image
            source={require('../../assets/img/raventrebolquicomplt.png')}
            style={styles.raventreBookquesttsCompleteImage}
            resizeMode="contain"
          />
          <Text style={styles.raventreBookquesttsCompleteTitle}>
            Quiz Complete!
          </Text>
          <Text style={styles.raventreBookquesttsCompleteScore}>
            You answered {raventreBookquesttsCorrect} out of{' '}
            {raventreBookquesttsQuizTotal} correctly
          </Text>
          <Text style={styles.raventreBookquesttsCompletePoints}>
            +{raventreBookquesttsCorrect} Points
          </Text>
          <RaventreBookquesttsGradientBtn
            raventreBookquesttsLabel="View Artifacts"
            raventreBookquesttsOnPress={() =>
              raventreBookquesttsNavigation.navigate(
                'RaventreBookquesttsarfcts' as never,
              )
            }
            raventreBookquesttsStyle={styles.raventreBookquesttsCompletePrimary}
          />
          <RaventreBookquesttsOutlineBtn
            raventreBookquesttsLabel="Back to Quiz"
            raventreBookquesttsOnPress={raventreBookquesttsExitToHome}
          />
        </View>
      </RaventreBookqueslayout>
    );
  }

  if (raventreBookquesttsView === 'play' && raventreBookquesttsCurrent) {
    return (
      <RaventreBookqueslayout
        raventreBookquesttsTab
        contentStyle={styles.raventreBookquesttsPlayScroll}>
        <View style={styles.raventreBookquesttsPlayHeader}>
          <Pressable
            onPress={() => setRaventreBookquesttsExitOpen(true)}
            style={({pressed}) => [
              styles.raventreBookquesttsBackBtn,
              pressed && styles.raventreBookquesttsPressed,
            ]}>
            <Image source={require('../../assets/img/raventrebolback.png')} />
          </Pressable>
          <View style={styles.raventreBookquesttsPlayHeaderMeta}>
            <Text style={styles.raventreBookquesttsQuestionCount}>
              Question {raventreBookquesttsIndex + 1}/
              {raventreBookquesttsQuizTotal}
            </Text>
            <Text style={styles.raventreBookquesttsCorrectCount}>
              {raventreBookquesttsCorrect} Correct
            </Text>
          </View>
        </View>

        <View style={styles.raventreBookquesttsProgressTrack}>
          <LinearGradient
            colors={['#D4763E', '#FF9F40']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={[
              styles.raventreBookquesttsProgressFill,
              {width: `${Math.max(raventreBookquesttsProgress * 100, 4)}%`},
            ]}
          />
        </View>

        <Image
          source={raventreBookquesttsCurrent.raventreBookquesttsImage}
          style={styles.raventreBookquesttsQuizImage}
          resizeMode="cover"
        />

        <View style={styles.raventreBookquesttsQuestionBox}>
          <Text style={styles.raventreBookquesttsQuestionText}>
            {raventreBookquesttsCurrent.raventreBookquesttsQuestion}
          </Text>
        </View>

        <View style={styles.raventreBookquesttsAnswersGrid}>
          {raventreBookquesttsCurrent.raventreBookquesttsOptions.map(
            raventreBookquesttsOption => (
              <Pressable
                key={raventreBookquesttsOption}
                disabled={raventreBookquesttsRevealed}
                onPress={() =>
                  raventreBookquesttsOnSelectAnswer(raventreBookquesttsOption)
                }
                style={({pressed}) => [
                  styles.raventreBookquesttsAnswerBtn,
                  raventreBookquesttsAnswerStyle(raventreBookquesttsOption),
                  pressed &&
                    !raventreBookquesttsRevealed &&
                    styles.raventreBookquesttsPressed,
                ]}>
                <Text
                  style={raventreBookquesttsAnswerTextStyle(
                    raventreBookquesttsOption,
                  )}>
                  {raventreBookquesttsOption}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <RaventreBookquesttsGradientBtn
          raventreBookquesttsLabel={raventreBookquesttsNextLabel}
          raventreBookquesttsOnPress={raventreBookquesttsOnNext}
          raventreBookquesttsDisabled={!raventreBookquesttsRevealed}
          raventreBookquesttsStyle={styles.raventreBookquesttsNextBtn}
        />

        <RaventreBookquesttsExitModal
          raventreBookquesttsVisible={raventreBookquesttsExitOpen}
          raventreBookquesttsOnExit={raventreBookquesttsExitToHome}
          raventreBookquesttsOnCancel={() =>
            setRaventreBookquesttsExitOpen(false)
          }
        />
      </RaventreBookqueslayout>
    );
  }

  return (
    <RaventreBookqueslayout raventreBookquesttsTab>
      <Text style={styles.raventreBookquesttsTitle}>Quiz</Text>
      <Text style={styles.raventreBookquesttsSubtitle}>
        Test your mythology knowledge
      </Text>

      <Image
        source={require('../../assets/img/raventrebolquizhero.png')}
        style={styles.raventreBookquesttsHeroImage}
        resizeMode="contain"
      />

      <View style={styles.raventreBookquesttsInfoCard}>
        <Text style={styles.raventreBookquesttsInfoTitle}>Mythology Quiz</Text>
        <Text style={styles.raventreBookquesttsInfoBody}>
          Answer 10 questions based on the tales and mythology from the app.
          Each correct answer earns you 50 points to unlock ancient artifacts.
        </Text>
      </View>

      <RaventreBookquesttsGradientBtn
        raventreBookquesttsLabel="Start Quiz"
        raventreBookquesttsOnPress={raventreBookquesttsStartQuiz}
        raventreBookquesttsStyle={styles.raventreBookquesttsStartBtn}
      />
    </RaventreBookqueslayout>
  );
};

const styles = StyleSheet.create({
  raventreBookquesttsTitle: {
    color: '#DAA520',
    fontSize: 48,
    fontWeight: '500',
    lineHeight: 48,
    marginBottom: 8,
    marginTop: 25,
  },
  raventreBookquesttsSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  raventreBookquesttsHeroImage: {
    width: 242,
    height: 242,
    alignSelf: 'center',
    borderRadius: 28,
    marginBottom: 16,
  },
  raventreBookquesttsInfoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24,
    gap: 12,
    marginBottom: 24,
  },
  raventreBookquesttsInfoTitle: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 32,
  },
  raventreBookquesttsInfoBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 26,
  },
  raventreBookquesttsStartBtn: {
    minHeight: 56,
  },
  raventreBookquesttsPlayScroll: {
    paddingBottom: 120,
  },
  raventreBookquesttsPlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 40,
    marginBottom: 16,
  },
  raventreBookquesttsBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsBackIcon: {
    color: '#D4A574',
    fontSize: 20,
    fontWeight: '600',
  },
  raventreBookquesttsPlayHeaderMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  raventreBookquesttsQuestionCount: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 16,
    lineHeight: 24,
  },
  raventreBookquesttsCorrectCount: {
    color: '#DAA520',
    fontSize: 16,
    lineHeight: 24,
  },
  raventreBookquesttsProgressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  raventreBookquesttsProgressFill: {
    height: '100%',
    borderRadius: 8,
    minWidth: 8,
  },
  raventreBookquesttsQuizImage: {
    width: 172,
    height: 172,
    borderRadius: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  raventreBookquesttsQuestionBox: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24,
    marginBottom: 24,
    minHeight: 120,
    justifyContent: 'center',
  },
  raventreBookquesttsQuestionText: {
    color: '#D4A574',
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
  },
  raventreBookquesttsAnswersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  raventreBookquesttsAnswerBtn: {
    width: '48%',
    minHeight: 74,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  raventreBookquesttsAnswerDefault: {
    borderColor: 'rgba(212, 118, 62, 0.3)',
  },
  raventreBookquesttsAnswerCorrect: {
    borderColor: '#15FF00',
  },
  raventreBookquesttsAnswerWrong: {
    borderColor: '#FF0000',
  },
  raventreBookquesttsAnswerText: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  raventreBookquesttsAnswerTextCorrect: {
    color: '#15FF00',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  raventreBookquesttsAnswerTextWrong: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  raventreBookquesttsNextBtn: {
    minHeight: 56,
    marginBottom: 16,
  },
  raventreBookquesttsCompleteWrap: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
    marginTop: 50,
  },
  raventreBookquesttsCompleteImage: {
    width: 322,
    height: 322,
    borderRadius: 28,
    marginBottom: 8,
  },
  raventreBookquesttsCompleteTitle: {
    color: '#DAA520',
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 40,
    textAlign: 'center',
  },
  raventreBookquesttsCompleteScore: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  raventreBookquesttsCompletePoints: {
    color: '#D4763E',
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 8,
  },
  raventreBookquesttsCompletePrimary: {
    width: '100%',
    minHeight: 56,
    marginTop: 8,
  },
  raventreBookquesttsGradientPress: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  raventreBookquesttsGradientBtn: {
    minHeight: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsGradientText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  raventreBookquesttsOutlineBtn: {
    width: '100%',
    minHeight: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  raventreBookquesttsOutlineText: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
  },
  raventreBookquesttsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  raventreBookquesttsModal: {
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
  raventreBookquesttsModalTitle: {
    color: '#DAA520',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  raventreBookquesttsModalBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  raventreBookquesttsModalDeletePress: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  raventreBookquesttsModalDeleteBtn: {
    minHeight: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  raventreBookquesttsModalDeleteText: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  raventreBookquesttsModalCancelBtn: {
    minHeight: 38,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
  },
  raventreBookquesttsModalCancelText: {
    color: '#D4A574',
    fontSize: 14,
    fontWeight: '500',
  },
  raventreBookquesttsDisabled: {
    opacity: 0.45,
  },
  raventreBookquesttsPressed: {
    opacity: 0.85,
  },
});

export default RaventreBookquesttsquiz;
