// Onboard screen
import React, {useState} from 'react';
import {
  AppLayout,
  BackButton,
  ConfirmModal,
  GradientButton,
  IconButton,
  JourneyBadge,
  OutlineButton,
  RegionBadge,
  ScreenHeader,
  StoryListCard,
  TextCard,
} from '../components';
import {legendsaventurebkkAssets} from '../constants';
import {colors, gradients, gradientAxis} from '../themes';

import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';


const legendsaventurebkkSteps = [
  {
    legendsaventurebkkImage: require('../../assets/imgs/onboarding/onboardingFourKingdoms.png'),
    legendsaventurebkkTitle: 'Enter The Four Kingdoms',
    legendsaventurebkkDescription:
      'Explore ancient civilizations through calm myth-inspired stories and hidden cultural details.',
  },
  {
    legendsaventurebkkImage: require('../../assets/imgs/onboarding/onboardingShapeStory.png'),
    legendsaventurebkkTitle: 'Shape Every Story',
    legendsaventurebkkDescription:
      'Choose different story paths and discover how each adventure can unfold in a new way.',
  },
  {
    legendsaventurebkkImage: require('../../assets/imgs/onboarding/onboardingArtifacts.png'),
    legendsaventurebkkTitle: 'Discover Ancient Artifacts',
    legendsaventurebkkDescription:
      'Collect cultural artifacts and learn short facts connected to each civilization.',
  },
  {
    legendsaventurebkkImage: require('../../assets/imgs/onboarding/onboardingCharacters.png'),
    legendsaventurebkkTitle: 'Meet Mythical Characters',
    legendsaventurebkkDescription:
      'Read stories, answer quizzes, and gradually expand your mythology character archive.',
  },
] as const;

const legendsaventurebkkStepCount = legendsaventurebkkSteps.length;

const OnboardingScreen = () => {
  const legendsaventurebkkNavigation = useNavigation();
  const [legendsaventurebkkStep, setLegendsaventurebkkStep] = useState(0);

  const legendsaventurebkkCurrent = legendsaventurebkkSteps[legendsaventurebkkStep];
  const legendsaventurebkkIsLast = legendsaventurebkkStep === legendsaventurebkkStepCount - 1;

  const legendsaventurebkkFinish = () => {
    legendsaventurebkkNavigation.navigate('Legendsaventurebkktab' as never);
  };

  const legendsaventurebkkOnNext = () => {
    if (legendsaventurebkkIsLast) {
      legendsaventurebkkFinish();
      return;
    }
    setLegendsaventurebkkStep(prev => prev + 1);
  };

  return (
    <AppLayout contentStyle={styles.legendsaventurebkkLayoutContent}>
      <View style={styles.legendsaventurebkkCard}>
        <ImageBackground
          source={legendsaventurebkkCurrent.legendsaventurebkkImage}
          style={styles.legendsaventurebkkCardImage}
          imageStyle={styles.legendsaventurebkkCardImageRadius}>
          <LinearGradient
            colors={gradients.onboarding}
            locations={[0, 0.5, 1]}
            style={styles.legendsaventurebkkCardGradient}
          />
          <View style={styles.legendsaventurebkkCardTextWrap}>
            <Text style={styles.legendsaventurebkkTitle}>
              {legendsaventurebkkCurrent.legendsaventurebkkTitle}
            </Text>
            <Text style={styles.legendsaventurebkkDescription}>
              {legendsaventurebkkCurrent.legendsaventurebkkDescription}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.legendsaventurebkkPagination}>
        {legendsaventurebkkSteps.map((_, legendsaventurebkkIndex) => (
          <View
            key={legendsaventurebkkIndex}
            style={[
              styles.legendsaventurebkkDot,
              legendsaventurebkkIndex === legendsaventurebkkStep && styles.legendsaventurebkkDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.legendsaventurebkkActions}>
        <Pressable
          onPress={legendsaventurebkkOnNext}
          style={({pressed}) => [
            styles.legendsaventurebkkPrimaryPress,
            pressed && styles.legendsaventurebkkPressed,
          ]}>
          <LinearGradient
            colors={gradients.primaryAlt}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={styles.legendsaventurebkkPrimaryBtn}>
            <Text style={styles.legendsaventurebkkPrimaryText}>
              {legendsaventurebkkIsLast ? 'Begin Adventure' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!legendsaventurebkkIsLast && (
          <Pressable
            onPress={legendsaventurebkkFinish}
            style={({pressed}) => [
              styles.legendsaventurebkkSkipBtn,
              pressed && styles.legendsaventurebkkPressed,
            ]}>
            <Text style={styles.legendsaventurebkkSkipText}>Skip</Text>
          </Pressable>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  legendsaventurebkkCard: {
    borderRadius: 24.1,
    overflow: 'hidden',
    height: 470.2,
    width: '100%',
    marginTop: 20.3,
  },

  legendsaventurebkkLayoutContent: {
    minHeight: '100%',
  },
  legendsaventurebkkCardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  legendsaventurebkkCardImageRadius: {
    borderRadius: 24.4,
  },
  legendsaventurebkkCardGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24.5,
  },
  legendsaventurebkkCardTextWrap: {
    paddingHorizontal: 32.1,
    paddingBottom: 32.2,
    paddingTop: 32.3,
    gap: 16.4,
  },
  legendsaventurebkkTitle: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
  },
  legendsaventurebkkDescription: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18.2,
    lineHeight: 29.3,
  },
  legendsaventurebkkPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
    marginTop: 34.5,
    marginBottom: 24.1,
  },
  legendsaventurebkkDot: {
    width: 8.2,
    height: 8.3,
    borderRadius: 4.4,
    backgroundColor: '#5A3A24',
  },
  legendsaventurebkkDotActive: {
    width: 32.5,
    backgroundColor: colors.accent,
  },
  legendsaventurebkkActions: {
    gap: 12.1,
  },
  legendsaventurebkkPrimaryPress: {
    borderRadius: 20.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4.3},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  legendsaventurebkkPrimaryBtn: {
    height: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsaventurebkkPrimaryText: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '500',
  },
  legendsaventurebkkSkipBtn: {
    height: 58.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.border,
  },
  legendsaventurebkkSkipText: {
    color: colors.text,
    fontSize: 16.5,
    fontWeight: '500',
  },
  legendsaventurebkkPressed: {
    opacity: 0.85,
  },
});

export default OnboardingScreen;
