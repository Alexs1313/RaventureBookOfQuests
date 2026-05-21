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

import Bookqqestlayout from '../Bookqqestcpnt/Bookqqestlayout';
import {
  bookqqestPickQuizQuestions,
  bookqqestQuizTotal,
  type BookqqestQuizQuestion,
} from '../Bookqqestdata/bookqqestQuizData';
import {
  bookqqestAddQuizPoints,
  bookqqestPointsPerCorrect,
} from '../Bookqqestdata/bookqqestQuizPointsStorage';

type BookqqestView = 'home' | 'play' | 'complete';

const BookqqestGradientBtn = ({
  bookqqestLabel,
  bookqqestOnPress,
  bookqqestStyle,
  bookqqestDisabled,
}: {
  bookqqestLabel: string;
  bookqqestOnPress: () => void;
  bookqqestStyle?: object;
  bookqqestDisabled?: boolean;
}) => (
  <Pressable
    disabled={bookqqestDisabled}
    onPress={bookqqestOnPress}
    style={({pressed}) => [
      styles.bookqqestGradientPress,
      bookqqestDisabled && styles.bookqqestDisabled,
      pressed &&
        !bookqqestDisabled &&
        styles.bookqqestPressed,
    ]}>
    <LinearGradient
      colors={['#D4763E', '#FF9F40']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[styles.bookqqestGradientBtn, bookqqestStyle]}>
      <Text style={styles.bookqqestGradientText}>
        {bookqqestLabel}
      </Text>
    </LinearGradient>
  </Pressable>
);

const BookqqestOutlineBtn = ({
  bookqqestLabel,
  bookqqestOnPress,
}: {
  bookqqestLabel: string;
  bookqqestOnPress: () => void;
}) => (
  <Pressable
    onPress={bookqqestOnPress}
    style={({pressed}) => [
      styles.bookqqestOutlineBtn,
      pressed && styles.bookqqestPressed,
    ]}>
    <Text style={styles.bookqqestOutlineText}>
      {bookqqestLabel}
    </Text>
  </Pressable>
);

const BookqqestExitModal = ({
  bookqqestVisible,
  bookqqestOnExit,
  bookqqestOnCancel,
}: {
  bookqqestVisible: boolean;
  bookqqestOnExit: () => void;
  bookqqestOnCancel: () => void;
}) => (
  <Modal
    visible={bookqqestVisible}
    transparent
    animationType="fade"
    onRequestClose={bookqqestOnCancel}>
    <Pressable
      style={styles.bookqqestModalOverlay}
      onPress={bookqqestOnCancel}>
      <Pressable
        style={styles.bookqqestModal}
        onPress={e => e.stopPropagation()}>
        <Text style={styles.bookqqestModalTitle}>Exit Quiz?</Text>
        <Text style={styles.bookqqestModalBody}>
          Your progress will be lost!
        </Text>
        <Pressable
          onPress={bookqqestOnExit}
          style={({pressed}) => [
            styles.bookqqestModalDeletePress,
            pressed && styles.bookqqestPressed,
          ]}>
          <LinearGradient
            colors={['#8B1A1A', 'rgba(139,26,26,0.8)']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.bookqqestModalDeleteBtn}>
            <Text style={styles.bookqqestModalDeleteText}>Exit</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={bookqqestOnCancel}
          style={({pressed}) => [
            styles.bookqqestModalCancelBtn,
            pressed && styles.bookqqestPressed,
          ]}>
          <Text style={styles.bookqqestModalCancelText}>Cancel</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
);

