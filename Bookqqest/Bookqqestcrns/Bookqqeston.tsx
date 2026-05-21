// Onboard screen

import React, {useState} from 'react';

import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import Bookqqestlayout from '../Bookqqestcpnt/Bookqqestlayout';

const bookqqestSteps = [
  {
    bookqqestImage: require('../../assets/img/bookqqestbookon1.png'),
    bookqqestTitle: 'Enter The Four Kingdoms',
    bookqqestDescription:
      'Explore ancient civilizations through calm myth-inspired stories and hidden cultural details.',
  },
  {
    bookqqestImage: require('../../assets/img/bookqqestbookon2.png'),
    bookqqestTitle: 'Shape Every Story',
    bookqqestDescription:
      'Choose different story paths and discover how each adventure can unfold in a new way.',
  },
  {
    bookqqestImage: require('../../assets/img/bookqqestbookon3.png'),
    bookqqestTitle: 'Discover Ancient Artifacts',
    bookqqestDescription:
      'Collect cultural artifacts and learn short facts connected to each civilization.',
  },
  {
    bookqqestImage: require('../../assets/img/bookqqestbookon4.png'),
    bookqqestTitle: 'Meet Mythical Characters',
    bookqqestDescription:
      'Read stories, answer quizzes, and gradually expand your mythology character archive.',
  },
] as const;

const bookqqestStepCount = bookqqestSteps.length;

const Bookqqeston = () => {
  const bookqqestNavigation = useNavigation();
  const [bookqqestStep, setBookqqestStep] = useState(0);

  const bookqqestCurrent = bookqqestSteps[bookqqestStep];
  const bookqqestIsLast = bookqqestStep === bookqqestStepCount - 1;

  const bookqqestFinish = () => {
    bookqqestNavigation.navigate('Bookqqesttab' as never);
  };

  const bookqqestOnNext = () => {
    if (bookqqestIsLast) {
      bookqqestFinish();
      return;
    }
    setBookqqestStep(prev => prev + 1);
  };

  return (
    <Bookqqestlayout contentStyle={styles.bookqqestLayoutContent}>
      <View style={styles.bookqqestCard}>
        <ImageBackground
          source={bookqqestCurrent.bookqqestImage}
          style={styles.bookqqestCardImage}
          imageStyle={styles.bookqqestCardImageRadius}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(42, 24, 16, 0.6)', '#1A0F0A']}
            locations={[0, 0.5, 1]}
            style={styles.bookqqestCardGradient}
          />
          <View style={styles.bookqqestCardTextWrap}>
            <Text style={styles.bookqqestTitle}>
              {bookqqestCurrent.bookqqestTitle}
            </Text>
            <Text style={styles.bookqqestDescription}>
              {bookqqestCurrent.bookqqestDescription}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.bookqqestPagination}>
        {bookqqestSteps.map((_, bookqqestIndex) => (
          <View
            key={bookqqestIndex}
            style={[
              styles.bookqqestDot,
              bookqqestIndex === bookqqestStep && styles.bookqqestDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.bookqqestActions}>
        <Pressable
          onPress={bookqqestOnNext}
          style={({pressed}) => [
            styles.bookqqestPrimaryPress,
            pressed && styles.bookqqestPressed,
          ]}>
          <LinearGradient
            colors={['#D4763E', '#F39340']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.bookqqestPrimaryBtn}>
            <Text style={styles.bookqqestPrimaryText}>
              {bookqqestIsLast ? 'Begin Adventure' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!bookqqestIsLast && (
          <Pressable
            onPress={bookqqestFinish}
            style={({pressed}) => [
              styles.bookqqestSkipBtn,
              pressed && styles.bookqqestPressed,
            ]}>
            <Text style={styles.bookqqestSkipText}>Skip</Text>
          </Pressable>
        )}
      </View>
    </Bookqqestlayout>
  );
};

const styles = StyleSheet.create({
  bookqqestCard: {
    borderRadius: 24.1,
    overflow: 'hidden',
    height: 470.2,
    width: '100%',
    marginTop: 20.3,
  },

  bookqqestLayoutContent: {
    minHeight: '100%',
  },
  bookqqestCardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bookqqestCardImageRadius: {
    borderRadius: 24.4,
  },
  bookqqestCardGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24.5,
  },
  bookqqestCardTextWrap: {
    paddingHorizontal: 32.1,
    paddingBottom: 32.2,
    paddingTop: 32.3,
    gap: 16.4,
  },
  bookqqestTitle: {
    color: '#DAA520',
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
  },
  bookqqestDescription: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18.2,
    lineHeight: 29.3,
  },
  bookqqestPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
    marginTop: 34.5,
    marginBottom: 24.1,
  },
  bookqqestDot: {
    width: 8.2,
    height: 8.3,
    borderRadius: 4.4,
    backgroundColor: '#5A3A24',
  },
  bookqqestDotActive: {
    width: 32.5,
    backgroundColor: '#D4763E',
  },
  bookqqestActions: {
    gap: 12.1,
  },
  bookqqestPrimaryPress: {
    borderRadius: 20.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4.3},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  bookqqestPrimaryBtn: {
    height: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookqqestPrimaryText: {
    color: '#0F0804',
    fontSize: 16.1,
    fontWeight: '500',
  },
  bookqqestSkipBtn: {
    height: 58.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1.4,
    borderColor: 'rgba(212, 118, 62, 0.2)',
  },
  bookqqestSkipText: {
    color: '#D4A574',
    fontSize: 16.5,
    fontWeight: '500',
  },
  bookqqestPressed: {
    opacity: 0.85,
  },
});

export default Bookqqeston;
