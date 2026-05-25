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

import {Routes} from '../navigation/routes';
import type {RootStackParamList} from '../navigation/types';
import {AppLayout, FadeInView, TypewriterText} from '../components';
import {colors, gradients, gradientAxis} from '../palette';

import {welcomeFrames} from './welcomeFrames';

const frameTotal = welcomeFrames.length;

const FrameMarker = ({markerLit}: {markerLit: boolean}) => {
  const spanAnim = useRef(
    new Animated.Value(markerLit ? 32.5 : 8.2),
  ).current;

  useEffect(() => {
    Animated.spring(spanAnim, {
      toValue: markerLit ? 32.5 : 8.2,
      useNativeDriver: false,
      speed: 16,
      bounciness: 6,
    }).start();
  }, [markerLit, spanAnim]);

  return (
    <Animated.View
      style={[
        layout.markerPip,
        markerLit && layout.markerPipLit,
        {width: spanAnim},
      ]}
    />
  );
};

const OnboardingScreen = () => {
  const stackNav = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [frameIndex, setFrameIndex] = useState(0);

  const activeFrame = welcomeFrames[frameIndex];
  const atFinalFrame = frameIndex === frameTotal - 1;

  const enterMainHub = () => {
    stackNav.reset({
      index: 0,
      routes: [{name: Routes.MainTabs}],
    });
  };

  const advanceFrame = () => {
    if (atFinalFrame) {
      enterMainHub();
      return;
    }
    setFrameIndex(prev => prev + 1);
  };

  return (
    <AppLayout contentStyle={layout.rootContent}>
      <FadeInView triggerKey={frameIndex} style={layout.heroPanel}>
        <ImageBackground
          source={activeFrame.backdropVisual}
          style={layout.panelBackdrop}
          imageStyle={layout.panelBackdropClip}>
          <LinearGradient
            colors={gradients.onboarding}
            locations={[0, 0.5, 1]}
            style={layout.panelVeil}
          />
          <View style={layout.captionBlock}>
            <TypewriterText
              text={activeFrame.headline}
              style={layout.headlineText}
              triggerKey={`headline-${frameIndex}`}
              charDelayMs={42}
            />
            <TypewriterText
              text={activeFrame.bodyCopy}
              style={layout.bodyCopy}
              triggerKey={`body-${frameIndex}`}
              delayMs={activeFrame.headline.length * 42 + 280}
            />
          </View>
        </ImageBackground>
      </FadeInView>

      <View style={layout.markerRow}>
        {welcomeFrames.map((_, markerIndex) => (
          <FrameMarker
            key={markerIndex}
            markerLit={markerIndex === frameIndex}
          />
        ))}
      </View>

      <View style={layout.controlStack}>
        <Pressable
          onPress={advanceFrame}
          style={({pressed}) => [
            layout.advancePressable,
            pressed && layout.pressedState,
          ]}>
          <LinearGradient
            colors={gradients.primaryAlt}
            start={gradientAxis.horizontal.start}
            end={gradientAxis.horizontal.end}
            style={layout.advanceSurface}>
            <Text style={layout.advanceLabel}>
              {atFinalFrame ? 'Begin Adventure' : 'Next'}
            </Text>
          </LinearGradient>
        </Pressable>

        {!atFinalFrame && (
          <Pressable
            onPress={enterMainHub}
            style={({pressed}) => [
              layout.bypassSurface,
              pressed && layout.pressedState,
            ]}>
            <Text style={layout.bypassLabel}>Skip</Text>
          </Pressable>
        )}
      </View>
    </AppLayout>
  );
};

const layout = StyleSheet.create({
  heroPanel: {
    borderRadius: 24.1,
    overflow: 'hidden',
    height: 470.2,
    width: '100%',
    marginTop: 20.3,
  },
  rootContent: {
    minHeight: '100%',
  },
  panelBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  panelBackdropClip: {
    borderRadius: 24.4,
  },
  panelVeil: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24.5,
  },
  captionBlock: {
    paddingHorizontal: 32.1,
    paddingBottom: 32.2,
    paddingTop: 32.3,
    gap: 16.4,
  },
  headlineText: {
    color: colors.gold,
    fontSize: 36.5,
    fontWeight: '500',
    lineHeight: 40.1,
  },
  bodyCopy: {
    color: 'rgba(212, 165, 116, 0.9)',
    fontSize: 18.2,
    lineHeight: 29.3,
  },
  markerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8.4,
    marginTop: 34.5,
    marginBottom: 24.1,
  },
  markerPip: {
    height: 8.3,
    borderRadius: 4.4,
    backgroundColor: '#5A3A24',
  },
  markerPipLit: {
    backgroundColor: colors.accent,
  },
  controlStack: {
    gap: 12.1,
  },
  advancePressable: {
    borderRadius: 20.2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4.3},
    shadowOpacity: 0.1,
    shadowRadius: 7.5,
    elevation: 4.3,
  },
  advanceSurface: {
    height: 56.4,
    borderRadius: 20.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advanceLabel: {
    color: colors.textDark,
    fontSize: 16.1,
    fontWeight: '500',
  },
  bypassSurface: {
    height: 58.2,
    borderRadius: 20.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardMedium,
    borderWidth: 1.4,
    borderColor: colors.border,
  },
  bypassLabel: {
    color: colors.text,
    fontSize: 16.5,
    fontWeight: '500',
  },
  pressedState: {
    opacity: 0.85,
  },
});

export default OnboardingScreen;