const Bookqqestquiz = () => {
  const bookqqestNavigation = useNavigation();
  const [bookqqestView, setBookqqestView] =
    useState<BookqqestView>('home');
  const [bookqqestQuestions, setBookqqestQuestions] =
    useState<BookqqestQuizQuestion[]>([]);
  const [bookqqestIndex, setBookqqestIndex] = useState(0);
  const [bookqqestCorrect, setBookqqestCorrect] =
    useState(0);
  const [bookqqestSelected, setBookqqestSelected] =
    useState<string | null>(null);
  const [bookqqestRevealed, setBookqqestRevealed] =
    useState(false);
  const [bookqqestExitOpen, setBookqqestExitOpen] =
    useState(false);

  const bookqqestCurrent =
    bookqqestQuestions[bookqqestIndex];

  const bookqqestProgress =
    bookqqestQuestions.length > 0
      ? (bookqqestIndex + (bookqqestRevealed ? 1 : 0)) /
        bookqqestQuizTotal
      : 0;

  const bookqqestResetPlay = useCallback(() => {
    setBookqqestIndex(0);
    setBookqqestCorrect(0);
    setBookqqestSelected(null);
    setBookqqestRevealed(false);
    setBookqqestExitOpen(false);
  }, []);

  const bookqqestStartQuiz = useCallback(() => {
    setBookqqestQuestions(bookqqestPickQuizQuestions());
    bookqqestResetPlay();
    setBookqqestView('play');
  }, [bookqqestResetPlay]);

  const bookqqestExitToHome = useCallback(() => {
    setBookqqestExitOpen(false);
    setBookqqestQuestions([]);
    bookqqestResetPlay();
    setBookqqestView('home');
  }, [bookqqestResetPlay]);

  const bookqqestFinishQuiz = useCallback(
    async (bookqqestFinalCorrect: number) => {
      setBookqqestCorrect(bookqqestFinalCorrect);
      await bookqqestAddQuizPoints(
        bookqqestFinalCorrect * bookqqestPointsPerCorrect,
      );
      setBookqqestView('complete');
    },
    [],
  );

  const bookqqestOnSelectAnswer = useCallback(
    (bookqqestOption: string) => {
      if (!bookqqestCurrent || bookqqestRevealed) {
        return;
      }
      setBookqqestSelected(bookqqestOption);
      setBookqqestRevealed(true);
      if (
        bookqqestOption ===
        bookqqestCurrent.bookqqestCorrect
      ) {
        setBookqqestCorrect(c => c + 1);
      }
    },
    [bookqqestCurrent, bookqqestRevealed],
  );

  const bookqqestOnNext = useCallback(() => {
    if (!bookqqestCurrent || !bookqqestRevealed) {
      return;
    }

    if (bookqqestIndex >= bookqqestQuizTotal - 1) {
      bookqqestFinishQuiz(bookqqestCorrect);
      return;
    }

    setBookqqestIndex(i => i + 1);
    setBookqqestSelected(null);
    setBookqqestRevealed(false);
  }, [
    bookqqestCorrect,
    bookqqestCurrent,
    bookqqestFinishQuiz,
    bookqqestIndex,
    bookqqestRevealed,
  ]);

  const bookqqestAnswerStyle = useCallback(
    (bookqqestOption: string) => {
      if (!bookqqestRevealed) {
        return styles.bookqqestAnswerDefault;
      }
      if (
        bookqqestOption ===
        bookqqestCurrent?.bookqqestCorrect
      ) {
        return styles.bookqqestAnswerCorrect;
      }
      if (bookqqestOption === bookqqestSelected) {
        return styles.bookqqestAnswerWrong;
      }
      return styles.bookqqestAnswerDefault;
    },
    [
      bookqqestCurrent,
      bookqqestRevealed,
      bookqqestSelected,
    ],
  );

  const bookqqestAnswerTextStyle = useCallback(
    (bookqqestOption: string) => {
      if (!bookqqestRevealed) {
        return styles.bookqqestAnswerText;
      }
      if (
        bookqqestOption ===
        bookqqestCurrent?.bookqqestCorrect
      ) {
        return styles.bookqqestAnswerTextCorrect;
      }
      if (bookqqestOption === bookqqestSelected) {
        return styles.bookqqestAnswerTextWrong;
      }
      return styles.bookqqestAnswerText;
    },
    [
      bookqqestCurrent,
      bookqqestRevealed,
      bookqqestSelected,
    ],
  );

  React.useEffect(() => {
    if (bookqqestView !== 'play') {
      return;
    }
    const bookqqestSub = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setBookqqestExitOpen(true);
        return true;
      },
    );
    return () => bookqqestSub.remove();
  }, [bookqqestView]);

  const bookqqestNextLabel = useMemo(
    () =>
      bookqqestIndex >= bookqqestQuizTotal - 1
        ? 'Finish'
        : 'Next',
    [bookqqestIndex],
  );

  if (bookqqestView === 'complete') {
    return (
      <Bookqqestlayout bookqqestTab>
        <View style={styles.bookqqestCompleteWrap}>
          <Image
            source={require('../../assets/img/bookqqestbolquicomplt.png')}
            style={styles.bookqqestCompleteImage}
            resizeMode="contain"
          />
          <Text style={styles.bookqqestCompleteTitle}>
            Quiz Complete!
          </Text>
          <Text style={styles.bookqqestCompleteScore}>
            You answered {bookqqestCorrect} out of{' '}
            {bookqqestQuizTotal} correctly
          </Text>
          <Text style={styles.bookqqestCompletePoints}>
            +{bookqqestCorrect} Points
          </Text>
          <BookqqestGradientBtn
            bookqqestLabel="View Artifacts"
            bookqqestOnPress={() =>
              bookqqestNavigation.navigate(
                'Bookqqestarfcts' as never,
              )
            }
            bookqqestStyle={styles.bookqqestCompletePrimary}
          />
          <BookqqestOutlineBtn
            bookqqestLabel="Back to Quiz"
            bookqqestOnPress={bookqqestExitToHome}
          />
        </View>
      </Bookqqestlayout>
    );
  }

  if (bookqqestView === 'play' && bookqqestCurrent) {
    return (
      <Bookqqestlayout
        bookqqestTab
        contentStyle={styles.bookqqestPlayScroll}>
        <View style={styles.bookqqestPlayHeader}>
          <Pressable
            onPress={() => setBookqqestExitOpen(true)}
            style={({pressed}) => [
              styles.bookqqestBackBtn,
              pressed && styles.bookqqestPressed,
            ]}>
            <Image source={require('../../assets/img/bookqqestbolback.png')} />
          </Pressable>
          <View style={styles.bookqqestPlayHeaderMeta}>
            <Text style={styles.bookqqestQuestionCount}>
              Question {bookqqestIndex + 1}/
              {bookqqestQuizTotal}
            </Text>
            <Text style={styles.bookqqestCorrectCount}>
              {bookqqestCorrect} Correct
            </Text>
          </View>
        </View>

        <View style={styles.bookqqestProgressTrack}>
          <LinearGradient
            colors={['#D4763E', '#FF9F40']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={[
              styles.bookqqestProgressFill,
              {width: `${Math.max(bookqqestProgress * 100, 4.2)}%`},
            ]}
          />
        </View>

        <Image
          source={bookqqestCurrent.bookqqestImage}
          style={styles.bookqqestQuizImage}
          resizeMode="cover"
        />

        <View style={styles.bookqqestQuestionBox}>
          <Text style={styles.bookqqestQuestionText}>
            {bookqqestCurrent.bookqqestQuestion}
          </Text>
        </View>

        <View style={styles.bookqqestAnswersGrid}>
          {bookqqestCurrent.bookqqestOptions.map(
            bookqqestOption => (
              <Pressable
                key={bookqqestOption}
                disabled={bookqqestRevealed}
                onPress={() =>
                  bookqqestOnSelectAnswer(bookqqestOption)
                }
                style={({pressed}) => [
                  styles.bookqqestAnswerBtn,
                  bookqqestAnswerStyle(bookqqestOption),
                  pressed &&
                    !bookqqestRevealed &&
                    styles.bookqqestPressed,
                ]}>
                <Text
                  style={bookqqestAnswerTextStyle(
                    bookqqestOption,
                  )}>
                  {bookqqestOption}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        <BookqqestGradientBtn
          bookqqestLabel={bookqqestNextLabel}
          bookqqestOnPress={bookqqestOnNext}
          bookqqestDisabled={!bookqqestRevealed}
          bookqqestStyle={styles.bookqqestNextBtn}
        />

        <BookqqestExitModal
          bookqqestVisible={bookqqestExitOpen}
          bookqqestOnExit={bookqqestExitToHome}
          bookqqestOnCancel={() =>
            setBookqqestExitOpen(false)
          }
        />
      </Bookqqestlayout>
    );
  }

  return (
    <Bookqqestlayout bookqqestTab>
      <Text style={styles.bookqqestTitle}>Quiz</Text>
      <Text style={styles.bookqqestSubtitle}>
        Test your mythology knowledge
      </Text>

      <Image
        source={require('../../assets/img/bookqqestbolquizhero.png')}
        style={styles.bookqqestHeroImage}
        resizeMode="contain"
      />

      <View style={styles.bookqqestInfoCard}>
        <Text style={styles.bookqqestInfoTitle}>Mythology Quiz</Text>
        <Text style={styles.bookqqestInfoBody}>
          Answer 10 questions based on the tales and mythology from the app.
          Each correct answer earns you 50 points to unlock ancient artifacts.
        </Text>
      </View>

      <BookqqestGradientBtn
        bookqqestLabel="Start Quiz"
        bookqqestOnPress={bookqqestStartQuiz}
        bookqqestStyle={styles.bookqqestStartBtn}
      />
    </Bookqqestlayout>
  );
};

const styles = StyleSheet.create({
  bookqqestTitle: {
    color: '#DAA520',
    fontSize: 48.1,
    fontWeight: '500',
    lineHeight: 48.2,
    marginBottom: 8.3,
    marginTop: 25.4,
  },
  bookqqestSubtitle: {
    color: 'rgba(212, 165, 116, 0.7)',
    fontSize: 16.5,
    lineHeight: 24.1,
    marginBottom: 16.2,
  },
  bookqqestHeroImage: {
    width: 242.3,
    height: 242.4,
    alignSelf: 'center',
    borderRadius: 28.5,
    marginBottom: 16.1,
  },
  bookqqestInfoCard: {
    borderRadius: 16.2,
    borderWidth: 1.3,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24.4,
    gap: 12.5,
    marginBottom: 24.1,
  },
  bookqqestInfoTitle: {
    color: '#DAA520',
    fontSize: 24.2,
    fontWeight: '500',
    lineHeight: 32.3,
  },
  bookqqestInfoBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16.4,
    lineHeight: 26.5,
  },
  bookqqestStartBtn: {
    minHeight: 56.1,
  },
  bookqqestPlayScroll: {
    paddingBottom: 120.2,
  },
  bookqqestPlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.3,
    marginTop: 40.4,
    marginBottom: 16.5,
  },
  bookqqestBackBtn: {
    width: 40.1,
    height: 40.2,
    borderRadius: 20.3,
    backgroundColor: 'rgba(90, 58, 36, 0.5)',
    borderWidth: 1.4,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestBackIcon: {
    color: '#D4A574',
    fontSize: 20.5,
    fontWeight: '600',
  },
  bookqqestPlayHeaderMeta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookqqestQuestionCount: {
    color: 'rgba(212, 165, 116, 0.6)',
    fontSize: 16.1,
    lineHeight: 24.2,
  },
  bookqqestCorrectCount: {
    color: '#DAA520',
    fontSize: 16.3,
    lineHeight: 24.4,
  },
  bookqqestProgressTrack: {
    height: 8.5,
    borderRadius: 8.1,
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    overflow: 'hidden',
    marginBottom: 24.2,
  },
  bookqqestProgressFill: {
    height: '100%',
    borderRadius: 8.3,
    minWidth: 8.4,
  },
  bookqqestQuizImage: {
    width: 172.5,
    height: 172.1,
    borderRadius: 28.2,
    alignSelf: 'center',
    marginBottom: 24.3,
  },
  bookqqestQuestionBox: {
    borderRadius: 16.4,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    padding: 24.1,
    marginBottom: 24.2,
    minHeight: 120.3,
    justifyContent: 'center',
  },
  bookqqestQuestionText: {
    color: '#D4A574',
    fontSize: 20.4,
    lineHeight: 32.5,
    textAlign: 'center',
  },
  bookqqestAnswersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.1,
    marginBottom: 24.2,
  },
  bookqqestAnswerBtn: {
    width: '48%',
    minHeight: 74.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    backgroundColor: 'rgba(90, 58, 36, 0.21)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12.1,
  },
  bookqqestAnswerDefault: {
    borderColor: 'rgba(212, 118, 62, 0.3)',
  },
  bookqqestAnswerCorrect: {
    borderColor: '#15FF00',
  },
  bookqqestAnswerWrong: {
    borderColor: '#FF0000',
  },
  bookqqestAnswerText: {
    color: '#D4A574',
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookqqestAnswerTextCorrect: {
    color: '#15FF00',
    fontSize: 16.3,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookqqestAnswerTextWrong: {
    color: '#FF0000',
    fontSize: 16.4,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookqqestNextBtn: {
    minHeight: 56.5,
    marginBottom: 16.1,
  },
  bookqqestCompleteWrap: {
    alignItems: 'center',
    paddingTop: 8.2,
    paddingBottom: 24.3,
    gap: 12.4,
    marginTop: 50.5,
  },
  bookqqestCompleteImage: {
    width: 322.1,
    height: 322.2,
    borderRadius: 28.3,
    marginBottom: 8.4,
  },
  bookqqestCompleteTitle: {
    color: '#DAA520',
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
    textAlign: 'center',
  },
  bookqqestCompleteScore: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 18.2,
    lineHeight: 28.3,
    textAlign: 'center',
  },
  bookqqestCompletePoints: {
    color: '#D4763E',
    fontSize: 24.4,
    lineHeight: 32.5,
    marginBottom: 8.1,
  },
  bookqqestCompletePrimary: {
    width: '100%',
    minHeight: 56.2,
    marginTop: 8.3,
  },
  bookqqestGradientPress: {
    borderRadius: 20.4,
    overflow: 'hidden',
    width: '100%',
  },
  bookqqestGradientBtn: {
    minHeight: 56.5,
    borderRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestGradientText: {
    color: '#0F0804',
    fontSize: 16.2,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookqqestOutlineBtn: {
    width: '100%',
    minHeight: 56.3,
    borderRadius: 20.4,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14.1,
  },
  bookqqestOutlineText: {
    color: '#D4A574',
    fontSize: 16.2,
    fontWeight: '500',
  },
  bookqqestModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16.3,
  },
  bookqqestModal: {
    width: '100%',
    maxWidth: 361.4,
    borderRadius: 16.5,
    borderWidth: 1.1,
    borderColor: 'rgba(212, 118, 62, 0.3)',
    backgroundColor: '#2A1810',
    paddingHorizontal: 24.2,
    paddingVertical: 24.3,
    gap: 12.4,
  },
  bookqqestModalTitle: {
    color: '#DAA520',
    fontSize: 18.5,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4.1,
  },
  bookqqestModalBody: {
    color: 'rgba(212, 165, 116, 0.8)',
    fontSize: 16.2,
    lineHeight: 24.3,
    textAlign: 'center',
    marginBottom: 8.4,
  },
  bookqqestModalDeletePress: {
    borderRadius: 14.5,
    overflow: 'hidden',
  },
  bookqqestModalDeleteBtn: {
    minHeight: 36.1,
    borderRadius: 14.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8.3,
  },
  bookqqestModalDeleteText: {
    color: '#D4A574',
    fontSize: 14.4,
    fontWeight: '500',
  },
  bookqqestModalCancelBtn: {
    minHeight: 38.5,
    borderRadius: 14.1,
    borderWidth: 1.2,
    borderColor: 'rgba(212, 118, 62, 0.2)',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9.3,
  },
  bookqqestModalCancelText: {
    color: '#D4A574',
    fontSize: 14.4,
    fontWeight: '500',
  },
  bookqqestDisabled: {
    opacity: 0.45,
  },
  bookqqestPressed: {
    opacity: 0.85,
  },
});

export default Bookqqestquiz;
