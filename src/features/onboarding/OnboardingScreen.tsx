import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Routes} from '../../app/navigation/routes';
import type {RootStackParamList} from '../../app/navigation/types';
import {AppLayout, FadeInView, TypewriterText} from '../../shared/components';
import {colors, gradients, gradientAxis} from '../../shared/theme';

import {onboardingSteps} from './onboardingSteps';

const stepCount = onboardingSteps.length;

const AnimatedDot = ({active}: {active: boolean}) => {
  const width = useRef(new Animated.Value(active ? 32.5 : 8.2)).current;

  useEffect(() => {
    Animated.spring(width, {
      toValue: active ? 32.5 : 8.2,
      useNativeDriver: false,
      speed: 16,
      bounciness: 6,
    }).start();
  }, [active, width]);

  return (
    <Animated.View
      style={[
        styles.dot,
        active && styles.dotActive,
        {width},
      ]}
    />
  );
};

const OnboardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(0);

  const current = onboardingSteps[step];
  const isLast = step === stepCount - 1;

  const finish = () => {
    navigation.reset({
      index: 0,
      routes: [{name: Routes.MainTabs}],
    });
  };

  const onNext = () => {
    if (isLast) {
      finish();
      return;
    }
    setStep(prev => prev + 1);
  };

  return (
    <AppLayout contentStyle={styles.layoutContent}>
      <FadeInView triggerKey={step} style={styles.card}>
        <ImageBackground
          source={current.image}
          style={styles.cardImage}
          imageStyle={styles.cardImageRadius}>
          <LinearGradient
            colors={gradients.onboarding}
            locations={[0, 0.5, 1]}
            style={styles.cardGradient}
          />
          <View style={styles.cardTextWrap}>
            <TypewriterText
              text={current.title}
              style={styles.title}
              triggerKey={`title-${step}`}
              charDelayMs={42}
            />
            <TypewriterText
              text={current.description}
              style={styles.description}
              triggerKey={`desc-${step}`}
              delayMs={current.title.length * 42 + 280}
            />
          </View>
        </ImageBackground>
      </FadeInView>

      <View style={styles.pagination}>
        {onboardingSteps.map((_, index) => (
          <AnimatedDot key={index} active={index === step} />
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onNext}
          style={({pressed}) => [
            styles.primaryPress,
            pressed && styles.pressed,
          ]}>
          <LinearGradient
            colors={gradients.primaryAlt}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={styles.primaryBtn}>
            <Text style={styles.primaryText}>
              {isLast ? 'Begin Adventure' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!isLast && (
          <Pressable
            onPress={finish}
            style={({pressed}) => [
              styles.skipBtn,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24.1,
    overflow: 'hidden',
    height: 470.2,
    width: '100%',
    marginTop: 20.3,
  },
  layoutContent: {
    minHeight: '100%',
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImageRadius: {
    borderRadius: 24.4,
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24.5,
  },
  cardTextWrap: {
    paddingHorizontal: 32.1,
    paddingBottom: 32.2,
    paddingTop: 32.3,
    gap: 16.4,
  },
  title: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
  },
  description: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18.2,
    lineHeight: 29.3,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
    marginTop: 34.5,
    marginBottom: 24.1,
  },
  dot: {
    height: 8.3,
    borderRadius: 4.4,
    backgroundColor: '#5A3A24',
  },
  dotActive: {
    backgroundColor: colors.accent,
  },
  actions: {
    gap: 12.1,
  },
  primaryPress: {
    borderRadius: 20.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4.3},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  primaryBtn: {
    height: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '500',
  },
  skipBtn: {
    height: 58.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.border,
  },
  skipText: {
    color: colors.text,
    fontSize: 16.5,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.85,
  },
});

export default OnboardingScreen;
