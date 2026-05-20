// Onboard screen

import React, {useState} from 'react';

import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import RaventreBookqueslayout from '../RaventreBookquesttscpnt/RaventreBookqueslayout';

const raventreBookquesttsSteps = [
  {
    raventreBookquesttsImage: require('../../assets/img/raventrebookon1.png'),
    raventreBookquesttsTitle: 'Enter The Four Kingdoms',
    raventreBookquesttsDescription:
      'Explore ancient civilizations through dangerous myths and concealed discoveries.',
  },
  {
    raventreBookquesttsImage: require('../../assets/img/raventrebookon2.png'),
    raventreBookquesttsTitle: 'Shape Every Story',
    raventreBookquesttsDescription:
      'Your choices change each adventure and unlock different story endings.',
  },
  {
    raventreBookquesttsImage: require('../../assets/img/raventrebookon3.png'),
    raventreBookquesttsTitle: 'Discover Ancient Artifacts',
    raventreBookquesttsDescription:
      'Earn legendary treasures and learn the secrets behind every civilization.',
  },
  {
    raventreBookquesttsImage: require('../../assets/img/raventrebookon4.png'),
    raventreBookquesttsTitle: 'Unlock Mythical Characters',
    raventreBookquesttsDescription:
      'Read tales, complete quizzes, and reveal heroes from forgotten cultures.',
  },
] as const;

const raventreBookquesttsStepCount = raventreBookquesttsSteps.length;

const RaventreBookquesttson = () => {
  const raventreBookquesttsNavigation = useNavigation();
  const [raventreBookquesttsStep, setRaventreBookquesttsStep] = useState(0);

  const raventreBookquesttsCurrent =
    raventreBookquesttsSteps[raventreBookquesttsStep];
  const raventreBookquesttsIsLast =
    raventreBookquesttsStep === raventreBookquesttsStepCount - 1;

  const raventreBookquesttsFinish = () => {
    raventreBookquesttsNavigation.navigate('RaventreBookquesttstab' as never);
  };

  const raventreBookquesttsOnNext = () => {
    if (raventreBookquesttsIsLast) {
      raventreBookquesttsFinish();
      return;
    }
    setRaventreBookquesttsStep(prev => prev + 1);
  };

  return (
    <RaventreBookqueslayout
      contentStyle={styles.raventreBookquesttsLayoutContent}>
      <View style={styles.raventreBookquesttsCard}>
        <ImageBackground
          source={raventreBookquesttsCurrent.raventreBookquesttsImage}
          style={styles.raventreBookquesttsCardImage}
          imageStyle={styles.raventreBookquesttsCardImageRadius}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(42, 24, 16, 0.6)', '#1A0F0A']}
            locations={[0, 0.5, 1]}
            style={styles.raventreBookquesttsCardGradient}
          />
          <View style={styles.raventreBookquesttsCardTextWrap}>
            <Text style={styles.raventreBookquesttsTitle}>
              {raventreBookquesttsCurrent.raventreBookquesttsTitle}
            </Text>
            <Text style={styles.raventreBookquesttsDescription}>
              {raventreBookquesttsCurrent.raventreBookquesttsDescription}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.raventreBookquesttsPagination}>
        {raventreBookquesttsSteps.map((_, raventreBookquesttsIndex) => (
          <View
            key={raventreBookquesttsIndex}
            style={[
              styles.raventreBookquesttsDot,
              raventreBookquesttsIndex === raventreBookquesttsStep &&
                styles.raventreBookquesttsDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.raventreBookquesttsActions}>
        <Pressable
          onPress={raventreBookquesttsOnNext}
          style={({pressed}) => [
            styles.raventreBookquesttsPrimaryPress,
            pressed && styles.raventreBookquesttsPressed,
          ]}>
          <LinearGradient
            colors={['#D4763E', '#F39340']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.raventreBookquesttsPrimaryBtn}>
            <Text style={styles.raventreBookquesttsPrimaryText}>
              {raventreBookquesttsIsLast ? 'Begin Adventure' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!raventreBookquesttsIsLast && (
          <Pressable
            onPress={raventreBookquesttsFinish}
            style={({pressed}) => [
              styles.raventreBookquesttsSkipBtn,
              pressed && styles.raventreBookquesttsPressed,
            ]}>
            <Text style={styles.raventreBookquesttsSkipText}>Skip</Text>
          </Pressable>
        )}
      </View>
    </RaventreBookqueslayout>
  );
};

const styles = StyleSheet.create({
  raventreBookquesttsCard: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 470,
    width: '100%',
    marginTop: 20,
  },

  raventreBookquesttsLayoutContent: {
    minHeight: '100%',
  },
  raventreBookquesttsCardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  raventreBookquesttsCardImageRadius: {
    borderRadius: 24,
  },
  raventreBookquesttsCardGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  raventreBookquesttsCardTextWrap: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 32,
    gap: 16,
  },
  raventreBookquesttsTitle: {
    color: '#DAA520',
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 40,
  },
  raventreBookquesttsDescription: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18,
    lineHeight: 29,
  },
  raventreBookquesttsPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 34,
    marginBottom: 24,
  },
  raventreBookquesttsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5A3A24',
  },
  raventreBookquesttsDotActive: {
    width: 32,
    backgroundColor: '#D4763E',
  },
  raventreBookquesttsActions: {
    gap: 12,
  },
  raventreBookquesttsPrimaryPress: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4,
  },
  raventreBookquesttsPrimaryBtn: {
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raventreBookquesttsPrimaryText: {
    color: '#0F0804',
    fontSize: 16,
    fontWeight: '500',
  },
  raventreBookquesttsSkipBtn: {
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90, 58, 36, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(212, 118, 62, 0.2)',
  },
  raventreBookquesttsSkipText: {
    color: '#D4A574',
    fontSize: 16,
    fontWeight: '500',
  },
  raventreBookquesttsPressed: {
    opacity: 0.85,
  },
});

export default RaventreBookquesttson;
